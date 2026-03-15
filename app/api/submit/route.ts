import { NextRequest, NextResponse } from 'next/server'
import { recomendar } from '@/lib/recomendar'
import { guardarEnSheets } from '@/lib/sheets'
import { enviarConfirmacionPostulante, enviarNotificacionZaros } from '@/lib/brevo'
import type { FormData } from '@/types/form'

export async function POST(req: NextRequest) {
    try {
        const body: FormData = await req.json()

        console.log('[Submit] Nueva postulación de:', body.nombre)

        // 1. Calcular recomendación
        const rec = recomendar(body)
        console.log('[Submit] Recomendación calculada:', rec.nivel)

        // 2. Guardar en Sheets + crear evento Calendar
        let meetLink = ''
        let eventoId = ''

        try {
            const sheetsResult = await guardarEnSheets(body, rec)
            if (sheetsResult.success) {
                meetLink = sheetsResult.meetLink || ''
                eventoId = sheetsResult.eventoId || ''
                console.log('[Submit] Sheets OK — meetLink:', meetLink)
            } else {
                console.error('[Submit] Sheets falló pero continuamos')
            }
        } catch (e) {
            console.error('[Submit] Error Sheets (no bloquea):', e)
        }

        // 3. Enviar correos en paralelo
        // Agregar meetLink a los datos para que aparezca en el correo
        const dataConMeet = { ...body, meetLink }

        const [emailPostulante, emailZaros] = await Promise.allSettled([
            enviarConfirmacionPostulante(dataConMeet as FormData, rec),
            enviarNotificacionZaros(dataConMeet as FormData, rec),
        ])

        console.log('[Submit] Email postulante:', emailPostulante.status)
        console.log('[Submit] Email Zaros:', emailZaros.status)

        return NextResponse.json({
            success: true,
            recomendacion: rec,
            meetLink,
            eventoId,
        })

    } catch (error) {
        console.error('[Submit] Error general:', error)
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
