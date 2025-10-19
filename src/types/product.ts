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
  };
  category: string;
  tags: string[];
  inStock: boolean;
}

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  ram: string[];
  storage: string[];
  processors: string[];
  searchQuery: string;
}
