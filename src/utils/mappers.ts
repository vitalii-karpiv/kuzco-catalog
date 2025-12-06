import type {
  LaptopGroupListItem,
  LaptopGroupGetDtoOut,
  LaptopGroupListVariant,
  LaptopGroupDetailVariant,
} from '../types/laptop-group';
import type { Product, ProductVariant } from '../types/product';
import type { BatteryCondition } from '../constants/batteryCondition';
import type { LaptopCondition } from '../constants/laptopCondition';

const BATTERY_VALUES: BatteryCondition[] = [
  'excellent',
  'good',
  'fair',
  'poor',
];

const CONDITION_VALUES: LaptopCondition[] = ['A+', 'A', 'B', 'C'];

const normalizeBattery = (
  battery?: string
): BatteryCondition | undefined => {
  if (!battery) return undefined;
  const value = battery.toLowerCase() as BatteryCondition;
  return BATTERY_VALUES.includes(value) ? value : undefined;
};

const normalizeCondition = (
  condition?: string
): LaptopCondition | undefined => {
  if (!condition) return undefined;
  const value = condition.toUpperCase() as LaptopCondition;
  return CONDITION_VALUES.includes(value) ? value : undefined;
};

const isListVariant = (
  variant: LaptopGroupListVariant | LaptopGroupDetailVariant
): variant is LaptopGroupListVariant => {
  return (variant as LaptopGroupListVariant).identifier !== undefined;
};

const mapVariantToProductVariant = (
  variant: LaptopGroupListVariant | LaptopGroupDetailVariant,
  parentItemList?: string[]
): ProductVariant => {
  const identifier = isListVariant(variant)
    ? variant.identifier
    : variant.laptopId;

  const itemList = isListVariant(variant)
    ? variant.itemList
    : parentItemList || [];

  const battery = isListVariant(variant)
    ? normalizeBattery(variant.battery)
    : undefined;

  const condition = isListVariant(variant)
    ? normalizeCondition(variant.condition)
    : undefined;

  return {
    identifier,
    ram: variant.ram,
    ssd: variant.ssd,
    touch: variant.touch,
    battery,
    condition,
    price: variant.price,
    itemList,
  };
};

/**
 * Maps laptop group data (list or detail) to Product type used by components
 */
export const mapLaptopToProduct = (
  laptop: LaptopGroupListItem | LaptopGroupGetDtoOut
): Product => {
  const screenSize = laptop.screenSize;
  const resolution = laptop.resolution;
  const panelType = laptop.panelType;

  const variants: ProductVariant[] =
    laptop.variants?.map((variant) =>
      mapVariantToProductVariant(
        variant as LaptopGroupListVariant | LaptopGroupDetailVariant,
        (laptop as LaptopGroupGetDtoOut).itemList
      )
    ) ?? [];

  const prices = variants
    .map((v) => v.price || 0)
    .filter((p) => p > 0);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;

  const displayParts: string[] = [];
  if (screenSize) displayParts.push(`${screenSize}"`);
  if (resolution) displayParts.push(resolution.toUpperCase());
  if (panelType) displayParts.push(panelType.toUpperCase());
  const display =
    displayParts.length > 0 ? displayParts.join(' ') : 'N/A';

  const images: string[] = [];
  if (laptop.imageUrl) {
    const imageUrlStr = String(laptop.imageUrl).trim();
    if (
      imageUrlStr !== '' &&
      imageUrlStr !== 'null' &&
      imageUrlStr !== 'undefined'
    ) {
      images.push(imageUrlStr);
    }
  }

  const name =
    (laptop as LaptopGroupListItem).title ||
    laptop.groupName ||
    'Unnamed Laptop Group';

  const description =
    laptop.groupDescription ||
    (laptop).note ||
    '';

  return {
    id: laptop._id,
    name,
    description,
    price: lowestPrice,
    images,
    processor: laptop.processor,
    videocard: laptop.videocard,
    display,
    variants,
  };
};
