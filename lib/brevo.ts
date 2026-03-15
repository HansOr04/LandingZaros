import type { FormData } from '@/types/form'
import type { Recomendacion } from './recomendar'
import { formatFecha } from './utils'

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
    }
}

export async function enviarConfirmacionPostulante(
    data: FormData,
    rec: Recomendacion
): Promise<void> {
    const nombre = data.nombre.split(' ')[0]
    const subject = `🎉 ${nombre}, tu lugar en Zaros está reservado`

    let agendaHtml = ''
    if (data.fechaReunion && data.horaReunion) {
        agendaHtml = `
      <div style="background-color: #F3EDE3; border-radius: 14px; margin: 0 40px 24px; padding: 20px 24px;">
        <p style="margin: 0; font-size: 1.2rem;">📅 Tu entrevista de bienvenida:</p>
        <p style="margin: 8px 0 4px; font-size: 1rem; color: #3B1260;">
            <strong>${formatFecha(new Date(data.fechaReunion))} a las ${data.horaReunion}</strong>
        </p>
        <p style="margin: 0 0 12px; font-size: 0.9rem; color: #5A4870;">30 minutos &middot; Videollamada Google Meet</p>
        <p style="margin: 0; font-size: 0.85rem; color: #C8447A; font-weight: bold;">Ya tienes una invitación en tu correo y Google Calendar</p>
        ${data.meetLink ? `
        <div style="margin-top:10px;">
           <a href="${data.meetLink}"
              style="display:inline-block;background:#3B1260;color:white;
                     padding:10px 20px;border-radius:8px;text-decoration:none;
                     font-size:0.85rem;font-weight:600;">
             🎥 Unirse a Google Meet
           </a>
         </div>` : ''}
      </div>`
    }

    const msgWp = `Hola, mi nombre es ${nombre}. Acabo de completar mi postulación a Zaros Latam y me recomendaron el ${rec.titulo}.${data.fechaReunion ? ` Agendé mi reunión para el ${formatFecha(new Date(data.fechaReunion))} a las ${data.horaReunion}.` : ''}`
    const waLink = `https://api.whatsapp.com/send/?phone=593998997846&text=${encodeURIComponent(msgWp)}`

    const htmlContent = `
  <div style="max-width: 600px; margin: 0 auto; font-family: 'Plus Jakarta Sans', sans-serif, Arial; background-color: #FAF7F2;">
    
    <!-- HEADER -->
    <div style="background-color: #3B1260; padding: 32px 40px; text-align: center;">
      <h2 style="font-family: 'Libre Baskerville', serif; font-size: 1.4rem; color: white; letter-spacing: 0.1em; margin: 0 0 4px;">ZAROS LATAM</h2>
      <p style="color: rgba(255,255,255,0.6); font-size: 0.8rem; margin: 0;">Programa de Liderazgo Femenino</p>
    </div>

    <!-- HERO -->
    <div style="background-color: white; padding: 40px; text-align: center; border-bottom: 1px solid #EBE3F0;">
      <div style="font-size: 3rem; margin-bottom: 16px;">🎉</div>
      <h1 style="color: #3B1260; font-family: 'Libre Baskerville', serif; font-size: 1.8rem; margin: 0 0 16px;">¡${nombre}, bienvenida a Zaros!</h1>
      <p style="color: #5A4870; line-height: 1.6; font-size: 1rem; margin: 0;">
        Tu postulación fue recibida y ya tienes un lugar reservado.<br>Nuestro equipo se comunicará contigo muy pronto.
      </p>
    </div>

    <!-- PROGRAMA RECOMENDADO -->
    <div style="background-color: #FDF0F5; border: 2px solid #C8447A; border-radius: 16px; margin: 24px 40px; padding: 24px 28px;">
      <span style="color: #C8447A; font-size: 0.7rem; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 12px;">★ Tu programa recomendado</span>
      <h2 style="color: #3B1260; font-family: 'Libre Baskerville', serif; font-size: 1.2rem; font-weight: bold; margin: 0 0 10px;">${rec.titulo}</h2>
      <span style="background-color: #EBE3F0; color: #5A4870; padding: 4px 12px; border-radius: 50px; font-size: 0.72rem; font-weight: bold; display: inline-block; margin-bottom: 16px;">${rec.nivel_label}</span>
      <blockquote style="margin: 0; padding-left: 14px; border-left: 3px solid #C8447A; font-style: italic; color: #5A4870; font-size: 0.88rem; line-height: 1.6;">
        ${rec.razon}
      </blockquote>
    </div>

    ${agendaHtml}

    <!-- MENSAJE DE CELEBRACIÓN -->
    <div style="background-color: white; padding: 0 40px 32px;">
      <div style="background-color: #3B1260; border-radius: 16px; padding: 24px; color: white; text-align: center;">
        <h3 style="margin: 0 0 12px; font-size: 1.1rem; font-weight: bold;">🌟 ¡Ya ganaste tu lugar!</h3>
        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; line-height: 1.6; margin: 0;">
          Nuestro equipo te contactará${data.fechaReunion ? ` el ${formatFecha(new Date(data.fechaReunion))} a las ${data.horaReunion}` : ' muy pronto'} para tu entrevista de bienvenida. Mientras tanto, síguenos en redes para conocer más de nuestra comunidad.
        </p>
      </div>
    </div>

    <!-- CTA WHATSAPP -->
    <div style="text-align: center; padding: 0 40px 32px;">
      <a href="${waLink}" style="display: inline-block; background-color: #25D366; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 0.95rem;">
        💬 Confirmar por WhatsApp
      </a>
    </div>

    <!-- REDES SOCIALES -->
    <div style="background-color: #3B1260; padding: 24px 40px; text-align: center;">
      <a href="https://www.instagram.com/zaros.latam" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.85rem; margin: 0 10px;">📸 Instagram</a>
      <a href="https://www.linkedin.com/company/zaros-latam/" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.85rem; margin: 0 10px;">💼 LinkedIn</a>
      <a href="https://zaros-latam.com" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.85rem; margin: 0 10px;">🌐 Sitio web</a>
    </div>

    <!-- FOOTER -->
    <div style="padding: 20px 40px; text-align: center; font-size: 0.75rem; color: #9B8EB0;">
      <p style="margin: 0 0 8px;">&copy; 2025 Zaros Latam &middot; informacion.zaros@gmail.com</p>
      <p style="margin: 0;">Este correo fue enviado porque completaste el formulario de postulación.</p>
    </div>

  </div>
  `

    const payload = {
        sender: {
            name: process.env.BREVO_SENDER_NAME || 'Zaros Latam',
            email: process.env.BREVO_SENDER_EMAIL || 'informacion.zaros@gmail.com'
        },
        to: [{ email: data.email, name: data.nombre }],
        subject,
        htmlContent
    }

    try {
        const res = await fetch(BREVO_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        })
        if (!res.ok) {
            console.error('Error enviando correo a la postulante:', await res.text())
        }
    } catch (e) {
        console.error('Excepción enviando correo a la postulante:', e)
    }
}

export async function enviarNotificacionZaros(
    data: FormData,
    rec: Recomendacion
): Promise<void> {
    const subject = `🔔 Nueva postulante: ${data.nombre} — ${rec.titulo}`

    const timestamp = new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })

    const htmlContent = `
  <div style="font-family: Arial, sans-serif;">
    <div style="background-color: #3B1260; color: white; padding: 16px;">
        <h2 style="margin: 0;">Nueva postulante recibida</h2>
        <p style="margin: 4px 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.7);">${timestamp}</p>
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 0.95rem;">
        <tr style="background-color: #FAF7F2;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0; width: 30%;">Nombre completo</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.nombre}</td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Email</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.email}</td>
        </tr>
        <tr style="background-color: #FAF7F2;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">WhatsApp</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.waCode} ${data.waNumero}</td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">País</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.pais}</td>
        </tr>
        <tr style="background-color: #FAF7F2;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Documento</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.documento}</td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Educación</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.edu}</td>
        </tr>
        <tr style="background-color: #FAF7F2;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Actividad laboral</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.laboral}</td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Sector</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.sector}</td>
        </tr>
        <tr style="background-color: #FAF7F2;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Programa elegido</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.bootcampElegido}</td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0; color: #C8447A;">Programa recomendado</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0; font-weight: bold; color: #C8447A;">${rec.titulo}</td>
        </tr>
        <tr style="background-color: #FAF7F2;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Nivel recomendado</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${rec.nivel_label}</td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Reunión agendada</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.fechaReunion ? `${formatFecha(new Date(data.fechaReunion))} a las ${data.horaReunion}` : 'No agendó'}</td>
        </tr>
        <tr style="background-color: #FAF7F2;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Cuándo pagar</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.cuandoPagar === 'ahora' ? 'Pagar ahora' : 'Pagar después de la reunión'}</td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Método de pago</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.metodoPago === 'paypal' ? 'PayPal' : 'Transferencia Bancaria'}</td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #EBE3F0;">Referido por</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EBE3F0;">${data.recomendo || "—"}</td>
        </tr>
    </table>

    <div style="background-color: #F3EDE3; padding: 20px; margin-top: 24px; border-radius: 12px;">
        <h3 style="margin: 0 0 16px; color: #3B1260;">Respuestas de motivación</h3>
        <p style="margin: 0 0 4px; font-weight: bold; font-size: 0.9rem; color: #5A4870;">¿Qué desafío profesional te trajo a buscar este programa?</p>
        <p style="margin: 0 0 16px; font-size: 0.95rem; line-height: 1.5; color: #1E0E35; white-space: pre-wrap;">${data.mot1}</p>
        
        <p style="margin: 0 0 4px; font-weight: bold; font-size: 0.9rem; color: #5A4870;">¿Qué impacto te gustaría generar si tuvieras las herramientas y la red de contactos adecuada?</p>
        <p style="margin: 0; font-size: 0.95rem; line-height: 1.5; color: #1E0E35; white-space: pre-wrap;">${data.mot2}</p>
    </div>

    <p style="margin-top: 32px; font-size: 0.8rem; color: #9B8EB0;">Zaros Latam &middot; Sistema automático de postulaciones</p>
  </div>
  `

    const payload = {
        sender: {
            name: process.env.BREVO_SENDER_NAME || 'Zaros System',
            email: process.env.BREVO_SENDER_EMAIL || 'informacion.zaros@gmail.com'
        },
        to: [{ email: process.env.ZAROS_NOTIFY_EMAIL || 'informacion.zaros@gmail.com', name: 'Zaros Equipo' }],
        subject,
        htmlContent
    }

    try {
        const res = await fetch(BREVO_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        })
        if (!res.ok) {
            console.error('Error enviando correo a Zaros:', await res.text())
        }
    } catch (e) {
        console.error('Excepción enviando correo a Zaros:', e)
    }
}
