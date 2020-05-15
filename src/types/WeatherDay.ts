import { AverageWeatherDataItem } from './AverageWeatherDataItem';

export type WeatherDay = AverageWeatherDataItem & {
  dayOfYear: number;
  date: Date;
};
