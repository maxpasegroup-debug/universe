import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const contentCard = {
  background: "#111",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "1px solid #222",
};

export default function EarnPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("English");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/content?language=${language}`
        );
        const data = await res.json();
        const list = Array.isArray(data) ? data.filter((x) => x.type === "earn") : [];
        setItems(list);
      } catch (e) {
        console.error(e);
        setItems([]);
      }
    };
    void load();
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
      <h1 style={{ color: "#FFD700" }}>💰 Earn</h1>

      <div style={{ marginBottom: 20 }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: 10,
            background: "#111",
            color: "#FFD700",
            border: "1px solid #FFD700",
            marginRight: 12,
          }}
        >
          <option>English</option>
          <option>Malayalam</option>
        </select>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "10px 16px",
            background: "#222",
            color: "#FFD700",
            border: "1px solid #FFD700",
            cursor: "pointer",
          }}
        >
          ← Dashboard
        </button>
      </div>

      {items.length === 0 ? (
        <p style={{ color: "#888" }}>No earn content for this language yet.</p>
      ) : null}

      {items.map((item, i) => (
        <div key={i} style={contentCard}>
          <strong style={{ color: "#FFD700" }}>{item.category}</strong>
          {item.link ? (
            <p>
              <a href={item.link} target="_blank" rel="noreferrer" style={{ color: "#FFD700" }}>
                Open link
              </a>
            </p>
          ) : null}
          {item.file ? (
            /^https?:\/\//i.test(item.file) ? (
              <p>
                <a href={item.file} target="_blank" rel="noreferrer" style={{ color: "#FFD700" }}>
                  Open file / media
                </a>
              </p>
            ) : (
              <p style={{ color: "#ccc" }}>📁 {item.file}</p>
            )
          ) : null}
        </div>
      ))}
    </div>
  );
}
