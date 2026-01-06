import { useState, useEffect } from 'react';
import { FilterState } from '../types/product';
import {
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  SCREEN_SIZE_OPTIONS,
  RESOLUTION_OPTIONS,
  PANEL_TYPE_OPTIONS,
  RESOLUTION,
  getResolutionLabel,
} from '../constants/filterOptions';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange
}: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Sync local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      priceRange: [0, 100000],
      ram: [],
      storage: [],
      screenSize: [],
      resolution: [],
      panelType: [],
      searchQuery: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const handleSpecChange = (type: 'ram' | 'storage' | 'screenSize' | 'resolution' | 'panelType', value: string | RESOLUTION, checked: boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      [type]: checked 
        ? [...prev[type], value]
        : prev[type].filter(v => v !== value)
    }));
  };

  const handlePriceRangeChange = (index: number, value: number) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: [
        index === 0 ? value : prev.priceRange[0],
        index === 1 ? value : prev.priceRange[1]
      ]
    }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 lg:top-16 left-0 h-full lg:h-[calc(100vh-4rem)] w-80 bg-white/30 backdrop-blur-md border-r border-white/40 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex-shrink-0 p-6 pb-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Фільтри</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 pt-4">
            <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пошук</label>
              <input
                type="text"
                value={localFilters.searchQuery}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Пошук ноутбуків..."
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Діапазон цін: {localFilters.priceRange[0].toLocaleString('uk-UA')} - {localFilters.priceRange[1].toLocaleString('uk-UA')} грн
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={localFilters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* RAM */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Пам'ять (RAM)</label>
              <div className="space-y-2">
                {RAM_OPTIONS.map(ram => (
                  <label key={ram} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.ram.includes(ram)}
                      onChange={(e) => handleSpecChange('ram', ram, e.target.checked)}
                      className="rounded border-white/30 text-blue-600 focus:ring-blue-500/50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{ram}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Накопичувач</label>
              <div className="space-y-2">
                {STORAGE_OPTIONS.map(storage => (
                  <label key={storage} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.storage.includes(storage)}
                      onChange={(e) => handleSpecChange('storage', storage, e.target.checked)}
                      className="rounded border-white/30 text-blue-600 focus:ring-blue-500/50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{storage}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Screen Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Розмір екрана</label>
              <div className="space-y-2">
                {SCREEN_SIZE_OPTIONS.map(screenSize => (
                  <label key={screenSize} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.screenSize.includes(screenSize)}
                      onChange={(e) => handleSpecChange('screenSize', screenSize, e.target.checked)}
                      className="rounded border-white/30 text-blue-600 focus:ring-blue-500/50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{screenSize}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Роздільна здатність</label>
              <div className="space-y-2">
                {RESOLUTION_OPTIONS.map(resolution => (
                  <label key={resolution} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.resolution.includes(resolution)}
                      onChange={(e) => handleSpecChange('resolution', resolution, e.target.checked)}
                      className="rounded border-white/30 text-blue-600 focus:ring-blue-500/50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{getResolutionLabel(resolution)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Panel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Тип панелі</label>
              <div className="space-y-2">
                {PANEL_TYPE_OPTIONS.map(panelType => (
                  <label key={panelType} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.panelType.includes(panelType)}
                      onChange={(e) => handleSpecChange('panelType', panelType, e.target.checked)}
                      className="rounded border-white/30 text-blue-600 focus:ring-blue-500/50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{panelType}</span>
                  </label>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Buttons */}
        <div className="flex-shrink-0 p-6 pt-4 border-t border-white/20">
          <div className="flex space-x-3">
            <button
              onClick={handleApplyFilters}
              className="flex-1 glass-button py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Застосувати фільтри
            </button>
            <button
              onClick={handleResetFilters}
              className="flex-1 glass-button py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Скинути
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
