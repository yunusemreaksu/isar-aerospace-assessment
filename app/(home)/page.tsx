import HomeClient from "./client";

const keysWithColors = [
  {
    key: "velocity",
    color: "rgba(255, 99, 132, 0.5)",
  },
  {
    key: "altitude",
    color: "rgba(99, 167, 255, 0.5)",
  },
  {
    key: "temperature",
    color: "rgba(99, 255, 159, 0.5)",
  },
];

async function getData() {
  const res = await fetch(
    "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return <HomeClient data={data} keysWithColors={keysWithColors} />;
}
