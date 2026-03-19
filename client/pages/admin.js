import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/login");
    }
  }, []);

  const card = {
    background: "#111",
    border: "1px solid #222",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "20px",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(255,215,0,0.1)",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#FFD700",
          marginBottom: "30px",
        }}
      >
        ?? Admin Control Panel
      </h1>

      <div style={card} onClick={() => router.push("/admin/learn")}>
        <h2 style={{ color: "#FFD700" }}>?? Manage Learn</h2>
        <p>Upload PDFs, videos & audio</p>
      </div>

      <div style={card} onClick={() => router.push("/admin/earn")}>
        <h2 style={{ color: "#FFD700" }}>?? Manage Earn</h2>
        <p>Add links, videos & audio</p>
      </div>

      <div style={card} onClick={() => window.open("https://wa.me/917591929909")}> 
        <h2 style={{ color: "#FFD700" }}>?? Talk to Expert</h2>
      </div>

      <div
        style={{ ...card, background: "#220000" }}
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        <h2 style={{ color: "#ff4d4d" }}>?? Logout</h2>
      </div>
    </div>
  );
}
