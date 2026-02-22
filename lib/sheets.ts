import { FormState, Recommendation } from '../types/form';

export async function saveToSheets(data: FormState, recommendation: Recommendation) {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK;
    if (!webhookUrl) {
        console.warn("GOOGLE_SHEETS_WEBHOOK no configurada");
        return;
    }

    const payload = {
        ...data,
        bootcampRecomendado: recommendation.titulo,
        recomendacionNivel: recommendation.nivel,
        fechaRegistro: new Date().toISOString()
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Error guardando en Google Sheets:", error);
    }
}

/**
 * GOOGLE APPS SCRIPT
 * Copia y pega el código de abajo en Herramientas -> Editor de Secuencia de Comandos en tu Google Sheet.
 * Asegúrate de implementar como "Aplicación web" con acceso "Cualquiera".
 
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  if (!e.postData || !e.postData.contents) {
    return ContentService.createTextOutput(JSON.stringify({"success": false, "error": "No data"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var data = JSON.parse(e.postData.contents);
  
  // Agregar un header si la hoja está vacía (opcional)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Fecha Registro", "Nombre", "Email", "WhatsApp", "Código País", "País", "Documento",
      "Educación", "Sector", "Laboral", "Bootcamp Elegido", "Bootcamp Recomendado",
      "Nivel Recomendado", "Fecha Reunión", "Hora Reunión", "Motivación 1", "Motivación 2",
      "Certificado", "Privacidad"
    ]);
  }
  
  sheet.appendRow([
    data.fechaRegistro,
    data.nombre,
    data.email,
    data.whatsapp,
    data.codigoPais,
    data.pais,
    data.documento,
    data.educacion,
    data.sector,
    data.laboral,
    data.bootcampElegido,
    data.bootcampRecomendado,
    data.recomendacionNivel,
    data.fechaReunion,
    data.horaReunion,
    data.mot1,
    data.mot2,
    data.certificado ? "Sí" : "No",
    data.privacidad ? "Sí" : "No"
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"success": true}))
    .setMimeType(ContentService.MimeType.JSON);
}

 */
