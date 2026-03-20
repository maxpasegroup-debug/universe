import { useState, useEffect } from "react";

export default function Learn() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("English");
  const [link, setLink] = useState("");
  const [items, setItems] = useState([]);

  const upload = async () => {
    if (!file || !category) return alert("Fill all fields");

    await fetch("/api/content/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        type: "learn",
        language,
        link: link || "",
        file: file?.name || "",
      }),
    });

    alert("Uploaded");
    fetchItems();
  };

  const fetchItems = async () => {
    const res = await fetch(
      `/api/content?language=${encodeURIComponent(language)}&type=learn`
    );
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
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
      <h1 style={{ color: "#FFD700" }}>📘 Learn Manager</h1>

      <div style={{ marginBottom: 20 }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: 10,
            marginRight: 10,
            background: "#111",
            color: "#FFD700",
            border: "1px solid #FFD700",
          }}
        >
          <option>English</option>
          <option>Malayalam</option>
        </select>

        <input
          placeholder="Category (Eg: Step 1)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10, marginRight: 10 }}
        />

        <input
          placeholder="Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ padding: 10, marginRight: 10, width: "100%", maxWidth: 320 }}
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button
          onClick={upload}
          style={{
            marginLeft: 10,
            background: "#FFD700",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
      </div>

      <h2>Uploaded Content</h2>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#111",
            padding: 15,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <strong style={{ color: "#FFD700" }}>{item.category}</strong>
          <p>{item.file}</p>
          {item.link ? (
            <p>
              <a href={item.link} target="_blank" rel="noreferrer" style={{ color: "#FFD700" }}>
                Open link
              </a>
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
