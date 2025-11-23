interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  icon?: string;
}

export const SelectInput = ({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  icon,
}: SelectInputProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 appearance-none bg-no-repeat cursor-pointer ${
          error
            ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
            : "border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundPosition: `right 1rem center`,
          paddingRight: "2.5rem",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};
