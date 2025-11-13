import apiClient from './config';
import type {
  LaptopListPublicDtoIn,
  LaptopListPublicDtoOut,
  LaptopGetPublicDtoOut,
  LaptopImagesListDtoIn,
  LaptopImage,
  ApiError,
} from '../types/catalog';

/**
 * List laptops with optional filtering and pagination
 * @param filters - Optional filters and pagination parameters
 * @returns Promise with paginated laptop list
 */
export const listLaptops = async (
  filters?: LaptopListPublicDtoIn
): Promise<LaptopListPublicDtoOut> => {
  const response = await apiClient.post<LaptopListPublicDtoOut>(
    '/laptops',
    filters || {}
  );
  return response.data;
};

/**
 * Get a specific laptop by ID
 * @param id - MongoDB ObjectId of the laptop
 * @returns Promise with laptop details
 * @throws ApiError if laptop not found or not available for sale
 */
export const getLaptop = async (id: string): Promise<LaptopGetPublicDtoOut> => {
  const response = await apiClient.get<LaptopGetPublicDtoOut>(`/laptops/${id}`);
  return response.data;
};

/**
 * List all images for a specific laptop
 * @param laptopId - MongoDB ObjectId of the laptop
 * @returns Promise with array of laptop images (with signed URLs)
 */
export const listLaptopImages = async (
  laptopId: string
): Promise<LaptopImage[]> => {
  const requestBody: LaptopImagesListDtoIn = { laptopId };
  const response = await apiClient.post<LaptopImage[]>(
    '/laptops/images',
    requestBody
  );
  return response.data;
};

// Export error type for error handling
export type { ApiError };

