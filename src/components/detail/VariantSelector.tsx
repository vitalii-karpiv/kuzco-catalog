import type { Product, ProductVariant } from '../../types/product';
import TouchTag from '../tags/TouchTag';
import BatteryTag from '../tags/BatteryTag';
import ConditionTag from '../tags/ConditionTag';
import {
  isTouchUnique,
  isBatteryUnique,
  isConditionUnique,
} from '../../utils/variantUtils';

interface VariantSelectorProps {
  variants: Product['variants'];
  selectedVariantId?: string;
  onSelect: (variant: ProductVariant) => void;
}

const formatRam = (ram?: number) => {
  if (!ram) return '—';
  return `${ram} GB`;
};

const formatStorage = (ssd?: number) => {
  if (!ssd) return '—';
  return `${ssd} GB`;
};

const formatPrice = (price?: number) => {
  if (!price) return '—';
  return `${price.toLocaleString()} грн`;
};

const VariantSelector = ({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) => {
  if (!variants || variants.length === 0) {
    return null;
  }

  const shouldShowTouchColumn = isTouchUnique(variants);
  const shouldShowBatteryColumn = isBatteryUnique(variants);
  const shouldShowConditionColumn = isConditionUnique(variants);

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Варіанти конфігурацій
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Оберіть конфігурацію, яка вам підходить найбільше. Ціна та параметри
        оновляться відповідно до вибраного варіанту.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/20 text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Пам'ять
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Накопичувач
              </th>
              {shouldShowTouchColumn && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Сенсорний екран
                </th>
              )}
              {shouldShowBatteryColumn && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Батарея
                </th>
              )}
              {shouldShowConditionColumn && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Стан
                </th>
              )}
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ціна
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {variants.map((variant) => {
              const isSelected = variant.identifier === selectedVariantId;

              return (
                <tr
                  key={variant.identifier}
                  className={`transition-colors ${
                    isSelected && 'bg-blue-100'
                  }`}
                  onClick={() => onSelect(variant)}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {formatRam(variant.ram)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {formatStorage(variant.ssd)}
                  </td>
                  {shouldShowTouchColumn && (
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                        <TouchTag isTouch={variant.touch}/>
                    </td>
                  )}
                  {shouldShowBatteryColumn && (
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      <BatteryTag battery={variant.battery} />
                    </td>
                  )}
                  {shouldShowConditionColumn && (
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      <ConditionTag condition={variant.condition} />
                    </td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap text-right text-gray-900 font-semibold">
                    {formatPrice(variant.price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantSelector;


