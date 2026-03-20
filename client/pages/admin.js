import { useRouter } from "next/router";
import { useEffect } from "react";

const card = {
  background: "#111",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid #222",
  cursor: "pointer",
};

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/login");
    }
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
      <h1 style={{ color: "#FFD700" }}>👑 Admin Control Panel</h1>

      <div style={{ display: "grid", gap: 20 }}>
        <div style={card} onClick={() => router.push("/admin/learn")}>
          📘 Manage Learn
          <p>Upload content by Step & Language</p>
        </div>

        <div style={card} onClick={() => router.push("/admin/earn")}>
          💰 Manage Earn
          <p>Upload links, audio, video</p>
        </div>

        <div style={card} onClick={() => window.open("https://wa.me/917591929909")}>
          💬 WhatsApp Support
        </div>

        <div
          style={{ ...card, background: "#220000" }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          🚪 Logout
        </div>
      </div>
    </div>
  );
}
