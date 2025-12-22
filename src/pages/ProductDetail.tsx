import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductGallery from '../components/ProductGallery';
import { getLaptop, listImages, createSalePublic } from '../api';
import { mapLaptopToProduct } from '../utils/mappers';
import type { Product, ProductVariant } from '../types/product';
import VariantSelector from '../components/detail/VariantSelector';
import TechnicalSpecs from '../components/detail/TechnicalSpecs';
import OrderModal from '../components/OrderModal';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProduct = async () => {
      if (!id) {
        setError('Невірний ідентифікатор товару');
        setSelectedVariant(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch laptop group details
        const laptopGroup = await getLaptop(id);
        
        if (isCancelled) return;

        const mappedProduct = mapLaptopToProduct(laptopGroup);

        if (!isCancelled) {
          setProduct(mappedProduct);
          setGalleryImages(mappedProduct.images);

          // Set default selected variant (cheapest or first)
          const variants = mappedProduct.variants || [];
          if (variants.length > 0) {
            const sortedByPrice = [...variants].sort((a, b) => {
              const priceA = a.price ?? Number.MAX_SAFE_INTEGER;
              const priceB = b.price ?? Number.MAX_SAFE_INTEGER;
              return priceA - priceB;
            });
            setSelectedVariant(sortedByPrice[0]);
          } else {
            setSelectedVariant(null);
          }
        }

        // Lazily load the rest of images for the current product by groupId
        const loadAdditionalImages = async () => {
          try {
            const images = await listImages({ groupId: laptopGroup._id });

            if (isCancelled || !images || images.length === 0) {
              return;
            }

            const cleanedUrls = images
              .map((img) => String(img.s3Url).trim())
              .filter(
                (url) =>
                  url !== '' &&
                  url !== 'null' &&
                  url !== 'undefined'
              );

            if (cleanedUrls.length === 0) {
              return;
            }

            setGalleryImages((prev) => {
              const existing = new Set(prev);
              cleanedUrls.forEach((url) => {
                if (!existing.has(url)) {
                  existing.add(url);
                }
              });
              return Array.from(existing);
            });
          } catch (imageError) {
            console.error('Error loading additional images for laptop group:', imageError);
          }
        };

        void loadAdditionalImages();
      } catch (err: unknown) {
        if (!isCancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Не вдалося завантажити ноутбук';
          setError(errorMessage);
          setSelectedVariant(null);
          console.error('Error fetching laptop:', err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження деталей ноутбука...</p>
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
            {error ? 'Помилка завантаження ноутбука' : 'Товар не знайдено'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Ноутбук, який ви шукаєте, не існує."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="glass-button px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Повернутися до каталогу
          </button>
        </div>
      </div>
    );
  }

  const handleOrderClick = () => {
    setOrderError(null);
    setIsOrderModalOpen(true);
  };

  const handleSubmitOrder = async (data: { phone: string; pib: string }) => {
    if (!selectedVariant) {
      setOrderError('Будь ласка, оберіть конфігурацію перед замовленням.');
      return;
    }

    try {
      setIsSubmittingOrder(true);
      setOrderError(null);

      await createSalePublic({
        laptopId: selectedVariant.itemList[0],
        phone: "+38" + data.phone,
        pib: data.pib,
      });

      setIsOrderModalOpen(false);
      navigate('/', { state: { orderCreated: true } });
    } catch (saleError: unknown) {
      console.error('Failed to create sale:', saleError);
      const message =
        typeof saleError === 'object' && saleError !== null && 'message' in saleError
          ? String((saleError as { message?: unknown }).message)
          : 'Не вдалося створити замовлення. Спробуйте ще раз пізніше.';
      setOrderError(message);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#903C5F] via-[#4E5CA3] to-[#1B8CCB] border-b border-white/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 glass-button px-4 py-2 text-sm font-medium text-white hover:text-gray-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <img src="/logo.png" alt="Kuzco Logo" className="h-10 w-auto" />
            </button>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={galleryImages} productName={product.name} />
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">💻 {product.name}</h1>
              </div>

              {product.description && <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>}
            </div>

            {/* Technical Specifications */}
            <TechnicalSpecs product={product} />

            {/* Variants Table */}
            {product.variants && product.variants.length > 0 && (
              <VariantSelector
                variants={product.variants}
                selectedVariantId={selectedVariant?.identifier}
                onSelect={(variant) => setSelectedVariant(variant)}
              />
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                onClick={handleOrderClick}
              >
                Замовити -{' '}
                {(selectedVariant?.price ?? product.price).toLocaleString()} грн
              </button>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          if (!isSubmittingOrder) {
            setIsOrderModalOpen(false);
            setOrderError(null);
          }
        }}
        onSubmit={handleSubmitOrder}
        isSubmitting={isSubmittingOrder}
        errorMessage={orderError}
      />
    </div>
  );
};

export default ProductDetail;
