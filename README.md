# Accademia di Teatro Classico Prosopon — sito web

Sito istituzionale statico dell'Accademia di Teatro Classico Prosopon (Roma, 2025).
9 pagine HTML, un solo foglio di stile, zero build step, zero dipendenze JS runtime.

---

## Struttura del repository

```
Accademia_prosopon/
├── index.html              # Home
├── accademia.html          # Chi siamo, missione, direttore artistico, "Voci"
├── formazione.html         # Triennale + serali + laboratori + masterclass (4 tab)
├── docenti.html            # 8 docenti con modali full-screen
├── eventi.html             # Spettacoli & eventi (placeholder + newsletter strip)
├── iscrizioni.html         # Audizioni triennale + iscrizione corsi serali (FAQ accordion)
├── contatti.html           # Form contatto + form newsletter
├── privacy.html            # Informativa privacy GDPR (noindex)
├── cookie.html             # Cookie policy (noindex)
│
├── style.css               # CSS unico, mobile-first, variabili in :root
├── favicon.svg             # Lettera Π oro su nero
├── site.webmanifest        # PWA-light manifest
├── sitemap.xml             # Sitemap (esclude privacy/cookie noindex)
├── robots.txt              # Disallow /documenti/ (CV interni)
├── .gitignore
│
├── assets/
│   ├── home.webp           # Hero background
│   └── docenti/            # 8 ritratti docenti (jpg)
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

### 1. Sostituire i placeholder

Vedi sezione finale del `TODO.md` per la lista completa. Sintesi:

- `REPLACE_WITH_YOUR_ID` → ID Formspree reale (4 occorrenze: 2 in `iscrizioni.html`, 2 in `contatti.html`)
- `accademiaprosopon.it` (dominio) → confermare o sostituire con il dominio reale (canonical, OG, sitemap, robots, JSON-LD)
- `info@accademiaprosopon.it` → configurare la casella reale lato MX/DNS oppure sostituire l'indirizzo
- Dati legali (P.IVA, ragione sociale, sede legale) → integrare in `privacy.html` quando disponibili
- Indirizzo sede operativa → integrare in `contatti.html` (oggi: "Sede operativa a Roma. Indirizzo completo comunicato in fase di colloquio")
- Mappa Maps reale → sostituire il blocco placeholder in `contatti.html`

### 2. Test prima del go-live

Eseguire **manualmente** in browser reale (non automatizzabili da CLI):

- [ ] Lighthouse (Performance, Accessibility, SEO, Best Practices) — target ≥ 90 ciascuno
- [ ] Validatore W3C HTML su tutte e 9 le pagine
- [ ] Validatore CSS sul `style.css`
- [ ] Test responsive a 375 / 768 / 1024 / 1440 px
- [ ] Test funzionale di tutti e 4 i form (post-Formspree configurato)
- [ ] Test focus trap modali docenti (Tab + Shift+Tab + Esc)
- [ ] Test screen reader (almeno VoiceOver su macOS o NVDA su Windows)
- [ ] Test apertura modali da homepage (`docenti.html#puglisi` ecc.)

### 3. Asset

- [ ] (Opzionale) Convertire le 8 foto docenti in WebP con `<picture>` fallback
  ```bash
  for f in assets/docenti/*.jpg; do
    cwebp -q 80 -resize 800 0 "$f" -o "${f%.jpg}.webp"
  done
  ```
- [ ] (Opzionale) Generare PNG 16/32 e apple-touch-icon 180 dal favicon SVG
- [ ] CV mancante per Caterina Pentericci (oggi: link "Scarica CV" non presente nella sua modale)

### 4. Hosting

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
