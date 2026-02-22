export interface FormState {
    // Step 1
    nombre: string;
    // Step 2
    pais: string;
    documento: string;
    // Step 3
    email: string;
    // Step 4
    whatsapp: string;
    codigoPais: string;
    // Step 5
    educacion: string;
    sector: string;
    laboral: string;
    // Step 6
    bootcampElegido: string;
    // Step 7
    mot1: string;
    mot2: string;
    // Step 8
    fechaReunion: string;
    horaReunion: string;
    certificado: boolean;
    privacidad: boolean;
}

export type Level = 1 | 2 | 3;

export interface Recommendation {
    nivel: Level;
    titulo: string;
    razon: string;
}
