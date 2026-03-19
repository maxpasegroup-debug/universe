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

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>?? Admin Panel</h1>

      <div style={cardStyle} onClick={() => router.push("/admin/learn")}>
        <h2>?? Manage Learn</h2>
        <p>Upload PDFs, videos & audio</p>
      </div>

      <div style={cardStyle} onClick={() => router.push("/admin/earn")}>
        <h2>?? Manage Earn</h2>
        <p>Add links, videos & audio</p>
      </div>

      <div style={cardStyle} onClick={() => window.open("https://wa.me/917591929909")}>
        <h2>?? Talk to Expert</h2>
        <p>Connect via WhatsApp</p>
      </div>

      <div
        style={{ ...cardStyle, background: "#ffe5e5" }}
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        <h2>?? Logout</h2>
      </div>
    </div>
  );
}
