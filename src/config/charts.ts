export const CHART_DATE_RANGE = [
  new Date(2000, 0, 15), // Could not figure out why, but X-axis gets shifted weirdly otherwise
  new Date(2000, 12, 31),
];

export const CHART_HEIGHT_PX = 500;

// hovering over data point produces a tooltip, so it should be large enough:
export const DATA_POINT_DIAMETER = 25;
