interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  icon?: string;
}

export const TextInput = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  icon,
}: TextInputProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 ${
          error
            ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
            : "border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        }`}
      />
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};
