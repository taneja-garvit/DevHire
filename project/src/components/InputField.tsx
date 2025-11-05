import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default InputField;
