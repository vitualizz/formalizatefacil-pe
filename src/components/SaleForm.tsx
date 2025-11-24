import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSalesStore } from '@/stores/useSalesStore';
import { useFormValidation } from '@/hooks/useFormValidation';
import { saleSchema, type SaleFormData } from '@/domain/validation/saleSchema';
import { TextInput } from './TextInput';

interface SaleFormProps {
  onSaleAdded?: () => void;
}

export const SaleForm = ({ onSaleAdded }: SaleFormProps) => {
  const { addSale } = useSalesStore();
  const { errors, validate, clearError } = useFormValidation(saleSchema);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<SaleFormData>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0
  });

  const handleChange = (field: keyof SaleFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      clearError(field);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate(formData)) {
      addSale({
        date: formData.date,
        description: formData.description,
        amount: formData.amount
      });

      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: 0
      });

      onSaleAdded?.();
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideInRight">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-600" />
        Registrar Nueva Venta
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Fecha de venta"
          value={formData.date}
          onChange={(value) => handleChange('date', value)}
          error={errors.date}
          icon="📅"
        />

        <TextInput
          label="Descripción"
          value={formData.description}
          onChange={(value) => handleChange('description', value)}
          error={errors.description}
          placeholder="Ej: Venta de productos..."
          icon="📝"
        />

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            💰 Monto con IGV (S/)
          </label>
          <input
            type="number"
            value={formData.amount || ''}
            onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 ${
              errors.amount
                ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {errors.amount && (
            <p className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1">
              <span>⚠</span> {errors.amount}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {isSubmitting ? 'Registrando...' : 'Registrar Venta'}
        </button>
      </form>
    </div>
  );
};

