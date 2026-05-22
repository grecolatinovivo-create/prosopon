# Istruzioni — Impostare le URL del Payment Link su Stripe

Queste sono le URL di redirect che Stripe deve usare dopo che un cliente clicca "Iscriviti ora" sul corso Maschera Classica.

## Cosa sono le due URL

| URL | Quando si attiva |
|-----|-------------------|
| **Success URL** | Quando il pagamento va a buon fine → il cliente viene rimandato alla pagina di ringraziamento personalizzata |
| **Cancel URL** | Quando il cliente clicca "annulla" o chiude il checkout senza pagare → torna alla pagina dei corsi online |

---

## Procedura passo passo

### 1. Apri Stripe Dashboard

Vai su [dashboard.stripe.com](https://dashboard.stripe.com) e fai login.

Verifica in alto a destra: la modalità **deve essere Live** (l'interruttore "Test mode" deve essere **spento/grigio**, non arancione). I Payment Link veri sono in Live, non in Test.

### 2. Vai ai Payment Links

Nel menu di sinistra, clicca su **Payment Links**.

> Se non vedi "Payment Links" nel menu, prova sotto "Workbench" oppure cerca "Payment Links" nella barra di ricerca in alto.

### 3. Apri il Payment Link del corso

Nella lista, trova il link del corso Maschera Classica (URL `https://buy.stripe.com/9B628r9v2glA4FGdv5fQI01`).
Clicca sulla riga per aprirlo.

### 4. Modifica le impostazioni

In alto a destra clicca **"Edit"** (o, in alcune versioni di interfaccia, l'icona a forma di matita).

### 5. Trova la sezione "After payment"

Scorri la pagina di modifica fino a trovare la sezione **"After payment"** (in italiano potrebbe essere "Dopo il pagamento").
Dentro questa sezione ci sono due opzioni:

- **"Don't show confirmation page"** (default Stripe — non mostra niente, attivata di base)
- **"Show a confirmation page"** (mostra una pagina Stripe generica)
- **"Don't show confirmation page, redirect to your site"** (rimanda al tuo sito) ← **scegli questa**

### 6. Imposta la Success URL

Una volta scelto "redirect to your site" si apre il campo URL.
Incolla **esattamente** questa URL:

```
https://accademiaprosopon.it/grazie.html?tipo=iscrizione-corso-maschera
```

> **Attenzione al `?tipo=iscrizione-corso-maschera` finale**: è la parte che dice alla pagina di ringraziamento "mostra il messaggio del corso pagato" invece del messaggio generico per i form di contatto. Senza questo parametro, l'iscritto vedrebbe un messaggio sbagliato.

### 7. Imposta la Cancel URL

Sempre nella stessa pagina, cerca il campo **"Cancel URL"** (potrebbe essere sotto la Success URL, oppure in una sotto-sezione tipo "More options" / "Advanced settings").

Se non c'è un campo Cancel URL esplicito, Stripe usa la Cancel URL impostata a livello di account: in quel caso vai in **Settings → Branding** o **Settings → Customer Portal** e impostala lì.

Incolla:

```
https://accademiaprosopon.it/formazione.html#online
```

> Così se il cliente cambia idea torna sulla pagina dei corsi online del sito, mantenendo aperta la possibilità di riconsiderare in seguito.

### 8. Salva

In alto a destra clicca **"Update link"** (o "Save").

Stripe ti mostrerà una conferma "Payment Link updated". Le nuove URL sono attive da subito su tutti i checkout futuri.

---

## Come verificare che funzionino

Prima di considerarle "in produzione", fai un test reale **piccolo**:

1. Crea per un attimo un **secondo Payment Link da €1** (Stripe → Payment Links → "+ New") collegato al tuo stesso webhook ma con un prezzo simbolico. Imposta le stesse Success/Cancel URL.
2. Apri il link da una finestra in incognito e completa il pagamento con la tua carta vera (€1).
3. Verifica:
   - dopo il pagamento sei rimandato a `accademiaprosopon.it/grazie.html?tipo=iscrizione-corso-maschera`
   - la pagina mostra il titolo "**Sei dei nostri.**" + il calendario delle 5 sessioni
   - su `centroprosopon@gmail.com` arriva la notifica "[NUOVA ISCRIZIONE]..."
   - alla tua email arriva il messaggio "PROSŌPON — Iscrizione confermata · Maschera Classica"
4. Rimborsati l'€1 (perdi solo ~€0,27 di commissione Stripe).
5. **Cancella o disattiva il Payment Link da €1** così nessun cliente vero lo trova.

Se tutti e tre i controlli del punto 3 sono positivi, sei live.

---

## Cosa succede dietro le quinte

1. Cliente paga → Stripe trattiene la commissione e accredita il netto sul tuo balance.
2. Stripe invia un webhook al tuo sito (`/api/stripe-webhook`) → parte l'email di benvenuto al cliente + la notifica admin a te.
3. Stripe rimanda il cliente all'URL **Success** → atterra su `grazie.html?tipo=iscrizione-corso-maschera` → vede il messaggio personalizzato con il calendario.
4. Meta Pixel registra l'evento "Purchase" (€170 EUR) — utile per ottimizzare le campagne future su Facebook/Instagram.

---

## Promemoria fiscale

Ricorda: ogni pagamento incassato deve essere fatturato **entro 12 giorni** dall'incasso, tramite gestionale di fatturazione elettronica (FattureInCloud, Fatture24, Aruba Fatturazione). La pagina di ringraziamento e il webhook **non sostituiscono** la fattura — quella la devi emettere tu o automatizzarla con il gestionale che si integra con Stripe.
