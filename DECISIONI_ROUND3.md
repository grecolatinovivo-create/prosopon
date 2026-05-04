# DECISIONI ROUND 3 — Tavola rotonda 4 senior

**Data:** 2026-05-04
**Oggetto:** chiusura (o classificazione) dei 9 placeholder + 7 check browser ancora aperti.
**Mandato:** solo deliberazione, l'esecuzione segue in un agente successivo.

---

## A) Placeholder (9)

### Punto 1 — Endpoint Formspree (4 form)
**Coder:** abbiamo 4 occorrenze di `REPLACE_WITH_YOUR_ID`. Senza ID il sito è graficamente intero ma i form bouncano. Ho 3 alternative pubblicabili senza signup: `mailto:` puro (rompe però la UX di success message + validazione client), Web3Forms (richiede comunque key gratuita), Formsubmit.co (basta sostituire l'email destinataria, niente account).
**UX:** `mailto:` come unico canale è una regressione drammatica: apre il client mail, perde il pre-fill, perde aria-live di success. Però come *fallback hardcoded nel `noscript`* o come "se non ti risponde, scrivici a info@..." è oro.
**Neuro:** Formsubmit.co è il miglior default editoriale: zero account, basta che l'utente confermi una mail una volta sola. Mantiene il behavior JS attuale. Se il direttore preferisce Formspree, il refactor è 1 stringa.
**Auditor:** GDPR-wise sia Formspree (US, DPF) sia Formsubmit (US) richiedono privacy policy aggiornata. La nostra c'è già, copre Formspree. Aggiungere riga su Formsubmit se cambiamo.
→ **DECISIONE: PROPOSTA-DEFAULT.** Lasciamo i 4 endpoint Formspree come placeholder (l'utente potrebbe già avere un account), MA aggiungiamo come fallback visibile sotto ogni form: *"Problemi con il modulo? Scrivici a `info@accademiaprosopon.it`"* con `mailto:` pre-compilato (subject = oggetto del form). Esegue: **Coder**.

### Punto 2 — Dominio `accademiaprosopon.it`
**Coder:** se è davvero su GitHub Pages, l'URL canonical sbagliato è un disastro SEO (canonical che punta a un dominio non risolvibile = de-indexing). Però l'utente potrebbe avere già registrato il dominio e puntarlo a Pages via CNAME.
**Auditor:** non possiamo decidere noi: o l'utente conferma il dominio reale, o introduciamo una variabile JS centralizzata (sovra-engineering per un sito statico di 10 pagine).
**Neuro:** branding-wise `accademiaprosopon.it` è il dominio "giusto". Se ancora non è registrato, è una urgenza commerciale, non tecnica.
→ **DECISIONE: HARD-BLOCKER (soft).** L'esecutore NON tocca il dominio. Aggiunge in `README.md` una sezione "Dominio canonical" che elenca i 36 punti da find/replace se l'utente cambia idea (lista già in TODO §B). Esegue: **Auditor** (solo aggiornamento README).

### Punto 3 — `info@accademiaprosopon.it`
**Neuro:** è già il canale ufficiale ovunque. Sostituirlo con l'email personale del direttore sarebbe un downgrade di percezione brand.
**Auditor:** finché la mailbox non esiste è bounce. Ma è una scelta dell'utente: meglio un placeholder coerente che una falsa email funzionante.
→ **DECISIONE: DOCUMENTAZIONE.** Resta. Aggiungiamo in README.md un alert "STEP 0 PRE-LAUNCH: creare mailbox `info@<dominio>` o l'intero sito ha link mail bouncati". Esegue: **Auditor**.

### Punto 4 — Dati legali in `privacy.html` (P.IVA, ragione sociale, sede legale)
**Auditor:** sono dati che dipendono dalla costituzione formale dell'ente. Inventarli è illecito.
**Coder:** il blocco è già marcato esplicitamente come "in via di formalizzazione" con `.blocco-info`. Niente da fare lato codice.
→ **DECISIONE: HARD-BLOCKER.** Nessuna azione. Esecutore: nessuno.

### Punto 5 — Indirizzo sede operativa
**Neuro:** "comunicato in fase di colloquio" oggi va bene per le audizioni, ma per la biblioteca/aule prove è un freno alla conversione (chi si presenta in un posto sconosciuto?).
**Auditor:** dato reale dell'utente.
→ **DECISIONE: HARD-BLOCKER.** Nessuna azione. Esecutore: nessuno.

### Punto 6 — Embed mappa Google
**UX:** dipende strettamente dal punto 5.
**Auditor:** anche se avessimo l'indirizzo, embed Maps = cookie di terze parti = serve aggiornare `cookie.html` e attivare il banner.
→ **DECISIONE: HARD-BLOCKER.** Nessuna azione. Esecutore: nessuno.

### Punto 7 — CV Caterina Pentericci
**Coder:** la modale oggi semplicemente non ha link CV (gestione corretta del file mancante).
**UX:** aggiungere "CV in arrivo" è peggio del silenzio: crea aspettativa non mantenibile.
**Neuro:** lasciare così è coerente con il resto. Eventualmente solo una nota interna in TODO.
→ **DECISIONE: DOCUMENTAZIONE.** Nessuna modifica al codice. Già documentato in TODO §H. Esecutore: nessuno.

### Punto 8 — PNG/ICO favicon (oggi solo SVG)
**Coder:** Pillow 12.1 è disponibile nel sandbox. Però SVG → PNG con Pillow puro non funziona (Pillow non parsa SVG). Servirebbe `cairosvg` o `rsvg-convert`. ImageMagick `convert` è installato (v6.9.11) e supporta SVG → PNG con `librsvg` o MSVG delegate — *probabile che funzioni*.
**Auditor:** verifico esecutore: prova `convert favicon.svg -resize 32x32 favicon-32.png`; se fallisce, fallback a generazione PNG da scratch via Pillow disegnando il glifo Π in oro su nero (è un favicon semplice, replicabile in 30 righe Python).
**UX:** apple-touch-icon 180×180 è la priorità (visibile su iOS home screen). favicon.ico multi-size è "nice to have" 2026.
→ **DECISIONE: AUTO-RISOLVIBILE.** Esecutore prova `convert` su SVG; se fallisce genera PNG (16, 32, 180) via Pillow disegnando glifo Π oro `#b8965a` su nero. Aggiunge i `<link>` in tutti e 10 i `<head>` e nel `site.webmanifest`. Esegue: **Coder + Auditor (verify)**.

### Punto 9 — Foto docenti in WebP
**Coder:** ImageMagick conferma support WebP (`WEBP* rw+`). Comando: `convert "file.jpg" -quality 80 -resize 800x "file.webp"`. 8 foto = 8 conversioni. Costo: secondi.
**UX:** `<picture><source type="image/webp"><img …jpg></picture>` è il pattern corretto, da applicare nelle 4 card homepage + 8 card docenti.html + 8 modali docenti.html = 20 sostituzioni.
**Auditor:** rischio: se l'utente sostituisce in futuro un .jpg ma dimentica il .webp, browser servirà jpg (ok, fallback funziona). Nessuna regressione.
→ **DECISIONE: AUTO-RISOLVIBILE.** Esegue: **Coder** (conversione + refactor `<img>` → `<picture>`).

---

## B) Check browser (7)

### Punto 10 — Lighthouse
**Auditor:** `which lighthouse` → non installato. `npx lighthouse` richiederebbe download Chromium nel sandbox: rischio timeout (Lighthouse di solito >100MB di deps + headless Chrome). Inoltre serve un server HTTP per testare un sito statico, e i risultati comunque vanno interpretati a mano.
→ **DECISIONE: DOCUMENTAZIONE.** L'esecutore aggiunge istruzioni passo-passo in README.md (`python3 -m http.server 8000` + Chrome DevTools → Lighthouse → 9 pagine, target ≥90). Esegue: **Auditor**.

### Punto 11 — W3C HTML validator
**Auditor:** `pip install html5validator` → installato OK in `~/.local/bin` (non in PATH default ma path noto). Posso eseguirlo subito su tutte le 10 pagine.
→ **DECISIONE: AUTO-RISOLVIBILE.** Esegue: **Auditor** lancia `html5validator --root . --also-check-css` e riporta esito in TODO; se zero errori critici marca [x] il check, altrimenti apre task per Coder.

### Punto 12 — W3C CSS validator
**Auditor:** non c'è una CLI ufficiale W3C CSS Validator. Esistono alternative (`csstree-validator` via npm) ma più rumorose. Lighthouse stesso copre molti errori CSS critici.
→ **DECISIONE: DOCUMENTAZIONE.** Istruzioni in README per upload manuale di `style.css` su https://jigsaw.w3.org. Esegue: **Auditor**.

### Punto 13 — Test responsive 375/768/1024/1440
→ **DECISIONE: DOCUMENTAZIONE.** Solo browser DevTools reale. Già documentato. Esecutore: nessuno.

### Punto 14 — Test funzionale form
**Auditor:** circular blocker — dipende da Formspree configurato (Punto 1).
→ **DECISIONE: HARD-BLOCKER.** Nessuna azione. Già documentato. Esecutore: nessuno.

### Punto 15 — Focus trap modali
→ **DECISIONE: DOCUMENTAZIONE.** Solo browser. Esecutore: nessuno.

### Punto 16 — Screen reader
→ **DECISIONE: DOCUMENTAZIONE.** Solo utente. Esecutore: nessuno.

### Punto 17 — Cross-browser
→ **DECISIONE: DOCUMENTAZIONE.** Solo utente. Esecutore: nessuno.

---

## Tabella riassuntiva

| # | Tema | Decisione | Chi esegue |
|---|------|-----------|------------|
| 1 | Formspree endpoint x4 | PROPOSTA-DEFAULT (mailto fallback sotto ogni form) | Coder |
| 2 | Dominio canonical | HARD-BLOCKER (soft) — solo nota README | Auditor |
| 3 | `info@accademiaprosopon.it` | DOCUMENTAZIONE — alert STEP 0 in README | Auditor |
| 4 | Dati legali privacy.html | HARD-BLOCKER | — |
| 5 | Indirizzo sede operativa | HARD-BLOCKER | — |
| 6 | Embed mappa Maps | HARD-BLOCKER (dipende da #5) | — |
| 7 | CV Pentericci | DOCUMENTAZIONE (già coperta) | — |
| 8 | Favicon PNG/ICO | AUTO-RISOLVIBILE (ImageMagick + Pillow fallback) | Coder + Auditor |
| 9 | Foto docenti WebP | AUTO-RISOLVIBILE (ImageMagick) | Coder |
| 10 | Lighthouse | DOCUMENTAZIONE (istruzioni README) | Auditor |
| 11 | W3C HTML | AUTO-RISOLVIBILE (`html5validator`) | Auditor |
| 12 | W3C CSS | DOCUMENTAZIONE | Auditor |
| 13 | Responsive | DOCUMENTAZIONE | — |
| 14 | Submit form | HARD-BLOCKER (dipende da #1) | — |
| 15 | Focus trap | DOCUMENTAZIONE | — |
| 16 | Screen reader | DOCUMENTAZIONE | — |
| 17 | Cross-browser | DOCUMENTAZIONE | — |

---

## Lista esecutore (azioni concrete e verificabili)

L'agente esecutore successivo deve fare **solo queste cose**, nell'ordine:

### Coder
1. **Mailto fallback x4 form**: sotto il pulsante submit di tutti e 4 i form (`contatti.html` x2, `iscrizioni.html` x2), aggiungere subito dopo `.form-reassurance` un microcopy: *"Problemi con il modulo? Scrivici a [info@accademiaprosopon.it](mailto:info@accademiaprosopon.it?subject=...)"*, con `subject=` differente per ciascun form (Contatto / Newsletter / Audizione triennale / Iscrizione corsi serali).
2. **Favicon PNG/ICO**: generare `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180×180). Tentare prima `convert favicon.svg -resize NxN out.png`; se fallisce/produce vuoto, generare via Pillow disegnando un glifo Π color `#b8965a` su sfondo nero. Aggiungere i `<link rel="icon" sizes="...">` e `<link rel="apple-touch-icon">` nel `<head>` di tutte e 10 le pagine + nel `site.webmanifest`.
3. **WebP foto docenti**: per ogni JPG in `assets/docenti/`, generare `.webp` con `convert "$f" -quality 80 -resize 800x "${f%.jpg}.webp"`. Poi sostituire i 20 `<img>` (4 home + 8 card docenti + 8 modali) con `<picture><source srcset="...webp" type="image/webp"><img src="...jpg" alt="..." width="..." height="..." loading="lazy"></picture>`. Mantenere intatti `alt`, `width`, `height`, `loading`.

### Auditor
4. **html5validator**: eseguire `~/.local/bin/html5validator --root /path/to/Accademia_prosopon --match "*.html"` (escludendo `documenti/`). Se zero errori, marcare [x] il check W3C HTML in TODO. Se errori, aprire bullet point per Coder con file:riga.
5. **README.md update**: aggiungere sezione "STEP 0 PRE-LAUNCH" con: (a) creare mailbox `info@<dominio>`; (b) confermare dominio reale e fare find/replace di `accademiaprosopon.it` se diverso (lista 36 punti già in TODO §B); (c) sostituire 4 endpoint Formspree; (d) istruzioni Lighthouse passo-passo (`python3 -m http.server 8000` → Chrome DevTools → Lighthouse → 9 pagine target ≥90); (e) link ai validatori W3C HTML/CSS per upload manuale.
6. **TODO.md update**: aggiungere riga di log Round 3 con i 3 placeholder chiusi (favicon, webp, fallback mailto) e i 5 hard-blocker che restano in carico all'utente.

### Nessuno (hard-blocker / utente)
- Punti 2, 4, 5, 6, 7, 13, 14, 15, 16, 17: nessuna azione codice.
