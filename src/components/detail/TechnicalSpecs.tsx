import type { Product } from '../../types/product';
import TouchTag from '../tags/TouchTag';
import BatteryTag from '../tags/BatteryTag';
import ConditionTag from '../tags/ConditionTag';
import {
  isTouchUnique,
  isBatteryUnique,
  isConditionUnique,
} from '../../utils/variantUtils';

interface TechnicalSpecsProps {
  product: Product;
}

const formatCapacityList = (values: number[]): string => {
  if (!values.length) return '—';

  const uniqueSorted = Array.from(new Set(values)).sort((a, b) => a - b);
  return uniqueSorted.map((v) => `${v} GB`).join(' / ');
};

const TechnicalSpecs = ({ product }: TechnicalSpecsProps) => {
  const variants = product.variants ?? [];

  const ramVariants =
    variants.map((variant) => variant.ram).filter((v): v is number => typeof v === 'number') ?? [];
  const ssdVariants =
    variants.map((variant) => variant.ssd).filter((v): v is number => typeof v === 'number') ?? [];

  const hasVariants = variants.length > 0;

  const sharedTouch =
    hasVariants && !isTouchUnique(variants) ? variants[0].touch : undefined;
  const sharedBattery =
    hasVariants && !isBatteryUnique(variants) ? variants[0].battery : undefined;
  const sharedCondition =
    hasVariants && !isConditionUnique(variants) ? variants[0].condition : undefined;

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Технічні характеристики
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b border-white/20">
          <span className="font-medium text-gray-700">🧠 Процесор</span>
          <span className="text-gray-600">{product.processor}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/20">
          <span className="font-medium text-gray-700">🎮 Відеокарта</span>
          <span className="text-gray-600">{product.videocard}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/20">
          <span className="font-medium text-gray-700">🖥️ Дисплей</span>
          <span className="text-gray-600">{product.display}</span>
        </div>
        {hasVariants && (
          <>
            <div className="flex justify-between py-2 border-b border-white/20">
              <span className="font-medium text-gray-700">🚀 Оперативна пам&apos;ять</span>
              <span className="text-gray-600">{formatCapacityList(ramVariants)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/20">
              <span className="font-medium text-gray-700">💾 Накопичувач</span>
              <span className="text-gray-600">{formatCapacityList(ssdVariants)}</span>
            </div>
            {sharedTouch !== undefined && (
              <div className="flex justify-between py-2 border-b border-white/20">
                <span className="font-medium text-gray-700">📱 Сенсорний екран</span>
                <span className="text-gray-600">
                  <TouchTag isTouch={sharedTouch} />
                </span>
              </div>
            )}
            {sharedBattery !== undefined && (
              <div className="flex justify-between py-2 border-b border-white/20">
                <span className="font-medium text-gray-700">🔋 Батарея</span>
                <span className="text-gray-600">
                  <BatteryTag battery={sharedBattery} />
                </span>
              </div>
            )}
            {sharedCondition !== undefined && (
              <div className="flex justify-between py-2 border-b border-white/20">
                <span className="font-medium text-gray-700">✨ Стан</span>
                <span className="text-gray-600">
                  <ConditionTag condition={sharedCondition} />
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TechnicalSpecs;


