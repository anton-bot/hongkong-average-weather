import React from 'react';
import moment from 'moment';
import './AverageWeather.scss';
import { AreaSeries, Tooltip, ChartProvider, XAxis, YAxis, LineSeries, Circle } from 'rough-charts'
import { WeatherDay } from '../../types/WeatherDay';
import { parseData } from '../../functions/parseData';
import { scaleLinear, scaleTime } from 'd3-scale';

type Props = {};
type State = {
  data: WeatherDay[];
};

export class AverageWeather extends React.PureComponent<Props, State> {
  state: State = {
    data: [],
  };

  componentDidMount = () => {
    this.setState({
      data: parseData(),
    });
  };

  render() {
    return (
      <div className="AverageWeather">
        <ChartProvider
          xScale={scaleTime().domain([new Date(2000, 0, 15), new Date(2000, 12, 31)])}
          yScale={scaleLinear().domain([10, 35])}
          height={500}
          data={this.getTemperatureData()}
        >
          <LineSeries
            dataKey="maxTemperature"
            options={{
              stroke: 'red',
            }}
          >
            {
              (item, props, index) =>
                <Circle
                  x={(props.x || 0) - 3}
                  y={(props.y || 0) - 3}
                  diameter={6}
                  opacity={0.01}
                  options={{
                    fill: 'transparent',
                  }}
                />
            }
          </LineSeries>
          <AreaSeries
            dataKey="minTemperature"
            options={{
              fillStyle: 'cross-hatch',
              stroke: 'orange',
            }}
          >
            {
              (item, props, index) =>
                <Circle
                  x={(props.x || 0) - 3}
                  y={(props.y || 0) - 3}
                  diameter={6}
                  opacity={0.01}
                  options={{
                    fill: 'transparent',
                  }}
                />
            }
          </AreaSeries>
          <XAxis tickCount={6} dataKey="date" tickSize={1} format={d => moment(d).format('D MMM')} />
          <YAxis tickCount={10} />
          <Tooltip>
            {item => `Temperature on ${moment(item.date).format('D MMM')}: ${Math.round(item.minTemperature)}-${Math.round(item.maxTemperature)} C`}
          </Tooltip>
        </ChartProvider>

        <ChartProvider
          xScale={scaleTime().domain([new Date(2000, 0, 15), new Date(2000, 12, 31)])}
          yScale={scaleLinear().domain([0, 35])}
          height={500}
          data={this.getRainData()}
        >
          <AreaSeries
            dataKey="rainfall"
            options={{
              fillStyle: 'cross-hatch',
              stroke: 'navy',
            }}
          >
            {
              (item, props, index) =>
                <Circle
                  x={(props.x || 0) - 3}
                  y={(props.y || 0) - 3}
                  diameter={6}
                  opacity={0.01}
                  options={{
                    fill: 'transparent',
                  }}
                />
            }
          </AreaSeries>
          <XAxis tickCount={6} dataKey="date" tickSize={1} format={d => moment(d).format('D MMM')} />
          <YAxis tickCount={10} />
          <Tooltip>
            {item => `Rain on ${moment(item.date).format('D MMM')}: ${Math.round(item.rainfall)} mm`}
          </Tooltip>
        </ChartProvider>
      </div>
    );
  }

  getTemperatureData = () =>
    this.state.data.map(day => ({
      name: day.dayOfYear,
      date: day.date,
      minTemperature: day.minTemperature,
      maxTemperature: day.maxTemperature,
    }));

    getRainData = () =>
      this.state.data.map(day => ({
        name: day.dayOfYear,
        date: day.date,
        rainfall: day.rainfall,
      }));
}
