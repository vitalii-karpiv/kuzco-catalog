import type {
  LaptopGroupListItem,
  LaptopGroupGetDtoOut,
  LaptopImage,
} from '../types/catalog';
import type { Product } from '../types/product';

/**
 * Maps laptop group data (list or detail) to Product type used by components
 */
export const mapLaptopToProduct = (
  laptop: LaptopGroupListItem | LaptopGroupGetDtoOut,
  images?: string[]
): Product => {
  const screenSize = laptop.screenSize || 0;
  const resolution = laptop.resolution || 'N/A';
  const panelType = laptop.panelType || '';
  const processor = laptop.processor || 'N/A';
  const videocard = laptop.videocard || 'N/A';

  // Use first variant as primary one for price/specs
  const primaryVariant =
    laptop.variants && laptop.variants.length > 0 ? laptop.variants[0] : undefined;

  const ram = primaryVariant?.ram ?? 0;
  const ssd = primaryVariant?.ssd ?? 0;
  const battery = (primaryVariant as any)?.battery ?? 0;

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
  } else if ((laptop as any).imageUrl) {
    const imageUrlStr = String((laptop as any).imageUrl).trim();
    if (
      imageUrlStr !== '' &&
      imageUrlStr !== 'null' &&
      imageUrlStr !== 'undefined'
    ) {
      finalImages = [imageUrlStr];
    } else {
      console.warn(
        'Invalid imageUrl for laptop group:',
        (laptop as any).groupName || (laptop as any).title,
        'imageUrl:',
        (laptop as any).imageUrl
      );
    }
  } else {
    console.warn(
      'Missing imageUrl for laptop group:',
      (laptop as any).groupName || (laptop as any).title,
      laptop._id
    );
  }

  return {
    id: laptop._id,
    name:
      (laptop as LaptopGroupListItem).title ||
      laptop.groupName ||
      'Unnamed Laptop Group',
    brand: 'Kuzco',
    price: primaryVariant?.price || 0,
    images: finalImages,
    description: `${
      (laptop as any).groupDescription || (laptop as any).note || 'Laptop group'
    } - ${processor} with ${videocard}`.trim(),
    specs: {
      processor: processor,
      ram: `${ram}GB`,
      storage: `${ssd}GB SSD`,
      display: display,
      graphics: videocard,
      battery: battery ? String(battery) : 'N/A',
      weight: 'N/A',
      os: 'N/A',
      screenSize: screenSize > 0 ? `${screenSize}"` : 'N/A',
      resolution: resolution && resolution !== 'N/A' ? resolution : 'N/A',
      panelType: panelType ? panelType.toUpperCase() : 'N/A',
    },
    category: laptop.discrete ? 'Gaming' : 'Professional',
    tags: [
      laptop.groupName,
      laptop.discrete ? 'Discrete Graphics' : 'Integrated Graphics',
      (primaryVariant as any)?.touch ? 'Touchscreen' : '',
      (primaryVariant as any)?.keyLight ? 'Backlit Keyboard' : '',
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

