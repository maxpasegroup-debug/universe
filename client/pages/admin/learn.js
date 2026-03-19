import { useState } from "react";

export default function ManageLearn() {
  const [file, setFile] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Learn Content</h2>

      <input
        type="file"
        accept=".pdf,audio/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={() => alert("File selected: " + file?.name)}>Upload</button>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
