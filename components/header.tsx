import { RocketIcon } from "@radix-ui/react-icons";
import { Flex, Heading } from "@radix-ui/themes";

export default function Header() {
  return (
    <Flex justify={"center"} align={"center"} gap={"2"}>
      <RocketIcon color="red" />
      <Heading align={"center"} as="h1">
        Spectrum Status
      </Heading>
    </Flex>
  );
}
