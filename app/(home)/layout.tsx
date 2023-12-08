import { Container } from "@radix-ui/themes";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size={"4"} pt={"4"}>
      {children}
    </Container>
  );
}
