"use client"
import React from "react";
import { useForm } from "@/components/form/FormContext";
import { FormInput } from "@/components/ui/FormInput";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { ChevronDown } from "lucide-react";

export const StepPaisDoc = () => {
    const { data, setField, next, back } = useForm();

    const paises = [
        { nombre: "Ecuador", code: "+593" },
        { nombre: "Colombia", code: "+57" },
        { nombre: "Perú", code: "+51" },
        { nombre: "México", code: "+52" },
        { nombre: "Argentina", code: "+54" },
        { nombre: "Chile", code: "+56" },
        { nombre: "Venezuela", code: "+58" },
        { nombre: "Bolivia", code: "+591" },
        { nombre: "Paraguay", code: "+595" },
        { nombre: "Uruguay", code: "+598" },
        { nombre: "España", code: "+34" },
        { nombre: "Otro", code: "" },
    ];

    const handlePaisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPais = e.target.value;
        setField('pais', selectedPais);

        // Auto-update waCode based on country selection
        const paisObj = paises.find(p => p.nombre === selectedPais);
        if (paisObj) {
            setField('waCode', paisObj.code);
        }
    };

    const isValid = data.pais !== '' && data.documento.trim().length >= 3;

    const handleNext = () => {
        if (isValid) next();
    };

    return (
        <QuestionCard
            eyebrow="Solicitud de plaza · Datos personales"
            title={<>¿Desde dónde <em>nos escribes?</em></>}
            hint="Necesitamos verificar tu procedencia para el programa internacional."
            onNext={handleNext}
            onBack={back}
            nextDisabled={!isValid}
        >
            <div className="flex flex-col gap-4">
                {/* Country Select */}
                <div className="relative w-full">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none">
                        🌎
                    </span>
                    <select
                        value={data.pais}
                        onChange={handlePaisChange}
                        className={`w-full bg-[#FAF7F2] border-[1.5px] border-[#DDD4E8] rounded-2xl font-sans text-[0.95rem] outline-none transition-all duration-220 py-4 pl-[50px] pr-[18px] appearance-none ${data.pais === '' ? 'text-[#9B8EB0]' : 'text-[#1E0E35]'
                            } focus:border-[#6C3BA5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(108,59,165,0.10)]`}
                    >
                        <option value="" disabled hidden>Selecciona tu país</option>
                        {paises.map(p => (
                            <option key={p.nombre} value={p.nombre} className="text-[#1E0E35]">{p.nombre}</option>
                        ))}
                    </select>
                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A4870]" />
                </div>

                {/* Document Input */}
                <FormInput
                    icon="🪪"
                    type="text"
                    value={data.documento}
                    onChange={(val) => setField('documento', val)}
                    placeholder="Cédula / DNI / Pasaporte"
                    onEnter={handleNext}
                />
            </div>
        </QuestionCard >
    );
};
