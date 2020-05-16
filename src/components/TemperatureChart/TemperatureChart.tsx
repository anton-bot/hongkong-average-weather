import React from 'react';
import { ChartProvider, LineSeries, XAxis, YAxis, Tooltip } from 'rough-charts';
import { scaleTime, scaleLinear } from 'd3-scale';
import { formatDate } from '../../functions/ui/formatDate';
import { CHART_DATE_RANGE, CHART_HEIGHT_PX } from '../../config/charts';
import { TemperatureDataPoint } from '../../types/TemperatureDataPoint';
import { drawTransparentDataPoint } from '../../functions/charts/drawTransparentDataPoint';
import { colors } from '../../config/colors';

type Props = {
  data: TemperatureDataPoint[];
};

const X_SCALE = scaleTime().domain(CHART_DATE_RANGE);
const Y_SCALE = scaleLinear().domain([10, 35]);

const X_TICK_COUNT = 6;
const Y_TICK_COUNT = 10;

export class TemperatureChart extends React.PureComponent<Props> {
  render() {
    return (
      <div className="TemperatureChart">
        <ChartProvider
          xScale={X_SCALE}
          yScale={Y_SCALE}
          height={CHART_HEIGHT_PX}
          data={this.props.data}
        >
          <LineSeries
            dataKey="maxTemperature"
            options={{ stroke: colors.brickred }}
          >
            {drawTransparentDataPoint}
          </LineSeries>
          <LineSeries
            dataKey="minTemperature"
            options={{ stroke: colors.orange }}
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

const getTooltip = (item: TemperatureDataPoint) =>
  `Temperature on ${formatDate(item.date)}:
  ${Math.round(item.minTemperature)}-${Math.round(item.maxTemperature)} °C`;
