import { WeatherDay } from '../../types/WeatherDay';
import { RainfallDataPoint } from '../../types/RainfallDataPoint';

export function getRainfallDataPoint(day: WeatherDay): RainfallDataPoint {
  return {
    date: day.date,
    rainfall: Number(day.rainfall),
  };
}
