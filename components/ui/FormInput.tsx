"use client"
import React from 'react';

interface FormInputProps {
    icon?: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    onEnter?: () => void;
    hasError?: boolean;
}

export const FormInput = ({
    icon,
    type = "text",
    value,
    onChange,
    placeholder,
    autoFocus = false,
    onEnter,
    hasError = false
}: FormInputProps) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnter) {
            e.preventDefault();
            onEnter();
        }
    };

    return (
        <div className="relative w-full">
            {icon && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl select-none">
                    {icon}
                </span>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className={`w-full bg-[#FAF7F2] border-[1.5px] rounded-2xl font-sans text-[0.95rem] text-[#1E0E35] outline-none transition-all duration-220 py-4 ${icon ? "pl-[50px] pr-[18px]" : "px-[18px]"
                    } ${hasError
                        ? "border-rose bg-white shadow-[0_0_0_3px_rgba(200,68,122,0.10)]"
                        : "border-[#DDD4E8] focus:border-[#6C3BA5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(108,59,165,0.10)]"
                    }`}
            />
        </div>
    );
};
