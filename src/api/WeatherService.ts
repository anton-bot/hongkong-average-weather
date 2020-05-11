import axios from 'axios';
import { API_BASE_URL, WEATHER_API_ACCESS_CODE } from '../constants';
import { DataAveraging } from '../types/DataAveraging';
import { AverageWeatherResponse } from '../types/AverageWeatherResponse';

const weatherApiUrl = `${API_BASE_URL}/ask`

export class WeatherService {
  static async getAverageWeather(mmddDate: string): Promise<AverageWeatherResponse> {
    const response = await axios.get(
      weatherApiUrl,
      {
        params: {
          code: WEATHER_API_ACCESS_CODE,
          mode: DataAveraging.threedayaverage,
          date: mmddDate,
        },
      },
    );

    return response.data;
  }
}
