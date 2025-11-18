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

  // Determine images array: use provided images, or fallback to photoUri, or empty array
  let finalImages: string[] = [];
  if (images && images.length > 0) {
    finalImages = images;
  } else if (laptop.photoUri) {
    // Check if photoUri is a valid non-empty string
    const photoUriStr = String(laptop.photoUri).trim();
    if (photoUriStr !== '' && photoUriStr !== 'null' && photoUriStr !== 'undefined') {
      // Validate that it looks like a URL (starts with http:// or https://)
      if (photoUriStr.startsWith('http://') || photoUriStr.startsWith('https://')) {
        finalImages = [photoUriStr];
      } else {
        // If it's a relative path, try to construct full URL (though API should provide full URLs)
        console.warn('photoUri is not a full URL for laptop:', laptop.name, 'photoUri:', photoUriStr);
        // Still try to use it, might work if it's a valid relative path
        finalImages = [photoUriStr];
      }
    } else {
      // Log when photoUri exists but is invalid
      console.warn('Invalid photoUri for laptop:', laptop.name, 'photoUri:', laptop.photoUri);
    }
  } else {
    // Log when photoUri is missing
    console.warn('Missing photoUri for laptop:', laptop.name, laptop._id);
  }

  return {
    id: laptop._id,
    name: laptop.name || 'Unnamed Laptop',
    brand: laptop.brand || 'Unknown',
    price: laptop.sellPrice || 0,
    images: finalImages,
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
      screenSize: screenSize > 0 ? `${screenSize}"` : 'N/A',
      resolution: resolution && resolution !== 'N/A' ? resolution : 'N/A',
      panelType: panelType ? panelType.toUpperCase() : 'N/A',
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

