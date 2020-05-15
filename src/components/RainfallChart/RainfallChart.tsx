import React from 'react';
import { ChartProvider, AreaSeries, XAxis, YAxis, Tooltip } from 'rough-charts';
import { scaleTime, scaleLinear } from 'd3-scale';
import { CHART_DATE_RANGE, CHART_HEIGHT_PX } from '../../config/charts';
import { colors } from '../../config/colors';
import { drawTransparentDataPoint } from '../../functions/charts/drawTransparentDataPoint';
import { formatDate } from '../../functions/ui/formatDate';
import { RainfallDataPoint } from '../../types/RainfallDataPoint';

type Props = {
  data: RainfallDataPoint[];
};

const X_SCALE = scaleTime().domain(CHART_DATE_RANGE);
const Y_SCALE = scaleLinear().domain([0, 35]);

const X_TICK_COUNT = 6;
const Y_TICK_COUNT = 10;

const CHART_FILL_STYLE = 'cross-hatch';
const STROKE_COLOR = colors.azure;
const AREA_CHART_OPTIONS = {
  fillStyle: CHART_FILL_STYLE,
  stroke: STROKE_COLOR,
} as const;

export class RainfallChart extends React.PureComponent<Props> {
  render() {
    return (
      <div className="RainfallChart">
        <ChartProvider
          xScale={X_SCALE}
          yScale={Y_SCALE}
          height={CHART_HEIGHT_PX}
          data={this.props.data}
        >
          <AreaSeries
            dataKey="rainfall"
            options={AREA_CHART_OPTIONS}
          >
            { drawTransparentDataPoint }
          </AreaSeries>
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

const getTooltip = (item: RainfallDataPoint) =>
  `Rain on ${formatDate(item.date)}: ${roundTo1Decimal(item.rainfall)} mm`;

const roundTo1Decimal = (n: number) => (Math.round(n * 10) / 10).toFixed(1);
