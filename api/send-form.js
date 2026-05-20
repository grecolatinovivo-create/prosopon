// ============================================================================
//  PROSŌPON — Endpoint serverless per invio form via Resend
// ----------------------------------------------------------------------------
//  File: /api/send-form.js
//  Runtime: Vercel Serverless Function (Node.js 18+)
//  Variabile d'ambiente richiesta: RESEND_API_KEY (impostata su Vercel)
//
//  COSA FA:
//   - Riceve POST dai form del sito (Contatti, Iscrizioni, Audizione, ecc.)
//   - Valida i campi minimi (nome + email)
//   - Filtra i bot con un honeypot (campo nascosto "website")
//   - Invia un'email formattata a centroprosopon@gmail.com via Resend
//   - Imposta reply-to sull'email del mittente, così basta cliccare "Rispondi"
//
//  COME LO CHIAMI DAL FRONTEND:
//   fetch('/api/send-form', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({form:'contatti', nome:'...', email:'...', messaggio:'...'})
//   })
// ============================================================================

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ----------------------------------------------------------------------------
//  CONFIG — cambiare qui i parametri istituzionali del mittente/destinatario
// ----------------------------------------------------------------------------
const TO_EMAIL = 'centroprosopon@gmail.com';

// FROM definitivo: il dominio accademiaprosopon.it è VERIFICATO su Resend
// (record DNS SPF/DKIM su Aruba digeriti correttamente).
// Se vuoi cambiare l'indirizzo (es. info@ invece di noreply@), modifica solo
// la parte dopo la "<" qui sotto. Il nome "PROSŌPON" è ciò che il destinatario
// vede come mittente in evidenza.
const FROM_EMAIL = 'PROSŌPON <noreply@accademiaprosopon.it>';

// Mappa form -> oggetto email leggibile
const SUBJECT_MAP = {
  contatti: 'Nuovo messaggio dal sito',
  iscrizione: 'Nuova iscrizione',
  audizione: 'Nuova richiesta di audizione',
  newsletter: 'Nuova iscrizione alla newsletter',
  'piano-triennale': 'Richiesta piano di studi triennale',
  'info-corso': 'Richiesta informazioni corso'
};

// ----------------------------------------------------------------------------
//  HELPERS
// ----------------------------------------------------------------------------

// Escape minimale per evitare HTML injection nell'email (i bot inseriscono link)
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Etichette leggibili in italiano per le righe della tabella email
const LABELS = {
  nome: 'Nome',
  cognome: 'Cognome',
  email: 'Email',
  telefono: 'Telefono',
  messaggio: 'Messaggio',
  corso: 'Corso',
  eta: 'Età',
  esperienza: 'Esperienza',
  consenso: 'Consenso privacy'
};

function labelOf(key) {
  return LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/[-_]/g, ' ');
}

// ----------------------------------------------------------------------------
//  HANDLER
// ----------------------------------------------------------------------------
export default async function handler(req, res) {
  // CORS minimo (utile se in futuro chiami l'endpoint da un dominio diverso).
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel passa già req.body parsato se il content-type è application/json
  const body = (typeof req.body === 'string') ? safeJson(req.body) : (req.body || {});

  // HONEYPOT: il campo "website" è nascosto nei form via CSS.
  // I bot lo compilano automaticamente. Se è popolato, fingiamo successo (200).
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const form = String(body.form || 'contatti').trim();
  const nome = String(body.nome || '').trim();
  const email = String(body.email || '').trim();
  const telefono = String(body.telefono || '').trim();
  const messaggio = String(body.messaggio || '').trim();

  // Validazione minima
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome ed email sono obbligatori.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Indirizzo email non valido.' });
  }
  if (nome.length > 120 || email.length > 200 || messaggio.length > 5000) {
    return res.status(400).json({ error: 'Uno dei campi supera la lunghezza massima.' });
  }

  // Costruzione subject
  const subject = SUBJECT_MAP[form] || `Nuovo invio dal sito: ${form}`;

  // Costruzione tabella HTML con tutti i campi (esclusi tecnici/honeypot)
  const skipKeys = new Set(['form', 'website', '_gotcha']);
  const rows = Object.entries(body)
    .filter(([k, v]) => !skipKeys.has(k) && v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => `
      <tr>
        <td style="padding:8px 14px;border-bottom:1px solid #e8e3d8;font-weight:600;color:#1c1b18;font-family:'Manrope',system-ui,sans-serif;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top;width:160px;">${escapeHtml(labelOf(k))}</td>
        <td style="padding:8px 14px;border-bottom:1px solid #e8e3d8;color:#1c1b18;font-family:Georgia,serif;font-size:15px;line-height:1.5;">${escapeHtml(v).replace(/\n/g, '<br>')}</td>
      </tr>`)
    .join('');

  const html = `
  <!DOCTYPE html>
  <html lang="it"><head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-top:4px solid #b8965a;">
          <tr><td style="padding:32px 36px 8px;">
            <div style="font-family:'Cinzel',Georgia,serif;font-size:22px;letter-spacing:0.16em;color:#b8965a;text-transform:uppercase;">PROSŌPON</div>
            <div style="font-family:'Manrope',system-ui,sans-serif;font-size:11px;letter-spacing:0.18em;color:#7a7368;text-transform:uppercase;margin-top:4px;">Accademia di Teatro Classico</div>
          </td></tr>
          <tr><td style="padding:8px 36px 0;">
            <h1 style="font-family:Georgia,serif;font-size:20px;color:#1c1b18;margin:16px 0 4px;font-weight:normal;">${escapeHtml(subject)}</h1>
            <p style="font-family:'Manrope',system-ui,sans-serif;font-size:12px;color:#7a7368;margin:0 0 18px;letter-spacing:0.04em;">Modulo: <strong style="color:#b8965a;">${escapeHtml(form)}</strong></p>
          </td></tr>
          <tr><td style="padding:0 36px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
          </td></tr>
          <tr><td style="padding:18px 36px 28px;background:#f5f0e8;border-top:1px solid #e8e3d8;">
            <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:11px;letter-spacing:0.08em;color:#7a7368;text-align:center;">
              Inviato da <a href="https://www.accademiaprosopon.it" style="color:#b8965a;text-decoration:none;">accademiaprosopon.it</a>
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;

  // Versione plain-text di fallback (per client email che non rendono HTML)
  const text = Object.entries(body)
    .filter(([k, v]) => !skipKeys.has(k) && v)
    .map(([k, v]) => `${labelOf(k)}: ${v}`)
    .join('\n') + `\n\n— Inviato dal sito accademiaprosopon.it`;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[PROSŌPON] ${subject} — ${nome}`,
      html,
      text
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(502).json({ error: 'Servizio email non disponibile, riprova tra poco.' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Handler exception:', err);
    return res.status(500).json({ error: 'Errore interno. Riprova più tardi.' });
  }
}

// ----------------------------------------------------------------------------
//  UTIL
// ----------------------------------------------------------------------------
function safeJson(str) {
  try { return JSON.parse(str); } catch { return {}; }
}
