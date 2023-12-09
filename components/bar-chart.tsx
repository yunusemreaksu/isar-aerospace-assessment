"use client";

import { SpectrumStatus } from "@/types";
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
  const scales = {
    y: {
      min:
        selectedKey === "altitude"
          ? chartData.altitude >= -30000
            ? -30000
            : -40000
          : selectedKey === "temperature"
            ? -30
            : -100,
      max:
        selectedKey === "altitude"
          ? chartData.altitude >= -20000
            ? 0
            : -20000
          : selectedKey === "temperature"
            ? 30
            : 100,
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
