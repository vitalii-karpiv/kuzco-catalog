export const LAPTOP_CONDITIONS = {
  A_PLUS: 'A+',
  A: 'A',
  B: 'B',
  C: 'C',
} as const;

export type LaptopCondition =
  (typeof LAPTOP_CONDITIONS)[keyof typeof LAPTOP_CONDITIONS];
