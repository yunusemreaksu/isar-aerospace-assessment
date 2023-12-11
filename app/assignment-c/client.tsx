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
            in pascal case. In certain cases, this may also require interfering
            with the structure of incoming data.
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
          <Text size={"3"} as="p">
            If items 2 and 3 are specified in the API, the incoming data can be
            displayed according to the country where the user is located.
          </Text>
          <Text size={"3"} as="p">
            4. Incoming statusMessages may be more descriptive. For example, it
            can be stated more clearly whether Spectrum is currently facing a
            problem or not. Thus, more accurate warnings can be shown to the
            user.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
