"use client"
import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { FormData, FORM_INITIAL } from "@/types/form";

interface FormContextType {
    data: FormData;
    setField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
    step: number;          // paso actual (1-10)
    next: () => void;
    back: () => void;
    goToStep: (n: number) => void;
    direction: 'forward' | 'backward';
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<FormData>(FORM_INITIAL);
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

    const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setData((prev: FormData) => ({ ...prev, [key]: value }));
    };

    const next = () => {
        setDirection('forward');
        setStep(prev => Math.min(prev + 1, 10));

        if (step === 8) {
            // Simulate going to step 9 then firing submit logic
            goToStep(9);
        }
    };

    const back = () => {
        setDirection('backward');
        setStep(prev => Math.max(prev - 1, 1));
    };

    const goToStep = async (n: number) => {
        setDirection(n > step ? 'forward' : 'backward');
        setStep(n);
        // Disparar api call en background
        if (n === 9) {
            try {
                const res = await fetch('/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const json = await res.json();

                if (json.meetLink) {
                    setField('meetLink', json.meetLink);
                }
            } catch (err) {
                console.error('Error in background submit:', err);
            }
        }
    };

    const value = useMemo(() => ({
        data, setField, step, next, back, goToStep, direction
    }), [data, step, direction]);

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useForm must be used within a FormProvider");
    }
    return context;
};
