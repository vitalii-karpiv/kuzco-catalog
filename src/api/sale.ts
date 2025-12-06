import apiClient from './config';

export interface CreateSalePublicDtoIn {
  laptopId: string;
  phone: string;
  pib: string;
}

/**
 * Create a public sale request from catalog.
 * POST /sale/create/public
 */
export const createSalePublic = async (
  payload: CreateSalePublicDtoIn
): Promise<void> => {
  await apiClient.post('/sale/create/public', payload);
};


