"use client"
import React, { useEffect } from "react";
import { useForm } from "@/components/form/FormContext";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { PaymentSection } from "@/components/form/PaymentSection";

export const StepPago = () => {
    const { data, setField, goToStep } = useForm();

    // El usuario ya decidió pagar → fijar cuandoPagar en 'ahora' automáticamente
    useEffect(() => {
        setField('cuandoPagar', 'ahora');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Válido cuando hay método elegido y comprobante subido (para cualquier método)
    const isValid =
        data.metodoPago !== '' &&
        !!data.comprobantePago;

    const handleNext = () => {
        if (isValid) {
            goToStep(11);
        }
    };

    return (
        <QuestionCard
            eyebrow="Asegurar plaza · Pago"
            title={<>Completa tu <em>pago</em></>}
            hint="Elige cómo quieres pagar. Una vez confirmado, agendarás tu sesión de coaching gratuita de bienvenida."
            onNext={handleNext}
            onBack={() => goToStep(9)}
            nextDisabled={!isValid}
            nextLabel="Continuar a agendar mi sesión →"
        >
            <PaymentSection data={data} setField={setField} hideTiming />
        </QuestionCard>
    );
};
