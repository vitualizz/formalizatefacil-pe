import { TrendingUp } from "lucide-react";
import { SaleForm } from "./SaleForm";
import { SalesList } from "./SalesList";

export const Sales = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeInDown">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-3 rounded-xl">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Libro de Ventas
              </h1>
              <p className="text-gray-600 mt-1">
                Registra y gestiona tus ventas, calcula impuestos
                automáticamente
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <SaleForm />
          </div>

          {/* Sales List Column */}
          <div className="lg:col-span-2">
            <SalesList />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
