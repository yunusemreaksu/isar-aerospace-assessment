"use client";

import BarChart from "@/components/bar-chart";
import { ReloadIcon, RocketIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { SpectrumStatus } from "../types";

type Props = {
  data: SpectrumStatus;
  keysWithColors: {
    key: string;
    color: string;
  }[];
};
type selectedKey = "velocity" | "altitude" | "temperature";

export default function HomeClient({ data, keysWithColors }: Props) {
  const { refresh } = useRouter();
  return (
    <Flex direction={"column"} gap={"8"}>
      <Flex justify={"center"} align={"center"} gap={"4"}>
        <Flex justify={"center"} align={"center"} gap={"2"}>
          <RocketIcon color="red" />
          <Heading align={"center"} as="h1">
            Spectrum Status
          </Heading>
        </Flex>
        <Button onClick={() => refresh()} className="hover:cursor-pointer">
          <ReloadIcon /> Refresh
        </Button>
      </Flex>
      <Flex
        gap={"4"}
        direction={"row"}
        justify={"between"}
        align={"center"}
        width={"100%"}
        pt={"4"}
      >
        {keysWithColors.map((item) => (
          <Box key={item.key}>
            <BarChart
              chartData={data}
              selectedKey={item.key as selectedKey}
              colorVariant={item.color}
            />
          </Box>
        ))}
      </Flex>
      <Card style={{ maxWidth: 500 }}>
        <Flex direction={"column"} gap={"2"}>
          <Heading as="h2">Information</Heading>
          <Flex direction={"row"} gap={"2"}>
            <Strong>Message:</Strong>
            <Text>{data.statusMessage}</Text>
          </Flex>
          <Flex direction={"row"} gap={"2"}>
            <Strong>Phase of Flight:</Strong>
            <Text>{data.isAscending ? "Ascending" : "Descending"}</Text>
          </Flex>
          <Flex direction={"row"} gap={"2"}>
            <Strong>Action Reqired:</Strong>
            <Text color={data.isActionRequired ? "red" : "blue"}>
              {data.isActionRequired ? "YES" : "NO"}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
