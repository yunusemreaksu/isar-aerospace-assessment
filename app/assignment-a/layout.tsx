import { Container } from "@radix-ui/themes";

export default function AssignmentALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      size={"4"}
      pt={"4"}
      className="h-[calc(100vh-64px)] bg-slate-100"
    >
      {children}
    </Container>
  );
}
