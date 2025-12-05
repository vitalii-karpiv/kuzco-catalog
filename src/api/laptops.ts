import apiClient from './config';
import type {
  LaptopGroupListPublicDtoIn,
  LaptopGroupListPublicDtoOut,
  LaptopGroupGetDtoOut,
  ApiError,
} from '../types/catalog';

/**
 * List laptop groups for public catalog
 * @param filters - Optional filters for laptop groups
 * @returns Promise with laptop group list
 */
export const listLaptops = async (
  filters?: LaptopGroupListPublicDtoIn
): Promise<LaptopGroupListPublicDtoOut> => {
  const response = await apiClient.post<LaptopGroupListPublicDtoOut>(
    '/laptopGroup/list/public',
    filters || {}
  );
  return response.data;
};

/**
 * Get a specific laptop group by ID
 * @param id - MongoDB ObjectId of the laptop group
 * @returns Promise with laptop group details
 * @throws ApiError if group not found
 */
export const getLaptop = async (id: string): Promise<LaptopGroupGetDtoOut> => {
  const response = await apiClient.get<LaptopGroupGetDtoOut>(
    `/laptopGroup/${id}`
  );
  return response.data;
};

// Export error type for error handling
export type { ApiError };

