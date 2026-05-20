// ============================================================================
//  PROSŌPON — Webhook Stripe per onboarding automatico iscritti
// ----------------------------------------------------------------------------
//  File: /api/stripe-webhook.js
//  Runtime: Vercel Serverless Function (Node.js 18+)
//
//  COSA FA:
//   Stripe chiama questo endpoint ogni volta che un cliente completa un
//   pagamento sul Payment Link. L'endpoint:
//     1. Verifica la firma del webhook (sicurezza — nessuno può falsificare)
//     2. Estrae i dati del cliente e del prodotto
//     3. Manda via Resend due email:
//          a) BENVENUTO al cliente (formattata PROSŌPON, con info corso)
//          b) NOTIFICA interna a centroprosopon@gmail.com
//
//  VARIABILI D'AMBIENTE RICHIESTE SU VERCEL:
//    RESEND_API_KEY          — già impostata
//    STRIPE_SECRET_KEY       — chiave segreta Stripe (sk_live_... o sk_test_...)
//    STRIPE_WEBHOOK_SECRET   — signing secret del webhook (whsec_...)
//
//  COME LO COLLEGHI SU STRIPE:
//    1) Stripe Dashboard → Developers → Webhooks → Add endpoint
//    2) Endpoint URL: https://www.accademiaprosopon.it/api/stripe-webhook
//    3) Events to send: "checkout.session.completed"
//    4) Salva, copia il "Signing secret" (whsec_...) → mettilo su Vercel
//       come STRIPE_WEBHOOK_SECRET, poi redeploy.
// ============================================================================

import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// ----------------------------------------------------------------------------
//  CONFIG
// ----------------------------------------------------------------------------
const FROM_EMAIL = 'PROSŌPON <noreply@accademiaprosopon.it>';
const ADMIN_EMAIL = 'centroprosopon@gmail.com';

// IMPORTANTE: Vercel di default fa il parsing del body in JSON.
// Stripe richiede invece il body GREZZO (bytes) per verificare la firma.
// Questa export disattiva il parser automatico.
export const config = {
  api: { bodyParser: false }
};

// ----------------------------------------------------------------------------
//  Catalogo corsi: mappa il prodotto Stripe -> info per l'email di benvenuto.
//
//  Il "matcher" prova in ordine: priceId, productId, nome prodotto.
//  Quando aggiungi un nuovo corso, basta aggiungere una nuova entry qui.
//
//  TODO Giampiero — verifica i valori (date, link Zoom, contatti) e personalizza.
// ----------------------------------------------------------------------------
const CATALOGO_CORSI = {
  'maschera-classica': {
    titolo: 'Storia, teoria e pratica attoriale della maschera classica',
    sottotitolo: 'Corso online — Prima edizione',
    direttore: 'Andrea Saverio Puglisi',
    durata: '10 ore · 5 incontri live online',
    inizio: 'Lunedì 15 giugno',
    // TODO — sostituire con il link Zoom/Meet definitivo prima del go-live
    linkLezioni: 'https://us02web.zoom.us/j/PLACEHOLDER',
    // TODO — calendario completo, riga per riga
    calendario: [
      'Lunedì 15 giugno — ore 19:00 (2h) · Origini della maschera nel teatro greco',
      'Mercoledì 17 giugno — ore 19:00 (2h) · La maschera romana e la commedia',
      'Lunedì 22 giugno — ore 19:00 (2h) · La Commedia dell\'Arte e le maschere fisse',
      'Mercoledì 24 giugno — ore 19:00 (2h) · Pratica attoriale: respirazione e voce dietro la maschera',
      'Lunedì 29 giugno — ore 19:00 (2h) · Lavoro di sintesi e prova individuale'
    ],
    // TODO — eventuali materiali preparatori (PDF, video) da linkare
    materialiPreparatori: null,
    contatto: 'Per ogni domanda scrivimi a centroprosopon@gmail.com o chiamami al +39 392 370 6618.'
  }
  // Aggiungi qui altri corsi con la chiave appropriata (es. 'voce-classica')
};

// Funzione di matching: dato uno checkout Stripe, decide quale corso è.
// Per ora abbiamo un solo corso → default fallback. Quando ne aggiungerai
// altri, riconosceremo dal priceId o dal nome del line item.
function risolviCorso(session, lineItems) {
  const productName = lineItems?.data?.[0]?.description || '';
  if (productName.toLowerCase().includes('maschera')) return CATALOGO_CORSI['maschera-classica'];
  // Fallback (siamo a un solo corso al momento)
  return CATALOGO_CORSI['maschera-classica'];
}

// ----------------------------------------------------------------------------
//  Helpers
// ----------------------------------------------------------------------------
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Legge il body raw della richiesta (chunk per chunk).
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// ----------------------------------------------------------------------------
//  TEMPLATE EMAIL — BENVENUTO al cliente (oro/avorio, brand PROSŌPON)
// ----------------------------------------------------------------------------
function emailBenvenutoHtml({ nomeCliente, corso, importo }) {
  const nomeSafe = escapeHtml(nomeCliente || 'benvenuto/a');
  const calendarioRows = corso.calendario.map(r => `
    <tr><td style="padding:7px 0;border-bottom:1px solid #e8e3d8;font-family:Georgia,serif;font-size:14px;color:#1c1b18;">${escapeHtml(r)}</td></tr>
  `).join('');

  const materialiBlock = corso.materialiPreparatori ? `
    <p style="font-family:Georgia,serif;font-size:15px;line-height:1.6;color:#1c1b18;margin:18px 0 0;">
      <strong style="color:#b8965a;">Materiali preparatori:</strong><br>
      ${escapeHtml(corso.materialiPreparatori)}
    </p>` : '';

  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-top:4px solid #b8965a;">

          <!-- Header -->
          <tr><td style="padding:36px 40px 8px;text-align:center;">
            <div style="font-family:'Cinzel',Georgia,serif;font-size:26px;letter-spacing:0.18em;color:#b8965a;text-transform:uppercase;">PROSŌPON</div>
            <div style="font-family:'Manrope',Helvetica,sans-serif;font-size:11px;letter-spacing:0.2em;color:#7a7368;text-transform:uppercase;margin-top:6px;">Accademia di Teatro Classico e Arti Performative</div>
            <div style="margin:22px auto 0;width:60px;height:1px;background:#b8965a;"></div>
          </td></tr>

          <!-- Saluto -->
          <tr><td style="padding:24px 40px 0;">
            <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:500;color:#1c1b18;margin:0 0 8px;letter-spacing:0.01em;">Benvenuto/a, ${nomeSafe}.</h1>
            <p style="font-family:Georgia,serif;font-size:16px;line-height:1.65;color:#1c1b18;margin:0 0 12px;">
              La tua iscrizione è stata registrata. Da questo momento sei tra i partecipanti di:
            </p>
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-style:italic;color:#b8965a;margin:0 0 6px;line-height:1.3;">
              ${escapeHtml(corso.titolo)}
            </p>
            <p style="font-family:'Manrope',Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;color:#7a7368;text-transform:uppercase;margin:0 0 24px;">
              ${escapeHtml(corso.sottotitolo)}
            </p>
          </td></tr>

          <!-- Info essenziali -->
          <tr><td style="padding:0 40px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f5f0e8;">
              <tr>
                <td style="padding:18px 22px;border-left:3px solid #b8965a;">
                  <p style="margin:0 0 4px;font-family:'Manrope',Helvetica,sans-serif;font-size:10px;letter-spacing:0.16em;color:#7a7368;text-transform:uppercase;">Direzione artistica</p>
                  <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:15px;color:#1c1b18;">${escapeHtml(corso.direttore)}</p>

                  <p style="margin:0 0 4px;font-family:'Manrope',Helvetica,sans-serif;font-size:10px;letter-spacing:0.16em;color:#7a7368;text-transform:uppercase;">Durata</p>
                  <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:15px;color:#1c1b18;">${escapeHtml(corso.durata)}</p>

                  <p style="margin:0 0 4px;font-family:'Manrope',Helvetica,sans-serif;font-size:10px;letter-spacing:0.16em;color:#7a7368;text-transform:uppercase;">Inizio</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:15px;color:#1c1b18;">${escapeHtml(corso.inizio)}</p>
                </td>
              </tr>
            </table>
          </td></tr>

          <!-- Calendario -->
          <tr><td style="padding:28px 40px 0;">
            <p style="margin:0 0 10px;font-family:'Manrope',Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;color:#b8965a;text-transform:uppercase;font-weight:700;">Calendario degli incontri</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${calendarioRows}</table>
          </td></tr>

          <!-- Link lezione -->
          <tr><td style="padding:24px 40px 0;text-align:center;">
            <a href="${escapeHtml(corso.linkLezioni)}"
               style="display:inline-block;padding:14px 36px;background:#b8965a;color:#ffffff;text-decoration:none;font-family:'Manrope',Helvetica,sans-serif;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">
              Apri la stanza online
            </a>
            <p style="margin:10px 0 0;font-family:Georgia,serif;font-size:13px;color:#7a7368;font-style:italic;">Stesso link per tutti i 5 incontri.</p>
          </td></tr>

          ${materialiBlock ? `<tr><td style="padding:0 40px;">${materialiBlock}</td></tr>` : ''}

          <!-- Contatto -->
          <tr><td style="padding:30px 40px 0;">
            <p style="font-family:Georgia,serif;font-size:15px;line-height:1.65;color:#1c1b18;margin:0;">
              ${escapeHtml(corso.contatto)}
            </p>
          </td></tr>

          <!-- Firma -->
          <tr><td style="padding:24px 40px 8px;">
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:18px;color:#1c1b18;margin:0;line-height:1.4;">
              A presto in scena,<br>
              <span style="color:#b8965a;">la Direzione di PROSŌPON</span>
            </p>
          </td></tr>

          <!-- Footer -->
          <tr><td style="padding:24px 40px 32px;background:#f5f0e8;border-top:1px solid #e8e3d8;margin-top:24px;">
            <p style="margin:0 0 6px;font-family:'Manrope',Helvetica,sans-serif;font-size:10px;letter-spacing:0.14em;color:#7a7368;text-transform:uppercase;text-align:center;">
              Pagamento ricevuto: € ${escapeHtml(importo)}
            </p>
            <p style="margin:0;font-family:'Manrope',Helvetica,sans-serif;font-size:10px;letter-spacing:0.08em;color:#7a7368;text-align:center;">
              Accademia di Teatro Classico e Arti Performative · Roma ·
              <a href="https://www.accademiaprosopon.it" style="color:#b8965a;text-decoration:none;">accademiaprosopon.it</a>
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

// ----------------------------------------------------------------------------
//  TEMPLATE EMAIL — NOTIFICA all'admin (più asciutta, operativa)
// ----------------------------------------------------------------------------
function emailNotificaAdminHtml({ nomeCliente, emailCliente, telefonoCliente, corso, importo, sessionId }) {
  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 16px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-top:4px solid #b8965a;">
          <tr><td style="padding:28px 32px 8px;">
            <p style="margin:0;font-family:'Manrope',Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;color:#b8965a;text-transform:uppercase;font-weight:700;">Nuova iscrizione</p>
            <h1 style="margin:6px 0 0;font-family:Georgia,serif;font-size:20px;color:#1c1b18;font-weight:normal;">${escapeHtml(corso.titolo)}</h1>
          </td></tr>
          <tr><td style="padding:14px 32px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr><td style="padding:8px 0;border-bottom:1px solid #e8e3d8;font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#7a7368;width:140px;">Nome</td><td style="padding:8px 0;border-bottom:1px solid #e8e3d8;font-family:Georgia,serif;font-size:15px;color:#1c1b18;">${escapeHtml(nomeCliente)}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #e8e3d8;font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#7a7368;">Email</td><td style="padding:8px 0;border-bottom:1px solid #e8e3d8;font-family:Georgia,serif;font-size:15px;color:#1c1b18;"><a href="mailto:${escapeHtml(emailCliente)}" style="color:#b8965a;">${escapeHtml(emailCliente)}</a></td></tr>
              ${telefonoCliente ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e8e3d8;font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#7a7368;">Telefono</td><td style="padding:8px 0;border-bottom:1px solid #e8e3d8;font-family:Georgia,serif;font-size:15px;color:#1c1b18;">${escapeHtml(telefonoCliente)}</td></tr>` : ''}
              <tr><td style="padding:8px 0;border-bottom:1px solid #e8e3d8;font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#7a7368;">Importo</td><td style="padding:8px 0;border-bottom:1px solid #e8e3d8;font-family:Georgia,serif;font-size:15px;color:#1c1b18;">€ ${escapeHtml(importo)}</td></tr>
              <tr><td style="padding:8px 0;font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#7a7368;">Stripe ID</td><td style="padding:8px 0;font-family:'Courier New',monospace;font-size:12px;color:#7a7368;">${escapeHtml(sessionId)}</td></tr>
            </table>
            <p style="margin:18px 0 0;font-family:Georgia,serif;font-size:14px;color:#7a7368;font-style:italic;">
              L'email di benvenuto è già partita verso il cliente. <strong>Ricordati di emettere fattura entro 12 giorni</strong>.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

// ----------------------------------------------------------------------------
//  HANDLER
// ----------------------------------------------------------------------------
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['stripe-signature'];
  if (!signature) {
    return res.status(400).json({ error: 'Stripe-Signature header mancante' });
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Stripe signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook signature invalid: ${err.message}` });
  }

  // Ci interessa solo "checkout completato con successo"
  if (event.type !== 'checkout.session.completed') {
    // Rispondiamo 200 anche per gli altri eventi: a Stripe va bene così,
    // sa che li abbiamo ricevuti e non riprova.
    return res.status(200).json({ received: true, ignored: event.type });
  }

  const session = event.data.object;

  try {
    // Recupera i line items per sapere quale corso è stato comprato
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });

    // Estrazione dati cliente
    const nomeCliente = session.customer_details?.name || 'iscritto/a';
    const emailCliente = session.customer_details?.email || session.customer_email;
    const telefonoCliente = session.customer_details?.phone || '';
    const importo = (session.amount_total / 100).toFixed(2).replace('.', ',');

    if (!emailCliente) {
      console.error('Email cliente mancante nella session', session.id);
      return res.status(200).json({ received: true, warning: 'no-customer-email' });
    }

    const corso = risolviCorso(session, lineItems);

    // 1) Email BENVENUTO al cliente
    const { error: errCliente } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [emailCliente],
      replyTo: ADMIN_EMAIL,
      subject: `Benvenuto/a in PROSŌPON — ${corso.titolo}`,
      html: emailBenvenutoHtml({ nomeCliente, corso, importo })
    });
    if (errCliente) console.error('Errore email cliente:', errCliente);

    // 2) Email NOTIFICA all'admin
    const { error: errAdmin } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      replyTo: emailCliente,
      subject: `[NUOVA ISCRIZIONE] ${nomeCliente} — ${corso.titolo}`,
      html: emailNotificaAdminHtml({
        nomeCliente, emailCliente, telefonoCliente, corso, importo,
        sessionId: session.id
      })
    });
    if (errAdmin) console.error('Errore email admin:', errAdmin);

    return res.status(200).json({ received: true, processed: true });

  } catch (err) {
    console.error('Handler exception:', err);
    // Importante: rispondiamo 200 anche in caso di errore interno, altrimenti
    // Stripe riproverà il webhook fino a sfinirsi (e il cliente potrebbe ricevere
    // più email di benvenuto). I problemi li vediamo sui log Vercel.
    return res.status(200).json({ received: true, error: err.message });
  }
}
