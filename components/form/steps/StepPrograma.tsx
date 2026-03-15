"use client"
import React from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { BootcampCard } from "@/components/ui/BootcampCard";

export const StepPrograma = () => {
    const { data, setField, next, back } = useForm();

    const isValid = data.bootcampElegido !== '';

    return (
        <QuestionCard
            eyebrow="Solicitud de plaza · Selección"
            title={<>¿Qué nivel <em>te llama?</em></>}
            hint="Nuestra IA verificará si es el nivel ideal para tu perfil actual."
            onNext={next}
            onBack={back}
            nextDisabled={!isValid}
        >
            <div className="flex flex-col gap-[18px]">
                <BootcampCard
                    nivel="nivel1"
                    selected={data.bootcampElegido === "nivel1"}
                    onSelect={() => setField('bootcampElegido', 'nivel1')}
                />
                <BootcampCard
                    nivel="nivel2"
                    selected={data.bootcampElegido === "nivel2"}
                    onSelect={() => setField('bootcampElegido', 'nivel2')}
                />
                <BootcampCard
                    nivel="nivel3"
                    selected={data.bootcampElegido === "nivel3"}
                    onSelect={() => setField('bootcampElegido', 'nivel3')}
                />
            </div>
        </QuestionCard>
    );
};
