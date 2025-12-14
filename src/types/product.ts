import type { BatteryCondition } from '../constants/batteryCondition';
import type { LaptopCondition } from '../constants/laptopCondition';
import type { RESOLUTION } from '../constants/filterOptions';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number; // the lowest price of the laptop's variants'
    images: string[];
    processor: string;
    videocard: string;
    display: string; // screen size + resolution + panel type
    variants: ProductVariant[]
}

export interface ProductVariant {
    identifier: string;
    ram?: number;
    ssd?: number;
    touch?: boolean;
    battery?: BatteryCondition;
    condition?: LaptopCondition;
    price?: number; // sell price of the laptop
    itemList: string[]
}

export interface FilterState {
  priceRange: [number, number];
  ram: string[];
  storage: string[];
  screenSize: string[];
  resolution: RESOLUTION[];
  panelType: string[];
  searchQuery: string;
}
