"use client";

import { SelectedKey, SpectrumStatus } from "@/types";
import type { ChartData, ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type Props = {
  chartData: SpectrumStatus;
  selectedKey: "velocity" | "altitude" | "temperature";
  colorVariant?: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function BarChart({
  chartData,
  selectedKey,
  colorVariant = "rgba(255, 99, 132, 0.5)",
}: Props) {
  const calculateYAxeMinMax = (
    key: SelectedKey,
    value: number,
  ): { min: number; max: number } => {
    switch (key) {
      case "altitude":
        if (value <= 0) {
          const base = Math.ceil(value / 1000);
          return {
            max: base * 1000 + 1000,
            min: base * 1000 - 1000,
          };
        }
      case "temperature":
        return {
          min: -30,
          max: 30,
        };

      case "velocity":
        return {
          min: -100,
          max: 100,
        };
    }
  };

  const scales = {
    y: {
      min: calculateYAxeMinMax(selectedKey, chartData[selectedKey]).min,
      max: calculateYAxeMinMax(selectedKey, chartData[selectedKey]).max,
    },
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${selectedKey} status`,
      },
    },
    scales,
  };
  const labels = [selectedKey];
  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: [chartData[selectedKey]],
        backgroundColor: colorVariant,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
