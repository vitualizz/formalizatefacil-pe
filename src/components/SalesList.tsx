import { Trash2, DollarSign, TrendingUp } from 'lucide-react';
import { useSalesStore } from "@/stores/useSalesStore";
import { formatCurrency, calculateIGV } from "@/domain/services/taxService";

export const SalesList = () => {
  const { sales, deleteSale, getSalesStats } = useSalesStore();
  const stats = getSalesStats();
  const amountIgv = calculateIGV(stats.totalSales);

  const sortedSales = [...sales].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Sales */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 animate-slideInLeft">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-blue-900">Total de Ventas</h4>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-900">
            {formatCurrency(stats.totalSales)}
          </p>
          <p className="text-xs text-blue-700 mt-1">{stats.transactionCount} transacciones</p>
        </div>

        {/* Estimated Tax */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 animate-slideInUp animation-delay-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-amber-900">Impuesto Estimado</h4>
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-900">
            {formatCurrency(amountIgv)}
          </p>
          <p className="text-xs text-amber-700 mt-1">IGV 18%</p>
        </div>

        {/* After Tax */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 animate-slideInRight animation-delay-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-green-900">Neto (Después de Impuestos)</h4>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-900">
            {formatCurrency(stats.totalSales - amountIgv)}
          </p>
          <p className="text-xs text-green-700 mt-1">Monto disponible</p>
        </div>
      </div>

      {/* Sales List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeInUp">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Historial de Ventas</h3>
        </div>

        {sortedSales.length === 0 ? (
          <div className="p-12 text-center">
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No hay ventas registradas</p>
            <p className="text-sm text-gray-400 mt-1">Comienza registrando tu primera venta</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Descripción</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Monto</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedSales.map((sale, index) => (
                  <tr
                    key={sale.id}
                    className="hover:bg-gray-50 transition-colors duration-200 animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {formatDate(sale.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sale.description}</td>
                    <td className="px-6 py-4 text-sm font-bold text-right text-blue-600">
                      {formatCurrency(sale.amount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteSale(sale.id)}
                        className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 transform hover:scale-110 active:scale-95"
                        title="Eliminar venta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

