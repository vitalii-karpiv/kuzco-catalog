import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 16" M3 Max',
    brand: 'Apple',
    price: 3499,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop'
    ],
    description: 'The most powerful MacBook Pro ever with the M3 Max chip. Featuring a stunning 16-inch Liquid Retina XDR display, incredible performance, and all-day battery life.',
    specs: {
      processor: 'Apple M3 Max (12-core CPU, 30-core GPU)',
      ram: '32GB',
      storage: '1TB SSD',
      display: '16.2" Liquid Retina XDR (3456×2234)',
      graphics: '30-core GPU',
      battery: 'Up to 22 hours',
      weight: '2.15 kg',
      os: 'macOS Sonoma'
    },
    category: 'Professional',
    tags: ['Apple', 'M3', 'Professional', 'Creative'],
    inStock: true
  },
  {
    id: '2',
    name: 'Dell XPS 15',
    brand: 'Dell',
    price: 1899,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'
    ],
    description: 'Premium Windows laptop with stunning 15.6-inch 4K display, powerful Intel processor, and sleek design. Perfect for professionals and content creators.',
    specs: {
      processor: 'Intel Core i7-13700H (14-core)',
      ram: '16GB',
      storage: '512GB SSD',
      display: '15.6" 4K UHD+ (3840×2400)',
      graphics: 'NVIDIA GeForce RTX 4050',
      battery: 'Up to 12 hours',
      weight: '1.85 kg',
      os: 'Windows 11 Pro'
    },
    category: 'Professional',
    tags: ['Dell', 'Intel', '4K', 'Windows'],
    inStock: true
  },
  {
    id: '3',
    name: 'Surface Laptop 5',
    brand: 'Microsoft',
    price: 1299,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop'
    ],
    description: 'Elegant and powerful Windows laptop with premium build quality, excellent keyboard, and vibrant touchscreen display.',
    specs: {
      processor: 'Intel Core i5-1235U (10-core)',
      ram: '8GB',
      storage: '256GB SSD',
      display: '13.5" PixelSense (2256×1504)',
      graphics: 'Intel Iris Xe',
      battery: 'Up to 18 hours',
      weight: '1.25 kg',
      os: 'Windows 11 Home'
    },
    category: 'Business',
    tags: ['Microsoft', 'Intel', 'Touchscreen', 'Premium'],
    inStock: true
  },
  {
    id: '4',
    name: 'ThinkPad X1 Carbon',
    brand: 'Lenovo',
    price: 2199,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop'
    ],
    description: 'Ultra-lightweight business laptop with legendary ThinkPad durability, excellent keyboard, and enterprise-grade security features.',
    specs: {
      processor: 'Intel Core i7-1365U (10-core)',
      ram: '16GB',
      storage: '512GB SSD',
      display: '14" WUXGA (1920×1200)',
      graphics: 'Intel Iris Xe',
      battery: 'Up to 15 hours',
      weight: '1.12 kg',
      os: 'Windows 11 Pro'
    },
    category: 'Business',
    tags: ['Lenovo', 'ThinkPad', 'Business', 'Lightweight'],
    inStock: true
  },
  {
    id: '5',
    name: 'MacBook Air M2',
    brand: 'Apple',
    price: 1199,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'
    ],
    description: 'Incredibly thin and light laptop with the M2 chip. Features a beautiful 13.6-inch Liquid Retina display and all-day battery life.',
    specs: {
      processor: 'Apple M2 (8-core CPU, 8-core GPU)',
      ram: '8GB',
      storage: '256GB SSD',
      display: '13.6" Liquid Retina (2560×1664)',
      graphics: '8-core GPU',
      battery: 'Up to 18 hours',
      weight: '1.24 kg',
      os: 'macOS Sonoma'
    },
    category: 'Consumer',
    tags: ['Apple', 'M2', 'Lightweight', 'Portable'],
    inStock: true
  },
  {
    id: '6',
    name: 'ROG Zephyrus G14',
    brand: 'ASUS',
    price: 1599,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop'
    ],
    description: 'Gaming laptop that doesn\'t compromise on portability. Features AMD Ryzen processor and NVIDIA RTX graphics in a compact 14-inch form factor.',
    specs: {
      processor: 'AMD Ryzen 7 7735HS (8-core)',
      ram: '16GB',
      storage: '1TB SSD',
      display: '14" QHD (2560×1440) 165Hz',
      graphics: 'NVIDIA GeForce RTX 4060',
      battery: 'Up to 8 hours',
      weight: '1.65 kg',
      os: 'Windows 11 Home'
    },
    category: 'Gaming',
    tags: ['ASUS', 'Gaming', 'AMD', 'RTX'],
    inStock: true
  },
  {
    id: '7',
    name: 'HP Spectre x360',
    brand: 'HP',
    price: 1399,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop'
    ],
    description: 'Versatile 2-in-1 laptop with 360-degree hinge, stunning 13.5-inch OLED display, and premium build quality.',
    specs: {
      processor: 'Intel Core i7-1255U (10-core)',
      ram: '16GB',
      storage: '512GB SSD',
      display: '13.5" OLED (3000×2000)',
      graphics: 'Intel Iris Xe',
      battery: 'Up to 16 hours',
      weight: '1.27 kg',
      os: 'Windows 11 Home'
    },
    category: '2-in-1',
    tags: ['HP', '2-in-1', 'OLED', 'Convertible'],
    inStock: true
  },
  {
    id: '8',
    name: 'Framework Laptop 13',
    brand: 'Framework',
    price: 1049,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'
    ],
    description: 'Modular, repairable laptop designed for longevity. Easy to upgrade and repair with a focus on sustainability.',
    specs: {
      processor: 'Intel Core i5-1240P (12-core)',
      ram: '8GB',
      storage: '256GB SSD',
      display: '13.5" (2256×1504)',
      graphics: 'Intel Iris Xe',
      battery: 'Up to 10 hours',
      weight: '1.3 kg',
      os: 'Windows 11 Home'
    },
    category: 'Consumer',
    tags: ['Framework', 'Modular', 'Repairable', 'Sustainable'],
    inStock: true
  },
  {
    id: '9',
    name: 'Razer Blade 15',
    brand: 'Razer',
    price: 2499,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop'
    ],
    description: 'Premium gaming laptop with desktop-class performance, stunning 15.6-inch QHD display, and RGB lighting.',
    specs: {
      processor: 'Intel Core i7-13700H (14-core)',
      ram: '32GB',
      storage: '1TB SSD',
      display: '15.6" QHD (2560×1440) 240Hz',
      graphics: 'NVIDIA GeForce RTX 4070',
      battery: 'Up to 6 hours',
      weight: '2.01 kg',
      os: 'Windows 11 Home'
    },
    category: 'Gaming',
    tags: ['Razer', 'Gaming', 'High-end', 'RGB'],
    inStock: true
  },
  {
    id: '10',
    name: 'LG Gram 17',
    brand: 'LG',
    price: 1199,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop'
    ],
    description: 'Ultra-lightweight 17-inch laptop with massive screen real estate and all-day battery life. Perfect for productivity.',
    specs: {
      processor: 'Intel Core i5-1235U (10-core)',
      ram: '16GB',
      storage: '512GB SSD',
      display: '17" WQXGA (2560×1600)',
      graphics: 'Intel Iris Xe',
      battery: 'Up to 20 hours',
      weight: '1.35 kg',
      os: 'Windows 11 Home'
    },
    category: 'Productivity',
    tags: ['LG', 'Large Screen', 'Lightweight', 'Productivity'],
    inStock: true
  }
];
