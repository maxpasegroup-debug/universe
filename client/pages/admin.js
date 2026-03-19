import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <button onClick={() => router.push("/admin/learn")}>Manage Learn</button>

      <button onClick={() => router.push("/admin/earn")}>Manage Earn</button>

      <button onClick={() => window.open("https://wa.me/917591929909")}>Talk to Expert</button>

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
