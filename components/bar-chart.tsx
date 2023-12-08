"use client";

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
import { SpectrumStatus } from "../app/types";

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
          ? -50000
          : selectedKey === "temperature"
            ? -30
            : -100,
      max:
        selectedKey === "altitude"
          ? 0
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
