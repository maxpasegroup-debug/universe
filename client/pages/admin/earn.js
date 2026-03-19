import { useState, useEffect } from "react";
import { saveData, getData } from "../../src/utils/storage";

export default function ManageEarn() {
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getData("earn"));
  }, []);

  const handleSave = () => {
    if (!category) return alert("Category required");

    const newItem = {
      category,
      link,
      fileName: file?.name || "",
    };

    const updated = [...items, newItem];
    setItems(updated);
    saveData("earn", updated);

    setCategory("");
    setLink("");
    setFile(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Earn Content</h2>

      <input
        placeholder="Enter category (Eg: Step 1)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Enter link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <br />
      <br />

      <input
        type="file"
        accept="audio/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleSave}>Save</button>

      <h3>Saved Content</h3>

      {items.map((item, i) => (
        <div key={i}>
          <strong>{item.category}</strong> - {item.link || item.fileName}
        </div>
      ))}
    </div>
  );
}
