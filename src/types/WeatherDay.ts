import { AverageWeatherResponse } from './AverageWeatherResponse';

export type WeatherDay = AverageWeatherResponse & {
  dayOfYear: number;
  date: Date;
};
