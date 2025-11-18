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

export const RESOLUTION_OPTIONS = [
  '1366x768',
  '1920x1080',
  '1920x1200',
  '2560x1440',
  '2560x1600',
  '2880x1800',
  '3840x2160',
] as const;

export const PANEL_TYPE_OPTIONS = ['TN', 'IPS', 'OLED'] as const;

export type RAMOption = typeof RAM_OPTIONS[number];
export type StorageOption = typeof STORAGE_OPTIONS[number];
export type ScreenSizeOption = typeof SCREEN_SIZE_OPTIONS[number];
export type ResolutionOption = typeof RESOLUTION_OPTIONS[number];
export type PanelTypeOption = typeof PANEL_TYPE_OPTIONS[number];

