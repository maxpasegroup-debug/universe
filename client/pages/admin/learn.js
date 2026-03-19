import { useState, useEffect } from "react";
import { saveData, getData } from "../../src/utils/storage";

export default function ManageLearn() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getData("learn"));
  }, []);

  const handleUpload = () => {
    if (!file || !category) return alert("Fill all fields");

    const newItem = {
      name: file.name,
      category,
    };

    const updated = [...items, newItem];
    setItems(updated);
    saveData("learn", updated);

    setFile(null);
    setCategory("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Learn Content</h2>

      <input
        placeholder="Enter category (Eg: Step 1)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br />
      <br />

      <input
        type="file"
        accept=".pdf,audio/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleUpload}>Upload</button>

      <h3>Uploaded Content</h3>

      {items.map((item, i) => (
        <div key={i}>
          <strong>{item.category}</strong> - {item.name}
        </div>
      ))}
    </div>
  );
}
