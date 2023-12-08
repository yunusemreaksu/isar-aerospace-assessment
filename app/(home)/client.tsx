"use client";

import BarChart from "@/components/bar-chart";
import { ReloadIcon, RocketIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
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
    <>
      <Flex justify={"center"} align={"center"} gap={"4"}>
        <Flex justify={"center"} align={"center"} gap={"2"}>
          <RocketIcon color="red" />
          <Heading align={"center"}>Spectrum Status</Heading>
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
    </>
  );
}
