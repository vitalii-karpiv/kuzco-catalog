import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductGallery from '../components/ProductGallery';
import { getLaptop, listLaptopImages } from '../api/laptops';
import { mapLaptopToProduct, mapLaptopImages } from '../utils/mappers';
import type { Product } from '../types/product';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch laptop details
        const laptop = await getLaptop(id);
        
        // Fetch laptop images
        let images: string[] = [];
        try {
          const laptopImages = await listLaptopImages(id);
          images = mapLaptopImages(laptopImages);
        } catch (imgError) {
          console.warn('Failed to load images, using default photo:', imgError);
          // Fallback to photoUri if images endpoint fails
          if (laptop.photoUri) {
            images = [laptop.photoUri];
          }
        }

        const mappedProduct = mapLaptopToProduct(laptop, images.length > 0 ? images : undefined);
        setProduct(mappedProduct);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load laptop';
        setError(errorMessage);
        console.error('Error fetching laptop:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading laptop details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md mx-auto">
          <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error ? 'Error Loading Laptop' : 'Product Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The laptop you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="glass-button px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-white/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Catalog</span>
            </button>
            
            <h1 className="text-xl font-semibold text-gray-800">{product.name}</h1>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                  <p className="text-lg text-gray-600">{product.brand}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800">${product.price.toLocaleString()}</div>
                  <div className="flex items-center mt-2">
                    {product.inStock ? (
                      <span className="bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Technical Specifications */}
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Specifications</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span className="font-medium text-gray-700">Processor</span>
                  <span className="text-gray-600">{product.specs.processor}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span className="font-medium text-gray-700">Memory (RAM)</span>
                  <span className="text-gray-600">{product.specs.ram}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span className="font-medium text-gray-700">Storage</span>
                  <span className="text-gray-600">{product.specs.storage}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span className="font-medium text-gray-700">Display</span>
                  <span className="text-gray-600">{product.specs.display}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span className="font-medium text-gray-700">Graphics</span>
                  <span className="text-gray-600">{product.specs.graphics}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span className="font-medium text-gray-700">Battery Life</span>
                  <span className="text-gray-600">{product.specs.battery}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span className="font-medium text-gray-700">Weight</span>
                  <span className="text-gray-600">{product.specs.weight}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Operating System</span>
                  <span className="text-gray-600">{product.specs.os}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                Add to Cart - ${product.price.toLocaleString()}
              </button>
              <button className="glass-button px-6 py-4 font-semibold text-gray-700 hover:text-gray-900">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
