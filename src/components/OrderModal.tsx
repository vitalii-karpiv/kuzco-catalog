import { useState, useEffect } from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { phone: string; pib: string }) => Promise<void>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

const OrderModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  errorMessage,
}: OrderModalProps) => {
  const [phone, setPhone] = useState('');
  const [pib, setPib] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLocalError(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !phone.startsWith('0') || phone.length < 10) {
      setLocalError('Введіть коректний номер телефону, що починається з 0.');
      return;
    }

    if (!pib.trim()) {
      setLocalError("Введіть ім'я та прізвище.");
      return;
    }

    setLocalError(null);
    await onSubmit({ phone, pib: pib.trim() });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Закрити"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Залиште контакти
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Ми зателефонуємо для підтвердження замовлення.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm">
                +38
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0XXXXXXXXX"
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ім&apos;я та Прізвище
            </label>
            <input
              type="text"
              value={pib}
              onChange={(e) => setPib(e.target.value)}
              placeholder="Тарас Шевченко"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent"
            />
          </div>

          {(localError || errorMessage) && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {localError || errorMessage}
            </div>
          )}

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 glass-button py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900"
              disabled={isSubmitting}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>Відправка...</span>
                </div>
              ) : (
                'Підтвердити замовлення'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;


