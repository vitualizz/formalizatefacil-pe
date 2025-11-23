import { useState, type FormEvent } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useMerchantStore } from "@/stores/useMerchantStore";
import { useFormValidation } from "@/hooks/useFormValidation";
import {
  merchantSchema,
  merchantStep1Schema,
  merchantStep2Schema,
  type MerchantFormData,
} from "@/domain/validation/merchantScheme";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";

const DISTRICTS = [
  "Huancayo",
  "El Tambo",
  "Chilca",
  "Sapallanga",
  "Concepción",
  "Santa Rosa de Ocros",
  "Chacabamba",
  "San Agustín de Cajas",
  "Pariahuanca",
  "Huachac",
];

const BUSINESS_SECTORS = [
  "Alimentos y Bebidas",
  "Ropa y Textiles",
  "Tecnología",
  "Salud y Belleza",
  "Construcción",
  "Servicios Profesionales",
  "Comercio al por Menor",
  "Otro",
];

const STEPS = [
  { number: 1, label: "Datos Personales" },
  { number: 2, label: "Negocio" },
];

const OnboardingForm = () => {
  const { setMerchant, setIsRegistered } = useMerchantStore();
  const { errors, validate, clearError } = useFormValidation(merchantSchema);
  const step1Validator = useFormValidation(merchantStep1Schema);
  const step2Validator = useFormValidation(merchantStep2Schema);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<MerchantFormData>({
    name: "",
    document: "",
    documentType: "DNI",
    occupation: "",
    district: "",
  });

  const handleChange = (field: keyof MerchantFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      clearError(field);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!step1Validator.validate(formData)) return;
    }

    if (currentStep === 2) {
      if (!step2Validator.validate(formData)) return;
    }

    setCurrentStep((s) => s + 1);
  };

  const handlePrevStep = () => {
    if (currentStep < 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      setIsSubmitting(true);
      setMerchant(formData);
      setIsRegistered(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8 animate-slideDown">
          <div className="flex justify-between mb-3">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm transition-all duration-500 transform ${
                    currentStep >= step.number
                      ? "bg-blue-600 text-white shadow-lg scale-110"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center font-semibold transition-colors duration-300 ${
                    currentStep >= step.number
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-500 rounded-full"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 md:px-8 py-8 md:py-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
              </div>
              <div className="relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-fadeInDown">
                  {currentStep === 1 && "¡Cuéntanos sobre ti!"}
                  {currentStep === 2 && "Información de tu negocio"}
                </h1>
                <p className="text-blue-100 text-sm md:text-base animate-fadeInDown animation-delay-100">
                  {currentStep === 1 && "Completa tus datos personales"}
                  {currentStep === 2 && "Ayúdanos a conocer tu negocio"}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 py-8 md:py-10 min-h-[400px]">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeInUp">
                  <TextInput
                    label="Nombre completo"
                    value={formData.name}
                    onChange={(value) => handleChange("name", value)}
                    error={step1Validator.errors.name}
                    placeholder="Ej: Juan Pérez García"
                    icon="👤"
                  />

                  <SelectInput
                    label="Tipo de Documento"
                    value={formData.documentType}
                    onChange={(value) =>
                      handleChange("documentType", value as "DNI" | "RUC")
                    }
                    options={[
                      { value: "DNI", label: "DNI (8 dígitos)" },
                      { value: "RUC", label: "RUC (11 dígitos)" },
                    ]}
                    error={step1Validator.errors.documentType}
                    icon="🆔"
                  />

                  <TextInput
                    label="Número de Documento"
                    value={formData.document}
                    onChange={(value) => handleChange("document", value)}
                    error={step1Validator.errors.document}
                    placeholder={
                      formData.documentType === "DNI"
                        ? "12345678"
                        : "20123456789"
                    }
                    maxLength={formData.documentType === "DNI" ? 8 : 11}
                    icon="📋"
                  />
                </div>
              )}

              {/* Step 2: Business */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeInUp">
                  <SelectInput
                    label="Rubro de negocio"
                    value={formData.occupation}
                    onChange={(value) => handleChange("occupation", value)}
                    options={BUSINESS_SECTORS.map((sector) => ({
                      value: sector,
                      label: sector,
                    }))}
                    error={errors.occupation}
                    placeholder="Selecciona tu occupation"
                    icon="🏪"
                  />

                  <SelectInput
                    label="Distrito"
                    value={formData.district}
                    onChange={(value) => handleChange("district", value)}
                    options={DISTRICTS.map((district) => ({
                      value: district,
                      label: district,
                    }))}
                    error={errors.district}
                    placeholder="Selecciona tu distrito"
                    icon="📍"
                  />

                  {/* Summary */}
                  <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-100 animate-fadeInUp animation-delay-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      Resumen
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Nombre:</span>{" "}
                        {formData.name || "—"}
                      </p>
                      <p>
                        <span className="font-medium">Documento:</span>{" "}
                        {formData.documentType} - {formData.document || "—"}
                      </p>
                      <p>
                        <span className="font-medium">Rubro:</span>{" "}
                        {formData.occupation || "—"}
                      </p>
                      <p>
                        <span className="font-medium">Ubicación:</span>{" "}
                        {formData.district || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 md:px-8 py-6 md:py-8 bg-gray-50 flex gap-3 animate-slideUp">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 text-gray-700 font-semibold border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Atrás
                </button>
              )}
              {currentStep < 2 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              {currentStep === 2 && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Completando..." : "Comenzar formalización"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs md:text-sm mt-6 animate-fadeIn">
          Tus datos son seguros y privados. Te guiaremos en cada paso del
          proceso.
        </p>
      </div>
    </div>
  );
};

export default OnboardingForm;
