export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
    battery: string;
    weight: string;
    os: string;
    screenSize: string;
    resolution: string;
    panelType: string;
  };
  category: string;
  tags: string[];
  inStock: boolean;
}

export interface FilterState {
  priceRange: [number, number];
  ram: string[];
  storage: string[];
  screenSize: string[];
  resolution: string[];
  panelType: string[];
  searchQuery: string;
}
