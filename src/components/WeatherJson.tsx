import React from 'react';
import { AverageWeatherResponse } from '../types/AverageWeatherResponse';
import { WeatherService } from '../api/WeatherService';
import { getTomorrowMmDd } from '../functions/getTomorrowMmDd';

type Props = {};

type State = {
  averageWeather: AverageWeatherResponse | undefined;
};

export class WeatherJson extends React.PureComponent<Props, State> {
  state: State = {
    averageWeather: undefined,
  };

  componentDidMount = async () => {
    const averageWeather = await WeatherService.getAverageWeather(getTomorrowMmDd());
    this.setState({ averageWeather });
  };

  render() {
    return (
      <div className="WeatherJson">
        <pre>
          {JSON.stringify(this.state.averageWeather, undefined, 2)}
        </pre>
      </div>
    );
  }
}
