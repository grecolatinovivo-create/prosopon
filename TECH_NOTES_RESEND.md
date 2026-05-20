# TECH_NOTES_RESEND.md
## Endpoint serverless invio form via Resend

---

### Cosa abbiamo aggiunto

| File | Cosa fa |
|------|---------|
| `api/send-form.js` | Endpoint serverless (Vercel) che riceve i form e invia email via Resend |
| `package.json` | Dichiara la dipendenza `resend@^4.0.0` (Vercel la installa al deploy) |

---

### Variabile d'ambiente

Su Vercel deve esistere:

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxx
```

Già fatto. Se la modifichi → **redeploy obbligatorio**.

---

### Come funziona (a parole semplici)

1. Un form HTML del sito fa una `fetch('/api/send-form', ...)` con i dati.
2. Vercel invoca la function `api/send-form.js`.
3. La function valida i dati, scarta i bot (honeypot), e chiama Resend.
4. Resend recapita l'email a **centroprosopon@gmail.com**.
5. Quando rispondi all'email, parte direttamente all'indirizzo della persona che ha scritto (campo `replyTo`).

---

### Mittente definitivo

Il dominio `accademiaprosopon.it` è **verificato** su Resend (record DNS Aruba digeriti). Il `from` ufficiale è:

```
PROSŌPON <noreply@accademiaprosopon.it>
```

Se vuoi cambiarlo (es. `info@accademiaprosopon.it`), modifica solo la riga `FROM_EMAIL` in `api/send-form.js` e fai un nuovo push → Vercel redeploya automaticamente.

> Nota: il `replyTo` è impostato sull'email del mittente del form. Quando rispondi all'email che ti arriva su centroprosopon@gmail.com, parte direttamente verso la persona che ti ha scritto — anche se il `from` è `noreply@`.

---

### Come testare l'endpoint dopo il deploy

Apri il Terminale e lancia:

```bash
curl -X POST https://www.accademiaprosopon.it/api/send-form \
  -H "Content-Type: application/json" \
  -d '{"form":"contatti","nome":"Test","email":"tuamail@gmail.com","messaggio":"Funziona?"}'
```

Risposta attesa: `{"ok":true,"id":"..."}` e nella casella centroprosopon@gmail.com arriva un'email formattata in oro/avorio con marchio PROSŌPON.

Se invece ricevi:
- `405 Method not allowed` → hai chiamato in GET invece che POST.
- `400 Nome ed email sono obbligatori` → manca un campo obbligatorio.
- `502 Servizio email non disponibile` → Resend ha rifiutato (probabile `RESEND_API_KEY` mancante o dominio non autorizzato per quel `from`).

---

### Come collegare un form HTML del sito (esempio Contatti)

Nel form HTML aggiungi questi due elementi:

```html
<!-- Honeypot: invisibile agli umani, lo compilano solo i bot -->
<input type="text" name="website" tabindex="-1" autocomplete="off"
       style="position:absolute;left:-9999px;opacity:0;height:0;width:0;" aria-hidden="true">

<!-- Campo nascosto per identificare il tipo di form -->
<input type="hidden" name="form" value="contatti">
```

E sostituisci l'`action` Formsubmit con uno script JS che chiama l'endpoint:

```html
<script>
document.querySelector('#form-contatto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Invio in corso…';
  try {
    const r = await fetch('/api/send-form', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const json = await r.json();
    if (r.ok && json.ok) {
      window.location.href = 'grazie.html';
    } else {
      alert(json.error || 'Errore di invio. Riprova.');
      btn.disabled = false;
      btn.textContent = 'Invia';
    }
  } catch (err) {
    alert('Errore di rete. Riprova.');
    btn.disabled = false;
    btn.textContent = 'Invia';
  }
});
</script>
```

---

### Form supportati (subject automatici)

L'endpoint genera oggetti email leggibili in base al campo nascosto `form`:

| `form` | Oggetto email |
|--------|---------------|
| `contatti` | Nuovo messaggio dal sito |
| `iscrizione` | Nuova iscrizione |
| `audizione` | Nuova richiesta di audizione |
| `newsletter` | Nuova iscrizione alla newsletter |
| `piano-triennale` | Richiesta piano di studi triennale |
| `info-corso` | Richiesta informazioni corso |

Se passi un valore non in lista, l'oggetto diventa `Nuovo invio dal sito: <valore>`.

---

### Sicurezza implementata

- **Honeypot**: campo `website` invisibile. Se è compilato, l'endpoint risponde 200 OK ma non invia nulla. Filtra il 90%+ dei bot.
- **Validazione email**: regex base + lunghezza massima.
- **Anti-flood lato Resend**: il piano gratuito Resend ha rate limit nativo.
- **Escape HTML**: i contenuti utente sono sanificati prima di entrare nell'email (no link/script iniettabili).
- **No log della chiave**: `RESEND_API_KEY` non viene mai stampata.

---

### Cosa NON è ancora fatto (prossimi step)

1. ✅ ~~Aspettare verifica DNS Resend~~ — fatto
2. ✅ ~~Cambiare `FROM_EMAIL` con dominio verificato~~ — fatto (`noreply@accademiaprosopon.it`)
3. ⏳ Decidere quale form collegare per primo e migrarlo da Formsubmit a Resend
4. ⏳ Migrare progressivamente gli altri form (Iscrizione, Audizione, Newsletter, Info corso)
5. ⏳ (Opzionale) Aggiungere reCAPTCHA o Cloudflare Turnstile per anti-bot evoluto

---

### Costi

Resend free tier: **3000 email/mese, 100 al giorno**. Per il volume di un form sito istituzionale è ampiamente sufficiente. Quando si supera, scatta il piano Pro (~$20/mese per 50k email).
