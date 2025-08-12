"use client"

import { Eye, EyeOff } from 'lucide-react';
import { useState, forwardRef } from 'react';

interface CustomTextFieldProps {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    error?: string;
    isPassword?: boolean;
    type?: string;
    icon?: React.ReactNode;
}

const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(
    ({
        label,
        placeholder,
        disabled = false,
        required = false,
        className = "",
        error,
        isPassword = false,
        type = "text",
        icon,
        ...props
    }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const inputType = isPassword ? (showPassword ? "text" : "password") : type;

        return (
            <div>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        required={required}
                        className={`w-full ${icon ? "pl-10" : "pl-3"} py-2 ${isPassword ? 'pr-10' : 'pr-3'} border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${error ? 'border-red-500' : ''} ${className}`}
                        placeholder={placeholder}
                        disabled={disabled}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={disabled}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    )}
                </div>
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

CustomTextField.displayName = 'CustomTextField';

export default CustomTextField;