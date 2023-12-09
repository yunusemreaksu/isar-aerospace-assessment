import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";

type Props = {
  textColor:
    | "ruby"
    | "tomato"
    | "red"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "brown"
    | "orange"
    | "sky"
    | "mint"
    | "lime"
    | "yellow"
    | "amber"
    | "gold"
    | "bronze"
    | "gray"
    | undefined;
  textWeight: "light" | "regular" | "medium" | "bold";
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
  handleActButtonClick: () => void;
};

export default function InfoCard({
  textColor,
  textWeight,
  statusMessage,
  isAscending,
  isActionRequired,
  handleActButtonClick,
}: Props) {
  return (
    <Card style={{ width: 600 }}>
      <Flex direction={"column"} gap={"2"}>
        <Heading as="h2">Information</Heading>
        <Separator my="1" size="4" />
        <Flex direction={"row"} gap={"2"}>
          <Text weight={"bold"}>Message:</Text>
          <Text color={textColor} weight={textWeight}>
            {statusMessage}
          </Text>
        </Flex>
        <Flex direction={"row"} gap={"2"}>
          <Text weight={"bold"}>Phase of Flight:</Text>
          <Text color={textColor} weight={textWeight}>
            {isAscending ? "Ascending" : "Descending"}
          </Text>
        </Flex>
        <Flex direction={"row"} gap={"2"} align={"center"}>
          <Strong>Action Reqired:</Strong>
          {isActionRequired ? (
            <Button
              variant="solid"
              color="red"
              className="hover:cursor-pointer"
              onClick={handleActButtonClick}
            >
              <ExclamationTriangleIcon /> Act on Spectrum
            </Button>
          ) : (
            <Badge color="blue" size={"2"}>
              NO
            </Badge>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
