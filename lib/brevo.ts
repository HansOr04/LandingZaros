import { FormState, Recommendation } from '../types/form';

export async function sendEmail(data: FormState, recommendation: Recommendation) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'informacion.zaros@gmail.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'Zaros Latam';
    const notifyEmail = process.env.ZAROS_NOTIFY_EMAIL || 'informacion.zaros@gmail.com';

    if (!apiKey) {
        console.warn("BREVO_API_KEY no configurada");
        return;
    }

    const endpoint = 'https://api.brevo.com/v3/smtp/email';

    const postulanteHtml = `
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; background-color: #FAF7F2; padding: 40px 20px; color: #1E0E35;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h1 style="color: #3B1260; font-family: 'Libre Baskerville', serif;">¡Felicidades ${data.nombre}! 🎉</h1>
        <p style="font-size: 16px; color: #5A4870; line-height: 1.6;">Tu lugar en Zaros está reservado. Hemos analizado tu perfil y te recomendamos el:</p>
        <div style="background-color: #FAF7F2; border: 1px solid #DDD4E8; border-radius: 8px; padding: 20px; margin: 30px 0;">
          <h2 style="color: #6C3BA5; margin: 0 0 10px 0;">${recommendation.titulo}</h2>
          <p style="margin: 0; font-size: 15px;">${recommendation.razon}</p>
        </div>
        <p style="font-size: 16px;">Nos reuniremos contigo el <strong>${data.fechaReunion} a las ${data.horaReunion}</strong>.</p>
        <p style="margin-top: 30px;">
          <a href="https://wa.me/message/YOURNUMBER" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">Hablemos por WhatsApp</a>
        </p>
      </div>
    </div>
  `;

    const zarosHtml = `
    <h2>Nueva Postulante: ${data.nombre}</h2>
    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
      <tr><td>Nombre</td><td>${data.nombre}</td></tr>
      <tr><td>Email</td><td>${data.email}</td></tr>
      <tr><td>WhatsApp</td><td>+${data.codigoPais} ${data.whatsapp}</td></tr>
      <tr><td>País</td><td>${data.pais} (${data.documento})</td></tr>
      <tr><td>Educación</td><td>${data.educacion}</td></tr>
      <tr><td>Sector</td><td>${data.sector}</td></tr>
      <tr><td>Situación Laboral</td><td>${data.laboral}</td></tr>
      <tr><td>Bootcamp Elegido</td><td>${data.bootcampElegido}</td></tr>
      <tr><td>Bootcamp Recomendado</td><td>${recommendation.titulo}</td></tr>
      <tr><td>Fecha de Reunión</td><td>${data.fechaReunion} ${data.horaReunion}</td></tr>
      <tr><td>Motivación 1</td><td>${data.mot1}</td></tr>
      <tr><td>Motivación 2</td><td>${data.mot2}</td></tr>
      <tr><td>Certificado</td><td>${data.certificado ? 'Sí ($99)' : 'No'}</td></tr>
    </table>
  `;

    const headers = {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
    };

    try {
        // Email a la Postulante
        await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                sender: { name: senderName, email: senderEmail },
                to: [{ email: data.email, name: data.nombre }],
                subject: `🎉 ${data.nombre}, tu lugar en Zaros está reservado`,
                htmlContent: postulanteHtml,
            }),
        });

        // Email a Zaros
        await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                sender: { name: senderName, email: senderEmail },
                to: [{ email: notifyEmail, name: senderName }],
                subject: `Nueva postulante: ${data.nombre} — ${recommendation.titulo}`,
                htmlContent: zarosHtml,
            }),
        });
    } catch (error) {
        console.error("Error enviando correos con Brevo:", error);
    }
}
