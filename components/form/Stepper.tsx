"use client"
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "./FormContext";
import { Check } from "lucide-react";

export const Stepper = () => {
    const { step } = useForm();

    // Maps actual form steps (1-12) to visual circles (1-5)
    const getActiveCircle = () => {
        if (step >= 1 && step <= 4) return 1; // Datos
        if (step === 5) return 2;             // Perfil
        if (step === 6) return 3;             // Programa
        if (step === 7) return 4;             // Motivación
        return 5;                             // Resultado (Steps 8+, stepper hidden)
    };

    const activeCircle = getActiveCircle();
    const totalSteps = 5;
    const labels = ["Datos", "Perfil", "Programa", "Motivación", "Análisis"];

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-8">
            <div className="relative flex items-center justify-between">
                {/* Background line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-[#DDD4E8] -z-10" />

                {/* Active line with framer motion */}
                <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#C8447A] -z-10"
                    layoutId="progress"
                    initial={false}
                    animate={{ width: `${Math.max(0, (activeCircle - 1) / (totalSteps - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {Array.from({ length: totalSteps }).map((_, i) => {
                    const stepNum = i + 1;
                    const isActive = stepNum === activeCircle;
                    const isCompleted = stepNum < activeCircle;
                    const isDone = isCompleted;

                    return (
                        <div key={stepNum} className="flex flex-col items-center">
                            <div
                                className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${isDone ? "border-transparent bg-[#3B1260] text-white" :
                                    isActive ? "border-transparent bg-[#C8447A] text-white ring-4 ring-[#C8447A]/20" :
                                        "border-[#DDD4E8] bg-white text-[#9B8EB0]"
                                    }`}
                            >
                                {stepNum === 5 ? "✦" : (isDone ? <Check size={18} strokeWidth={3} /> : stepNum)}
                            </div>
                            <div className={`mt-2 text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-[#C8447A]" : isDone ? "text-[#3B1260]" : "text-[#9B8EB0]"
                                }`}>
                                {labels[i]}
                            </div>
                        </div>
                    );
                })}
            </div >
        </div >
    );
};
