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

// =========================
// Laptop Group (Public API)
// =========================

// Request body for POST /laptopGroup/list/public
export interface LaptopGroupListPublicDtoIn {
  title?: string;
  priceFrom?: number;
  priceTo?: number;
  ramList?: number[];
  ssdList?: number[];
  screenSizeList?: number[];
  resolutionList?: string[];
  panelType?: string[]; // e.g. ["IPS", "OLED"]
}

// Variant info in list response
export interface LaptopGroupListVariant {
  identifier: string;
  ram: number;
  ssd: number;
  touch: boolean;
  battery: string;
  condition: string;
  price: number;
  itemList: string[];
}

// Item in list response
export interface LaptopGroupListItem {
  _id: string;
  groupIdentifier: string;
  groupName: string;
  title: string;
  groupDescription: string;
  imageUrl: string;
  processor: string;
  videocard: string;
  discrete: boolean;
  isTransformer: boolean;
  screenSize: number;
  resolution: string;
  panelType: string;
  refreshRate: string;
  variants: LaptopGroupListVariant[];
  note?: string;
}

export interface LaptopGroupListPublicDtoOut {
  itemList: LaptopGroupListItem[];
  pageInfo: PageInfo;
}

// Variant info in GET /laptopGroup/:id response
export interface LaptopGroupDetailVariant {
  laptopId: string;
  ram: number;
  ssd: number;
  touch: boolean;
  keyLight: boolean;
  price: number;
}

// Response for GET /laptopGroup/:id
export interface LaptopGroupGetDtoOut {
  _id: string;
  groupIdentifier: string;
  groupName: string;
  groupDescription: string;
  imageUrl: string;
  processor: string;
  videocard: string;
  discrete: boolean;
  screenSize: number;
  resolution: string;
  panelType: string;
  refreshRate: string;
  variants: LaptopGroupDetailVariant[];
  itemList: string[];
  note?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  paramMap?: Record<string, unknown>;
}

