import { useState } from "react";

export default function ManageEarn() {
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Earn Content</h2>

      <input
        placeholder="Enter referral link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <input
        type="file"
        accept="audio/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={() => alert("Saved")}>Save</button>

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
