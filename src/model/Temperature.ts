export interface TemperatureData {
  datetime: string;
  app_max_temp: number;
}
export interface Temperature {
  data: TemperatureData[];
}
