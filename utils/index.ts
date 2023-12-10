import { SelectedKey } from "@/types";

export const calculateYAxeMinMax = (
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
