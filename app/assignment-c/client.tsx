import { Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";

export default function Client() {
  return (
    <Flex justify={"center"} align={"center"}>
      <Card style={{ width: 600, backgroundColor: "lightgrey", padding: 10 }}>
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          gap={"3"}
        >
          <Heading align={"center"} as="h2">
            Assignment C
          </Heading>
          <Separator my="1" size="4" />
          <Text size={"3"} as="p">
            1. I would expect each endpoint to respond in the same format. In
            one endpoint, the keys come in camel case, in the other, they come
            in pascal case.
          </Text>
          <Text size={"3"} as="p">
            2. It would be nice if it was stated whether the returned numerical
            values are based on the imperial or metric system.
          </Text>
          <Text size={"3"} as="p">
            3. Again, it is not clear in which unit the numerical values are
            returned. It would be good to specify this in the API to display
            more accurate data.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
