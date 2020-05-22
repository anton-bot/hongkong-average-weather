import { WeatherDay } from '../../types/WeatherDay';
import { HumidityDataPoint } from '../../types/HumidityDataPoint';

export function getHumidityDataPoint(day: WeatherDay): HumidityDataPoint {
  return {
    date: day.date,
    minHumidity: day.minHumidity,
    maxHumidity: day.maxHumidity,
  };
}
