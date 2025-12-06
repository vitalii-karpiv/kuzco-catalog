export const BATTERY_CONDITIONS = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor',
} as const;

export type BatteryCondition =
  (typeof BATTERY_CONDITIONS)[keyof typeof BATTERY_CONDITIONS];
