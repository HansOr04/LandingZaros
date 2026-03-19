"use client"
import React, { useMemo } from "react";
import { useForm } from "@/components/form/FormContext";
import { recomendar } from "@/lib/recomendar";
import { motion, Variants } from "framer-motion";

export const StepResultado = () => {
    const { data, setField, goToStep } = useForm();
    const rec = useMemo(() => recomendar(data), [data]);
    const nombrePrint = data.nombre?.split(' ')[0] || 'tú';

    const handlePagar = () => {
        setField('decisionPath', 'pagar');
        goToStep(10);
    };

    const handleAgendar = () => {
        setField('decisionPath', 'agendar');
        goToStep(11);
    };

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.15, duration: 0.5, ease: "easeOut" }
        })
    };

    return (
        <div className="w-full flex flex-col gap-[28px] pb-10">
            {/* 1. Hero */}
            <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="bg-gradient-to-br from-[#3B1260] to-[#6C3BA5] rounded-[24px] p-[38px_32px] text-center overflow-hidden relative shadow-[0_12px_48px_rgba(59,18,96,0.2)]"
            >
                <div className="absolute -top-[50px] -right-[50px] w-[180px] h-[180px] rounded-full bg-white/5" />
                <div className="absolute -bottom-[40px] -left-[40px] w-[140px] h-[140px] bg-[#C8447A]/15 rounded-full" />
                <div className="relative z-[1] flex flex-col items-center">
                    <div className="text-[2.8rem] mb-[14px]">✦</div>
                    <div className="bg-white/10 border border-white/20 rounded-full px-[18px] py-[6px] text-[0.78rem] text-white/80 font-bold uppercase tracking-wide mb-6 inline-block">
                        {nombrePrint}, tu análisis está listo
                    </div>
                    <h2 className="font-serif text-[1.75rem] text-white font-bold leading-[1.2] mb-4">
                        Encontramos tu <em className="text-[#F3AEC6] not-italic">programa ideal</em>
                    </h2>
                    <p className="text-[0.87rem] text-white/70 leading-[1.6] max-w-[280px]">
                        Nuestra IA identificó el nivel que mejor potenciará tu liderazgo. ¿Qué quieres hacer ahora?
                    </p>
                </div>
            </motion.div>

            {/* 2. Recommendation card */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="bg-white border-2 border-[#C8447A] rounded-[22px] overflow-hidden shadow-[0_8px_36px_rgba(200,68,122,0.15)]"
            >
                <div className="bg-gradient-to-br from-[#FDF0F5] to-white p-[20px_26px] border-b border-[#C8447A]/10 flex justify-between items-center">
                    <span className="text-[#C8447A] text-[0.65rem] font-bold uppercase tracking-wider">
                        ★ Recomendación principal
                    </span>
                    <span className="bg-[#FAF7F2] border border-[#EBE3F0] text-[#9B8EB0] text-[0.7rem] font-bold rounded-full px-3 py-1">
                        {rec.nivel_label}
                    </span>
                </div>
                <div className="p-[26px]">
                    <h3 className="font-serif text-[1.25rem] font-bold text-[#3B1260] mb-4 leading-snug">
                        {rec.titulo}
                    </h3>
                    <blockquote className="bg-[#FAF7F2] border-l-[3px] border-[#C8447A] rounded-r-[12px] p-[15px_17px] text-[0.86rem] text-[#5A4870] italic leading-[1.65] mb-5">
                        {rec.razon}
                    </blockquote>
                    {/* Metrics */}
                    <div className="flex flex-col gap-3 mb-5">
                        {([
                            { label: 'Confianza Estratégica', value: rec.metricas.liderazgo },
                            { label: 'Potencial de Crecimiento', value: rec.metricas.crecimiento },
                            { label: 'Alineación Zaros', value: rec.metricas.alineacion },
                            { label: 'Impacto Multiplicador', value: rec.metricas.impacto },
                        ] as const).map(m => (
                            <div key={m.label}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-[0.75rem] text-[#5A4870]">{m.label}</span>
                                    <span className="text-[0.75rem] font-bold text-[#C8447A]">{m.value}%</span>
                                </div>
                                <div className="w-full h-[5px] bg-[#F3EDE3] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: 'linear-gradient(90deg, #6C3BA5, #C8447A)' }}
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${m.value}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {rec.chips.map(chip => (
                            <span
                                key={chip}
                                className="bg-[#FAF7F2] border border-[#EBE3F0] rounded-full px-[13px] py-[5px] text-[0.72rem] text-[#5A4870] font-medium"
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 3. Decision CTAs — grid vertical 2 columnas */}
            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="flex flex-col gap-4"
            >
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#EBE3F0]" />
                    <p className="text-[0.72rem] text-[#9B8EB0] font-bold uppercase tracking-widest whitespace-nowrap">
                        ¿Cómo quieres continuar?
                    </p>
                    <div className="flex-1 h-px bg-[#EBE3F0]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {/* Card A — Pagar (primaria) */}
                    <button
                        onClick={handlePagar}
                        className="relative overflow-hidden rounded-[20px] text-left group flex flex-col"
                        style={{ boxShadow: '0 16px 48px rgba(200,68,122,0.4), 0 4px 16px rgba(59,18,96,0.2)', minHeight: '240px' }}
                    >
                        {/* Fondo */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#C8447A] via-[#A0305F] to-[#3B1260]" />
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        {/* Orbes */}
                        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#C8447A]/40" />

                        <div className="relative z-10 flex flex-col h-full p-5">
                            {/* Badge */}
                            <span className="self-start bg-white/20 border border-white/30 rounded-full px-[10px] py-[3px] text-[0.58rem] font-bold uppercase tracking-widest text-white mb-4">
                                ★ Recomendado
                            </span>
                            {/* Icono */}
                            <div className="text-[2.2rem] mb-3">💳</div>
                            {/* Título */}
                            <div className="font-bold text-[0.97rem] text-white leading-tight mb-2">
                                Asegurar mi plaza ahora
                            </div>
                            {/* Desc */}
                            <div className="text-white/70 text-[0.76rem] leading-snug flex-1">
                                Paga y recibe una <strong className="text-[#F3AEC6]">sesión de coaching</strong> de regalo
                            </div>
                            {/* Arrow */}
                            <div className="mt-4 flex items-center gap-1 text-white/60 text-[0.78rem] font-semibold group-hover:text-white transition-colors">
                                Continuar <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                            </div>
                        </div>
                    </button>

                    {/* Card B — Agendar (secundaria) */}
                    <button
                        onClick={handleAgendar}
                        className="relative overflow-hidden rounded-[20px] text-left group flex flex-col border-2 border-[#6C3BA5]/20 hover:border-[#6C3BA5]/50 transition-all duration-300"
                        style={{ background: 'linear-gradient(160deg, #ffffff 0%, #F7F0FF 100%)', boxShadow: '0 6px 24px rgba(108,59,165,0.12)', minHeight: '240px' }}
                    >
                        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#6C3BA5]/6" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#C8447A]/5" />

                        <div className="relative z-10 flex flex-col h-full p-5">
                            {/* Spacer donde va el badge en A */}
                            <span className="self-start border border-[#6C3BA5]/20 rounded-full px-[10px] py-[3px] text-[0.58rem] font-bold uppercase tracking-widest text-[#9B8EB0] mb-4">
                                Sin compromiso
                            </span>
                            {/* Icono */}
                            <div className="text-[2.2rem] mb-3">📅</div>
                            {/* Título */}
                            <div className="font-bold text-[0.97rem] text-[#1E0E35] leading-tight mb-2">
                                Hablar primero con el equipo
                            </div>
                            {/* Desc */}
                            <div className="text-[#5A4870] text-[0.76rem] leading-snug flex-1">
                                Agenda una entrevista antes de decidir. <span className="text-[#6C3BA5] font-semibold">Gratis.</span>
                            </div>
                            {/* Arrow */}
                            <div className="mt-4 flex items-center gap-1 text-[#9B8EB0] text-[0.78rem] font-semibold group-hover:text-[#6C3BA5] transition-colors">
                                Agendar <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                            </div>
                        </div>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
