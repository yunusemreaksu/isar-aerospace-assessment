"use client";

import BarChart from "@/components/bar-chart";
import { keysWithColors } from "@/constants";
import { ReloadIcon, RocketIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SpectrumStatus } from "../types";

type Props = {
  data: SpectrumStatus;
};
type selectedKey = "velocity" | "altitude" | "temperature";

export default function HomeClient({ data }: Props) {
  const { refresh } = useRouter();
  const [liveData, setLiveData] = useState<SpectrumStatus>({
    velocity: 0,
    altitude: 0,
    temperature: 0,
    statusMessage: "",
    isAscending: false,
    isActionRequired: false,
  });

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_SPECTRUM_WS as string);

    ws.onopen = () => {
      console.log("Websocket connected!");
    };

    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setLiveData({
        velocity: parsedData.Velocity,
        altitude: parsedData.Altitude,
        temperature: parsedData.Temperature,
        statusMessage: parsedData.StatusMessage,
        isAscending: parsedData.IsAscending,
        isActionRequired: parsedData.IsActionRequired,
      });
    };
  }, []);

  return (
    <Flex direction={"column"} gap={"8"} align={"center"}>
      <Flex justify={"center"} align={"center"} gap={"4"}>
        <Flex justify={"center"} align={"center"} gap={"2"}>
          <RocketIcon color="red" />
          <Heading align={"center"} as="h1">
            Spectrum Status
          </Heading>
        </Flex>
        <Button onClick={() => refresh()} className="hover:cursor-pointer">
          <ReloadIcon /> Refresh Data
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
              chartData={liveData}
              selectedKey={item.key as selectedKey}
              colorVariant={item.color}
            />
          </Box>
        ))}
      </Flex>
      <Card style={{ width: 600 }}>
        <Flex direction={"column"} gap={"2"}>
          <Heading as="h2">Information</Heading>
          <Separator my="1" size="4" />
          <Flex direction={"row"} gap={"2"}>
            <Strong>Message:</Strong>
            <Text
              color={liveData.isActionRequired ? "red" : "blue"}
              weight={liveData.isActionRequired ? "bold" : "medium"}
            >
              {liveData.statusMessage}
            </Text>
          </Flex>
          <Flex direction={"row"} gap={"2"}>
            <Strong>Phase of Flight:</Strong>
            <Text
              color={liveData.isActionRequired ? "red" : "blue"}
              weight={liveData.isActionRequired ? "bold" : "medium"}
            >
              {liveData.isAscending ? "Ascending" : "Descending"}
            </Text>
          </Flex>
          <Flex direction={"row"} gap={"2"} align={"center"}>
            <Strong>Action Reqired:</Strong>
            {liveData.isActionRequired ? (
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button color="red" className="hover:cursor-pointer">
                    YES
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                  <AlertDialog.Title>Action Required!</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    Something went wrong!
                  </AlertDialog.Description>
                  <AlertDialog.Cancel>
                    <Flex justify={"end"} mt="4">
                      <Button
                        variant="soft"
                        color="gray"
                        className="hover:cursor-pointer"
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </AlertDialog.Cancel>
                </AlertDialog.Content>
              </AlertDialog.Root>
            ) : (
              <Badge color="blue">NO</Badge>
            )}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
