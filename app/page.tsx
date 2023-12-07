import { Box, Container, Text } from "@radix-ui/themes";

async function getData() {
  const res = await fetch(
    "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <Container size={"4"}>
      <Box>
        <Text>TEST</Text>
      </Box>
    </Container>
  );
}
