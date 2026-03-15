import type { FormData } from '@/types/form'
import type { Recomendacion } from './recomendar'

export async function guardarEnSheets(
    data: FormData,
    rec: Recomendacion
): Promise<{ success: boolean; meetLink?: string; eventoId?: string }> {

    const webhook = process.env.GOOGLE_SHEETS_WEBHOOK

    if (!webhook) {
        console.warn('[Sheets] GOOGLE_SHEETS_WEBHOOK no configurado')
        return { success: false }
    }

    const payload = {
        timestamp: new Date().toISOString(),
        nombre: data.nombre,
        email: data.email,
        whatsapp: `${data.waCode} ${data.waNumero}`,
        pais: data.pais,
        documento: data.documento,
        edu: data.edu,
        laboral: data.laboral,
        sector: data.sector,
        bootcamp_elegido: data.bootcampElegido,
        bootcamp_recomendado: rec.nivel,
        bootcamp_titulo: rec.titulo,
        fecha_reunion: data.fechaReunion ? new Date(data.fechaReunion).toISOString() : '',
        hora_reunion: data.horaReunion,
        cuando_pagar: data.cuandoPagar,
        metodo_pago: data.metodoPago,
        comprobante_pago: data.comprobantePago || '',
        recomendo: data.recomendo,
        mot1: data.mot1,
        mot2: data.mot2,
    }

    console.log('[Sheets] Enviando a:', webhook)
    console.log('[Sheets] Payload:', JSON.stringify(payload))

    try {
        const response = await fetch(webhook, {
            method: 'POST',
            redirect: 'follow',      // seguir el 302 de Apps Script
            headers: {
                // text/plain evita el preflight CORS que bloquea application/json
                // el JSON.parse del Apps Script igual funciona
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload),
        })

        const text = await response.text()
        console.log('[Sheets] Respuesta HTTP status:', response.status)
        console.log('[Sheets] Respuesta body:', text)

        try {
            const json = JSON.parse(text)
            if (json.success) {
                console.log('[Sheets] ✅ Guardado correctamente')
                return {
                    success: true,
                    meetLink: json.meetLink || '',
                    eventoId: json.eventoId || '',
                }
            } else {
                console.error('[Sheets] ❌ Error del script:', json.error)
                return { success: false }
            }
        } catch {
            // A veces Apps Script devuelve HTML en errores de autorización
            console.error('[Sheets] Respuesta no es JSON válido:', text.slice(0, 200))
            return { success: false }
        }

    } catch (err) {
        console.error('[Sheets] fetch error:', err)
        return { success: false }
    }
}
