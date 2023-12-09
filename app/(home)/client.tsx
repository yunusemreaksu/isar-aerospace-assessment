"use client";

import BarChart from "@/components/bar-chart";
import LoadingSpinner from "@/components/loading-spinner";
import { keysWithColors } from "@/constants";
import {
  ExclamationTriangleIcon,
  ReloadIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import {
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
import { useEffect, useState } from "react";
import { SpectrumStatus } from "../types";

type SelectedKey = "velocity" | "altitude" | "temperature";

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<SpectrumStatus>({
    velocity: 0,
    altitude: 0,
    temperature: 0,
    statusMessage: "",
    isAscending: false,
    isActionRequired: false,
  });
  const [liveData, setLiveData] = useState<SpectrumStatus>({
    velocity: 0,
    altitude: 0,
    temperature: 0,
    statusMessage: "",
    isAscending: false,
    isActionRequired: false,
  });

  const handleReloadButtonClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SPECTRUM_STATUS as string,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setInitialData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const isActionRequired =
    liveData.isActionRequired || initialData.isActionRequired;
  const statusMessage = liveData.statusMessage || initialData.statusMessage;
  const isAscending = liveData.isAscending || initialData.isAscending;
  const textColor = isActionRequired ? "red" : "blue";
  const textWeight = isActionRequired ? "bold" : "medium";

  const handleActButtonClick = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACT_ON_SPECTRUM as string,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner
          type="spinningBubbles"
          color="#357ddd"
          width={100}
          height={100}
          className="pt-10"
        />
      ) : (
        <Flex direction={"column"} gap={"8"} align={"center"}>
          <Flex justify={"center"} align={"center"} gap={"4"}>
            <Flex justify={"center"} align={"center"} gap={"2"}>
              <RocketIcon color="red" />
              <Heading align={"center"} as="h1">
                Spectrum Status
              </Heading>
            </Flex>
            <Button
              onClick={handleReloadButtonClick}
              className="hover:cursor-pointer"
            >
              <ReloadIcon /> Reload Data
            </Button>
            {isActionRequired && (
              <Button
                variant="solid"
                color="red"
                className="hover:cursor-pointer"
                onClick={handleActButtonClick}
              >
                <ExclamationTriangleIcon /> Act on Spectrum
              </Button>
            )}
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
                  chartData={liveData || initialData}
                  selectedKey={item.key as SelectedKey}
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
        </Flex>
      )}
    </>
  );
}
