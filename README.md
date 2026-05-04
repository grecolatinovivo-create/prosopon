# Accademia di Teatro Classico Prosopon — sito web

Sito istituzionale statico dell'Accademia di Teatro Classico Prosopon (Roma, 2025).
10 pagine HTML, un solo foglio di stile, zero build step, zero dipendenze JS runtime.

> **Date anno accademico** (Round 2 — aggiornate 2026-05-04):
> - **Triennale**: A.A. **2027/2028**
> - **Corsi serali / laboratori / masterclass**: avvio ottobre 2026 → A.A. **2026/2027**

---

## Struttura del repository

```
Accademia_prosopon/
├── index.html              # Home
├── accademia.html          # Chi siamo, missione, direttore artistico, "Voci"
├── formazione.html         # Triennale + serali + laboratori + masterclass (4 tab)
├── docenti.html            # 8 docenti con modali full-screen
├── biblioteca.html         # La Biblioteca (fondo teatro classico) + sezione "Aule prove"
├── eventi.html             # Spettacoli & eventi (placeholder + newsletter strip)
├── iscrizioni.html         # Audizioni triennale + iscrizione corsi serali (FAQ accordion)
├── contatti.html           # Form contatto + form newsletter
├── privacy.html            # Informativa privacy GDPR (noindex)
├── cookie.html             # Cookie policy (noindex)
│
├── style.css               # CSS unico, mobile-first, variabili in :root
├── favicon.svg             # Lettera Π oro su nero (sorgente)
├── favicon-16.png          # Favicon 16×16 (Round 3)
├── favicon-32.png          # Favicon 32×32 (Round 3)
├── apple-touch-icon.png    # 180×180 per iOS home screen (Round 3)
├── favicon.ico             # ICO multi-res 16+32+48 (Round 3)
├── site.webmanifest        # PWA-light manifest (con tutte le icone)
├── sitemap.xml             # Sitemap (esclude privacy/cookie noindex)
├── robots.txt              # Disallow /documenti/ (CV interni)
├── .gitignore
│
├── assets/
│   ├── home.webp           # Hero background
│   └── docenti/            # 8 ritratti: jpg + webp (Round 3)
│
├── documenti/              # NON pubblicato (Disallow in robots)
│   ├── cv/                 # 7 PDF dei CV docenti (Pentericci esclusa)
│   ├── BIO DOCENTI .pages  # interno (ignorato via .gitignore)
│   └── Piano di lavorazione .pages
│
├── TODO.md                 # Tracker dei 4 agenti senior
├── TECH_NOTES.md           # Scelte tecniche e architettura
└── README.md               # Questo file
```

---

## Servire il sito in locale

Il sito è puramente statico, quindi è sufficiente un server HTTP locale per testarlo.

```bash
# Python 3 (built-in)
python3 -m http.server 8000

# oppure Node (npx, no install)
npx serve .

# oppure PHP
php -S localhost:8000
```

Apri quindi `http://localhost:8000` nel browser.

> Nota: aprire i file con `file://` può funzionare per molte pagine, ma rompe i fetch
> di Formspree, le ancore `?richiesta=...` e i form. Usa sempre un server locale.

---

## Stack

- HTML5 semantico (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- CSS3 puro, custom properties, mobile-first, niente framework
- JavaScript vanilla inline per: hamburger menu, tab, accordion FAQ, modali docenti (focus trap), validazione form
- Google Fonts (Cormorant Garamond + EB Garamond + Cinzel) via `<link rel="preconnect">` + `display=swap`
- Form: integrazione Formspree (endpoint placeholder, vedi sotto)

Nessun build step, nessun bundler, nessun pacchetto npm.

---

## Pre-deploy checklist

### STEP 0 — Pre-launch obbligatorio (l'utente deve fare queste cose prima del push)

Senza questi step, parti del sito non funzionano (form bouncano, mailto cade nel nulla, canonical SEO sbagliato).

1. **Mailbox `info@<dominio>`**
   La casella `info@accademiaprosopon.it` è usata in 12 punti del sito (footer di tutte le 10 pagine, `privacy.html`, `cookie.html`, `contatti.html`, fallback dei 4 form). Se non esiste, ogni `mailto:` cade in bounce.
   - Se hai già il dominio: crea la mailbox dal pannello del provider (Aruba, Register.it, GoDaddy, Google Workspace, ecc.).
   - Se preferisci un alias: configura `info@` come alias verso una casella esistente.

2. **Conferma dominio canonical**
   Tutto il sito (canonical, og:url, og:image, sitemap.xml, robots.txt, JSON-LD) usa `accademiaprosopon.it` come placeholder. Se è il dominio definitivo, niente da fare. Altrimenti, sostituisci ovunque:
   ```bash
   # macOS / BSD sed
   find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" -o -name "*.webmanifest" \) \
     -exec sed -i '' 's/accademiaprosopon\.it/TUO-DOMINIO.it/g' {} +
   # Linux / GNU sed
   find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" -o -name "*.webmanifest" \) \
     -exec sed -i 's/accademiaprosopon\.it/TUO-DOMINIO.it/g' {} +
   ```

3. **Configurazione Formspree (4 form)**
   I 4 form usano `https://formspree.io/f/REPLACE_WITH_YOUR_ID`. Crea un account su https://formspree.io, ottieni il tuo ID (es. `xrgwdkqv`) e fai un find/replace:
   ```bash
   # macOS
   sed -i '' 's|formspree.io/f/REPLACE_WITH_YOUR_ID|formspree.io/f/IL_TUO_ID|g' iscrizioni.html contatti.html
   # Linux
   sed -i 's|formspree.io/f/REPLACE_WITH_YOUR_ID|formspree.io/f/IL_TUO_ID|g' iscrizioni.html contatti.html
   ```
   Verifica con `grep -n "REPLACE_WITH_YOUR_ID" *.html` (deve restituire 0 occorrenze). Puoi usare lo stesso ID per tutti e 4 i form (Formspree distingue per `name=` del form) oppure 4 ID separati.
   *Fino a configurazione, sotto ogni form è già attivo un fallback `mailto:info@accademiaprosopon.it` con `subject=` pre-compilato (Round 3).*

4. **Dati legali in `privacy.html` §1**
   Il blocco `.blocco-info` dichiara esplicitamente "in via di formalizzazione". Quando l'ente è costituito (associazione culturale, SRL, ditta individuale…), integra: forma giuridica + Partita IVA + Codice Fiscale + indirizzo sede legale completo.

5. **Indirizzo sede operativa in `contatti.html`**
   Oggi: *"Sede operativa a Roma. Indirizzo completo comunicato in fase di colloquio"*. Sostituisci con almeno **quartiere + via** quando disponibile, e poi sostituisci anche il blocco placeholder "Mappa in arrivo" con un `<iframe>` Google Maps o OpenStreetMap. Attenzione: l'embed Maps introduce cookie di terze parti → aggiorna anche `cookie.html` e attiva il banner (snippet pronto in `cookie.html` §6).

6. **Orari biblioteca / aule (`biblioteca.html`)**
   2 commenti HTML segnaposto: `[ORARI DA DEFINIRE]` e `[FASCE ORARIE DA DEFINIRE]`. Il copy visibile è già prudente; sostituisci appena la direzione conferma.

### STEP 1 — Test browser-based (eseguire prima del push)

Non automatizzabili da CLI. Esegui ciascuno passo per passo.

#### Lighthouse (Performance · Accessibility · SEO · Best Practices, target ≥ 90)

1. Avvia il sito in locale: `python3 -m http.server 8000` dalla root del progetto
2. Apri Chrome (versione recente) → vai su `http://localhost:8000/index.html`
3. Apri DevTools: `Cmd+Opt+I` (macOS) o `F12` (Windows/Linux)
4. Tab "Lighthouse" → spunta tutte e 4 le categorie → Mode: "Navigation" → Device: prima "Mobile" poi "Desktop" → "Analyze page load"
5. Ripeti per le 9 pagine pubbliche (esclusa `privacy.html` e `cookie.html` che sono `noindex`): `index`, `accademia`, `formazione`, `docenti`, `biblioteca`, `eventi`, `iscrizioni`, `contatti`. Nota i punteggi e le diagnostiche; i fix più frequenti riguardano LCP (peso immagini hero), CLS (manca width/height su `<img>`), tap targets su mobile.

#### Validatore W3C HTML

1. Vai su https://validator.w3.org/nu/
2. Per ciascuna delle 10 pagine, opzione "Address": incolla l'URL (post-deploy) oppure usa "File Upload" se sei ancora in locale.
3. Tollera warning. Zero errori critici. Report già completato in `VALIDATORE_HTML_REPORT.md` (Round 3 — pass).

#### Validatore W3C CSS

1. Vai su https://jigsaw.w3.org/css-validator/
2. Tab "By file upload" → carica `style.css` → "Profile: CSS level 3 + SVG" → "Vendor Extensions: Warnings".
3. Tollera warning su custom properties moderne (`text-underline-offset`, `aspect-ratio`, `inset`, `backdrop-filter` — tutte standard CSS3 supportate dai browser correnti).

#### Test responsive (375 / 768 / 1024 / 1440)

1. Apri Chrome → DevTools (`Cmd+Opt+I`)
2. Toggle device toolbar: `Cmd+Shift+M` (macOS) / `Ctrl+Shift+M` (Windows/Linux)
3. Dropdown in alto → seleziona "Responsive" e digita le 4 larghezze (375, 768, 1024, 1440). Per 375 puoi anche usare "iPhone SE" preset.
4. Per ciascuna larghezza testa: nav (hamburger ↔ desktop), hero, griglie card formazione, FAQ accordion, form e checkbox (touch target ≥ 44×44 px), footer.

#### Screen reader

- **macOS** — VoiceOver: avvia con `Cmd+F5`. Naviga con `Ctrl+Opt+→/←`. Esci con `Cmd+F5`. Tutorial ufficiale: `Apple > Tutorial Voice Over`.
- **Windows** — NVDA: scarica gratis da https://www.nvaccess.org/download/ → installa → `Insert + ↓` per leggere riga per riga, `Tab` per saltare ai link.
- Test minimo: skip-link "Vai al contenuto" è il primo annunciato? I form leggono i messaggi `aria-live` (success/error)? Le card-docente in homepage leggono "Vai alla scheda di [Nome]"?

#### Cross-browser

Opzioni:
- **BrowserStack** (free trial): https://www.browserstack.com/users/sign_up — testa Safari iOS, Chrome Android, Edge, Firefox.
- **LambdaTest** (free trial): https://www.lambdatest.com/ — alternativa equivalente.
- **Manuale** (gratuito): testa almeno Chrome + Safari + Firefox sul tuo Mac, e apri il sito su iPhone/Android personale.

Prendi nota di ogni regressione visiva, soprattutto su Safari (gestisce `backdrop-filter` e `:focus-visible` in modo particolare).

### STEP 2 — Hosting

Il sito è pensato per un hosting statico (Netlify, Vercel, GitHub Pages, Cloudflare Pages, server LAMP base). Non richiede Node, runtime, database né CMS. Cache consigliata: 1 anno per `/assets/*` con cache-busting via filename, no-cache per `*.html`.

---

## Convenzioni

- Lingua: italiano (`<html lang="it">`)
- Email canale ufficiale: `info@accademiaprosopon.it` (placeholder, da configurare)
- Email diretta direttore: `puglisiandreasaverio@gmail.com` (presente solo in `contatti.html` come "Direzione artistica")
- Nessun cookie analytics o di profilazione attivi → nessun cookie banner richiesto allo stato attuale

---

## Riferimenti incrociati

- `TODO.md` — tracker pre-launch dei 4 agenti senior (Coder, UX, Neuromarketer, Auditor) + sezione finale "Placeholder da sostituire"
- `TECH_NOTES.md` — scelte architetturali, struttura CSS, flusso form, note SEO
