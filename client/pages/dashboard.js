import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../src/utils/auth";

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

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
