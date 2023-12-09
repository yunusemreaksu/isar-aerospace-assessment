"use client";

import BarChart from "@/components/bar-chart";
import Header from "@/components/header";
import InfoCard from "@/components/info-card";
import { keysWithColors } from "@/constants";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectedKey, SpectrumStatus } from "../types";

type Props = {
  data: SpectrumStatus;
};

export default function AssignmentAClient({ data }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();

  const isActionRequired = data.isActionRequired;
  const textColor = isActionRequired ? "red" : "blue";
  const textWeight = isActionRequired ? "bold" : "medium";

  const handleReloadButtonClick = () => {
    setIsLoading(true);
    refresh();
    setIsLoading(false);
  };

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

      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex direction={"column"} gap={"8"} align={"center"}>
      <Flex justify={"center"} align={"center"} gap={"4"}>
        <Header />
        <Button
          onClick={handleReloadButtonClick}
          className="hover:cursor-pointer"
        >
          <ReloadIcon /> Reload Data
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
              selectedKey={item.key as SelectedKey}
              colorVariant={item.color}
            />
          </Box>
        ))}
      </Flex>
      <InfoCard
        textColor={textColor}
        textWeight={textWeight}
        isAscending={data.isAscending}
        statusMessage={data.statusMessage}
        isActionRequired={data.isActionRequired}
        handleActButtonClick={handleActButtonClick}
      />
    </Flex>
  );
}
