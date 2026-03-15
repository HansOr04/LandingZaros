"use client"
import React from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { FormInput } from "@/components/ui/FormInput";

export const StepMotivacion = () => {
    const { data, setField, next, back } = useForm();

    const isValid = data.mot1.trim().length >= 10 && data.mot2.trim().length >= 10 && data.recomendo.trim().length > 0;

    return (
        <QuestionCard
            eyebrow="Solicitud de plaza · Motivación"
            title={<>¡Queremos <em>conocerte!</em></>}
            hint="Responde desde tu experiencia real. Nuestra IA leerá tus palabras para entender tu potencial."
            onNext={next}
            onBack={back}
            nextDisabled={!isValid}
        >
            <div className="flex flex-col gap-6">

                {/* MotCard 1 */}
                <div className="bg-white border border-[#EBE3F0] rounded-[22px] overflow-hidden shadow-[0_4px_24px_rgba(59,18,96,0.08)] focus-within:border-[#9B72CF] transition-colors duration-300">
                    <div className="bg-gradient-to-br from-[#3B1260] to-[#6C3BA5] px-6 py-5">
                        <span className="bg-white/10 text-white text-[0.65rem] uppercase tracking-wider font-bold px-2 py-1 rounded-md mb-2 inline-block">
                            Pregunta 01
                        </span>
                        <p className="font-serif italic text-white text-lg leading-tight drop-shadow-md">
                            ¿Qué desafío profesional te trajo a buscar este programa?
                        </p>
                    </div>
                    <div className="bg-white relative">
                        <textarea
                            value={data.mot1}
                            onChange={(e) => setField('mot1', e.target.value)}
                            maxLength={300}
                            placeholder="Cuéntanos qué área de tu liderazgo quieres transformar..."
                            className="w-full min-h-[130px] border-t border-[#EBE3F0] p-[22px_28px] font-sans text-[0.9rem] text-[#1E0E35] resize-y placeholder:text-[#9B8EB0] outline-none leading-[1.6] bg-transparent"
                        />
                        <div className="flex justify-between items-center px-[28px] py-4 border-t border-[#F3EDE3] bg-[#FAF7F2]/50">
                            <span className="text-[11px] text-[#9B8EB0]">No hay respuesta incorrecta</span>
                            <span className={`text-[11px] font-bold ${data.mot1.length >= 280 ? 'text-[#C8447A]' : 'text-[#9B8EB0]'}`}>
                                {data.mot1.length}/300
                            </span>
                        </div>
                    </div>
                </div>

                {/* MotCard 2 */}
                <div className="bg-white border border-[#EBE3F0] rounded-[22px] overflow-hidden shadow-[0_4px_24px_rgba(59,18,96,0.08)] focus-within:border-[#9B72CF] transition-colors duration-300">
                    <div className="bg-gradient-to-br from-[#3B1260] to-[#6C3BA5] px-6 py-5">
                        <span className="bg-white/10 text-white text-[0.65rem] uppercase tracking-wider font-bold px-2 py-1 rounded-md mb-2 inline-block">
                            Pregunta 02
                        </span>
                        <p className="font-serif italic text-white text-lg leading-tight drop-shadow-md">
                            ¿Qué impacto te gustaría generar si tuvieras las herramientas y la red de contactos adecuada?
                        </p>
                    </div>
                    <div className="bg-white relative">
                        <textarea
                            value={data.mot2}
                            onChange={(e) => setField('mot2', e.target.value)}
                            maxLength={300}
                            placeholder="Imagina que el límite no existe..."
                            className="w-full min-h-[130px] border-t border-[#EBE3F0] p-[22px_28px] font-sans text-[0.9rem] text-[#1E0E35] resize-y placeholder:text-[#9B8EB0] outline-none leading-[1.6] bg-transparent"
                        />
                        <div className="flex justify-between items-center px-[28px] py-4 border-t border-[#F3EDE3] bg-[#FAF7F2]/50">
                            <span className="text-[11px] text-[#9B8EB0]">Sé sincera contigo misma</span>
                            <span className={`text-[11px] font-bold ${data.mot2.length >= 280 ? 'text-[#C8447A]' : 'text-[#9B8EB0]'}`}>
                                {data.mot2.length}/300
                            </span>
                        </div>
                    </div>
                </div>

                {/* Recommended By Card */}
                <div className="bg-white border border-[#EBE3F0] rounded-[22px] p-6 shadow-[0_4px_24px_rgba(59,18,96,0.04)]">
                    <label className="block text-sm font-bold text-[#5A4870] mb-3">
                        ¿Quién te recomendó? <span className="font-normal text-[#9B8EB0] ml-1">(Escribe "Nadie" si no aplica)</span>
                    </label>
                    <FormInput
                        icon="💬"
                        value={data.recomendo || ''}
                        onChange={(val) => setField('recomendo', val)}
                        placeholder="Nombre, Instagram, LinkedIn..."
                    />
                </div>

            </div>
        </QuestionCard>
    );
};
