import type { Product } from '../types/product';

interface ProductTechnicalSpecsProps {
  product: Product;
}

const ProductTechnicalSpecs = ({ product }: ProductTechnicalSpecsProps) => {
  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Технічні характеристики
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b border-white/20">
          <span className="font-medium text-gray-700">Процесор</span>
          <span className="text-gray-600">{product.processor}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/20">
          <span className="font-medium text-gray-700">Дисплей</span>
          <span className="text-gray-600">{product.display}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/20">
          <span className="font-medium text-gray-700">Відеокарта</span>
          <span className="text-gray-600">{product.videocard}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductTechnicalSpecs;


