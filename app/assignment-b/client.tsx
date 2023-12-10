"use client";

import ActAlertDialog from "@/components/act-alert-dialog";
import BarChart from "@/components/bar-chart";
import Header from "@/components/header";
import InfoCard from "@/components/info-card";
import LineChart from "@/components/line-chart";
import { keysWithColors } from "@/constants";
import { SelectedKey, SpectrumStatus } from "@/types";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface LineData {
  velocity: number;
  altitude: number;
  temperature: number;
}

type ChartMode = "bar" | "line";

export default function Client() {
  const [liveData, setLiveData] = useState<SpectrumStatus>({
    velocity: 0,
    altitude: 0,
    temperature: 0,
    statusMessage: "",
    isAscending: false,
    isActionRequired: false,
  });
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [lineData, setLineData] = useState<LineData[]>([]);

  if (lineData.length === 11) {
    setLineData((prev) => [...prev].slice(1));
  }

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

      setLineData((prev) => [
        ...prev,
        {
          velocity: parsedData.Velocity,
          altitude: parsedData.Altitude,
          temperature: parsedData.Temperature,
        },
      ]);

      if (parsedData.IsActionRequired) {
        ws.onclose = () => {
          console.log("Websocket disconnected!");
        };
        ws.close();
        setOpenAlertDialog(parsedData.IsActionRequired);
      }
    };
  }, []);

  useEffect(() => {
    const localItem = localStorage.getItem("chartMode") as ChartMode;
    if (localItem) {
      setChartMode(localItem);
    }
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
        throw new Error(`Error! Status: ${response.status}`);
      }

      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModeButtonClick = () => {
    if (chartMode === "bar") {
      localStorage.setItem("chartMode", "line");
      setChartMode("line");
    } else {
      localStorage.setItem("chartMode", "bar");
      setChartMode("bar");
    }
  };

  return (
    <>
      <Flex direction={"column"} gap={"8"} align={"center"}>
        <Flex justify={"center"} align={"center"} gap={"4"}>
          <Header />
          <Button
            className="capitalize hover:cursor-pointer"
            onClick={handleModeButtonClick}
          >
            mode: {chartMode === "bar" ? "bar" : "line"}
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
              {chartMode === "bar" ? (
                <BarChart
                  chartData={liveData}
                  selectedKey={item.key as SelectedKey}
                  colorVariant={item.backgroundColor}
                />
              ) : (
                <LineChart
                  chartData={liveData}
                  selectedKey={item.key as SelectedKey}
                  lineValues={lineData}
                  backgroundColorVariant={item.backgroundColor}
                  borderColorVariant={item.borderColor as string}
                />
              )}
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
      <ActAlertDialog
        openAlertDialog={openAlertDialog}
        setOpenAlertDialog={setOpenAlertDialog}
        handleActButtonClick={handleActButtonClick}
      />
    </>
  );
}
