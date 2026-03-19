"use client"
import React from 'react';
import { useForm } from "./FormContext";
import { Stepper } from './Stepper';
import { AnimatePresence, motion } from 'framer-motion';
import { StepNombre } from './steps/StepNombre';
import { StepPaisDoc } from './steps/StepPaisDoc';
import { StepEmail } from './steps/StepEmail';
import { StepWhatsApp } from './steps/StepWhatsApp';
import { StepPerfil } from './steps/StepPerfil';

import { StepPrograma } from './steps/StepPrograma';
import { StepMotivacion } from './steps/StepMotivacion';
import { StepAgenda } from './steps/StepAgenda';
import { StepAnalisis } from './steps/StepAnalisis';
import { StepResultado } from './steps/StepResultado';
import { StepPago } from './steps/StepPago';
import { StepConfirmacion } from './steps/StepConfirmacion';

export const FormWrapper = () => {
    const { step, direction } = useForm();

    const renderStep = () => {
        switch (step) {
            case 1: return <StepNombre />;
            case 2: return <StepPaisDoc />;
            case 3: return <StepEmail />;
            case 4: return <StepWhatsApp />;
            case 5: return <StepPerfil />;
            case 6: return <StepPrograma />;
            case 7: return <StepMotivacion />;
            case 8: return <StepAnalisis />;
            case 9: return <StepResultado />;
            case 10: return <StepPago />;
            case 11: return <StepAgenda />;
            case 12: return <StepConfirmacion />;
            default:
                return (
                    <div className="p-8 text-center text-[#5A4870]">
                        <h2>Paso Actual: {step}</h2>
                        <p>Aún no implementado</p>
                    </div>
                );
        }
    };

    const variants = {
        enter: (dir: 'forward' | 'backward') => ({
            x: dir === 'forward' ? 40 : -40,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir: 'forward' | 'backward') => ({
            x: dir === 'forward' ? -40 : 40,
            opacity: 0
        })
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center">
            {/* Stepper takes upper space */}
            {step < 8 && (
                <div className="w-full pt-8 pb-4 sticky top-0 bg-[#FAF7F2]/90 backdrop-blur z-50">
                    <Stepper />
                </div>
            )}

            {/* Form Content */}
            <div className="flex-1 w-full max-w-2xl flex items-center justify-center p-4">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div >
    );
};
