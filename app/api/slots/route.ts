import { NextResponse } from 'next/server';

// Esta ruta obtiene las horas ya ocupadas consultando Google Sheets a través del Webhook
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    if (!dateParam) {
        return NextResponse.json({ error: 'Falta parámetro date' }, { status: 400 });
    }

    const webhook = process.env.GOOGLE_SHEETS_WEBHOOK;

    if (!webhook) {
        console.warn('GOOGLE_SHEETS_WEBHOOK no configurado');
        // Si no hay webhook, devolvemos vacío para no bloquear la UI
        return NextResponse.json({ takenSlots: [] });
    }

    try {
        // Hacemos un GET al webhook de Apps Script con un action 'getSlots'
        const url = `${webhook}?action=getSlots&date=${dateParam}`;

        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        });

        const text = await response.text();

        try {
            const json = JSON.parse(text);
            if (json.success && json.takenSlots) {
                return NextResponse.json({ takenSlots: json.takenSlots });
            }
        } catch (e) {
            console.error('[Slots API] Respuesta no válida de Google Sheets:', text.substring(0, 100));
        }

        return NextResponse.json({ takenSlots: [] });

    } catch (error) {
        console.error('Error obteniendo slots:', error);
        return NextResponse.json({ takenSlots: [] });
    }
}
