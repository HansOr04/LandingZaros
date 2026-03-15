"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface PillOption {
    value: string;
    label: string;
}

interface PillSelectorProps {
    options: PillOption[];
    selected: string;
    onChange: (value: string) => void;
    layout: 'row' | 'column';
    fullWidth?: boolean;
}

export const PillSelector = ({ options, selected, onChange, layout, fullWidth = false }: PillSelectorProps) => {
    return (
        <div className={`flex gap-3 ${layout === 'column' ? 'flex-col' : 'flex-wrap'}`}>
            {options.map((option) => {
                const isActive = selected === option.value;
                return (
                    <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        whileHover={{ scale: isActive ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer transition-colors duration-300 py-3 px-5 text-sm md:text-base font-semibold border-2 ${fullWidth ? "w-full text-left" : ""
                            } ${layout === 'row' ? 'rounded-full' : 'rounded-[14px]'} ${isActive
                                ? "border-[#3B1260] text-white shadow-[0_4px_14px_rgba(59,18,96,0.20)] z-10"
                                : "bg-[#FAF7F2] border-[#DDD4E8] text-[#5A4870] hover:border-[#6C3BA5]/50 hover:bg-white"
                            }`}
                    >
                        {/* Active Background Spring Animation */}
                        {isActive && (
                            <motion.div
                                layoutId={`pill-bg-${layout}-${options[0]?.value}`} // Unique layoutId per instance
                                className={`absolute inset-0 bg-[#3B1260] -z-10 ${layout === 'row' ? 'rounded-full' : 'rounded-[14px]'}`}
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}

                        <span className="relative z-20 pointer-events-none block whitespace-nowrap overflow-hidden text-ellipsis">
                            {option.label}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
};
