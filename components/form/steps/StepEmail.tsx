"use client"
import React, { useState } from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { FormInput } from "@/components/ui/FormInput";

export const StepEmail = () => {
    const { data, setField, next, back } = useForm();
    const [touched, setTouched] = useState(false);

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(data.email);
    const hasError = touched && !isValid && data.email.length > 0;

    const handleNext = () => {
        if (isValid) next();
    };

    return (
        <QuestionCard
            eyebrow="Solicitud de plaza · Datos personales"
            title={<>¿Cuál es tu <em>correo electrónico?</em></>}
            hint="Aquí recibirás la confirmación de tu aplicación y, si eres seleccionada, la invitación de Google Calendar."
            onNext={handleNext}
            onBack={back}
            nextDisabled={!isValid}
        >
            <div className="flex flex-col gap-2">
                <FormInput
                    icon="📧"
                    type="email"
                    value={data.email}
                    onChange={(val) => {
                        setField('email', val.trim());
                        setTouched(true);
                    }}
                    placeholder="tucorreo@ejemplo.com"
                    onEnter={handleNext}
                    hasError={hasError}
                />
                {hasError && (
                    <span className="text-sm text-[#C8447A] font-medium px-4 mt-1 animate-pulse">
                        Por favor, ingresa un correo electrónico válido.
                    </span>
                )}
            </div>
        </QuestionCard>
    );
};
