// Catalog API Types based on catalog.md

export type PanelType = "tn" | "ips" | "oled";

export interface PageInfo {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
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

