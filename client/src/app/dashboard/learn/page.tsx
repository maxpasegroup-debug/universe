"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import { apiFetch } from "@/lib/api";
import { logAnalytics } from "@/lib/analytics";
import MediaModal from "@/components/media/MediaModal";
import { motion } from "framer-motion";

type ContentType = "video" | "audio" | "document";
type LearnContent = {
  _id: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
};

export default function LearnPage() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<LearnContent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<null | { title: string; type: "video" | "audio"; url: string }>(null);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch<{ content: LearnContent[] }>(`/content`);
        setContent(data.content);
        await logAnalytics("dashboard_learn_view");
      } catch (err: any) {
        setError(err?.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-3xl md:text-4xl font-extrabold leading-tight bg-gold-linear bg-clip-text text-transparent">
          Learn
        </div>
        <p className="mt-3 text-[#B8B8B8] max-w-2xl">
          Watch videos, listen to audios, and read documents to understand the business.
        </p>
      </motion.div>

      {loading ? (
        <div className="text-white/60">Loading content...</div>
      ) : error ? (
        <div className="text-red-300 bg-red-500/10 border border-red-300/20 rounded-xl p-3">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <GlassCard className="h-full p-6">
                <div className="relative h-28 rounded-[16px] overflow-hidden border border-[#FFD700]/20 bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C6A052]/25 via-[#FFD700]/10 to-transparent" />
                  <div className="absolute left-3 top-3 text-[11px] tracking-widest uppercase text-[#B8B8B8]">
                    {item.type}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === "video" || item.type === "audio" ? (
                      <div className="w-14 h-14 rounded-full border border-[#FFD700]/30 bg-black/20 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[9px] border-b-[9px] border-l-[14px] border-l-[#FFD700]/90 ml-1" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full border border-[#FFD700]/30 bg-black/20 flex items-center justify-center text-[#FFD700] font-extrabold text-xl">
                        D
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="bg-gold-linear bg-clip-text text-transparent font-bold text-xl">
                    {item.title}
                  </div>
                  <p className="mt-2 text-[#B8B8B8] leading-relaxed min-h-[48px]">{item.description}</p>
                </div>

                <div className="mt-5">
                  {item.type === "document" ? (
                    <GoldButton
                      className="w-full"
                      onClick={() => {
                        window.location.href = item.url;
                      }}
                    >
                      DOWNLOAD
                    </GoldButton>
                  ) : (
                    <GoldButton
                      className="w-full"
                      onClick={() =>
                        setModal({
                          title: item.title,
                          type: item.type as "video" | "audio",
                          url: item.url,
                        })
                      }
                    >
                      PLAY
                    </GoldButton>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      <MediaModal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.title || ""}
        footer={
          modal ? (
            <div className="text-white/60 text-sm">
              If the media doesn’t play, open the original link in a new tab.
            </div>
          ) : null
        }
      >
        {modal ? (
          modal.type === "video" ? (
            <video src={modal.url} controls className="w-full rounded-xl bg-black" />
          ) : (
            <audio src={modal.url} controls className="w-full" />
          )
        ) : null}
      </MediaModal>
    </div>
  );
}

