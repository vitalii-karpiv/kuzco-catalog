import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { FilterState } from '../types/product';
import { listLaptops } from '../api/laptops';
import { mapLaptopToProduct } from '../utils/mappers';
import type { Product } from '../types/product';
import type { LaptopListPublicDtoIn } from '../types/catalog';

const ProductList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    brands: [],
    ram: [],
    storage: [],
    processors: [],
    searchQuery: ''
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;

  // Extract unique values for filters from loaded products
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);
  const processors = useMemo(() => [...new Set(products.map(p => p.specs.processor))], [products]);
  const ramOptions = useMemo(() => [...new Set(products.map(p => p.specs.ram))], [products]);
  const storageOptions = useMemo(() => [...new Set(products.map(p => p.specs.storage))], [products]);

  // Convert FilterState to API filters
  const apiFilters = useMemo((): LaptopListPublicDtoIn => {
    const apiFilter: LaptopListPublicDtoIn = {
      pageIndex: currentPage,
      pageSize: pageSize,
      sorters: { sellPrice: 1 },
    };

    if (filters.searchQuery) {
      apiFilter.name = filters.searchQuery;
    }

    if (filters.brands.length > 0) {
      // Use first brand for now (API supports single brand filter)
      apiFilter.brand = filters.brands[0];
    }

    if (filters.ram.length > 0) {
      // Extract numeric value from "16GB" format
      const ramValue = parseInt(filters.ram[0].replace('GB', ''));
      if (!isNaN(ramValue)) {
        apiFilter.ram = ramValue;
      }
    }

    if (filters.storage.length > 0) {
      // Extract numeric value from "512GB SSD" format
      const storageValue = parseInt(filters.storage[0].replace('GB SSD', '').replace('GB', ''));
      if (!isNaN(storageValue)) {
        apiFilter.ssd = storageValue;
      }
    }

    // Note: Price range filtering would need to be done client-side or via API if supported
    // Processor filtering would need to be done via name search or client-side

    return apiFilter;
  }, [filters, currentPage]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await listLaptops(apiFilters);
        const mappedProducts = response.itemList.map(laptop => mapLaptopToProduct(laptop));
        
        // Apply client-side filters that aren't supported by API
        let filtered = mappedProducts;
        
        // Price range filter (client-side)
        filtered = filtered.filter(product => 
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        // Multiple brand filter (client-side)
        if (filters.brands.length > 1) {
          filtered = filtered.filter(product => filters.brands.includes(product.brand));
        }

        // Multiple RAM filter (client-side)
        if (filters.ram.length > 1) {
          filtered = filtered.filter(product => filters.ram.includes(product.specs.ram));
        }

        // Multiple storage filter (client-side)
        if (filters.storage.length > 1) {
          filtered = filtered.filter(product => filters.storage.includes(product.specs.storage));
        }

        // Processor filter (client-side)
        if (filters.processors.length > 0) {
          filtered = filtered.filter(product => 
            filters.processors.includes(product.specs.processor)
          );
        }

        setProducts(filtered);
        setTotalCount(response.pageInfo.totalCount);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load laptops';
        setError(errorMessage);
        console.error('Error fetching laptops:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiFilters, filters]);

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
                {loading ? 'Loading...' : `${products.length} laptop${products.length !== 1 ? 's' : ''} found`}
                {totalCount > 0 && ` (${totalCount} total)`}
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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading laptops...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Laptops</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No laptops found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 10000],
                      brands: [],
                      ram: [],
                      storage: [],
                      processors: [],
                      searchQuery: ''
                    });
                    setCurrentPage(0);
                  }}
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
