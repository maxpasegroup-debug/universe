import { useState, useEffect } from "react";

export default function Learn() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);

  const upload = async () => {
    if (!file || !category) return alert("Fill all fields");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    await fetch("/api/upload/learn", {
      method: "POST",
      body: formData,
    });

    alert("Uploaded");
    fetchItems();
  };

  const fetchItems = async () => {
    const res = await fetch("/api/learn");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      <h1 style={{ color: "#FFD700" }}>?? Learn Manager</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Category (Eg: Step 1)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10, marginRight: 10 }}
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
        </div>
      ))}
    </div>
  );
}
