import { Container } from "@radix-ui/themes";

export default function AssignmentBLayout({
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
