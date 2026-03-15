export type NivelBootcamp = 'nivel1' | 'nivel2' | 'nivel3';
export type NivelEdu = 'universitario' | 'graduada' | 'master' | 'doctorado';
export type Sector = 'privado' | 'publico' | 'ong' | 'emprendimiento';
export type Laboral = 'si' | 'no' | 'independiente';
export type MetodoPago = 'transferencia' | 'paypal' | '';
export type CuandoPagar = 'ahora' | 'despues' | '';

export interface FormData {
    // Datos personales
    nombre: string;
    pais: string;
    documento: string;
    email: string;
    waCode: string;      // ej. "+593"
    waNumero: string;    // ej. "99 123 4567"

    // Perfil
    edu: NivelEdu | '';
    laboral: Laboral | '';
    sector: Sector | '';

    // Bootcamp
    bootcampElegido: NivelBootcamp | '';

    // Motivación
    mot1: string;
    mot2: string;
    recomendo: string;

    // Agenda
    fechaReunion: Date | null;
    horaReunion: string;

    // Pago
    cuandoPagar: CuandoPagar;
    metodoPago: MetodoPago;
    comprobantePago?: string; // URL de Cloudinary para transferencia

    // Privacidad
    aceptaPrivacidad: boolean;

    // Resultado (calculado al final)
    bootcampRecomendado: NivelBootcamp | '';
    razonRecomendacion: string;
    meetLink?: string;
}

export const FORM_INITIAL: FormData = {
    nombre: '',
    pais: '',
    documento: '',
    email: '',
    waCode: '+593',
    waNumero: '',
    edu: '',
    laboral: '',
    sector: '',
    bootcampElegido: '',
    mot1: '',
    mot2: '',
    recomendo: '',
    fechaReunion: null,
    horaReunion: '',
    cuandoPagar: '',
    metodoPago: '',
    aceptaPrivacidad: false,
    bootcampRecomendado: '',
    razonRecomendacion: ''
};
