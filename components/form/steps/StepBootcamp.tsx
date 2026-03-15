"use client"
import React from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { BootcampCard } from "@/components/ui/BootcampCard";
import { NivelBootcamp } from "@/types/form";

export const StepBootcamp = () => {
    const { data, setField, next, back } = useForm();

    const isValid = data.bootcampElegido !== '';

    return (
        <QuestionCard
            eyebrow="Paso 3 de 5 · Selección"
            title={<>¿Qué nivel <em>te llama?</em></>}
            hint="Nuestra IA lo analizará y confirmará si es el ideal para ti."
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
