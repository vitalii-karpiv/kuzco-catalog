import type { LaptopPublicProjection, LaptopImage } from '../types/catalog';
import type { Product } from '../types/product';

/**
 * Maps API laptop data to Product type used by components
 */
export const mapLaptopToProduct = (
  laptop: LaptopPublicProjection,
  images?: string[]
): Product => {
  const chars = laptop.characteristics || {};
  const panelType = chars.panelType || '';
  const screenSize = chars.screenSize || 0;
  const resolution = chars.resolution || 'N/A';
  const processor = chars.processor || 'N/A';
  const videocard = chars.videocard || 'N/A';
  const ram = chars.ram || 0;
  const ssd = chars.ssd || 0;
  const battery = chars.battery || 0;

  // Build display string safely
  const displayParts = [];
  if (screenSize) displayParts.push(`${screenSize}"`);
  if (resolution && resolution !== 'N/A') displayParts.push(resolution);
  if (panelType) displayParts.push(panelType.toUpperCase());
  const display = displayParts.length > 0 ? displayParts.join(' ') : 'N/A';

  return {
    id: laptop._id,
    name: laptop.name || 'Unnamed Laptop',
    brand: laptop.brand || 'Unknown',
    price: laptop.sellPrice || 0,
    images: images && images.length > 0 
      ? images 
      : laptop.photoUri 
        ? [laptop.photoUri] 
        : [],
    description: `${laptop.brand || 'Unknown'} ${laptop.model || ''} ${laptop.submodel || ''} - ${processor} with ${videocard}`.trim(),
    specs: {
      processor: processor,
      ram: `${ram}GB`,
      storage: `${ssd}GB SSD`,
      display: display,
      graphics: videocard,
      battery: battery > 0 ? `${battery}Wh` : 'N/A',
      weight: 'N/A',
      os: 'N/A',
    },
    category: chars.discrete ? 'Gaming' : 'Professional',
    tags: [
      laptop.brand,
      chars.discrete ? 'Discrete Graphics' : 'Integrated Graphics',
      chars.touch ? 'Touchscreen' : '',
      chars.keyLight ? 'Backlit Keyboard' : '',
      panelType ? panelType.toUpperCase() : '',
    ].filter(Boolean),
    inStock: true, // All laptops from API are in SELLING state, so they're in stock
  };
};

/**
 * Maps laptop images from API to array of image URLs
 */
export const mapLaptopImages = (images: LaptopImage[]): string[] => {
  return images.map(img => img.signedUrl);
};

