import { CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { useStepsStore } from "@/stores/useStepsStore";
import { useMemo } from "react";

export const FormalizationSteps = () => {
  const { formalizationSteps, toggleFormalizationStep } =
    useStepsStore();

  const percentage = useMemo(() => {
    const completedSteps = formalizationSteps.filter(
      (step) => step.completed
    ).length;
    return Math.round((completedSteps / formalizationSteps.length) * 100);
  }, [formalizationSteps]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Pasos de Formalización
            </h2>
            <p className="text-sm text-gray-600">
              Marca los pasos que vayas completando
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-purple-600">{percentage}%</p>
          <p className="text-xs text-gray-500">Completado</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {formalizationSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => toggleFormalizationStep(step.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              step.completed
                ? "bg-emerald-50 border-emerald-300"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {step.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold mb-1 ${
                    step.completed
                      ? "text-emerald-900 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm ${
                    step.completed ? "text-emerald-700" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
