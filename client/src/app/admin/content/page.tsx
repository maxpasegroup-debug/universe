"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import { apiFetch } from "@/lib/api";

type ContentType = "video" | "audio" | "document";
type AdminContent = {
  _id: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  createdAt?: string;
};

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<AdminContent[]>([]);

  const [type, setType] = useState<ContentType>("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ content: AdminContent[] }>(`/admin/content`, { method: "GET" });
      setItems(data.content);
    } catch (err: any) {
      setError(err?.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => items.filter((x) => x.type === type), [items, type]);

  function resetForm() {
    setType("video");
    setTitle("");
    setDescription("");
    setUrl("");
    setFile(null);
    setEditingId(null);
    setMessage(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("type", type);
      fd.append("title", title);
      fd.append("description", description);
      if (url) fd.append("url", url);
      if (file) fd.append("file", file);

      if (editingId) {
        await apiFetch(`/admin/content/${editingId}`, {
          method: "PUT",
          body: fd,
        });
        setMessage("Content updated successfully.");
      } else {
        await apiFetch(`/admin/content`, {
          method: "POST",
          body: fd,
        });
        setMessage("Content added successfully.");
      }

      resetForm();
      await load();
    } catch (err: any) {
      setMessage(null);
      setError(err?.message || "Failed to save content");
    }
  }

  function onEdit(item: AdminContent) {
    setEditingId(item._id);
    setType(item.type);
    setTitle(item.title);
    setDescription(item.description || "");
    setUrl(item.url || "");
    setFile(null);
    setMessage(null);
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this content item?")) return;
    setError(null);
    try {
      await apiFetch(`/admin/content/${id}`, { method: "DELETE" });
      await load();
      if (editingId === id) resetForm();
    } catch (err: any) {
      setError(err?.message || "Failed to delete content");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="bg-gold-linear bg-clip-text text-transparent font-extrabold text-2xl">
            Content management
          </div>
          <p className="mt-2 text-white/70">
            Upload videos, audios, documents, and manage titles/descriptions.
          </p>
        </div>
        <div className="flex gap-3">
          <GoldButton onClick={() => void load()} disabled={loading}>
            Refresh
          </GoldButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <GlassCard>
            <div className="text-white/90 font-bold text-lg">
              {editingId ? "Edit Content" : "Add Content"}
            </div>

            <form className="mt-4 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-white/80 text-sm font-medium">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ContentType)}
                  className="mt-2 w-full rounded-xl border border-gold-300/30 bg-white/5 px-4 py-3 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/40"
                >
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="document">Document</option>
                </select>
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Title</label>
                <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Intro Video" required />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Description</label>
                <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description..." />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">URL (optional if uploading file)</label>
                <TextInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">File Upload (optional)</label>
                <input
                  type="file"
                  accept={type === "document" ? "application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" : undefined}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mt-2 w-full text-white/80"
                />
              </div>

              {message ? <div className="text-emerald-300 bg-emerald-500/10 border border-emerald-300/20 rounded-xl p-3">{message}</div> : null}
              {error ? <div className="text-red-300 bg-red-500/10 border border-red-300/20 rounded-xl p-3">{error}</div> : null}

              <div className="flex flex-col sm:flex-row gap-3">
                <GoldButton type="submit" className="flex-1" disabled={!title.trim()}>
                  {editingId ? "Save Changes" : "Add Content"}
                </GoldButton>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 hover:bg-white/10 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </GlassCard>
        </div>

        <div className="lg:col-span-7">
          <GlassCard className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="font-bold text-white/90 text-lg">Existing items</div>
              <div className="flex gap-2">
                {(["video", "audio", "document"] as ContentType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={[
                      "px-3 py-2 rounded-xl border transition-colors text-sm",
                      t === type ? "border-gold-300/60 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                    ].join(" ")}
                    type="button"
                  >
                    {t[0].toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5">
              {loading ? (
                <div className="text-white/60">Loading...</div>
              ) : filtered.length === 0 ? (
                <div className="text-white/60">No items for this type yet.</div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((it) => (
                    <div key={it._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="bg-gold-linear bg-clip-text text-transparent font-bold text-lg">{it.title}</div>
                          <div className="text-white/70 mt-2 text-sm">{it.description}</div>
                          <div className="text-white/50 mt-2 text-xs break-all">{it.url}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(it)}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void onDelete(it._id)}
                            className="rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-2 text-red-200 hover:bg-red-500/15 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

