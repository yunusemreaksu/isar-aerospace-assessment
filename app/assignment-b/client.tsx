"use client";

import BarChart from "@/components/bar-chart";
import Header from "@/components/header";
import InfoCard from "@/components/info-card";
import { keysWithColors } from "@/constants";
import { Box, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { SelectedKey, SpectrumStatus } from "../types";

export default function AssignmentBClient() {
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

  const isActionRequired = liveData.isActionRequired;
  const statusMessage = liveData.statusMessage;
  const isAscending = liveData.isAscending;
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
    <Flex direction={"column"} gap={"8"} align={"center"}>
      <Flex justify={"center"} align={"center"} gap={"4"}>
        <Header />
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
              selectedKey={item.key as SelectedKey}
              colorVariant={item.color}
            />
          </Box>
        ))}
      </Flex>
      <InfoCard
        textColor={textColor}
        textWeight={textWeight}
        isAscending={isAscending}
        statusMessage={statusMessage}
        isActionRequired={liveData.isActionRequired}
        handleActButtonClick={handleActButtonClick}
      />
    </Flex>
  );
}
