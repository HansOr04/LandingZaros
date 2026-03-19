"use client"
import React, { useMemo } from "react";
import { useForm } from "@/components/form/FormContext";
import { recomendar } from "@/lib/recomendar";
import { formatFecha, formatFechaCorta } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

export const StepConfirmacion = () => {
    const { data } = useForm();
    const rec = useMemo(() => recomendar(data), [data]);

    const nombrePrint = data.nombre?.split(' ')[0] || 'tú';
    const isPagarPath = data.decisionPath === 'pagar';
    const { fechaReunion, horaReunion } = data;

    const tipoSesion = isPagarPath ? 'Sesión de coaching' : 'Entrevista de admisión';

    // WhatsApp message
    const sesionStr = fechaReunion
        ? ` Agendé mi ${tipoSesion.toLowerCase()} para el ${formatFecha(new Date(fechaReunion))} a las ${horaReunion}.`
        : '';
    const msg = `Hola, soy ${nombrePrint}. Completé mi postulación a Zaros Latam y me recomendaron el ${rec.titulo}.${sesionStr}`;
    const waLink = `https://api.whatsapp.com/send/?phone=593998997846&text=${encodeURIComponent(msg)}`;

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
                    <div className="text-[2.8rem] mb-[14px]">🎉</div>
                    <div className="bg-white/10 border border-white/20 rounded-full px-[18px] py-[6px] text-[0.78rem] text-white/80 font-bold uppercase tracking-wide mb-6 inline-block">
                        ¡Todo listo, {nombrePrint}!
                    </div>
                    <h2 className="font-serif text-[1.75rem] text-white font-bold leading-[1.2] mb-4">
                        Tu postulación <em className="text-[#F3AEC6] not-italic">está confirmada</em>
                    </h2>
                    <p className="text-[0.87rem] text-white/70 leading-[1.6] max-w-[300px]">
                        {isPagarPath
                            ? 'Recibimos tu pago y tu sesión de coaching queda registrada. Te esperamos.'
                            : 'Tu entrevista está agendada. Nuestro equipo te contactará en el horario elegido.'}
                    </p>
                </div>
            </motion.div>

            {/* 2. Resumen de la sesión agendada */}
            {fechaReunion && horaReunion && (
                <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    className="flex flex-col gap-3"
                >
                    <div className="bg-[#FAF7F2] border border-[#EBE3F0] rounded-[16px] p-[18px_22px] flex items-center gap-[14px]">
                        <div className="text-[1.9rem] flex-shrink-0">
                            {isPagarPath ? '🎁' : '📅'}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-[0.68rem] font-bold text-[#9B8EB0] uppercase tracking-wider">
                                {tipoSesion}
                            </span>
                            <span className="font-bold text-[#1E0E35] text-[0.95rem]">
                                {formatFecha(new Date(fechaReunion))} a las {horaReunion}
                            </span>
                            <span className="text-[#5A4870] text-[0.8rem]">30 min · Google Meet</span>
                            <div className="bg-[#6C3BA5]/10 border border-[#6C3BA5]/15 rounded-full px-[10px] py-[3px] text-[0.71rem] text-[#6C3BA5] font-semibold mt-2 inline-flex w-fit">
                                📧 Invitación enviada a tu correo y Google Calendar
                            </div>
                            {data.meetLink && (
                                <a
                                    href={data.meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-flex items-center gap-2 bg-[#3B1260] text-white text-[0.85rem] font-semibold px-5 py-[10px] rounded-[8px] hover:bg-[#5A1F8A] transition-colors w-fit"
                                >
                                    🎥 Unirse a Google Meet
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#C8447A]/5 border border-[#C8447A]/20 rounded-[14px] p-[16px_20px]">
                        <p className="text-[0.88rem] text-[#3B1260] leading-[1.6]">
                            🌟 <strong>¡Estás a un paso!</strong> Nuestro equipo te espera el{' '}
                            <strong>{formatFechaCorta(new Date(fechaReunion))}</strong> a las{' '}
                            <strong>{horaReunion}</strong>. Revisa tu correo — ya tienes tu invitación.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* 3. Programa recomendado */}
            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="bg-white border-2 border-[#C8447A] rounded-[22px] overflow-hidden shadow-[0_8px_36px_rgba(200,68,122,0.15)]"
            >
                <div className="bg-gradient-to-br from-[#FDF0F5] to-white p-[20px_26px] border-b border-[#C8447A]/10 flex justify-between items-center">
                    <span className="text-[#C8447A] text-[0.65rem] font-bold uppercase tracking-wider">
                        ★ Tu programa
                    </span>
                    <span className="bg-[#FAF7F2] border border-[#EBE3F0] text-[#9B8EB0] text-[0.7rem] font-bold rounded-full px-3 py-1">
                        {rec.nivel_label}
                    </span>
                </div>
                <div className="p-[22px_26px]">
                    <h3 className="font-serif text-[1.1rem] font-bold text-[#3B1260] mb-3 leading-snug">
                        {rec.titulo}
                    </h3>
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

            {/* 4. CTA WhatsApp + redes */}
            <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="flex flex-col gap-[11px]"
            >
                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#25D366] to-[#1DAA56] text-white p-[17px] rounded-[15px] font-bold text-[0.94rem] flex items-center justify-center gap-[10px] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)] transition-all duration-300"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382C17.152 14.222 15.561 13.442 15.268 13.333C14.981 13.23 14.768 13.178 14.556 13.498C14.343 13.818 13.733 14.536 13.547 14.748C13.36 14.962 13.174 14.988 12.855 14.828C12.536 14.668 11.494 14.331 10.254 13.227C9.289 12.369 8.647 11.314 8.461 10.994C8.275 10.674 8.441 10.501 8.601 10.342C8.745 10.198 8.92 9.985 9.08 9.814C9.239 9.644 9.293 9.516 9.399 9.303C9.506 9.09 9.452 8.904 9.373 8.744C9.293 8.584 8.655 7.013 8.389 6.374C8.13 5.752 7.868 5.836 7.676 5.827C7.498 5.819 7.285 5.821 7.072 5.821C6.859 5.821 6.514 5.901 6.221 6.221C5.928 6.541 5.099 7.313 5.099 8.883C5.099 10.453 6.248 11.969 6.407 12.182C6.567 12.395 8.679 15.589 11.838 16.958C12.59 17.284 13.178 17.481 13.635 17.625C14.39 17.865 15.078 17.831 15.617 17.747C16.222 17.653 17.472 16.974 17.738 16.229C18.004 15.483 18.004 14.844 17.472 14.382ZM11.904 22C10.22 22 8.618 21.547 7.234 20.728L6.924 20.544L3.107 21.545L4.131 17.81L3.929 17.489C3.047 16.082 2.584 14.436 2.584 12.723C2.584 7.604 6.756 3.447 11.91 3.447C14.39 3.447 16.712 4.412 18.463 6.166C20.215 7.919 21.18 10.243 21.18 12.727C21.17 17.842 17.003 22 11.904 22ZM19.727 4.974C17.632 2.88 14.849 1.724 11.904 1.724C5.839 1.724 0.904 6.643 0.904 12.691C0.904 14.629 1.411 16.505 2.355 18.156L0 26L8.038 23.896C9.622 24.757 11.417 25.21 13.255 25.21V25.21C20.203 25.21 25.759 19.664 25.759 12.724C25.759 9.358 24.448 6.177 19.727 4.974Z" />
                    </svg>
                    Confirmar por WhatsApp
                </a>

                <div className="flex items-center justify-center gap-5 flex-wrap mt-2 text-[0.85rem] text-[#6C3BA5] font-semibold">
                    <a href="https://www.instagram.com/zaros.latam" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">📸 @zaros.latam</a>
                    <a href="https://www.linkedin.com/company/zaros-latam/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">💼 LinkedIn</a>
                    <a href="https://zaros-latam.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">🌐 zaros-latam.com</a>
                </div>
            </motion.div>

        </div>
    );
};
