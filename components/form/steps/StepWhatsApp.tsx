"use client"
import React from "react";
import { useForm } from "@/components/form/FormContext";
import { FormInput } from "@/components/ui/FormInput";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { ChevronDown } from "lucide-react";

export const StepWhatsApp = () => {
    const { data, setField, next, back } = useForm();

    const codes = [
        { label: "🇪🇨 Ecuador +593", value: "+593" },
        { label: "🇨🇴 Colombia +57", value: "+57" },
        { label: "🇵🇪 Perú +51", value: "+51" },
        { label: "🇲🇽 México +52", value: "+52" },
        { label: "🇦🇷 Argentina +54", value: "+54" },
        { label: "🇨🇱 Chile +56", value: "+56" },
        { label: "🇻🇪 Venezuela +58", value: "+58" },
        { label: "🇧🇴 Bolivia +591", value: "+591" },
        { label: "🇵🇾 Paraguay +595", value: "+595" },
        { label: "🇺🇾 Uruguay +598", value: "+598" },
        { label: "🇪🇸 España +34", value: "+34" },
        { label: "🌍 Otro", value: "" },
    ];

    const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setField('waCode', e.target.value);
    };

    const isValid = data.waCode !== '' && data.waNumero.trim().length >= 6;

    const handleNext = () => {
        if (isValid) next();
    };

    return (
        <QuestionCard
            eyebrow="Solicitud de plaza · Datos personales"
            title={<>¿Y tu número de <em>WhatsApp?</em></>}
            hint="Nuestro equipo te contactará por WhatsApp para confirmar tu plaza."
            onNext={handleNext}
            onBack={back}
            nextDisabled={!isValid}
        >
            <div className="flex flex-col gap-4">
                {/* Country Code Select */}
                <div className="relative w-full">
                    <select
                        value={data.waCode}
                        onChange={handleCodeChange}
                        className={`w-full bg-[#FAF7F2] border-[1.5px] border-[#DDD4E8] rounded-2xl font-sans text-[0.95rem] outline-none transition-all duration-220 py-4 px-[18px] appearance-none focus:border-[#6C3BA5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(108,59,165,0.10)] text-[#1E0E35]`}
                    >
                        {
                            codes.map(c => (
                                <option key={c.label} value={c.value} className="text-[#1E0E35]">
                                    {c.label}
                                </option>
                            ))
                        }
                    </select>
                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A4870]" />
                </div>

                {/* WhatsApp Number Input */}
                <FormInput
                    icon="💬"
                    type="tel"
                    value={data.waNumero}
                    onChange={(val) => setField('waNumero', val)}
                    placeholder="99 123 4567"
                    onEnter={handleNext}
                />

                {/* Real-time Preview */}
                <div className="text-center mt-2">
                    <span className="text-[13px] text-[#9B8EB0]">
                        Número completo: <strong className="text-[#3B1260] font-sans ml-1">{data.waCode} {data.waNumero || "—"}</strong>
                    </span>
                </div>
            </div>
        </QuestionCard >
    );
};
