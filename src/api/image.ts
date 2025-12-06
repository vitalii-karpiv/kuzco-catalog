import apiClient from './config';

export interface ImageListDtoIn {
  laptopId?: string;
  groupId?: string;
}

export interface ImageDto {
  id: string;
  s3Url: string;
}

/**
 * List images for a specific laptop or laptop group.
 * At least one identifier (laptopId or groupId) should be provided.
 */
export const listImages = async (
  params: ImageListDtoIn
): Promise<ImageDto[]> => {
  const response = await apiClient.post<ImageDto[]>('/image/list', params);
  return response.data;
};


