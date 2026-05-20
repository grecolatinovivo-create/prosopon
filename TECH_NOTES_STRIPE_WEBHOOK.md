# TECH_NOTES_STRIPE_WEBHOOK.md
## Onboarding automatico iscritti via webhook Stripe → Resend

---

### Cosa abbiamo aggiunto

| File | Cosa fa |
|------|---------|
| `api/stripe-webhook.js` | Endpoint che riceve i webhook Stripe, verifica la firma, manda due email via Resend (benvenuto al cliente + notifica a te) |
| `package.json` | Aggiunta dipendenza `stripe@^17.0.0` |

---

### Cosa succede esattamente quando un cliente compra

1. Cliente clicca "Iscriviti" su `corso-maschera-classica.html` → finisce sul Payment Link Stripe.
2. Cliente paga con carta o Klarna.
3. Stripe processa il pagamento e invia un evento **`checkout.session.completed`** all'endpoint `https://www.accademiaprosopon.it/api/stripe-webhook`.
4. L'endpoint verifica la firma del webhook (così nessuno può fingere di essere Stripe), poi:
   - Manda al cliente un'**email di benvenuto** brandizzata PROSŌPON con calendario delle 5 lezioni, link alla stanza online, contatti.
   - Manda a `centroprosopon@gmail.com` una **notifica** "ha appena pagato Tizio Caio" con tutti i dati e il promemoria di emettere fattura entro 12 giorni.
5. Tutto questo accade in ~2 secondi dal momento del pagamento.

---

## ⚙️ ATTIVAZIONE — i 4 passi che DEVI fare tu

### Passo 1 — Aggiungi due nuove variabili d'ambiente su Vercel

Vai su Vercel → progetto → **Settings → Environment Variables → Add New**.

Aggiungi **due** chiavi:

**Chiave 1: `STRIPE_SECRET_KEY`**
- Dove la prendi: Stripe Dashboard → **Developers → API keys** → "Secret key" (`sk_live_...`).
- Importante: è la chiave **segreta** (la "Publishable key" `pk_...` non serve qui).
- Spunta tutti e tre gli Environment (Production, Preview, Development).

**Chiave 2: `STRIPE_WEBHOOK_SECRET`**
- Non l'hai ancora — la creiamo al Passo 2. Per ora lascia perdere e torna qui dopo.

---

### Passo 2 — Crea il webhook su Stripe

1. Vai su Stripe Dashboard → **Developers → Webhooks** → **+ Add endpoint**.
2. **Endpoint URL**: `https://www.accademiaprosopon.it/api/stripe-webhook`
3. **Events to send**: clicca "+ Select events" → cerca `checkout.session.completed` → spunta solo quello.
4. Clicca **Add endpoint**.
5. Nella pagina del webhook appena creato, in alto a destra trovi **"Signing secret"** → click su "Reveal" → copia il valore (inizia con `whsec_...`).
6. Torna su Vercel → **Settings → Environment Variables → Add New** → crea la chiave `STRIPE_WEBHOOK_SECRET` con quel valore. Spunta tutti e tre gli Environment.

---

### Passo 3 — Redeploy

Ogni volta che cambi le env var su Vercel, devi rideployare per renderle attive:

Vercel → **Deployments** → ultimo deploy → menu `⋯` → **Redeploy** (lascia spuntato "Use existing Build Cache").

Aspetta 30–60 secondi che diventi verde.

---

### Passo 4 — Test con Stripe in *Test mode*

Prima di andare live, **prova in modalità test**:

1. Su Stripe Dashboard in alto a destra c'è un toggle "Test mode" — attivalo.
2. Crea un Payment Link di test simile al tuo (€1) e aggiungi un altro webhook di test puntato allo stesso URL (`/api/stripe-webhook`), copiandone il signing secret in una env var TEMPORANEA tipo `STRIPE_WEBHOOK_SECRET_TEST` (oppure sostituisci momentaneamente quella di produzione).
3. Apri il Payment Link di test e usa una **carta test Stripe**: `4242 4242 4242 4242`, qualsiasi data futura, qualsiasi CVC, qualsiasi CAP. Inserisci una **tua email** come cliente.
4. Verifica:
   - Su Stripe Dashboard → Webhooks → il tuo endpoint → la riga del webhook deve essere verde con "200 OK".
   - Sulla casella email che hai inserito → arriva l'email di benvenuto PROSŌPON.
   - Su `centroprosopon@gmail.com` → arriva la notifica admin.

Se i test funzionano, ripristina la `STRIPE_WEBHOOK_SECRET` di produzione e disattiva il Test mode su Stripe.

---

## 🎨 PERSONALIZZARE L'EMAIL DI BENVENUTO

Nel file `api/stripe-webhook.js`, in alto, c'è la sezione `CATALOGO_CORSI`. Per il corso "Maschera Classica" ho messo dei **placeholder** che vanno verificati prima del go-live:

```js
'maschera-classica': {
  titolo: 'Storia, teoria e pratica attoriale della maschera classica',
  sottotitolo: 'Corso online — Prima edizione',
  direttore: 'Andrea Saverio Puglisi',
  durata: '10 ore · 5 incontri live online',
  inizio: 'Lunedì 15 giugno',
  linkLezioni: 'https://us02web.zoom.us/j/PLACEHOLDER',  // ← SOSTITUIRE
  calendario: [
    'Lunedì 15 giugno — ore 19:00 (2h) · ...',          // ← VERIFICARE date/ore/temi
    ...
  ],
  materialiPreparatori: null,                            // ← Se vuoi aggiungere PDF, scrivi la frase qui
  contatto: 'Per ogni domanda scrivimi a centroprosopon@gmail.com o chiamami al +39 392 370 6618.'
}
```

**Da verificare con Andrea Puglisi prima del go-live:**
1. Date e orari esatti delle 5 lezioni
2. Temi di ogni lezione (al momento ho messo bozze plausibili)
3. Link Zoom/Meet definitivo (e password se serve)
4. Eventuali materiali preparatori (PDF da scaricare, video, letture)

Cambiata la `CATALOGO_CORSI`, fai push → Vercel redeploya da solo.

---

## ➕ AGGIUNGERE UN ALTRO CORSO IN FUTURO

Quando vorrai vendere un secondo corso (es. "Voce e dizione classica"):

1. Crea il nuovo Payment Link su Stripe per quel corso.
2. Su Stripe, dentro la pagina del prodotto, dai un nome univoco (es. "Voce e dizione classica").
3. Apri `api/stripe-webhook.js`, dentro `CATALOGO_CORSI` aggiungi una nuova entry:
   ```js
   'voce-classica': {
     titolo: 'Voce e dizione classica',
     ...
   }
   ```
4. Aggiorna la funzione `risolviCorso` perché distingua i corsi via nome prodotto:
   ```js
   if (productName.toLowerCase().includes('voce')) return CATALOGO_CORSI['voce-classica'];
   if (productName.toLowerCase().includes('maschera')) return CATALOGO_CORSI['maschera-classica'];
   ```
5. Push → Vercel deploya.

---

## 🛡️ SICUREZZA

- **Verifica firma**: ogni webhook che arriva all'endpoint viene firmato da Stripe con `STRIPE_WEBHOOK_SECRET`. Se la firma non torna, l'endpoint rifiuta la richiesta con 400. Quindi nessun bot/attaccante può falsificare un pagamento per innescare email a un cliente.
- **Idempotenza**: Stripe può, in caso di timeout, rispedire lo stesso evento. L'endpoint risponde sempre 200 anche su evento già visto. Per ora questo significa che, in casi rarissimi, lo stesso cliente potrebbe ricevere due email di benvenuto. Quando vorrai blindare anche questo, ti aggiungo un piccolo dedup (richiede uno storage).
- **Mai esporre le chiavi**: `STRIPE_SECRET_KEY` e `STRIPE_WEBHOOK_SECRET` sono nel codice solo come `process.env.*`, quindi non finiscono nel browser. Sono visibili solo sul server di Vercel.

---

## 💰 PROMEMORIA FISCALE (non automatizzabile da me)

Quando arriva la notifica admin, il messaggio te lo ricorda esplicitamente: **"Ricordati di emettere fattura entro 12 giorni"**.

L'unica strada per togliere anche questo passaggio è collegare Stripe a un gestionale fatture italiano (FattureInCloud, Fatture24, Aruba Fatturazione). FattureInCloud ha integrazione nativa con Stripe: appena Stripe segnala il pagamento, FattureInCloud genera in automatico la fattura elettronica e la trasmette a SdI. Costa ~10 €/mese e ti toglie l'unica cosa che resta manuale.

Da discutere col commercialista prima di scegliere il gestionale.

---

## 🩺 TROUBLESHOOTING

| Sintomo | Possibile causa | Cosa fare |
|---------|-----------------|-----------|
| Webhook rosso su Stripe Dashboard (4xx/5xx) | `STRIPE_WEBHOOK_SECRET` mancante o errato | Ricontrolla Passo 1+2, fai redeploy |
| Webhook verde ma niente email | `RESEND_API_KEY` mancante o dominio non verificato | Controlla logs Vercel: cerca chiamate a `/api/stripe-webhook` |
| Email arriva al cliente ma non a te | Filtri Gmail su `noreply@accademiaprosopon.it` | Controlla cartella Spam, marca come "Non spam" |
| Email arriva senza alcuni dati | Il cliente ha pagato senza compilare nome o telefono sul Payment Link | Su Stripe, Payment Link → Settings, attiva "Collect customer info" |
| Stripe dice "test timed out" | Vercel ha tempi di risposta lenti | Se accade spesso, sospetta `await` lungo: dimmelo e aggiungo log |

---

## 🚦 STATO ATTUALE (dopo il push)

- ✅ Codice scritto e committato (quando lo farai tu)
- ⏳ `STRIPE_SECRET_KEY` da impostare su Vercel
- ⏳ Webhook da creare su Stripe Dashboard
- ⏳ `STRIPE_WEBHOOK_SECRET` da impostare su Vercel
- ⏳ Test in Test mode di Stripe
- ⏳ Verificare `CATALOGO_CORSI` (date, link Zoom, temi lezioni) con Andrea
