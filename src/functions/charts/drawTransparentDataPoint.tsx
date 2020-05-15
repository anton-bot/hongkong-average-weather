import React from 'react';
import { CircleProps, Circle } from 'rough-charts'
import { DATA_POINT_DIAMETER } from '../../config/charts';

export function drawTransparentDataPoint<T>(
  item: T,
  props: CircleProps,
  index: number,
) {
  return <Circle
    x={(props.x || 0) - DATA_POINT_DIAMETER / 2}
    y={(props.y || 0) - DATA_POINT_DIAMETER / 2}
    diameter={DATA_POINT_DIAMETER}
    opacity={0.01}
    options={{
      fill: 'transparent',
    }}
  />;
}
