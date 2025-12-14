import { useState, useRef, useEffect } from 'react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScrollability = () => {
      const hasHorizontalScroll = container.scrollWidth > container.clientWidth;
      setIsScrollable(hasHorizontalScroll);
      updateFadeIndicators();
    };

    const updateFadeIndicators = () => {
      if (!container) return;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftFade(scrollLeft > 0);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    };

    checkScrollability();
    container.addEventListener('scroll', updateFadeIndicators);
    window.addEventListener('resize', checkScrollability);

    return () => {
      container.removeEventListener('scroll', updateFadeIndicators);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [variants]);

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
      {isScrollable && (
        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span className="hidden sm:inline">
            Прокрутіть вліво/вправо, щоб побачити всі колонки
          </span>
          <span className="sm:hidden">Прокрутіть для перегляду</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      )}
      <div className="relative">
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/30 to-transparent pointer-events-none z-10 rounded-l-2xl" />
        )}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/30 to-transparent pointer-events-none z-10 rounded-r-2xl" />
        )}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={{
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch',
          }}
        >
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
    </div>
  );
};

export default VariantSelector;


