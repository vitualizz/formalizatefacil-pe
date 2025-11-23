import { LogOut, Store } from "lucide-react";
import { useMerchantStore } from "@/stores/useMerchantStore";
import { useStepsStore } from "@/stores/useStepsStore";
import { FormalizationSteps } from "./FormalizationSteps";
import { MentorDigital } from "./MentorDigital";

export const Dashboard = () => {
  const { merchant, clearMerchant } = useMerchantStore();
  const { resetFormalizationSteps } = useStepsStore();

  const handleExit = () => {
    clearMerchant();
    resetFormalizationSteps();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Store className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Hi, {merchant?.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {merchant?.occupation} - {merchant?.district}
                </p>
              </div>
            </div>
            <button
              onClick={handleExit}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FormalizationSteps />
          </div>

          <div className="space-y-8">
            <MentorDigital />
          </div>
        </div>
      </main>
    </div>
  );
};
