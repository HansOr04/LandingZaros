"use client"
import React, { useEffect, useState } from "react";
import { useForm } from "@/components/form/FormContext";
import { recomendar } from "@/lib/recomendar";
import { motion, AnimatePresence } from "framer-motion";

export const StepAnalisis = () => {
    const { data, setField, goToStep } = useForm();
    const [rec, setRec] = useState<ReturnType<typeof recomendar> | null>(null);
    const [statusIndex, setStatusIndex] = useState(0);

    const STATUS_MESSAGES = [
        "Procesando experiencia y sector…",
        "Evaluando motivación y potencial…",
        "Calculando alineación con Método 3C…",
        "Comparando con perfiles de la red LATAM…",
        "✦ Match encontrado"
    ];

    useEffect(() => {
        // 1. Calculate and save recommendation
        const recomendacion = recomendar(data);
        setRec(recomendacion);
        setField('bootcampRecomendado', recomendacion.nivel);
        setField('razonRecomendacion', recomendacion.razon);

        // 2. Setup text rotations
        const textInterval = setInterval(() => {
            setStatusIndex(prev => {
                if (prev < STATUS_MESSAGES.length - 1) return prev + 1;
                return prev;
            });
        }, 900);

        // 3. Move to Step 9 (resultado/decisión) automatically after 4800ms
        const finishTimeout = setTimeout(() => {
            goToStep(9);
        }, 4800);

        return () => {
            clearInterval(textInterval);
            clearTimeout(finishTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Helper specific to metrics animation delay
    const [barsFilled, setBarsFilled] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setBarsFilled(true), 200); // Trigger fill a bit after mount
        return () => clearTimeout(t);
    }, []);

    const [descriptionsDone, setDescriptionsDone] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setDescriptionsDone(true), 1400); // 1.2s after fill starts
        return () => clearTimeout(t);
    }, []);

    if (!rec) return null;

    const cards = [
        { key: 'liderazgo', label: 'Índice de Confianza Estratégica', finalDesc: 'Perfil de liderazgo identificado ✓', value: rec.metricas.liderazgo },
        { key: 'crecimiento', label: 'Potencial de Proyección Valorado', finalDesc: 'Potencial de crecimiento analizado ✓', value: rec.metricas.crecimiento },
        { key: 'alineacion', label: 'Alineación con Valores Zaros', finalDesc: 'Alta alineación con comunidad Zaros ✓', value: rec.metricas.alineacion },
        { key: 'impacto', label: 'Capacidad de Impacto Multiplicador', finalDesc: 'Impacto social proyectado ✓', value: rec.metricas.impacto },
    ];

    return (
        <div className="w-full flex flex-col items-center py-[40px]">
            {/* Animating Orb */}
            <div className="relative w-[96px] h-[96px] rounded-full mb-8 shadow-[0_4px_24px_rgba(59,18,96,0.1)]">
                {/* Conic rotating gradient */}
                <div
                    className="absolute inset-0 rounded-full animate-[spin_2.5s_linear_infinite]"
                    style={{ background: 'conic-gradient(from 0deg, #C8447A, #6C3BA5, #3B1260, #C8447A)', boxShadow: '0 0 32px rgba(200,68,122,0.25)' }}
                />
                {/* Inner mask */}
                <div className="absolute inset-[6px] bg-[#FAF7F2] rounded-full z-[1] flex items-center justify-center">
                    <span
                        className="text-[2.2rem] font-bold"
                        style={{
                            background: 'linear-gradient(135deg, #6C3BA5, #C8447A)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        ✦
                    </span>
                </div>
            </div>

            {/* Title */}
            <h2 className="font-serif text-[1.5rem] text-[#3B1260] font-bold text-center mb-1">
                Analizando tu <em className="text-[#C8447A] not-italic">perfil para el programa...</em>
            </h2>
            <p className="text-[0.88rem] text-[#5A4870] text-center mb-10 max-w-sm">
                Nuestra IA procesa tus respuestas para encontrar tu match perfecto…
            </p>

            {/* Matrix of Cards */}
            <div className="w-full flex flex-col gap-4 mb-8">
                {cards.map((card, idx) => (
                    <motion.div
                        key={card.key}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.3, duration: 0.5, ease: "easeOut" }}
                        className="bg-white border border-[#EBE3F0] rounded-[16px] p-[18px_22px] shadow-[0_2px_12px_rgba(59,18,96,0.04)]"
                    >
                        <div className="flex justify-between items-end mb-2">
                            <span className="font-bold text-[#3B1260] text-[0.85rem]">{card.label}</span>
                            <span className="font-serif text-[#C8447A] font-bold text-[1.1rem]">
                                {barsFilled ? card.value : 0}%
                            </span>
                        </div>
                        {/* Track */}
                        <div className="w-full h-[7px] bg-[#F3EDE3] rounded-full overflow-hidden mb-2">
                            {/* Fill */}
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: 'linear-gradient(90deg, #6C3BA5, #C8447A)' }}
                                initial={{ width: "0%" }}
                                animate={{ width: barsFilled ? `${card.value}%` : "0%" }}
                                transition={{ duration: 1.4, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-[0.74rem] text-[#9B8EB0] italic">
                            {descriptionsDone ? card.finalDesc : "Evaluando…"}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Cycling Status Text */}
            <div className="h-[20px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={statusIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-center text-[0.84rem] text-[#9B8EB0] italic"
                    >
                        {STATUS_MESSAGES[statusIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
};
