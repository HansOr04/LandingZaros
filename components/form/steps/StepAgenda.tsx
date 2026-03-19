"use client"
import React from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { CalendarPicker } from "@/components/ui/CalendarPicker";

export const StepAgenda = () => {
    const { data, setField, goToStep } = useForm();
    const isPagarPath = data.decisionPath === 'pagar';

    const handleDateChange = (date: Date) => {
        setField('fechaReunion', date);
    };

    // Validación: solo fecha, hora y privacidad — el pago ya se manejó en StepPago
    const isValid =
        data.fechaReunion !== null &&
        data.horaReunion !== '' &&
        data.aceptaPrivacidad;

    const handleNext = () => {
        if (isValid) {
            goToStep(12); // Ir a confirmación final y disparar submit
        }
    };

    // Volver al paso correcto según el path elegido
    const handleBack = () => {
        if (isPagarPath) {
            goToStep(10); // Volver a pago
        } else {
            goToStep(9); // Volver a resultado/decisión
        }
    };

    const eyebrow = isPagarPath
        ? 'Coaching personalizado · Tu regalo'
        : 'Entrevista de admisión · Agenda';

    const title = isPagarPath
        ? <><em>Agenda</em> tu sesión de coaching</>
        : <>Elige tu <em>entrevista</em></>;

    const hint = isPagarPath
        ? '¡Tu plaza está asegurada! Ahora elige el horario para tu sesión de coaching personalizada incluida en tu inscripción.'
        : 'Selecciona el mejor horario para conocernos. Recibirás la invitación en tu correo. Sin compromiso de pago.';

    const nextLabel = isPagarPath ? 'Confirmar sesión de coaching →' : 'Confirmar entrevista →';

    return (
        <QuestionCard
            eyebrow={eyebrow}
            title={title}
            hint={hint}
            onNext={handleNext}
            onBack={handleBack}
            nextDisabled={!isValid}
            nextLabel={nextLabel}
        >
            <div className="flex flex-col gap-8">
                {/* Banner contextual */}
                {isPagarPath && (
                    <div className="bg-gradient-to-r from-[#3B1260]/8 to-[#C8447A]/8 border border-[#C8447A]/20 rounded-[14px] p-[14px_18px] flex items-center gap-3">
                        <span className="text-xl shrink-0">🎁</span>
                        <p className="text-[0.83rem] text-[#3B1260] font-medium leading-snug">
                            Esta sesión de <strong>30 minutos</strong> es tu regalo de bienvenida. Te ayudará a sacar el máximo provecho del programa desde el día uno.
                        </p>
                    </div>
                )}

                {/* Calendar & Time Picker */}
                <CalendarPicker
                    selectedDate={data.fechaReunion}
                    selectedTime={data.horaReunion}
                    onDateChange={handleDateChange}
                    onTimeChange={(t) => setField('horaReunion', t)}
                    country={data.pais}
                />

                {/* Privacy Checkbox */}
                <div className="bg-white rounded-[16px] p-5 border border-[#EBE3F0]">
                    <div className="flex items-start gap-4">
                        <label htmlFor="aceptaPrivacidad" className="cursor-pointer shrink-0 mt-1">
                            <input
                                id="aceptaPrivacidad"
                                type="checkbox"
                                className="hidden"
                                checked={data.aceptaPrivacidad}
                                onChange={(e) => setField('aceptaPrivacidad', e.target.checked)}
                            />
                            <div className={`w-[22px] h-[22px] rounded-[7px] border flex items-center justify-center transition-all ${data.aceptaPrivacidad
                                ? 'bg-[#3B1260] border-[#3B1260]'
                                : 'bg-[#FAF7F2] border-[#DDD4E8] hover:border-[#3B1260]/50'
                                }`}>
                                {data.aceptaPrivacidad && (
                                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 4.5L4.5 7.5L10.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                        </label>
                        <p className="text-[0.85rem] text-[#5A4870] leading-relaxed">
                            <label htmlFor="aceptaPrivacidad" className="cursor-pointer">
                                Acepto que mis datos sean tratados de forma confidencial para gestionar mi proceso. No serán cedidos a terceros.
                            </label>{' '}
                            <button type="button" className="font-semibold text-[#6C3BA5] hover:underline bg-none border-none p-0 cursor-pointer">
                                Ver Política de Privacidad
                            </button>.
                        </p>
                    </div>
                </div>
            </div>
        </QuestionCard>
    );
};
