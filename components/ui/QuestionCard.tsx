"use client"
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface QuestionCardProps {
    eyebrow: string;
    title: string | ReactNode;
    hint?: string;
    children: ReactNode;
    onNext: () => void;
    onBack?: () => void;
    nextLabel?: string;
    nextDisabled?: boolean;
}

export const QuestionCard = ({
    eyebrow,
    title,
    hint,
    children,
    onNext,
    onBack,
    nextLabel = "Continuar →",
    nextDisabled = false
}: QuestionCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col min-h-[50vh] justify-center bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-[#DDD4E8]"
        >
            <div className="mb-8">
                <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#C8447A] mb-3">
                    {eyebrow}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3B1260] leading-tight">
                    {title}
                </h2>
                {hint && (
                    <p className="mt-3 text-[#9B8EB0] text-sm md:text-base leading-relaxed">
                        {hint}
                    </p>
                )}
            </div>

            <div className="flex-1 w-full mb-10">
                {children}
            </div>

            <div className="w-full flex items-center gap-4 mt-auto pt-4 border-t border-[#DDD4E8]/50">
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 py-4 px-6 rounded-2xl font-bold bg-[#FAF7F2] text-[#5A4870] hover:text-[#3B1260] hover:bg-[#DDD4E8]/40 transition-colors border border-transparent hover:border-[#DDD4E8]"
                    >
                        Atrás
                    </button>
                )}
                <button
                    type="button"
                    onClick={onNext}
                    disabled={nextDisabled}
                    className={`flex-[2] py-4 px-6 rounded-2xl font-bold transition-all ${nextDisabled
                            ? "bg-[#DDD4E8] text-[#9B8EB0] cursor-not-allowed"
                            : "bg-[#C8447A] text-white hover:bg-[#b03969] hover:shadow-lg hover:-translate-y-0.5"
                        }`}
                >
                    {nextLabel}
                </button>
            </div>
        </motion.div >
    );
};
