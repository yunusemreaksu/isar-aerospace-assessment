import { Container } from "@radix-ui/themes";

export default function AssignmentALayout({
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
