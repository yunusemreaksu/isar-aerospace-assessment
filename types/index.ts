export interface SpectrumStatus {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
}

export interface KeyWithColor {
  key: string;
  backgroundColor: string;
  borderColor?: string;
}

export type SelectedKey = "velocity" | "altitude" | "temperature";
