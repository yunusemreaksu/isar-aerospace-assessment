export interface SpectrumStatus {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
}

export interface KeysWithColors {
  key: string;
  color: string;
}
[];
