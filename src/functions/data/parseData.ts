import moment from 'moment';
import weather from '../../data/weather.json';
import { WeatherDay } from '../../types/WeatherDay';
import { isNotUndefined } from './isNotUndefined';

const LEAP_YEAR = '2000';

export function parseData(threeDayAverage = false): WeatherDay[] {
  const transformedData = Object.entries(weather)
    .map(([key, dayWeather]) => {
      const m = moment(`${LEAP_YEAR}${key}`, 'YYYYMMDD');
      return {
        ...dayWeather,
        rainfall: Number(dayWeather.rainfall),
        minTemperature: Number(dayWeather.minTemperature),
        maxTemperature: Number(dayWeather.maxTemperature),
        minHumidity: Number(dayWeather.minHumidity),
        maxHumidity: Number(dayWeather.maxHumidity),
        dayOfYear: m.dayOfYear(),
        date: m.toDate(),
      };
    })
    .sort(byDayOfYear);

  return threeDayAverage
    ? getThreeDayAverages(transformedData)
    : transformedData;
}

const byDayOfYear = (a: WeatherDay, b: WeatherDay) => a.dayOfYear - b.dayOfYear;

function getThreeDayAverages(data: WeatherDay[]): WeatherDay[] {
  return data.map(day => ({
    ...day,
    rainfall: average('rainfall', ...getThreeDaysFromData(data, day)),
    minTemperature: average('minTemperature', ...getThreeDaysFromData(data, day)),
    maxTemperature: average('maxTemperature', ...getThreeDaysFromData(data, day)),
    minHumidity: average('minHumidity', ...getThreeDaysFromData(data, day)),
    maxHumidity: average('maxHumidity', ...getThreeDaysFromData(data, day)),
  }));
}

type ThreeDays = [WeatherDay, WeatherDay | undefined, WeatherDay | undefined];

function getThreeDaysFromData(data: WeatherDay[], day: WeatherDay): ThreeDays {
  return [
    day,
    data.find(d => d.dayOfYear === day.dayOfYear - 1),
    data.find(d => d.dayOfYear === day.dayOfYear + 1),
  ];
}

type NumericDataKey =
  | 'rainfall'
  | 'minTemperature'
  | 'maxTemperature'
  | 'minHumidity'
  | 'maxHumidity'
;

function average(key: NumericDataKey, ...rest: ThreeDays): number {
  const dataPoints = rest.filter(isNotUndefined).map(day => day[key]);
  return sum(dataPoints) / dataPoints.length;
}

const sum = (ns: number[]) => ns.reduce((total, current) => total + current, 0);
