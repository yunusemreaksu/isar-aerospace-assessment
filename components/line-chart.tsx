import { SpectrumStatus } from "@/types";
import { calculateYAxeMinMax } from "@/utils";
import type { ChartOptions } from "chart.js";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface LineData {
  velocity: number;
  altitude: number;
  temperature: number;
}

type Props = {
  chartData: SpectrumStatus;
  selectedKey: "velocity" | "altitude" | "temperature";
  backgroundColorVariant: string;
  borderColorVariant: string;
  lineValues: LineData[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function LineChart({
  chartData,
  selectedKey,
  backgroundColorVariant,
  borderColorVariant,
  lineValues,
}: Props) {
  const scales = {
    y: {
      min: calculateYAxeMinMax(selectedKey, chartData[selectedKey]).min,
      max: calculateYAxeMinMax(selectedKey, chartData[selectedKey]).max,
    },
  };

  const options: ChartOptions<"line"> = {
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

  const labels = [
    "0",
    "500 ms",
    "1000 ms",
    "1500 ms",
    "2000 ms",
    "2500 ms",
    "3000 ms",
    "3500 ms",
    "4000 ms",
    "4500 ms",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Data",
        data: lineValues.map((item) => item[selectedKey]),
        borderColor: borderColorVariant,
        backgroundColor: backgroundColorVariant,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
