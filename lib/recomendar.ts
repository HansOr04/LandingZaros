import type { FormData, NivelBootcamp } from '@/types/form'

export interface Recomendacion {
    nivel: NivelBootcamp
    titulo: string
    nivel_label: string
    razon: string
    chips: string[]
    otros: NivelBootcamp[]
    metricas: {
        liderazgo: number      // 0–100
        crecimiento: number
        alineacion: number
        impacto: number
    }
}

export function recomendar(data: Partial<FormData>): Recomendacion {
    const { edu, sector, laboral, mot1 = '', mot2 = '' } = data
    const texto = (mot1 + ' ' + mot2).toLowerCase()

    // Palabras clave nivel 1
    const kw1 = ['confianza', 'empezar', 'comenzar', 'miedo', 'insegura',
        'nueva', 'inicio', 'aprender', 'base', 'fundamento']
    // Palabras clave nivel 2
    const kw2 = ['marca', 'visibilidad', 'posicionar', 'crecer', 'equipo',
        'liderar', 'empresa', 'negocio', 'emprender']
    // Palabras clave nivel 3
    const kw3 = ['impacto', 'mentorear', 'inspirar', 'transformar', 'social',
        'comunidad', 'enseñar', 'multiplicar', 'publicar']

    const score1 = kw1.filter(k => texto.includes(k)).length
    const score2 = kw2.filter(k => texto.includes(k)).length
    const score3 = kw3.filter(k => texto.includes(k)).length

    let nivel: NivelBootcamp = 'nivel1'

    // Reglas principales por perfil
    if (edu === 'doctorado' || edu === 'master') {
        nivel = (sector === 'ong' || sector === 'publico') ? 'nivel3' : 'nivel2'
    } else if (edu === 'graduada') {
        nivel = laboral === 'si' ? 'nivel2' : 'nivel1'
    } else {
        nivel = 'nivel1'
    }

    // Override por palabras clave si hay señal fuerte
    if (score3 >= 2 && nivel !== 'nivel3') nivel = 'nivel3'
    if (score1 >= 3 && nivel === 'nivel2') nivel = 'nivel1'

    // Si la postulante eligió un nivel y coincide en ±1 nivel, respetar su elección
    const elegido = data.bootcampElegido
    if (elegido && elegido !== nivel) {
        const orden = ['nivel1', 'nivel2', 'nivel3']
        const diffElegido = Math.abs(orden.indexOf(elegido) - orden.indexOf(nivel))
        if (diffElegido <= 1) nivel = elegido
    }

    const nombre = data.nombre?.split(' ')[0] || 'tú'

    const razones: Record<NivelBootcamp, string> = {
        nivel1: `"${nombre}, tus respuestas revelan que estás en el momento ideal para estructurar tu liderazgo. Tienes el potencial; ahora necesitas las herramientas y la red estratégica. El Nivel I es exactamente ese punto de inflexión que te dará la base sólida para los próximos años de tu carrera."`,
        nivel2: `"${nombre}, tu perfil indica que ya tienes una base de experiencia clara. Es el momento de posicionarte, construir tu marca personal con propósito y proyectar tu valor en el mercado. El programa de Nivel II es el acelerador natural para tu perfil."`,
        nivel3: `"${nombre}, tu trayectoria te permite no solo crecer, sino multiplicar tu impacto. Tu perfil muestra una líder lista para inspirar y dejar un legado social. El Nivel III te posicionará como referente, con mentoría y la oportunidad de publicar en la Revista Internacional."`,
    }

    const titulos: Record<NivelBootcamp, string> = {
        nivel1: 'Programa Nivel I – Confianza Estratégica',
        nivel2: 'Programa Nivel II – Marca y Proyección',
        nivel3: 'Programa Nivel III – Liderazgo Multiplicador',
    }

    const labels: Record<NivelBootcamp, string> = {
        nivel1: 'Nivel I · Fundacional',
        nivel2: 'Nivel II · Avanzado',
        nivel3: 'Nivel III · Expert',
    }

    const chipsMap: Record<NivelBootcamp, string[]> = {
        nivel1: ['10 días en vivo', 'Red LATAM', 'Método 3C', 'Certificación'],
        nivel2: ['10 días en vivo', 'Marca personal', 'Método 3C', 'Certificación'],
        nivel3: ['10 días en vivo', 'Revista Internacional', 'Método 3C', 'Certificación'],
    }

    const otrosMap: Record<NivelBootcamp, NivelBootcamp[]> = {
        nivel1: ['nivel2', 'nivel3'],
        nivel2: ['nivel1', 'nivel3'],
        nivel3: ['nivel1', 'nivel2'],
    }

    const metricasMap: Record<NivelBootcamp, Recomendacion['metricas']> = {
        nivel1: { liderazgo: 44, crecimiento: 79, alineacion: 95, impacto: 57 },
        nivel2: { liderazgo: 69, crecimiento: 86, alineacion: 95, impacto: 73 },
        nivel3: { liderazgo: 88, crecimiento: 93, alineacion: 95, impacto: 96 },
    }

    return {
        nivel,
        titulo: titulos[nivel],
        nivel_label: labels[nivel],
        razon: razones[nivel],
        chips: chipsMap[nivel],
        otros: otrosMap[nivel],
        metricas: metricasMap[nivel],
    }
}
