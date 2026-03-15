"use client"
import React from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { PillSelector } from "@/components/ui/PillSelector";
import { NivelEdu, Laboral, Sector } from "@/types/form";

export const StepPerfil = () => {
    const { data, setField, goToStep, back } = useForm();

    const eduOptions = [
        { value: "universitario", label: "📚 Estudiante Universitaria" },
        { value: "graduada", label: "🎓 Graduada de la Universidad" },
        { value: "master", label: "✨ Cursando o Graduada del Máster" },
        { value: "doctorado", label: "🏆 Cursando o Graduada del Doctorado" }
    ];

    const laboralOptions = [
        { value: "si", label: "Sí, trabajo actualmente" },
        { value: "no", label: "No por ahora" },
        { value: "independiente", label: "Soy independiente" }
    ];

    const sectorOptions = [
        { value: "privado", label: "🏢 Privado" },
        { value: "publico", label: "🏛️ Público" },
        { value: "ong", label: "🌱 ONG" },
        { value: "emprendimiento", label: "🚀 Emprendimiento" }
    ];

    const isValid = data.edu !== '' && data.laboral !== '' && data.sector !== '';

    const handleNext = () => {
        if (isValid) goToStep(6);
    };

    return (
        <QuestionCard
            eyebrow="Solicitud de plaza · Tu perfil"
            title={<>Tu <em>perfil profesional</em></>}
            hint="Esta información determina qué nivel del programa es ideal para ti."
            onNext={handleNext}
            onBack={back}
            nextDisabled={!isValid}
        >
            <div className="flex flex-col gap-8">
                {/* Education Block */}
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-bold text-[#5A4870]">Nivel de educación</p>
                    <PillSelector
                        options={eduOptions}
                        selected={data.edu}
                        onChange={(val) => setField('edu', val as NivelEdu)}
                        layout="column"
                        fullWidth={true}
                    />
                </div>

                {/* Laboral Block */}
                <div className="flex flex-col gap-3 pt-6 border-t border-[#DDD4E8]/40">
                    <p className="text-sm font-bold text-[#5A4870]">Actividad laboral actual</p>
                    <PillSelector
                        options={laboralOptions}
                        selected={data.laboral}
                        onChange={(val) => setField('laboral', val as Laboral)}
                        layout="row"
                    />
                </div>

                {/* Sector Block */}
                <div className="flex flex-col gap-3 pt-6 border-t border-[#DDD4E8]/40">
                    <p className="text-sm font-bold text-[#5A4870]">Sector</p>
                    <PillSelector
                        options={sectorOptions}
                        selected={data.sector}
                        onChange={(val) => setField('sector', val as Sector)}
                        layout="row"
                    />
                </div>
            </div>
        </QuestionCard>
    );
};
