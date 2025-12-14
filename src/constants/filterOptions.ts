/**
 * Predefined filter options for the catalog
 */

export const RAM_OPTIONS = ['4GB', '8GB', '16GB', '24GB', '32GB'] as const;

export const STORAGE_OPTIONS = [
  '128GB SSD',
  '256GB SSD',
  '512GB SSD',
  '1TB SSD',
  '2TB SSD',
] as const;

export const SCREEN_SIZE_OPTIONS = [
  '13"',
  '13.3"',
  '14"',
  '15"',
  '15.6"',
  '16"',
  '17"',
  '17.3"',
] as const;

export const RESOLUTION = {
  HD: "hd",
  FHD: "fhd",
  QHD: "qhd", // 2k
  UHD: "uhd", // 4k
} as const;

export type RESOLUTION = typeof RESOLUTION[keyof typeof RESOLUTION];

// Get user-friendly label for resolution
export const getResolutionLabel = (resolution: RESOLUTION): string => {
  const labels: Record<RESOLUTION, string> = {
    [RESOLUTION.HD]: 'HD (1366x768)',
    [RESOLUTION.FHD]: 'FHD (1920x1080)',
    [RESOLUTION.QHD]: 'QHD / 2K (2560x1440)',
    [RESOLUTION.UHD]: 'UHD / 4K (3840x2160)',
  };
  return labels[resolution];
};

export const RESOLUTION_OPTIONS = [
  RESOLUTION.HD,
  RESOLUTION.FHD,
  RESOLUTION.QHD,
  RESOLUTION.UHD,
] as const;

export const PANEL_TYPE_OPTIONS = ['TN', 'IPS', 'OLED'] as const;

export type RAMOption = typeof RAM_OPTIONS[number];
export type StorageOption = typeof STORAGE_OPTIONS[number];
export type ScreenSizeOption = typeof SCREEN_SIZE_OPTIONS[number];
export type ResolutionOption = RESOLUTION;
export type PanelTypeOption = typeof PANEL_TYPE_OPTIONS[number];

