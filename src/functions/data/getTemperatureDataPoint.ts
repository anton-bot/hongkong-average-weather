import { WeatherDay } from '../../types/WeatherDay';
import { TemperatureDataPoint } from '../../types/TemperatureDataPoint';

export function getTemperatureDataPoint(day: WeatherDay): TemperatureDataPoint {
  return {
    date: day.date,
    minTemperature: day.minTemperature,
    maxTemperature: day.maxTemperature,
  };
}
