import React from 'react';
import { ChartProvider, LineSeries, XAxis, YAxis, Tooltip } from 'rough-charts';
import { scaleTime, scaleLinear } from 'd3-scale';
import { formatDate } from '../../functions/ui/formatDate';
import { CHART_DATE_RANGE, CHART_HEIGHT_PX } from '../../config/charts';
import { HumidityDataPoint } from '../../types/HumidityDataPoint';
import { drawTransparentDataPoint } from '../../functions/charts/drawTransparentDataPoint';
import { colors } from '../../config/colors';
import { RoughHeader } from '../RoughHeader/RoughHeader';

type Props = {
  data: HumidityDataPoint[];
};

const X_SCALE = scaleTime().domain(CHART_DATE_RANGE);
const Y_SCALE = scaleLinear().domain([50, 95]);

const X_TICK_COUNT = 6;
const Y_TICK_COUNT = 10;

export class HumidityChart extends React.PureComponent<Props> {
  render() {
    return (
      <div className="HumidityChart">
        <RoughHeader>
          Humidity
        </RoughHeader>
        <ChartProvider
          xScale={X_SCALE}
          yScale={Y_SCALE}
          height={CHART_HEIGHT_PX}
          data={this.props.data}
        >
          <LineSeries
            dataKey="maxHumidity"
            options={{ stroke: colors.purple }}
          >
            {drawTransparentDataPoint}
          </LineSeries>
          <LineSeries
            dataKey="minHumidity"
            options={{ stroke: colors.pinkish }}
          >
            {drawTransparentDataPoint}
          </LineSeries>
          <XAxis tickCount={X_TICK_COUNT} dataKey="date" tickSize={1} format={formatDate} />
          <YAxis tickCount={Y_TICK_COUNT} />
          <Tooltip>
            {getTooltip}
          </Tooltip>
        </ChartProvider>
      </div>
    );
  }
}

const getTooltip = (item: HumidityDataPoint) =>
  `Relative humidity on ${formatDate(item.date)}:
  ${Math.round(item.minHumidity)}%-${Math.round(item.maxHumidity)}%`;
