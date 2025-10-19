import { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/laptop/${product.id}`);
  };

  return (
    <div 
      className="glass-card p-6 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl group"
      onClick={handleClick}
    >
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          {product.inStock ? (
            <span className="bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              In Stock
            </span>
          ) : (
            <span className="bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              Out of Stock
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-medium">Processor:</span> {product.specs.processor}</p>
          <p><span className="font-medium">RAM:</span> {product.specs.ram}</p>
          <p><span className="font-medium">Storage:</span> {product.specs.storage}</p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-gray-800">
            ${product.price.toLocaleString()}
          </span>
          <button className="glass-button px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
