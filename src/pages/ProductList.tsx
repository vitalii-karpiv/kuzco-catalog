import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { mockProducts } from '../data/mockProducts';
import { FilterState } from '../types/product';

const ProductList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    brands: [],
    ram: [],
    storage: [],
    processors: [],
    searchQuery: ''
  });

  // Extract unique values for filters
  const brands = useMemo(() => [...new Set(mockProducts.map(p => p.brand))], []);
  const processors = useMemo(() => [...new Set(mockProducts.map(p => p.specs.processor))], []);
  const ramOptions = useMemo(() => [...new Set(mockProducts.map(p => p.specs.ram))], []);
  const storageOptions = useMemo(() => [...new Set(mockProducts.map(p => p.specs.storage))], []);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!product.name.toLowerCase().includes(query) && 
            !product.brand.toLowerCase().includes(query) &&
            !product.description.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // RAM filter
      if (filters.ram.length > 0 && !filters.ram.includes(product.specs.ram)) {
        return false;
      }

      // Storage filter
      if (filters.storage.length > 0 && !filters.storage.includes(product.specs.storage)) {
        return false;
      }

      // Processor filter
      if (filters.processors.length > 0 && !filters.processors.includes(product.specs.processor)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const activeFiltersCount = filters.brands.length + filters.ram.length + filters.storage.length + filters.processors.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-white/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Kuzco Laptop Catalog</h1>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
          brands={brands}
          processors={processors}
          ramOptions={ramOptions}
          storageOptions={storageOptions}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Results Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {filteredProducts.length} laptop{filteredProducts.length !== 1 ? 's' : ''} found
              </h2>
              
              {/* Desktop Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="hidden lg:flex glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No laptops found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => setFilters({
                    priceRange: [0, 5000],
                    brands: [],
                    ram: [],
                    storage: [],
                    processors: [],
                    searchQuery: ''
                  })}
                  className="glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
