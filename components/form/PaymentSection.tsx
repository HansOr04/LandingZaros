"use client"
import React, { useState } from 'react';
import type { CuandoPagar, MetodoPago } from '@/types/form';
import type { FormData } from '@/types/form';
import { motion } from 'framer-motion';

interface PaymentSectionProps {
    data: FormData;
    setField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}

const PAYPAL_LINKS: Record<string, string> = {
    'nivel1': 'https://www.paypal.com/ncp/payment/NJLFEW7WF8N4L',
    'nivel2': 'https://www.paypal.com/ncp/payment/YPREZ9W86RYTN',
    'nivel3': 'https://www.paypal.com/ncp/payment/QMH2QSJXCME6E',
};

const BANK_ACCOUNT_EC = {
    guayaquil: {
        name: 'BANCO DE GUAYAQUIL',
        account: '0029814533',
        type: 'Cuenta de Ahorros',
        titular: 'ZULENA ALEXANDRA ROSERO ERAZO',
        ci: '0401156872',
        email: 'zulay27_2@hotmail.com',
    },
    pichincha: {
        name: 'BANCO DE PICHINCHA',
        account: '3361859404',
        titular: 'ZULENA ROSERO ERAZO',
        ci: '0401156872',
    },
};

const isEcuadorian = (pais: string): boolean => {
    return pais.toLowerCase() === 'ecuador';
};

export const PaymentSection = ({ data, setField }: PaymentSectionProps) => {
    const [uploadingFile, setUploadingFile] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const ecuadorian = isEcuadorian(data.pais);
    const bootcamp = data.bootcampElegido as string;
    const paypalLink = PAYPAL_LINKS[bootcamp] || PAYPAL_LINKS['nivel1'];

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setUploadError('Por favor selecciona una imagen válida');
            return;
        }

        setUploadingFile(true);
        setUploadError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'zaros_bootcamp'); // Sin firma, usando upload_preset

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dlvxbk47p/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error uploading file');
            }

            const data = await response.json();
            setField('comprobantePago', data.secure_url);
        } catch (error) {
            setUploadError('Error al subir la imagen. Intenta de nuevo.');
            console.error('Upload error:', error);
        } finally {
            setUploadingFile(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    return (
        <div className="bg-white border border-[#EBE3F0] rounded-[22px] p-[28px_32px] space-y-6">
            <h3 className="text-[1.05rem] font-bold text-[#1E0E35] mb-4">
                💳 Método de Pago
            </h3>

            {/* Para ecuatorianos: opción de cuándo pagar */}
            {ecuadorian && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#3B1260]/5 to-[#C8447A]/5 border border-[#6C3BA5]/15 rounded-[16px] p-5 space-y-3"
                >
                    <p className="text-[0.9rem] font-bold text-[#1E0E35]">
                        ¿Cuándo deseas pagar?
                    </p>
                    <div className="space-y-2">
                        {(['ahora', 'despues'] as const).map((option) => (
                            <label
                                key={option}
                                className={`border-2 rounded-[14px] p-[14px_18px] flex items-center gap-[12px] cursor-pointer transition-all ${
                                    data.cuandoPagar === option
                                        ? 'border-[#3B1260] bg-[#3B1260]/5'
                                        : 'border-[#EBE3F0] bg-white hover:border-[#3B1260]/30'
                                }`}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                                        data.cuandoPagar === option
                                            ? 'border-[#3B1260] bg-[#3B1260]'
                                            : 'border-[#DDD4E8]'
                                    }`}
                                >
                                    {data.cuandoPagar === option && (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                </div>
                                <span className="font-semibold text-[#1E0E35]">
                                    {option === 'ahora' ? '✨ Pagar ahora' : '⏰ Pagar después de la reunión'}
                                </span>
                                <input
                                    type="radio"
                                    name="cuandoPagar"
                                    value={option}
                                    className="hidden"
                                    onChange={() => setField('cuandoPagar', option as CuandoPagar)}
                                    checked={data.cuandoPagar === option}
                                />
                            </label>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Métodos de pago */}
            {(!ecuadorian || data.cuandoPagar === 'ahora') && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <label className="text-[0.9rem] font-bold text-[#1E0E35] block">
                        {ecuadorian ? 'Elige tu método de pago' : 'Medio de pago'}
                    </label>

                    {/* PayPal - para todos */}
                    <label className={`border-2 rounded-[16px] p-[18px_22px] flex items-start gap-[15px] cursor-pointer transition-all ${
                        data.metodoPago === 'paypal'
                            ? 'border-[#3B1260] bg-[#3B1260]/[0.03]'
                            : 'border-[#EBE3F0] bg-white hover:border-[#3B1260]/30'
                    }`}>
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all mt-1 ${
                                data.metodoPago === 'paypal'
                                    ? 'border-[#3B1260] bg-[#3B1260]'
                                    : 'border-[#DDD4E8]'
                            }`}
                        >
                            {data.metodoPago === 'paypal' && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🟠</span>
                                <span className="font-bold text-[#1E0E35] text-[0.95rem]">PayPal</span>
                            </div>
                            <p className="text-[#5A4870] text-[0.8rem]">
                                Paga de forma segura con tu tarjeta de crédito o PayPal
                            </p>
                        </div>
                        <input
                            type="radio"
                            name="metodoPago"
                            value="paypal"
                            className="hidden"
                            onChange={() => setField('metodoPago', 'paypal' as MetodoPago)}
                            checked={data.metodoPago === 'paypal'}
                        />
                    </label>

                    {/* Transferencia - solo para ecuatorianos */}
                    {ecuadorian && (
                        <label className={`border-2 rounded-[16px] p-[18px_22px] flex items-start gap-[15px] cursor-pointer transition-all ${
                            data.metodoPago === 'transferencia'
                                ? 'border-[#3B1260] bg-[#3B1260]/[0.03]'
                                : 'border-[#EBE3F0] bg-white hover:border-[#3B1260]/30'
                        }`}>
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all mt-1 ${
                                    data.metodoPago === 'transferencia'
                                        ? 'border-[#3B1260] bg-[#3B1260]'
                                        : 'border-[#DDD4E8]'
                                }`}
                            >
                                {data.metodoPago === 'transferencia' && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">💸</span>
                                    <span className="font-bold text-[#1E0E35] text-[0.95rem]">Transferencia Bancaria</span>
                                </div>
                                <p className="text-[#5A4870] text-[0.8rem]">
                                    Transfiere desde tu banco. Envía comprobante por WhatsApp o sube la foto aquí.
                                </p>
                            </div>
                            <input
                                type="radio"
                                name="metodoPago"
                                value="transferencia"
                                className="hidden"
                                onChange={() => setField('metodoPago', 'transferencia' as MetodoPago)}
                                checked={data.metodoPago === 'transferencia'}
                            />
                        </label>
                    )}
                </motion.div>
            )}

            {/* PayPal Button / Link */}
            {data.metodoPago === 'paypal' && (!ecuadorian || data.cuandoPagar === 'ahora') && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#FDB750]/10 to-[#FDB750]/5 border border-[#FDB750]/30 rounded-[16px] p-6"
                >
                    <p className="text-[0.85rem] text-[#5A4870] mb-4">
                        Haz clic en el botón de abajo para abrir PayPal de forma segura:
                    </p>
                    <a
                        href={paypalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#0070BA] text-white font-bold rounded-[12px] hover:bg-[#005EA6] transition-colors text-[0.95rem]"
                    >
                        <span className="text-xl">🔗</span>
                        {' Ir a PayPal'}
                    </a>
                    <p className="text-[0.75rem] text-[#9B8EB0] mt-3 text-center">
                        Se abrirá en una nueva ventana. Vuelve aquí después de completar el pago.
                    </p>
                </motion.div>
            )}

            {/* Información de Transferencia */}
            {data.metodoPago === 'transferencia' && ecuadorian && data.cuandoPagar === 'ahora' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="bg-gradient-to-br from-[#3B1260]/5 to-[#C8447A]/5 border border-[#6C3BA5]/15 rounded-[16px] p-5 space-y-4">
                        <h4 className="font-bold text-[#1E0E35] text-[0.95rem] flex items-center gap-2">
                            <span>🏦</span> Información de Cuentas
                        </h4>

                        {/* Banco Guayaquil */}
                        <div className="bg-white rounded-[12px] p-4 border border-[#DDD4E8]">
                            <p className="font-semibold text-[#1E0E35] text-[0.9rem] mb-3">
                                🔵 {BANK_ACCOUNT_EC.guayaquil.name}
                            </p>
                            <div className="space-y-2 text-[0.8rem] text-[#5A4870]">
                                <div>
                                    <span className="font-semibold">Cuenta:</span> {BANK_ACCOUNT_EC.guayaquil.account}
                                </div>
                                <div>
                                    <span className="font-semibold">Tipo:</span> {BANK_ACCOUNT_EC.guayaquil.type}
                                </div>
                                <div>
                                    <span className="font-semibold">Titular:</span> {BANK_ACCOUNT_EC.guayaquil.titular}
                                </div>
                                <div>
                                    <span className="font-semibold">Cédula:</span> {BANK_ACCOUNT_EC.guayaquil.ci}
                                </div>
                                <div>
                                    <span className="font-semibold">Email:</span> {BANK_ACCOUNT_EC.guayaquil.email}
                                </div>
                            </div>
                        </div>

                        {/* Banco Pichincha */}
                        <div className="bg-white rounded-[12px] p-4 border border-[#DDD4E8]">
                            <p className="font-semibold text-[#1E0E35] text-[0.9rem] mb-3">
                                🟡 {BANK_ACCOUNT_EC.pichincha.name}
                            </p>
                            <div className="space-y-2 text-[0.8rem] text-[#5A4870]">
                                <div>
                                    <span className="font-semibold">Cuenta:</span> {BANK_ACCOUNT_EC.pichincha.account}
                                </div>
                                <div>
                                    <span className="font-semibold">Titular:</span> {BANK_ACCOUNT_EC.pichincha.titular}
                                </div>
                                <div>
                                    <span className="font-semibold">Cédula:</span> {BANK_ACCOUNT_EC.pichincha.ci}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instrucciones de transferencia */}
                    <div className="bg-[#E8F4F8] border border-[#6C9FAE] rounded-[14px] p-4">
                        <p className="font-bold text-[#0D5A6E] text-[0.9rem] flex items-center gap-2 mb-3">
                            <span>📋</span> Pasos a seguir:
                        </p>
                        <ol className="space-y-2 text-[0.8rem] text-[#0D5A6E] list-decimal list-inside">
                            <li>Realiza la transferencia a una de las cuentas de arriba</li>
                            <li>
                                <span className="font-semibold">Envía un mensaje por WhatsApp</span> confirmando la asistencia:
                                <a href={`https://wa.me/${data.waCode}${data.waNumero.replaceAll(' ', '')}`} target="_blank" rel="noopener noreferrer" className="text-[#0070BA] font-semibold hover:underline inline ml-1">
                                    Contactar
                                </a>
                            </li>
                            <li>Después sube la <span className="font-semibold">foto del comprobante</span> aquí:</li>
                        </ol>
                    </div>

                    {/* Upload area */}
                    <div
                        role="button"
                        tabIndex={0}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                document.getElementById('transfer-proof')?.click();
                            }
                        }}
                        className={`border-2 border-dashed rounded-[14px] p-6 text-center transition-all cursor-pointer ${
                            uploadingFile
                                ? 'border-[#3B1260] bg-[#3B1260]/5'
                                : 'border-[#DDD4E8] bg-[#FAF7F2] hover:border-[#3B1260] hover:bg-[#3B1260]/[0.02]'
                        }`}
                    >
                        <input
                            type="file"
                            id="transfer-proof"
                            accept="image/*"
                            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                            disabled={uploadingFile}
                            className="hidden"
                        />
                        {uploadingFile && (
                            <div className="flex flex-col items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8447A]"></div>
                                <p className="text-[#5A4870] font-semibold text-[0.9rem]">Subiendo...</p>
                            </div>
                        )}
                        {!uploadingFile && data.comprobantePago && (
                            <div className="flex flex-col items-center gap-3">
                                <span className="text-3xl">✅</span>
                                <p className="font-bold text-[#1E0E35] text-[0.9rem]">Comprobante subido exitosamente</p>
                                <p className="text-[#5A4870] text-[0.8rem]">Puedes cambiar la imagen si lo deseas</p>
                                <label
                                    htmlFor="transfer-proof"
                                    className="mt-2 text-[#6C3BA5] font-semibold text-[0.85rem] cursor-pointer hover:underline"
                                >
                                    Cambiar imagen
                                </label>
                            </div>
                        )}
                        {!uploadingFile && !data.comprobantePago && (
                            <label
                                htmlFor="transfer-proof"
                                className="flex flex-col items-center gap-3 cursor-pointer"
                            >
                                <span className="text-4xl">📸</span>
                                <p className="font-bold text-[#1E0E35] text-[0.9rem]">Sube tu comprobante de transferencia</p>
                                <p className="text-[#5A4870] text-[0.8rem]">Arrastra la imagen aquí o haz clic para seleccionar</p>
                                <div className="mt-2 text-[0.75rem] text-[#9B8EB0]">
                                    PNG, JPG o JPEG · Máx 5MB
                                </div>
                            </label>
                        )}
                    </div>

                    {uploadError && (
                        <div className="bg-[#FDEAEA] border border-[#F5A5A5] text-[#C53F3F] rounded-[12px] p-3 text-[0.85rem]">
                            {uploadError}
                        </div>
                    )}
                </motion.div>
            )}

            {/* Note for foreigners - PayPal only */}
            {!ecuadorian && (
                <div className="bg-[#E8F4F8] border border-[#6C9FAE] rounded-[14px] p-4">
                    <p className="text-[0.85rem] text-[#0D5A6E]">
                        <span className="font-bold">ℹ️ Nota:</span> PayPal es el único método de pago disponible para usuarios internacionales.
                    </p>
                </div>
            )}
        </div>
    );
};
