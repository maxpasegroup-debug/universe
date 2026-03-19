import { useEffect, useState } from "react";
import { getData } from "../src/utils/storage";

export default function Dashboard() {
  const [learn, setLearn] = useState([]);
  const [earn, setEarn] = useState([]);

  useEffect(() => {
    setLearn(getData("learn"));
    setEarn(getData("earn"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>User Dashboard</h1>

      <h2>🚀 Learn</h2>

      {learn.length === 0 && <p>No content added yet</p>}

      {learn.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{item.category}</h3>
          <p>{item.name}</p>
        </div>
      ))}

      <h2>💰 Earn</h2>

      {earn.length === 0 && <p>No content added yet</p>}

      {earn.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{item.category}</h3>
          <p>{item.link || item.fileName}</p>
        </div>
      ))}

      <h2>💬 Talk to Expert</h2>

      <a href="https://wa.me/917591929909" target="_blank" rel="noreferrer">
        Chat on WhatsApp
      </a>

      <br />
      <br />

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
