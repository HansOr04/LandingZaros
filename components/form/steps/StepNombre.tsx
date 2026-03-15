"use client"
import React, { useEffect, useRef } from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { FormInput } from "@/components/ui/FormInput";

export const StepNombre = () => {
    const { data, setField, next } = useForm();

    // Custom ref for auto-focus, as FormInput acts as controlled component wrapper
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // A small delay to allow framer motion route transition to finish
        const timer = setTimeout(() => {
            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
            if (input) input.focus();
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    const isValid = data.nombre.trim().length >= 2;

    const handleNext = () => {
        if (isValid) next();
    };

    return (
        <QuestionCard
            eyebrow="Solicitud de plaza · Datos personales"
            title={<>¿Cuál es tu <em>nombre?</em></>}
            hint="Comenzamos por conocerte. Solo toma 5 minutos."
            onNext={handleNext}
            nextDisabled={!isValid}
        >
            <FormInput
                type="text"
                value={data.nombre}
                onChange={(val) => setField('nombre', val)}
                placeholder="Ej. Ana García"
                onEnter={handleNext}
                autoFocus={true} // Triggers react autoFocus attribute
            />
        </QuestionCard>
    );
};
