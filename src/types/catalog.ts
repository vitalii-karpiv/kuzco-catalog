// Catalog API Types based on catalog.md

export type PanelType = "tn" | "ips" | "oled";

export interface LaptopListPublicDtoIn {
  name?: string;
  brand?: string;
  model?: string;
  screenSize?: number;
  panelType?: PanelType;
  ssd?: number;
  ram?: number;
  touch?: boolean;
  discrete?: boolean;
  keyLight?: boolean;
  sorters?: Record<string, 1 | -1>;
  pageIndex?: number;
  pageSize?: number;
}

export interface LaptopCharacteristics {
  processor: string;
  videocard: string;
  discrete: boolean;
  ssd: number;
  ram: number;
  ports: string[];
  screenSize: number;
  resolution: string;
  panelType: string;
  refreshRate: string;
  touch: boolean;
  keyLight: boolean;
  battery: number;
}

export interface Marketplace {
  name: string;
}

export interface LaptopPublicProjection {
  _id: string;
  code: string;
  name: string;
  brand: string;
  model: string;
  submodel: string;
  sellPrice: number;
  photoUri: string;
  characteristics: LaptopCharacteristics;
  defects: string[];
  marketplaces: Marketplace[];
}

export interface PageInfo {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface LaptopListPublicDtoOut {
  itemList: LaptopPublicProjection[];
  pageInfo: PageInfo;
}

export interface LaptopGetPublicDtoOut extends LaptopPublicProjection {}

export interface LaptopImagesListDtoIn {
  laptopId: string;
}

export interface LaptopImage {
  id: string;
  s3Url: string;
  signedUrl: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  paramMap?: Record<string, unknown>;
}

