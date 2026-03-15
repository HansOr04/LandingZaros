"use client"
import React from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { CalendarPicker } from "@/components/ui/CalendarPicker";
import { PaymentSection } from "@/components/form/PaymentSection";

export const StepAgenda = () => {
    const { data, setField, goToStep, back } = useForm();

    const handleDateChange = (date: Date) => {
        setField('fechaReunion', date);
    };

    const selectedDate = data.fechaReunion;

    // Validación: fecha, hora, método de pago, y privacidad
    const isValid = 
        data.fechaReunion !== null && 
        data.horaReunion !== '' && 
        data.cuandoPagar !== '' &&
        (
            data.cuandoPagar === 'despues' || 
            (
                data.metodoPago !== '' &&
                (data.metodoPago === 'paypal' || (data.metodoPago === 'transferencia' && data.comprobantePago))
            )
        ) &&
        data.aceptaPrivacidad;

    const handleNext = () => {
        if (isValid) {
            goToStep(9); // submit step
        }
    };

    return (
        <QuestionCard
            eyebrow="Solicitud de plaza · Agenda"
            title={<>Elige tu <em>entrevista</em></>}
            hint="Selecciona el mejor horario para conocernos. Recibirás la invitación en tu correo."
            onNext={handleNext}
            onBack={back}
            nextDisabled={!isValid}
        >
            <div className="flex flex-col gap-10">

                {/* Section 1: Calendar & Time Picker */}
                <CalendarPicker
                    selectedDate={selectedDate}
                    selectedTime={data.horaReunion}
                    onDateChange={handleDateChange}
                    onTimeChange={(t) => setField('horaReunion', t)}
                    country={data.pais}
                />

                {/* Section 2: Payment Section */}
                <PaymentSection data={data} setField={setField} />

                {/* Section 3: Privacy Checkbox */}
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
                            <label htmlFor="aceptaPrivacidad" className="cursor-pointer">Acepto que mis datos sean tratados de forma confidencial para gestionar mi proceso. No serán cedidos a terceros.</label>{' '}
                            <button type="button" className="font-semibold text-[#6C3BA5] hover:underline bg-none border-none p-0 cursor-pointer">Ver Política de Privacidad</button>.
                        </p>
                    </div>
                </div>

            </div>
        </QuestionCard>
    );
};
