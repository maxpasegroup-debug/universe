import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "";

export default function Earn() {
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("English");
  const [items, setItems] = useState([]);

  const save = async () => {
    if (!category) return alert("Category required");

    await fetch(`${API}/content/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        type: "earn",
        language,
        link: link || "",
        file: file?.name || "",
      }),
    });

    alert("Saved successfully");
    fetchItems();
  };

  const fetchItems = async () => {
    const res = await fetch(`${API}/content?language=${language}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data.filter((x) => x.type === "earn") : [];
    setItems(list);
  };

  useEffect(() => {
    fetchItems();
  }, [language]);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      <h1 style={{ color: "#FFD700" }}>💰 Earn Manager</h1>

      <div
        style={{
          background: "#111",
          padding: 20,
          borderRadius: 12,
          marginBottom: 30,
        }}
      >
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: 10,
            marginBottom: 10,
            background: "#111",
            color: "#FFD700",
            border: "1px solid #FFD700",
            width: "100%",
          }}
        >
          <option>English</option>
          <option>Malayalam</option>
        </select>

        <input
          placeholder="Category (Eg: Step 1)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10, width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Enter link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ padding: 10, width: "100%", marginBottom: 10 }}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: 10 }}
        />

        <button
          onClick={save}
          style={{
            background: "#FFD700",
            color: "#000",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save Content
        </button>
      </div>

      <h2>Saved Content</h2>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#111",
            padding: 15,
            marginBottom: 10,
            borderRadius: 10,
            border: "1px solid #222",
          }}
        >
          <strong style={{ color: "#FFD700" }}>{item.category}</strong>

          {item.link && (
            <p>
              🔗{" "}
              <a href={item.link} target="_blank" rel="noreferrer" style={{ color: "#FFD700" }}>
                Open Link
              </a>
            </p>
          )}

          {item.file && <p>📁 {item.file}</p>}
        </div>
      ))}
    </div>
  );
}
