"use client";

import { SpectrumStatus } from "@/types";
import { calculateYAxeMinMax } from "@/utils";
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
      min: calculateYAxeMinMax(selectedKey, chartData[selectedKey]).min,
      max: calculateYAxeMinMax(selectedKey, chartData[selectedKey]).max,
    },
  };

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${selectedKey}: ${chartData[selectedKey].toFixed(3)}`,
      },
    },
    scales,
  };
  const labels = [selectedKey];
  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Data",
        data: [chartData[selectedKey]],
        backgroundColor: colorVariant,
      },
    ],
  };
  return (
    <div className="h-64">
      <Bar options={options} data={data} />
    </div>
  );
}
