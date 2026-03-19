import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../src/utils/auth";
import { getData } from "../src/utils/storage";

export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  const role = localStorage.getItem("role");
  const learn = getData("learn");
  const earn = getData("earn");

  if (role === "admin") {
    return (
      <div style={{ padding: 20 }}>
        <h1>Admin Dashboard</h1>
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

  return (
    <div style={{ padding: 20 }}>
      <h1>User Dashboard</h1>
      <h2>Learn</h2>
      {learn.map((item, i) => (
        <div key={i}>
          <strong>{item.category}</strong> - {item.name}
        </div>
      ))}
      <h2>Earn</h2>
      {earn.map((item, i) => (
        <div key={i}>
          <strong>{item.category}</strong> - {item.link || item.fileName}
        </div>
      ))}
      <h2>Talk to Expert (WhatsApp)</h2>
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
