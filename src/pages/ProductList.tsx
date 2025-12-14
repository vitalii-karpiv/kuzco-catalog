import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { FilterState } from '../types/product';
import { listLaptops } from '../api/laptop-group';
import { mapLaptopToProduct } from '../utils/mappers';
import type { Product } from '../types/product';
import type { LaptopGroupListPublicDtoIn } from '../types/laptop-group';

const ProductList = () => {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    ram: [],
    storage: [],
    screenSize: [],
    resolution: [],
    panelType: [],
    searchQuery: ''
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const state = location.state as { orderCreated?: boolean } | null;
    if (state?.orderCreated) {
      setOrderSuccess(true);
    }
  }, [location.state]);


  // Convert FilterState to API filters
  const apiFilters = useMemo((): LaptopGroupListPublicDtoIn => {
    const apiFilter: LaptopGroupListPublicDtoIn = {};

    if (filters.searchQuery) {
      apiFilter.title = filters.searchQuery;
    }

    // Map price range to API priceFrom / priceTo
    if (filters.priceRange && filters.priceRange.length === 2) {
      apiFilter.priceFrom = filters.priceRange[0];
      apiFilter.priceTo = filters.priceRange[1];
    }

    if (filters.ram.length > 0) {
      // Extract numeric values from "16GB" format
      const ramValues = filters.ram
        .map((value) => parseInt(value.replace('GB', ''), 10))
        .filter((value) => !isNaN(value));

      if (ramValues.length > 0) {
        apiFilter.ramList = ramValues;
      }
    }

    if (filters.storage.length > 0) {
      // Extract numeric values from "512GB SSD" format
      const storageValues = filters.storage
        .map((value) =>
          parseInt(value.replace('GB SSD', '').replace('GB', ''), 10)
        )
        .filter((value) => !isNaN(value));

      if (storageValues.length > 0) {
        apiFilter.ssdList = storageValues;
      }
    }

    if (filters.screenSize.length > 0) {
      // Extract numeric values from "15.6\""" format
      const screenSizes = filters.screenSize
        .map((value) => parseFloat(value.replace('"', '')))
        .filter((value) => !isNaN(value));

      if (screenSizes.length > 0) {
        apiFilter.screenSizeList = screenSizes;
      }
    }

    if (filters.panelType.length > 0) {
      // API accepts list of panel types in lowercase (e.g. "ips")
      // Convert to lowercase for API without mutating the original filter state
      apiFilter.panelType = filters.panelType.map(panelType => panelType.toLowerCase());
    }

    if (filters.resolution.length > 0) {
      // Send resolution enum values directly to API (e.g., "hd", "fhd", "qhd", "uhd")
      apiFilter.resolutionList = filters.resolution;
    }

    return apiFilter;
  }, [filters, currentPage]);

  // Fetch products from API
  useEffect(() => {
    let isCancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await listLaptops(apiFilters);
        
        if (isCancelled) return;
        const filtered = response.itemList.map(laptop => mapLaptopToProduct(laptop));

        if (!isCancelled) {
          setProducts(filtered);
          setTotalCount(response.pageInfo.totalCount);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Не вдалося завантажити ноутбуки';
          setError(errorMessage);
          console.error('Error fetching laptops:', err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, [apiFilters, filters]);

  const activeFiltersCount = filters.ram.length + filters.storage.length + filters.screenSize.length + filters.resolution.length + filters.panelType.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#903C5F] via-[#4E5CA3] to-[#1B8CCB] border-b border-white/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Каталог ноутбуків Kuzco</h1>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden glass-button px-4 py-2 text-sm font-medium text-white hover:text-gray-100 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>Фільтри</span>
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
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Order success alert */}
          {orderSuccess && (
            <div className="mb-6">
              <div className="glass-card border border-green-200 bg-green-50/80 text-green-800 px-4 py-3 rounded-xl flex items-start justify-between space-x-4">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-green-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">Ваше замовлення прийнято</p>
                    <p className="text-sm text-green-700">
                      Наш менеджер зв&apos;яжеться з вами найближчим часом.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOrderSuccess(false)}
                  className="text-green-600 hover:text-green-800 transition-colors"
                  aria-label="Закрити сповіщення"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              {loading ? 'Завантаження...' : `${products.length} ${products.length === 1 ? 'ноутбук знайдено' : products.length < 5 ? 'ноутбуки знайдено' : 'ноутбуків знайдено'}`}
              {totalCount > 0 && ` (всього ${totalCount})`}
            </h2>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Завантаження ноутбуків...</p>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Помилка завантаження ноутбуків</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Спробувати ще раз
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ноутбуки не знайдено</h3>
                <p className="text-gray-600 mb-4">Спробуйте змінити фільтри, щоб побачити більше результатів.</p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 100000],
                      ram: [],
                      storage: [],
                      screenSize: [],
                      resolution: [],
                      panelType: [],
                      searchQuery: ''
                    });
                    setCurrentPage(0);
                  }}
                  className="glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Очистити всі фільтри
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
