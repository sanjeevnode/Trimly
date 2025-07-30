"use client"

import { Loader2Icon } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
}

const CustomButton = ({
    isLoading = false,
    loadingText = "processing...",
    children,
    disabled,
    className = "",
    ...props
}: CustomButtonProps) => {

    return (
        <button
            disabled={isLoading || disabled}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:shadow-lg transition-shadow  cursor-pointer ${className}`}
            {...props}
        >
            {isLoading ? (
                <div className='flex items-center justify-center gap-2 w-full'>
                    <Loader2Icon className="animate-spin" />
                    <span>{loadingText}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default CustomButton;