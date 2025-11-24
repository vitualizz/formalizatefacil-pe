import { useMerchantStore } from "@/stores/useMerchantStore";
import { FormalizationSteps } from "./FormalizationSteps";
import { MentorDigital } from "./MentorDigital";

export const Dashboard = () => {
  const { merchant } = useMerchantStore();

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeInDown">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Hola, {merchant?.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {merchant?.occupation} - {merchant?.district}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FormalizationSteps />
          </div>

          <div className="space-y-8">
            <MentorDigital />
          </div>
        </div>
      </main>

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
