import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const card = {
  background: "#111",
  padding: "20px",
  borderRadius: "12px",
  cursor: "pointer",
  border: "1px solid #FFD700",
  boxShadow: "0 0 12px rgba(255,215,0,0.25)",
  textAlign: "center",
  fontSize: "18px",
  transition: "0.3s",
};

const contentCard = {
  background: "#111",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "1px solid #222",
};

const logoutBtn = {
  marginTop: 30,
  padding: "10px 20px",
  background: "#FFD700",
  border: "none",
  cursor: "pointer",
};

export default function Dashboard() {
  const router = useRouter();

  const [language, setLanguage] = useState("English");
  const [content, setContent] = useState([]);

  const fetchContent = async (lang) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/content?language=${lang}`
      );
      const data = await res.json();
      console.log("CONTENT DATA:", data);
      setContent(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!token && !loggedIn) {
      router.push("/login");
      return;
    }
    fetchContent(language);
  }, [language, router]);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      <h1 style={{ color: "#FFD700" }}>✨ Your Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: 10,
            background: "#111",
            color: "#FFD700",
            border: "1px solid #FFD700",
          }}
        >
          <option>English</option>
          <option>Malayalam</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 15 }}>
        <div
          style={card}
          onClick={() => router.push("/learn")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          📘 Learn
        </div>

        <div
          style={card}
          onClick={() => router.push("/earn")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          💰 Earn
        </div>

        <div
          style={card}
          onClick={() => window.open("https://wa.me/917591929909")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          💬 Talk to Expert
        </div>
      </div>

      <h2 style={{ marginTop: 30 }}>📚 Your Steps</h2>

      {content.map((item, i) => (
        <div key={i} style={contentCard}>
          <strong style={{ color: "#FFD700" }}>{item.category}</strong>
          <p>{item.type}</p>

          {item.link && (
            <a href={item.link} target="_blank" rel="noreferrer" style={{ color: "#FFD700" }}>
              Open Link
            </a>
          )}

          {item.file && <p>📁 {item.file}</p>}
        </div>
      ))}

      <button
        onClick={() => {
          localStorage.clear();
          router.push("/login");
        }}
        style={logoutBtn}
      >
        Logout
      </button>
    </div>
  );
}
