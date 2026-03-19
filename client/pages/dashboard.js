import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({ learn: [], earn: "Error", contact: "#" }));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <h2>Learn</h2>
      {data.learn?.map((item: any, i: number) => (
        <div key={i}>{item.title}</div>
      ))}

      <h2>Earn</h2>
      <p>{data.earn}</p>

      <h2>Talk</h2>
      <a href={data.contact} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </div>
  );
}
