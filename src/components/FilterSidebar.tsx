import { useState } from 'react';
import { FilterState } from '../types/product';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  brands: string[];
  processors: string[];
  ramOptions: string[];
  storageOptions: string[];
}

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  brands, 
  processors, 
  ramOptions, 
  storageOptions 
}: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      priceRange: [0, 5000],
      brands: [],
      ram: [],
      storage: [],
      processors: [],
      searchQuery: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand)
    }));
  };

  const handleSpecChange = (type: 'ram' | 'storage' | 'processors', value: string, checked: boolean) => {
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
        fixed lg:relative top-0 left-0 h-full w-80 bg-white/30 backdrop-blur-md border-r border-white/40 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={localFilters.searchQuery}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search laptops..."
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={localFilters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Brands */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Brands</label>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.brands.includes(brand)}
                      onChange={(e) => handleBrandChange(brand, e.target.checked)}
                      className="rounded border-white/30 text-blue-600 focus:ring-blue-500/50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* RAM */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">RAM</label>
              <div className="space-y-2">
                {ramOptions.map(ram => (
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
              <label className="block text-sm font-medium text-gray-700 mb-3">Storage</label>
              <div className="space-y-2">
                {storageOptions.map(storage => (
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

            {/* Processors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Processors</label>
              <div className="space-y-2">
                {processors.map(processor => (
                  <label key={processor} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.processors.includes(processor)}
                      onChange={(e) => handleSpecChange('processors', processor, e.target.checked)}
                      className="rounded border-white/30 text-blue-600 focus:ring-blue-500/50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{processor}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-8">
            <button
              onClick={handleApplyFilters}
              className="flex-1 glass-button py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Apply Filters
            </button>
            <button
              onClick={handleResetFilters}
              className="flex-1 glass-button py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
