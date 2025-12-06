import type { ProductVariant } from '../types/product';

export const isTouchUnique = (variants: ProductVariant[]): boolean => {
  const uniqueTouchValues = new Set(variants.map((v) => v.touch));
  return uniqueTouchValues.size > 1;
};

export const isBatteryUnique = (variants: ProductVariant[]): boolean => {
  const uniqueBatteryValues = new Set(variants.map((v) => v.battery));
  return uniqueBatteryValues.size > 1;
};

export const isConditionUnique = (variants: ProductVariant[]): boolean => {
  const uniqueConditionValues = new Set(variants.map((v) => v.condition));
  return uniqueConditionValues.size > 1;
};


