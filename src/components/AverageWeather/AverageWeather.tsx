import React from 'react';
import './AverageWeather.scss';
import { WeatherDay } from '../../types/WeatherDay';
import { parseData } from '../../functions/data/parseData';
import { getRainfallDataPoint } from '../../functions/data/getRainfallDataPoint';
import { RainfallChart } from '../RainfallChart/RainfallChart';
import { THREE_DAY_AVERAGES } from '../../constants';
import { TemperatureChart } from '../TemperatureChart/TemperatureChart';
import { getTemperatureDataPoint } from '../../functions/data/getTemperatureDataPoint';
import { HumidityChart } from '../HumidityChart/HumidityChart';
import { getHumidityDataPoint } from '../../functions/data/getHumidityDataPoint';

type Props = {};
type State = {
  data: WeatherDay[];
};

export class AverageWeather extends React.PureComponent<Props, State> {
  state: State = {
    data: parseData(THREE_DAY_AVERAGES),
  };

  render() {
    return (
      <div className="AverageWeather">
        <TemperatureChart data={this.getTemperatureData()} />
        <RainfallChart data={this.getRainData()} />
        <HumidityChart data={this.getHumidityData()} />
      </div>
    );
  }

  getTemperatureData = () => this.state.data.map(getTemperatureDataPoint);
  getRainData = () => this.state.data.map(getRainfallDataPoint);
  getHumidityData = () => this.state.data.map(getHumidityDataPoint);
}
