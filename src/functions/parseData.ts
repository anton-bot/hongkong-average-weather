import moment from 'moment';
import weather from '../data/weather.json';
import { WeatherDay } from '../types/WeatherDay';

const LEAP_YEAR = '2000';

export function parseData(): WeatherDay[] {
  return Object.entries(weather)
    .map(([key, dayWeather]) => {
      const m = moment(`${LEAP_YEAR}${key}`, 'YYYYMMDD');
      return {
        ...dayWeather,
        dayOfYear: m.dayOfYear(),
        date: m.toDate(),
      };
    })
    .sort(byDayOfYear);
}

const byDayOfYear = (a: WeatherDay, b: WeatherDay) => a.dayOfYear - b.dayOfYear;
