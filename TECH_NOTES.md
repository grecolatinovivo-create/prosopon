# TECH_NOTES — Accademia Prosopon

Note tecniche per chi metterà mano al sito dopo il go-live. Non sostituiscono `README.md` (operativo); qui si spiega perché certe scelte sono state fatte.

---

## 1. Stack e principi

- **HTML/CSS/JS vanilla**, zero build step, zero dipendenze npm.
- Una sola **`style.css`** mobile-first con custom properties in `:root`.
- JS inline per pagina, scritto a mano, niente framework.
- Lingua: it (`<html lang="it">`), encoding UTF-8.
- Hosting target: qualsiasi static host (Netlify/Vercel/Pages/server LAMP).

Motivazione: sito istituzionale a contenuto a bassa frequenza di update, basso volume, alta longevità. Un build step obbligherebbe il committente a ricostruirlo a ogni piccola modifica testuale; un framework introdurrebbe debito tecnico.

---

## 2. Pagine

| File | Note tecniche |
|------|----------------|
| `index.html` | Hero LCP-critical (no `loading="lazy"` sull'immagine fold). JSON-LD `EducationalOrganization` solo qui. CTA hero: "Iscriviti alle audizioni" + "Scopri il triennio". |
| `accademia.html` | Anchor `#direttore-artistico`. Sezione "Voci" (`#voci`) con 3 quote, l'ultima placeholder onesto. |
| `formazione.html` | 4 tab WAI-ARIA (`role="tablist"` / `role="tab"` / `role="tabpanel"`). Navigazione tastiera frecce/Home/End. Ancore mobile sticky `.ancore-corsi`. |
| `docenti.html` | 8 modali full-screen, focus trap, riapertura via hash (`#nome-docente` → JS apre `#modale-nome-docente`). 7 link CV (Pentericci esclusa). |
| `eventi.html` | 4 card placeholder con CTA "Avvisami quando esce" → newsletter. Stato "vuoto" evocativo. |
| `iscrizioni.html` | 2 form (audizione triennale, iscrizione corsi serali) + FAQ accordion accessibile. Banda scarcity sotto hero. |
| `contatti.html` | Form contatto + form newsletter. Pre-compilazione oggetto via querystring `?richiesta=piano-triennale`. Direzione artistica + Segreteria. |
| `privacy.html` | `noindex, follow`. Index interno cliccabile. Tabelle dati/finalità. |
| `cookie.html` | `noindex, follow`. Snippet cookie banner pronto in `<pre>` commentato (non attivo). |

---

## 3. Architettura CSS

### Custom properties (`:root`)

```css
--color-nero            #0e0d0b
--color-grafite         (sezioni scure)
--color-avorio          #f5f0e8        (background avorio chiaro)
--color-avorio-scuro    (background blocchi info)
--color-oro             #b8965a        (accent primario)
--color-oro-chiaro      (accent su sfondo scuro)
--color-oro-scuro       (border / dettagli)
--color-link            #7a5f30        (link inline su avorio, AA ≥ 5.12:1)
--color-grigio          (testo secondario)
--color-grigio-chiaro   #a09a92        (testo footer su nero, AA ≥ 6.4:1)

--font-titolo           'Cinzel', serif        (etichette)
--font-display          'Cormorant Garamond'   (h1, h2)
--font-corpo            'EB Garamond'          (paragrafi)
```

### Convenzioni di naming

Ibrido BEM + utility class. Esempio:

- `nav__menu`, `nav__link`, `nav__cta`         (BEM block-element)
- `card`, `card--centro`, `card--padding-lg`   (BEM modifier)
- `card__icona`, `card__titolo`, `card__testo` (BEM element)
- `.spazio-sopra-md`, `.testo-centrato`        (utility)
- `.btn`, `.btn--oro`, `.btn--contorno`        (componenti)

### Regole globali importanti

- `:focus-visible` outline oro 2px su `a, button, input, select, textarea` (a11y).
- `.skip-link` come primo elemento di ogni `<body>` (a11y).
- `main p a:not(.btn), main li a:not(.btn)` → underline + `text-underline-offset` (link inline ben distinguibili).
- `.sezione--scura` ha override per link inline (oro chiaro invece di `--color-link`).
- `.form-errore` con `aria-live="polite"` su input.
- `.form-reassurance` micro-rassicurazioni accanto al submit (Neuro).
- `.banda-scarcity` strip dorata per urgency etico.

---

## 4. Flusso form (Formspree)

Tutti e 4 i form puntano a `https://formspree.io/f/REPLACE_WITH_YOUR_ID` e vanno aggiornati con l'ID reale prima del go-live (vedi `TODO.md` blocco placeholder).

Pattern condiviso:

1. `<form>` con `action`, `method="POST"`, `novalidate` (la validazione è fatta da JS per offrire messaggi in voce di brand).
2. Per ogni input: `<label>` + `<input>` + `<span class="form-errore" aria-live="polite">`.
3. JS: funzione `validaCampo(input)` per ogni `blur` e `submit`. Mappa `MSG_VUOTO` per nome campo → messaggio brand-coerente.
4. `<div class="form-stato" role="status" aria-live="polite">` riceve gli stati di submit (loading/success/error) annunciati a screen reader.
5. Checkbox `name="consenso_privacy" required` con link a `privacy.html` (target `_blank`).
6. `.form-reassurance` accanto al pulsante con micro-rassicurazioni ("Risposta entro 48h", "Niente spam"…).

### Pre-compilazione oggetto

`contatti.html` legge `?richiesta=piano-triennale` (querystring) e pre-compila il campo `oggetto` con valore tematico. Il link che attiva questo flusso è in `formazione.html:170` ("Richiedi il piano di studi").

---

## 5. SEO

- `<link rel="canonical">` su tutte e 9 le pagine.
- Open Graph completo (`og:type`, `og:locale=it_IT`, `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`).
- Twitter Card (`twitter:card=summary_large_image` + tag relativi) sulle 7 pagine pubbliche.
- `JSON-LD` `EducationalOrganization` solo su `index.html`.
- `sitemap.xml` (esclude privacy/cookie, che hanno `noindex`).
- `robots.txt` con `Disallow: /documenti/` (CV interni).
- `<meta name="description">` unico per pagina (≤155 char).
- `<meta robots="noindex, follow">` su `privacy.html` e `cookie.html`.

---

## 6. Accessibilità

- Skip link "Vai al contenuto" come primo elemento del `<body>`.
- `<header>` semantico per nav, `<main id="contenuto">`, `<footer>`.
- `aria-current="page"` sul link nav della pagina attiva (sulle 7 pagine pubbliche).
- Hamburger menu: `aria-expanded`, `aria-controls`.
- FAQ accordion: `aria-expanded`, `aria-controls`, `id`, wrapping `<h3>`.
- Tab formazione: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, navigazione tastiera con frecce/Home/End.
- Modali docenti: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, ripristino focus alla chiusura, gestione `Esc` e click outside, gestione `Space` oltre a `Enter`.
- `:focus-visible` globale outline oro 2px.
- Tutti gli `img` hanno `alt` significativo (pattern "Ritratto di X").
- Tutti gli `img` hanno `width`/`height` espliciti (anti-CLS).
- Contrasti link e testo verificati ≥ AA (vedi `--color-link` e `--color-grigio-chiaro`).

---

## 7. Performance

- Hero `index.html`: immagine senza `loading="lazy"`, `width`/`height` esplicite.
- Tutte le altre `<img>`: `loading="lazy"`.
- Google Fonts caricati via `preconnect` + `<link rel="stylesheet">` con `display=swap` (no `@import` per evitare blocking-render).
- Nessun JavaScript di terze parti caricato in fondo (solo Formspree, e solo al submit).
- Nessun analytics → niente cookie banner → niente blocking script.
- (Da fare a deploy time): conversione foto docenti in WebP con `<picture>` fallback per ridurre del ~60% il peso di `docenti.html`.

---

## 8. Privacy / GDPR

- `privacy.html` copre titolare, dati raccolti, finalità + base giuridica (art. 6 GDPR), responsabili esterni (Formspree, Google Fonts), trasferimenti extra UE (SCC + DPF), tempi di conservazione, diritti artt. 15-22, modalità di esercizio, reclamo Garante.
- `cookie.html`: nessun cookie di analytics/profilazione attualmente. Snippet banner pronto e commentato in fondo, da attivare solo se in futuro vengono introdotti analytics o cookie di terze parti non tecnici.
- Tutti e 4 i form hanno checkbox `consenso_privacy` obbligatorio con link a `privacy.html`.
- Newsletter: implementata oggi come singolo opt-in (Formspree). **Per essere pienamente conforme si raccomanda di passare a un provider con double-opt-in (Mailchimp/Brevo/MailerLite/...) prima del lancio attivo della newsletter.** Fino ad allora il flag è da considerarsi soft.

---

## 9. Dipendenze esterne (al runtime)

| Servizio | Uso | Note |
|----------|-----|------|
| Google Fonts | Caricamento Cormorant Garamond, EB Garamond, Cinzel | Solo CSS, nessun cookie persistente. Citato in privacy/cookie. |
| Formspree | Backend dei 4 form | Endpoint placeholder `REPLACE_WITH_YOUR_ID`. Citato in privacy/cookie. |

Nessun analytics, nessun social plugin, nessun video embed, nessuna mappa interattiva, nessun CDN JS.

---

## 10. Limiti noti / debito tecnico

- Nav e footer sono **duplicati a mano** sulle 9 pagine. Modifica = 9 edit. Soluzione futura: SSI/include o piccolo build step (Eleventy, Astro). Per ora SCOPE OUT.
- 4 endpoint Formspree placeholder.
- Foto docenti ancora in JPG (no WebP).
- Favicon solo SVG; PNG 16/32 e apple-touch-icon non generabili senza tool grafico.
- CV Pentericci mancante.
- Indirizzo sede operativa e dati legali (P.IVA, ragione sociale) ancora placeholder in `privacy.html` e `contatti.html`.
- Mappa in `contatti.html` è un blocco statico "in arrivo", non un embed reale.
