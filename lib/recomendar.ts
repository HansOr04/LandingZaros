import { FormState, Recommendation } from '../types/form';

export function getRecommendation(data: Partial<FormState>): Recommendation {
    const { educacion, sector, laboral, mot1, mot2, bootcampElegido } = data;

    let nivel: 1 | 2 | 3 = 1;

    if (educacion === 'Universitario' || laboral === 'Sin experiencia') {
        nivel = 1;
    }
    if (educacion === 'Graduada' || sector === 'Sector Privado' || sector === 'Emprendimiento') {
        nivel = 2;
    }
    if (educacion === 'Master' || educacion === 'Doctorado' || sector === 'ONG' || sector === 'Sector Público') {
        nivel = 3;
    }

    // Override by exact fields if desired, but this follows the basic logic.
    let titulo = "";
    let razon = "";

    switch (nivel) {
        case 1:
            titulo = "Bootcamp Liderazgo Emergente";
            razon = `Analizamos tu perfil con educación ${educacion} y experiencia ${laboral}. Este bootcamp es ideal para dar los primeros pasos fuertes en tu liderazgo.`;
            break;
        case 2:
            titulo = "Bootcamp Liderazgo Estratégico";
            razon = `Tu perfil en el sector ${sector} con nivel de estudios ${educacion} encaja perfectamente para llevar tu liderazgo al siguiente nivel estratégico.`;
            break;
        case 3:
            titulo = "Bootcamp Liderazgo Ejecutivo";
            razon = `Dado tu alto nivel de estudios (${educacion}) y experiencia en el sector ${sector}, este programa élite potenciará tu influencia directiva al máximo.`;
            break;
    }

    return { nivel, titulo, razon };
}
