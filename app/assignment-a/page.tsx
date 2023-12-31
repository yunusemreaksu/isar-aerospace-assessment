import Client from "./client";

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_SPECTRUM_STATUS as string, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <Client data={data} />;
}
