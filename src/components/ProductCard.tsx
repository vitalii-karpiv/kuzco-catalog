import { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const ramOptions = Array.from(
    new Set(
      (product.variants || [])
        .map((v) => v.ram)
        .filter((v): v is number => typeof v === 'number')
    )
  )
    .sort((a, b) => a - b)
    .map((v) => `${v} GB`)
    .join(', ');

  const storageOptions = Array.from(
    new Set(
      (product.variants || [])
        .map((v) => v.ssd)
        .filter((v): v is number => typeof v === 'number')
    )
  )
    .sort((a, b) => a - b)
    .map((v) => `${v} GB`)
    .join(', ');

  const handleClick = () => {
    navigate(`/laptop/${product.id}`);
  };

  return (
    <div 
      className="glass-card p-6 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl group"
      onClick={handleClick}
    >
      <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-200 aspect-square max-w-[200px] mx-auto">
        {product.images && product.images.length > 0 && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Log error for debugging
              const target = e.target as HTMLImageElement;
              console.warn('Failed to load product image:', product.name, 'URL:', target.src);
              // Fallback to placeholder if image fails to load
              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ddd" width="400" height="400"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EНемає зображення%3C/text%3E%3C/svg%3E';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2">
            <span className="bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              В наявності
            </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-800 transition-colors">
            {product.name}
          </h3>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Процесор:</span> {product.processor}
          </p>
          <p>
            <span className="font-medium">Відеокарта:</span> {product.videocard}
          </p>
            <p>
                <span className="font-medium">Екран:</span> {product.display}
            </p>
          {ramOptions && (
            <p>
              <span className="font-medium">Пам'ять:</span> {ramOptions}
            </p>
          )}
          {storageOptions && (
            <p>
              <span className="font-medium">Накопичувач:</span> {storageOptions}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-gray-800">
            {product.price.toLocaleString()} грн
          </span>
          <button className="glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            Деталі
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
