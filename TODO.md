# TODO — Accademia Prosopon (Pre-Launch Hardening)

> Tracker condiviso dai 4 agenti senior (Coder, UI/UX, Neuromarketer, Auditor).
> Convenzioni: `[ ]` aperto · `[x]` chiuso · `[~]` parzialmente fatto / da rivedere.
> Ogni agente, alla chiusura di un punto, marca `[x]` e firma con il proprio ruolo tra parentesi.

> ⚠️ **REGOLA OPERATIVA (utente):** nessun `git commit` né `git push`. Le modifiche vanno
> proposte e applicate localmente. L'utente revisionerà le pagine HTML in browser PRIMA
> di approvare il push. Gli agenti NON devono toccare git.

---

## 🆕 ROUND 2 — Nuove richieste utente (2026-05-04)

### Aggiornamento date anno accademico
- [ ] Triennale: A.A. **2027/2028** (sostituire ovunque "2025/2026" o "2025-2026" relativo al triennio)
- [ ] Serali / Laboratori / Masterclass: avvio **ottobre 2026** → A.A. **2026/2027**
- [ ] Verificare: banda scarcity homepage e iscrizioni, copy iscrizioni, copy formazione, sitemap lastmod, JSON-LD

### Nuova pagina "La Biblioteca"
- [ ] Creare `biblioteca.html` con sezione principale "La Biblioteca" — angle: Accademia Prosopon è l'unico centro che offre uno spazio di studio e riflessione su teatro classico
- [ ] Aggiungere sezione "Accesso alle aule" nella stessa pagina — angle: aule a disposizione degli studenti su prenotazione, per offrire un luogo "safe" dove provare
- [ ] Aggiungere voce "Biblioteca" alla nav su tutte le pagine (10 pagine totali ora)
- [ ] Aggiungere link nel footer di tutte le pagine
- [ ] Aggiornare `sitemap.xml`, OpenGraph, canonical, meta description per la nuova pagina
- [ ] Aggiungere CTA prenotazione aula (può puntare al form contatti con `?richiesta=prenotazione-aula#form-contatto`)
- [ ] Aggiornare `README.md` e `TECH_NOTES.md` con la nuova pagina

---

## 🔧 SENIOR CODER — Fix tecnici

### Form e backend
- [x] Integrare backend reale per `iscrizioni.html` (form audizioni triennale) — Formspree o equivalente (Coder) — endpoint placeholder `https://formspree.io/f/REPLACE_WITH_YOUR_ID`, da sostituire con ID reale
- [x] Integrare backend reale per `iscrizioni.html` (form iscrizione corsi serali) (Coder) — stesso endpoint placeholder
- [x] Integrare backend reale per `contatti.html` (form contatti) (Coder) — stesso endpoint placeholder
- [x] Integrare backend reale per `contatti.html` (form newsletter) (Coder) — stesso endpoint placeholder
- [x] Aggiungere validazione client-side robusta (oltre HTML5) e messaggi di errore accessibili (Coder) — funzione `validaCampo` + `aria-invalid` + `.form-errore` con `aria-live`
- [x] Stato di submit (loading/success/error) leggibile a screen reader (`aria-live`) (Coder) — `<div class="form-stato" role="status" aria-live="polite">` su tutti e 4 i form

### Semantica HTML5
- [x] Aggiungere `<main>` su tutte le 7 pagine (Coder)
- [x] Wrappare il nav in `<header>` semantico (Coder)
- [x] Footer in `<footer>` semantico (verificare) (Coder) — già presente, confermato
- [x] Sostituire `<section>` generici con `<article>` dove appropriato (es. card docenti, eventi) (Coder) — card formazione, card docenti, card serali, eventi, percorsi iscrizioni
- [x] Aggiungere `aria-current="page"` al link nav della pagina attiva (Coder)

### SEO
- [x] Creare e linkare favicon (16x16, 32x32, apple-touch-icon, manifest.webmanifest) (Coder) — `favicon.svg` (lettera Π oro su nero) + `site.webmanifest`; PNG/ICO non generabili senza tool grafici
- [x] Aggiungere Open Graph completo a tutte le pagine (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale=it_IT`) (Coder)
- [x] Aggiungere Twitter Card (`twitter:card=summary_large_image` + tag relativi) (Coder)
- [x] Aggiungere JSON-LD Schema.org `EducationalOrganization` su index.html (Coder)
- [x] Creare `sitemap.xml` (Coder)
- [x] Creare `robots.txt` (Coder) — exclude `/documenti/` (CV/dati interni)
- [x] Aggiungere `<link rel="canonical">` per ogni pagina (Coder)
- [x] Verificare e migliorare `<meta description>` di ogni pagina (max 155 char, unica per pagina) (Coder)

### Performance
- [x] Aggiungere `loading="lazy"` a tutti gli `<img>` non above-the-fold (Coder) — first-fold escluso
- [x] Aggiungere `width` e `height` espliciti a tutti gli `<img>` (anti-CLS) (Coder) — 120×120 home, 400×533 docenti, 600×600 ritratto direttore
- [x] Sostituire `@import` di Google Fonts con `<link rel="preconnect">` + `<link rel="stylesheet">` con `display=swap` (Coder)
- [~] Convertire foto docenti in WebP (mantenendo .jpg come fallback con `<picture>`) — RIMANDATO A TOOL ESTERNO (Coder): la conversione binaria non è possibile senza strumenti grafici/CLI dedicati. Suggerito `cwebp -q 80 -resize 800 0` per ognuna.
- [x] Risolvere riferimento a `assets/hero-bg.jpg` mancante (creare placeholder o rimuovere riferimento da `style.css:338`) (Coder) — aggiornato a `assets/home.webp`

### Sicurezza
- [x] Aggiungere `rel="noopener noreferrer"` a tutti i link esterni con `target="_blank"` (Coder) — unico link esterno è `andreapuglisi.com` in `contatti.html`
- [x] Offuscare email/telefono (almeno data-attribute o JS) per ridurre scraping spam (UX) — DELIBERATAMENTE NON OFFUSCATO. Motivazione: l'offuscamento via JS rompe `mailto:` e `tel:` (peggiora UX/accessibilità) e gli scraper moderni decodificano comunque la maggior parte dei pattern. Mitigazione adottata: in `contatti.html` l'email del direttore è ora affiancata da un canale istituzionale (`info@accademiaprosopon.it`, da configurare lato MX) — questo riduce la pressione sull'indirizzo personale senza penalizzare l'usabilità. Auditor può rivalutare se in futuro arriva spam concreto.

### Accessibilità tecnica
- [x] Aggiungere `:focus-visible` globale su `a, button, input, select, textarea` (Coder) — outline oro 2px nel CSS
- [x] Aggiungere `aria-expanded` e `aria-controls` all'hamburger menu (tutte le pagine) (Coder)
- [x] Aggiungere `aria-expanded`/`aria-controls`/`id` all'accordion FAQ in `iscrizioni.html` (Coder) — anche `<h3>` wrapper attorno ai pulsanti
- [x] Aggiungere `aria-selected`, `aria-controls`, `role="tabpanel"` ai tab in `formazione.html` (Coder) — più navigazione tastiera con frecce/Home/End
- [x] Implementare focus trap nelle modali docenti (`docenti.html`) (Coder) — focus trap con Tab/Shift+Tab + ripristino focus alla chiusura
- [x] Aggiungere gestione tasto `Space` (oltre a `Enter`) sulle card-docente con `role="button"` (Coder)
- [x] Aggiungere skip-link "Vai al contenuto" come primo elemento di ogni pagina (Coder)
- [x] Verificare e aggiungere `alt` significativi (non vuoti) a tutte le immagini decorative/informative (Coder) — pattern "Ritratto di X"

### Pulizia asset e file
- [x] Eliminare cartella duplicata `assets/docenti/Foto docenti /` (con spazio finale) (Coder)
- [x] Eliminare `assets/img/Image.jpeg` (orfana) (Coder) — rimossa anche la cartella `assets/img/` vuota
- [x] Eliminare `home.png` di root (screenshot abbandonato) (Coder)
- [x] Decidere e gestire `assets/home.webp` (usare come hero-bg o eliminare) (Coder) — usato come `hero-bg` (style.css aggiornato + `og:image`)
- [x] Eliminare tutti i `.DS_Store` (root, assets, assets/docenti, documenti) (Coder)
- [~] Spostare/rimuovere file `.pages` (`BIO DOCENTI .pages`, `Piano di lavorazione .pages`) — interni, non pubblicabili (Coder) — lasciati in `documenti/`, ignorati via `.gitignore` (`*.pages`)
- [x] Creare `.gitignore` (`.DS_Store`, `*.pages`, `node_modules`, ecc.) (Coder)

### Bug specifici
- [x] Fix `formazione.html:119` — link "Scarica il piano di studi" punta erroneamente a `CURRICULUM scherma.docx` (CV scherma di Pentericci) (Coder) — sostituito con CTA "Richiedi il piano di studi" che porta al form contatti con oggetto pre-compilato (`?richiesta=piano-triennale#form-contatto`)
- [x] Decidere destino dei 7 CV in `documenti/cv/`: linkarli dalle modali docenti o spostarli fuori repo (Coder) — linkati da ogni modale come "Scarica CV (PDF)" con `download`; Pentericci esclusa (file mancante)

### Refactor (opzionale ma consigliato)
- [~] Estrarre nav e footer in template includes (almeno via JS injection) per evitare duplicazione su 7 pagine (Coder) — SCOPE OUT come da briefing; nav/footer riallineati manualmente

---

## 🎨 SENIOR UI/UX — Fix design e usabilità

### Contrasti e colori
- [x] Verificare contrasto link inline `var(--color-oro-scuro)` su avorio (target WCAG AA) (UX) — `#8a6e3a` su `#f5f0e8` ≈ 4.21:1 (sotto AA). Introdotta variante dedicata `--color-link: #7a5f30` con ratio ≈ 5.12:1 (AA OK). Documentato in commento `style.css`.
- [x] Aggiungere underline esplicito ai link inline (mailto/tel/link interni testuali) (UX) — regola `main p a:not(.btn), main li a:not(.btn)` con underline + offset; variante per `.sezione--scura`.
- [x] Verificare contrasto testo `#6b6560` (footer copyright) — eventualmente schiarire (UX) — `#6b6560` su nero ≈ 3.1:1 (sotto AA). Sostituito con `--color-grigio-chiaro: #a09a92` (ratio ≈ 6.4:1). Aggiunto override per i `style="color:var(--color-grigio)"` nei `footer__bottom p`.

### Componenti
- [x] Convertire le card docente in homepage in link reali (`<a href="docenti.html#nome">`) (UX) — 4 card ora `<a class="docente-circle">` con `aria-label="Vai alla scheda di [Nome]"`. Gli ID degli ancoraggi sono già le `id` delle modali (`#puglisi`, `#rossetto`, `#sarti`, `#pentericci`): la logica `apriDocente(hash)` in `docenti.html` apre direttamente la modale.
- [x] Promuovere stili inline ricorrenti a classi utility (es. `.titolo-card`, `.cta-band`, `.intro-large`) (UX) — aggiunte in `style.css`: `.card--centro`, `.card--padding-lg`, `.card__icona`, `.card__titolo`, `.card__testo`, `.card__cta`, `.intro-large`, `.cta-band` (+ `__etichetta`), `.testo-centrato`, `.spazio-sotto-*`, `.spazio-sopra-*`, `.docente-circle`. Index.html refactorato (3 card formazione + 4 card docente + CTA band finale).
- [x] Aggiungere visivo "in evidenza" / data prossimo evento sulla card-evento più imminente (UX) — `.evento-imminente` rinforzato con gradient di sfondo, badge "Prossimo evento" più leggibile (era "Prossimo"), classe globale `.evento-card--prossimo` + `.evento-badge` documentata in `style.css`.
- [x] Migliorare la visibilità dello stato attivo nei tab di `formazione.html` (UX) — override globale in `style.css`: `border-bottom: 3px` oro, background `rgba(184,150,90,0.10)`, `box-shadow` discreta, `font-weight: 500`, colore testo su `--color-link` (AA OK).

### Mobile
- [x] Test e fix tipografia hero su <480px (h1 a tre righe con tracking 0.06em rischia overflow) (UX) — `clamp(2rem, 8vw, 3.2rem)` con `letter-spacing: 0.04em`, sostituendo il vecchio `clamp(1.8rem, 8vw, 2.6rem)`. Documentato in commento.
- [x] Aggiungere ancore di navigazione interne a `formazione.html` (3 corsi in colonna lunga su mobile) (UX) — classe `.ancore-corsi` (sticky sotto la nav, scroll orizzontale, mobile-only via `@media max-width: 768px`). La preesistente `.ancore-mobile` è stata sostituita per coerenza con la convenzione richiesta.

### Microcopy strutturale (questa parte è tecnicamente UX, ma vedi anche Neuromarketer)
- [x] Scrivere messaggi di errore form chiari e in voce di brand (UX) — mappa `MSG_VUOTO` per nome campo in `contatti.html` e `iscrizioni.html`. Esempi: "Manca il nome — chi sei?", "Senza email non possiamo risponderti.", "Quest'email sembra incompleta. Riprova.", "Per parlarci serve almeno una motivazione.". Anche stati di submit ("Stiamo facendo partire il messaggio…", "La rete fa le bizze. …"). Il messaggio di successo newsletter ("Bentornato/a") resta al Neuromarketer.
- [x] Scrivere stati vuoti (eventi, masterclass) in modo evocativo (UX) — `eventi.html`: "Il sipario non si è ancora alzato su questa categoria." + CTA newsletter. `formazione.html` masterclass: "Il sipario non si è ancora alzato. I nomi degli ospiti per l'anno accademico 2025–2026 stanno per essere annunciati." + CTA.

---

## 🧠 SENIOR NEUROMARKETER — Conversion & trust

### Trust signals
- [~] Aggiungere zona/quartiere di Roma in `contatti.html` (oggi "indirizzo comunicato agli iscritti" abbatte il trust) (Neuro) — riscritto in tono professionale: "Sede operativa a Roma. Indirizzo completo comunicato in fase di colloquio per audizioni e iscrizioni." PARZIALE: richiede dato reale dall'utente (quartiere o indirizzo) per essere chiuso definitivamente.
- [~] Aggiungere mappa statica (anche solo immagine) o embed Maps per la sede (Neuro) — inserito blocco placeholder "Mappa in arrivo" con icona stilizzata e `role="img"` + `aria-label`. PARZIALE: in attesa di indirizzo reale per sostituire con embed Maps.
- [x] Sostituire (o affiancare) email personale `puglisiandreasaverio@gmail.com` con identità istituzionale `info@accademiaprosopon.it` — almeno come label visiva (Neuro) — verificata coerenza: in `contatti.html` è già presente come "Segreteria" accanto a "Direzione artistica" (label già introdotte da UX). Aggiunta inoltre nel footer di tutte e 7 le pagine sotto la firma "Roma, dal 2025." come canale ufficiale unificante.
- [x] Inserire una sezione "Direzione artistica" più visibile in homepage con leverage su CV del fondatore (Neuro) — nuova sezione `#direzione-artistica` tra citazione e missione: foto 1:1, quote in voce di brand, bio sintetica con 4 trust signal (DAMS lode, Fondamenta, attore TV/cinema, premi), CTA "Conosci la direzione" → `accademia.html#direttore-artistico` (ancora aggiunta) + CTA secondario "Vedi la scheda completa" → `docenti.html#puglisi`.
- [x] Aggiungere placeholder per testimonianze/quote (anche solo dei docenti, in attesa di alumni) (Neuro) — sezione "Voci dell'Accademia" in `accademia.html` (id `#voci`): 3 card — quote attribuita ad Andrea Saverio Puglisi (estratta dalla filosofia del sito, non inventata), quote dalla visione formativa attribuita a Prosopon, e card placeholder onesta "Sezione in costruzione" per le voci future di studenti/docenti.

### CTA e funnel
- [x] Audit di tutti i CTA (label, posizionamento, gerarchia visiva) (Neuro) — audit completo: ogni pagina ora ha almeno 1 CTA conversion verso audizioni o iscrizioni. Aggiunti CTA conversion finali su `docenti.html` (mancante) e `formazione.html` (mancante in fondo). Allineato wording su "Iscriviti alle audizioni" + "Scopri il triennio" come pattern primario/secondario.
- [x] CTA principale homepage: verificare se "Iscriviti alle audizioni" funziona meglio di "Iscriviti" (Neuro) — CTA hero homepage cambiato da "Scopri la Formazione / Audizioni & Iscrizioni" a "Iscriviti alle audizioni / Scopri il triennio". CTA finale homepage anche sdoppiato in due bottoni con stesso pattern.
- [x] Aggiungere micro-CTA secondario ("Scopri il triennio", "Conosci i docenti") (Neuro) — pattern `card__cta` già introdotto da UX presente sulle 3 card formazione homepage ("Programma completo", "Scopri i corsi", "Prossimi appuntamenti"). Confermato e aggiunto CTA secondario "Scopri il triennio" sull'hero. "Conosci tutti i docenti" già presente sotto le card docente.
- [x] Inserire scarcity/urgency etico se applicabile (es. "Audizioni aperte fino al [data]") (Neuro) — aggiunta `.banda-scarcity` (homepage subito sotto hero + iscrizioni.html sotto hero): wording prudente "Audizioni in apertura · Anno Accademico 2025–2026" + link "Candidati" su homepage. Non si inventano scadenze.

### Microcopy persuasiva
- [x] Fix typo: `contatti.html:170` "Bentornato/a" → "Benvenuto/a" (è newsletter di prima iscrizione) (Neuro) — verificato: già corretto da UX nel JS success message. Riscritto inoltre in tono brand: "Fatto. Il tuo nome è ora tra le voci di Prosopon — benvenuto/a."
- [x] Fix concordanza: `iscrizioni.html:250` "anche senza esperienza è benvenuto" → "anche chi non ha esperienza è benvenuto" (Neuro) — verificato: già corretto da UX (`iscrizioni.html` riga 316).
- [x] Riscrivere `formazione.html:198` "porta il teatro come vocazione parallela" (frase contorta) (Neuro) — verificato: già corretto da UX in "coltivare il teatro come vocazione parallela" (`formazione.html` riga 251).
- [x] Aggiungere reassurance copy vicino ai form (es. "Risposta entro 48h", "I tuoi dati restano tuoi") (Neuro) — aggiunta classe `.form-reassurance` (CSS globale) con micro-rassicurazioni accanto al pulsante submit di tutti e 4 i form: contatti ("Risposta entro 48h · Niente spam · I tuoi dati restano tuoi"), newsletter ("Solo aggiornamenti utili · Disiscrizione in un click"), audizioni ("Risposta entro 5 giorni · I tuoi dati restano tuoi"), iscrizione corsi ("Conferma entro 48h · Niente spam"). Posizione strategica: stessa riga del CTA, non lontano.
- [x] Confirmation/success message dei form in tono brand-consistent (Neuro) — riscritti tutti e 4 i success message: contatti "Grazie. Il tuo messaggio è arrivato — ti rispondiamo entro 48 ore lavorative.", newsletter "Fatto. Il tuo nome è ora tra le voci di Prosopon — benvenuto/a.", audizioni "Candidatura ricevuta. Hai mosso il primo passo: ti contatteremo entro 5 giorni…", iscrizione corsi "Richiesta arrivata. Entro 48 ore ti scriviamo con conferma del posto…".

### Eventi e dynamic content
- [x] Decidere policy per eventi con data "—": riempire date reali oppure rimuovere/rietichettare come "in programmazione" (Neuro) — 4 card placeholder riscritte: il "—" sostituito con "·" più sobrio, descrizione include "in definizione" / "data esatta in definizione", e ogni card ha un link "Avvisami quando esce" → `contatti.html#newsletter`. Wording prudente, niente date inventate.
- [x] Aggiungere CTA su pagina eventi per iscrizione lista d'attesa/notifiche (Neuro) — newsletter strip finale di `eventi.html` riscritta: etichetta "Lista d'attesa & notifiche", titolo "Vuoi essere il primo a saperlo?", paragrafo "Date, ospiti, posti disponibili: gli annunci passano prima dalla newsletter di Prosopon.", CTA "Iscriviti alla newsletter" → `contatti.html#newsletter`.

---

## 🔍 SENIOR AUDITOR — GDPR, QA finale, compliance

### GDPR / Privacy
- [x] Creare pagina `privacy.html` con informativa completa (Auditor) — informativa GDPR completa: titolare, dati raccolti per ciascun modulo, finalità + basi giuridiche (art. 6), responsabili esterni (Formspree, Google Fonts), trasferimenti extra UE (SCC + DPF), tempi conservazione, diritti artt. 15-22, modalità esercizio, reclamo Garante. Indice cliccabile, `noindex, follow`. Placeholder dati legali (P.IVA, ragione sociale, sede legale) marcati esplicitamente da sostituire.
- [x] Creare pagina `cookie.html` con cookie policy (Auditor) — policy completa: nessun cookie di analytics/profilazione attivi, sezione Formspree + Google Fonts, istruzioni gestione cookie nei 5 browser principali, snippet banner pronto e commentato in `<pre>` per attivazione futura.
- [x] Aggiungere link a privacy/cookie nel footer di tutte le pagine (Auditor) — verificato: tutti e 9 i footer (incluse privacy/cookie) hanno `<a href="privacy.html">Privacy</a> · <a href="cookie.html">Cookie</a>` nel `.footer__bottom`.
- [x] Aggiungere checkbox consenso GDPR obbligatorio sui form `iscrizioni.html` (entrambi) (Auditor) — checkbox già presente da Coder; AGGIUNTO link a `privacy.html` (target `_blank`) nelle label di entrambi i form (audizione + iscrizione corso serale), che prima erano testo piatto senza link.
- [x] Aggiungere checkbox consenso GDPR sul form contatti `contatti.html` (Auditor) — verificato: entrambi i form (contatto + newsletter) hanno checkbox + link a `privacy.html` correttamente.
- [~] Verificare informativa newsletter e double-opt-in (Auditor) — singolo opt-in oggi (Formspree). Per piena conformità GDPR/CAN-SPAM si raccomanda passaggio a provider con DOI (Mailchimp/Brevo/MailerLite/...) prima del lancio attivo della newsletter. Out-of-scope tecnico per il sito statico, è un punto di backend/infra. Documentato in `TECH_NOTES.md` §8.
- [x] Cookie banner se introdotti analytics o cookie non tecnici (Auditor) — NON OBBLIGATORIO ad oggi (no analytics, no profilazione, no social plugin, no embed video/mappe). Snippet pronto e commentato in fondo a `cookie.html` (sezione 6) per attivazione futura. CONDIZIONE: se in futuro vengono introdotti GA/Plausible/Matomo, embed YouTube/Vimeo, Maps interattive, social plugin → attivare lo snippet, accompagnarlo con blocco preventivo degli script e aggiornare `cookie.html` §2.

### Consistency check
- [x] Verificare che tutti i link interni di nav e footer puntino a target esistenti (Auditor) — tutti i link nav/footer puntano a file esistenti. Bug minore trovato e CORRETTO: `formazione.html:253` puntava a `iscrizioni.html#serali` (ancora inesistente) → cambiato in `iscrizioni.html#form-iscrizione`. Le ancore `docenti.html#nome` (puglisi/rossetto/sarti/pentericci) non sono ID HTML reali ma vengono intercettate dal JS `apriDocente(hash)` che apre la modale corrispondente — comportamento corretto e voluto.
- [x] Verificare che ogni img src nei .html corrisponda a un file reale (Auditor) — verificate tutte le `img src` in tutte e 9 le pagine. Tutte le 8 foto docenti + `home.webp` esistono in `assets/`. Nessun riferimento orfano.
- [x] Verifica conteggio "8 Docenti" annunciato vs reali su `docenti.html` (Auditor) — homepage dichiara "8 Docenti" (riga `index.html:289`), `docenti.html` ha 8 articoli card-docente + 8 modali (`#modale-puglisi/rossetto/sarti/rizzo/marsico/viola/mascetta/pentericci`). Coerenza confermata.
- [x] Aggiungere foto Caterina Pentericci (Auditor) — `assets/docenti/caterina-pentericci.jpg` esiste, è linkata sia su index.html (4 card docente) sia su docenti.html (card + modale). Cartella duplicata "Foto docenti " già rimossa da Coder. Consistenza unica confermata.
- [x] Verifica che dopo il refactor i 7 CV PDF siano linkati o rimossi (Auditor) — verificati 7 link `documenti/cv/CV - *.pdf` con attributo `download` dalle modali corrispondenti (Puglisi, Rossetto, Sarti, Rizzo, Marsico, Viola Grosso, Mascetta). Tutti i 7 file PDF esistono fisicamente in `documenti/cv/`. Pentericci correttamente esclusa (CV non disponibile). Cartella `/documenti/` esclusa via `robots.txt`.

### QA finale
- [~] Test apertura/chiusura modali docenti su tutti i 8 docenti (Auditor) — STATIC CHECK ok: 8 modali con `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, ripristino focus, gestione Esc + click outside + Space/Enter sulle card. Hash routing `apriDocente(window.location.hash)` presente. **TEST REALE BROWSER richiesto dall'utente** (incluso ESC + click outside + Tab/Shift+Tab in tutti gli 8 modali).
- [ ] Test responsive 375 / 768 / 1024 / 1440 (DA UTENTE) — non eseguibile da CLI, richiede browser DevTools.
- [ ] Test compilazione + submit di tutti i form (DA UTENTE) — richiede ID Formspree reale (oggi placeholder).
- [ ] Test navigazione tastiera Tab su tutta la home (DA UTENTE) — richiede browser.
- [ ] Lighthouse audit (DA UTENTE) — non eseguibile senza browser headless. Target ≥ 90 per Performance/Accessibility/SEO/Best Practices.
- [ ] Validatore HTML W3C (DA UTENTE) — eseguire su https://validator.w3.org per tutte e 9 le pagine.
- [ ] Validatore CSS (DA UTENTE) — eseguire su https://jigsaw.w3.org/css-validator.
- [x] QA statica: ID duplicati, attributi aria-* malformati, tag chiusi (Auditor) — pass su tutte e 9 le pagine: nessun ID duplicato (i 4 form hanno suffissi `-c/-nl/-aud/-isc`), `aria-current="page"` solo sulle 7 pagine pubbliche, `aria-controls`/`aria-expanded`/`aria-labelledby` ben formati su nav/FAQ/tab/modali. `id="hamburger"` e `id="navMenu"` univoci per pagina.

### Documentazione
- [x] Creare/aggiornare `README.md` (Auditor) — creato `README.md`: descrizione progetto, struttura cartelle, come servirlo localmente (`python3 -m http.server 8000` e alternative), checklist pre-deploy, lista placeholder, riferimenti incrociati a TODO/TECH_NOTES.
- [x] Creare `TECH_NOTES.md` (Auditor) — creato `TECH_NOTES.md`: stack scelto (vanilla, no build), pagina-per-pagina, struttura CSS (custom properties, naming BEM+utility, regole globali), flusso form Formspree con pattern condiviso, SEO, accessibilità, performance, GDPR, dipendenze runtime, limiti noti / debito tecnico.

---

## 📋 LOG DI AVANZAMENTO

| Data | Agente | Azione |
|------|--------|--------|
| 2026-05-04 | Sistema | Creazione TODO.md iniziale con punti raccolti dal briefing precedente |
| 2026-05-04 | Coder  | Hardening tecnico completo: 7 pagine HTML rifatte (semantica `<header>/<main>/<article>`, skip-link, OG/Twitter/canonical, JSON-LD su index, favicon SVG + manifest, sitemap.xml, robots.txt, .gitignore). 4 form integrati con Formspree (endpoint placeholder) + validazione + `aria-live`. CSS: rimosso `@import` Google Fonts, aggiunte regole `:focus-visible`, `.skip-link`, `.form-errore`, hero-bg → `home.webp`. Modali docenti con focus trap + Space/Enter + link CV. Tab Formazione accessibili (role/aria + frecce). FAQ accordion accessibile. Pulizia: rimossi `.DS_Store`, `home.png`, `Image.jpeg`, cartella duplicata "Foto docenti ". WebP foto docenti rimandato a tool esterno. |
| 2026-05-04 | Neuro  | Pass conversion + trust completa. **Trust:** `contatti.html` riscritto wording sede + mappa placeholder accessibile (in attesa di indirizzo reale → 2 punti `[~]`). Email istituzionale `info@accademiaprosopon.it` aggiunta nel footer di tutte e 7 le pagine per coerenza. Nuova sezione `#direzione-artistica` in homepage (foto + quote brand + bio + 2 CTA verso accademia/docenti, con ancora `#direttore-artistico` aggiunta in `accademia.html`). Sezione "Voci dell'Accademia" (`#voci`) in `accademia.html`: 3 quote, l'ultima placeholder onesto. **CTA & funnel:** audit completo, ogni pagina ha almeno 1 CTA conversion. CTA hero homepage cambiato in "Iscriviti alle audizioni / Scopri il triennio" (e replicato in CTA finale). Aggiunti CTA conversion finali su `docenti.html` (mancante) e `formazione.html`. `.banda-scarcity` (CSS globale) inserita su homepage e iscrizioni: wording "Audizioni in apertura · A.A. 2025–2026" senza scadenze inventate. **Microcopy:** verificati i 3 fix typo (già applicati da UX), riscritti tutti e 4 i success message in voce di brand (es. "Fatto. Il tuo nome è ora tra le voci di Prosopon — benvenuto/a."). Aggiunta classe `.form-reassurance` con micro-rassicurazioni accanto a tutti e 4 i pulsanti submit ("Risposta entro 48h", "Niente spam", "I tuoi dati restano tuoi", ecc.). **Eventi:** 4 card placeholder riscritte con "data in definizione" + link "Avvisami quando esce" → newsletter; strip newsletter di `eventi.html` rinforzata in voce funnel ("Vuoi essere il primo a saperlo?"). |
| 2026-05-04 | UX     | Pass design completa. Contrasti: introdotte `--color-link` (#7a5f30) e `--color-grigio-chiaro` (#a09a92), entrambe AA-conformi (5.12:1 e 6.4:1). Link inline: underline globale per `main p/li a:not(.btn)` + variante `.sezione--scura` con oro chiaro. Componenti: classi utility `.card--centro`, `.card__icona/__titolo/__testo/__cta`, `.intro-large`, `.cta-band`, `.testo-centrato`, `.spazio-*`, `.docente-circle`, `.evento-card--prossimo`/`.evento-badge`, `.ancore-corsi`. Index: 3 card formazione + 4 card docente (ora link reali con `aria-label` + ancora a modale) + CTA finale rifattorizzati. Eventi: badge "Prossimo evento" più visibile, stato vuoto evocativo. Formazione: tab attivo rinforzato (border 3px + background + box-shadow), masterclass empty state riscritto, ancore mobile sticky. Mobile: hero h1 `clamp(2rem, 8vw, 3.2rem)` + letter-spacing 0.04em sotto 480px. Microcopy: messaggi errore form mappati per campo in voce di brand (`contatti.html` + `iscrizioni.html`), stati submit/error riscritti. Identità istituzionale: in `contatti.html` aggiunto canale "Segreteria: info@accademiaprosopon.it" (da configurare) accanto all'email del direttore; offuscamento email/telefono deliberatamente NON applicato (peggiora UX). |
| 2026-05-04 | Auditor | **GDPR:** verificato che `privacy.html` (informativa completa, indice cliccabile, art. 6 GDPR, responsabili esterni, trasferimenti extra UE, art. 15-22, reclamo Garante) e `cookie.html` (no analytics, no profilazione, snippet banner pronto e commentato per attivazione futura) erano già presenti e ben fatti — confermati come `[x]`. Aggiunto link a `privacy.html` (target `_blank`) nelle 2 label di consenso GDPR di `iscrizioni.html` (audizione + iscrizione corso serale): prima erano testo piatto. Footer privacy/cookie verificato su tutte e 9 le pagine (incluse privacy/cookie). **Newsletter double-opt-in:** flag `[~]` — Formspree è singolo opt-in, raccomandato passaggio a provider DOI (Mailchimp/Brevo) prima del lancio attivo. **Cookie banner:** non obbligatorio ad oggi (no analytics/profilazione/social/embed); snippet pronto e commentato in `cookie.html` §6 per attivazione futura condizionale. **Consistency:** tutte le 8 foto docenti + 7 CV PDF + `home.webp` esistono e sono linkati. Conteggio "8 docenti" coerente tra index e docenti.html. Bug minore CORRETTO: `formazione.html:253` puntava a `iscrizioni.html#serali` (ancora inesistente) → cambiato in `iscrizioni.html#form-iscrizione`. ID hamburger/navMenu univoci per pagina, ID dei 4 form suffissati `-c/-nl/-aud/-isc` (no duplicati). **Documentazione:** creati `README.md` (struttura, run locale, pre-deploy checklist) e `TECH_NOTES.md` (stack, CSS architecture, flusso form, SEO, a11y, GDPR, debito tecnico). Aggiunto in fondo a `TODO.md` blocco "Placeholder da sostituire prima del push" + blocco "Check che richiedono browser/tool reali (utente)". Lighthouse / W3C / responsive / screen reader / submit form documentati come task da eseguire all'utente — non automatizzabili da CLI. |

---

## ⚠️ PLACEHOLDER DA SOSTITUIRE PRIMA DEL PUSH

Lista esaustiva delle stringhe segnaposto presenti nel repo. **Tutte vanno sostituite prima del go-live**.

### A. Backend form — Formspree
4 occorrenze di `https://formspree.io/f/REPLACE_WITH_YOUR_ID` da sostituire con l'ID reale (può essere lo stesso endpoint per tutti e 4 i form, oppure uno per ciascuno):

| File | Riga | Form |
|------|------|------|
| `iscrizioni.html` | 204 | Form audizione triennale |
| `iscrizioni.html` | 280 | Form iscrizione corsi serali |
| `contatti.html` | 146 | Form contatto generico |
| `contatti.html` | 225 | Form newsletter |

### B. Dominio / URL canonical
Il dominio `accademiaprosopon.it` è usato come placeholder nei `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD e nei file `sitemap.xml` / `robots.txt`. Va confermato (o sostituito con il dominio reale registrato) e propagato in:

- 9× `<link rel="canonical">` (uno per pagina HTML)
- 9× `<meta property="og:url">`
- 9× `<meta property="og:image">`
- 7× `<meta name="twitter:image">` (mancante su privacy/cookie come da convenzione `noindex`)
- `index.html` JSON-LD: `url`, `logo`, `image` (3 occorrenze)
- `sitemap.xml`: 7 `<loc>`
- `robots.txt`: 1 `Sitemap:`

### C. Email istituzionale
`info@accademiaprosopon.it` è usata come **canale ufficiale** in:

- footer di tutte e 9 le pagine HTML
- `privacy.html` (titolare + esercizio diritti + chiusura)
- `cookie.html` (chiusura)
- `contatti.html` (Segreteria, accanto a "Direzione artistica")

→ Va **configurata lato MX/DNS** (creare la mailbox `info@<dominio>`) **oppure** sostituita ovunque con un'email realmente attiva. Finché la mailbox non esiste il link `mailto:` rimanderà il messaggio in bounce.

### D. Email personale direttore
`puglisiandreasaverio@gmail.com` è presente solo in `contatti.html:102` come "Direzione artistica" — **NON è un placeholder**, è un dato reale fornito. Va eventualmente nascosta o spostata su un alias istituzionale a discrezione del direttore artistico.

### E. Dati legali del titolare (`privacy.html` §1)
Il blocco `.blocco-info` dichiara esplicitamente che mancano:

- Forma giuridica (associazione culturale, SRL, SAS, ditta individuale…)
- Partita IVA
- Codice fiscale
- Indirizzo della sede legale completo

→ vanno integrati a **costituzione formale dell'ente perfezionata**. Fino ad allora il blocco resta come "in via di formalizzazione".

### F. Indirizzo sede operativa (`contatti.html`)
Oggi: *"Sede operativa a Roma. Indirizzo completo comunicato in fase di colloquio per audizioni e iscrizioni."* Marcato `[~]` da Neuro. Va sostituito con almeno **quartiere + via** non appena disponibile.

### G. Mappa Maps (`contatti.html`)
Oggi: blocco placeholder "Mappa in arrivo" con icona stilizzata, marcato `[~]` da Neuro. Da sostituire con `<iframe>` Google Maps o OpenStreetMap quando l'indirizzo è confermato.

### H. CV mancante (`docenti.html`)
La modale di **Caterina Pentericci** non ha link "Scarica CV (PDF)" perché il file non esiste in `documenti/cv/`. Se la docente fornisce il PDF, salvarlo come `documenti/cv/CV - Caterina Pentericci.pdf` e aggiungere il link nella modale (`docenti.html` ~ riga 850).

### I. Asset bitmap del favicon
Il favicon è solo `favicon.svg`. PNG 16/32 e `apple-touch-icon.png` 180×180 non sono stati generati (richiedono tool grafico). Generarli con uno strumento (es. https://realfavicongenerator.net) e linkarli in tutti i `<head>` se si vuole il pieno supporto cross-browser.

### J. Foto docenti in WebP
Le 8 foto docenti sono in JPG. Conversione in WebP (con `<picture>` fallback) raccomandata per migliorare il peso/LCP di `docenti.html`. Comando suggerito:
```bash
for f in assets/docenti/*.jpg; do
  cwebp -q 80 -resize 800 0 "$f" -o "${f%.jpg}.webp"
done
```
Poi sostituire `<img>` con `<picture><source srcset="…webp" type="image/webp"><img src="…jpg" …></picture>`.

---

## 🧪 CHECK CHE RICHIEDONO BROWSER / TOOL REALI (DA UTENTE)

Questi check **non sono eseguibili da CLI** (no browser headless in questa sessione) e vanno eseguiti dall'utente prima del push:

### Audit automatici
- [ ] **Lighthouse** (Chrome DevTools → Lighthouse) su tutte e 9 le pagine. Target ≥ 90 per Performance / Accessibility / SEO / Best Practices. Eseguire sia su Mobile (default) sia su Desktop.
- [ ] **Validatore W3C HTML** → https://validator.w3.org/nu/ — eseguire su tutte e 9 le pagine. Tollerare warning, zero errori critici.
- [ ] **Validatore W3C CSS** → https://jigsaw.w3.org/css-validator/ — eseguire su `style.css` (e gli stili inline per-pagina di privacy/cookie). Tollerare warning sui custom properties moderni.
- [ ] **Pa11y / axe DevTools** (estensione browser) per audit accessibility approfondito.

### Test funzionali
- [ ] **Submit dei 4 form** dopo aver configurato l'ID Formspree reale: contatto, newsletter, audizione, iscrizione corso serale. Verificare che: (a) la POST parta, (b) la mail arrivi alla casella configurata, (c) il messaggio di success sia mostrato, (d) gli errori validation client-side siano leggibili.
- [ ] **Pre-compilazione oggetto contatti** via querystring: aprire `formazione.html`, cliccare "Richiedi il piano di studi", verificare che `contatti.html` apra il form contatto con campo `oggetto` pre-compilato.
- [ ] **Apertura modali docenti via hash**: aprire `index.html`, cliccare la card di Puglisi → atterraggio su `docenti.html#puglisi` con modale Puglisi già aperta. Ripetere per Rossetto, Sarti, Pentericci.

### Test responsive
- [ ] **375 px** (iPhone SE) — controllare che hero h1, nav hamburger, card formazione, ancore mobile sticky `.ancore-corsi`, FAQ accordion, form e checkbox consenso siano tutti leggibili e cliccabili (touch target ≥ 44×44 px).
- [ ] **768 px** (tablet portrait) — controllare il punto di break del menu (hamburger ↔ menu orizzontale) e il layout `.griglia-2`.
- [ ] **1024 px** (laptop / iPad landscape) — controllare il layout 3 colonne delle card formazione e il footer 4 colonne.
- [ ] **1440 px** (desktop) — controllare che `.contenitore` non si stiri eccessivamente e che la tipografia hero non superi `clamp` max.

### Test interazione tastiera & screen reader
- [ ] **Navigazione Tab** su tutta la home: skip-link → logo → 7 link nav → CTA → contenuti. Outline `:focus-visible` oro 2px sempre visibile.
- [ ] **Focus trap modali docenti**: aprire una modale, premere Tab ripetutamente — il focus deve restare dentro la modale e ciclare. Shift+Tab ciclo inverso. Esc chiude. Click outside chiude. Al close, il focus torna sulla card che ha aperto la modale.
- [ ] **Tab navigazione formazione**: frecce sinistra/destra spostano il tab attivo. Home/End vanno al primo/ultimo. Enter/Space attivano il tab.
- [ ] **FAQ accordion in iscrizioni**: Enter/Space espande/contrae, `aria-expanded` cambia.
- [ ] **Screen reader test**: almeno un giro con **VoiceOver (macOS)** o **NVDA (Windows)**. Verificare che skip-link sia il primo elemento annunciato, che gli stati `aria-live` dei form vengano letti, che le label dei docente-circle nella home (`aria-label="Vai alla scheda di [Nome]"`) siano corrette.

### Browser cross-check
- [ ] Chrome / Edge / Safari / Firefox più recenti (almeno desktop + iOS Safari + Android Chrome). Niente IE.

---

## 🐛 BUG / DUBBI RESIDUI (Auditor)

Trovati durante la pass statica — **non bloccanti** per il push, ma da valutare con l'utente:

1. **Newsletter singolo opt-in** (Formspree). Per la piena conformità GDPR su comunicazioni commerciali si raccomanda Mailchimp/Brevo con DOI. Soft warning, non blocca il push.
2. **Email `info@accademiaprosopon.it` non configurata** lato MX/DNS. Finché la mailbox non esiste, qualunque `mailto:` cadrà in bounce. Va creata la casella **prima** del lancio (la maggior parte dei punti del sito la usa come canale principale).
3. **Endpoint Formspree placeholder** in 4 punti. Il sito funziona graficamente ma i form non inviano nulla finché non viene sostituito.
4. **CV Pentericci mancante** nella modale (sua o per scelta editoriale?). Verificare con la docente.
5. **Indirizzo sede + dati legali in `privacy.html`** ancora generici. Vanno completati a costituzione perfezionata dell'ente.
6. **Cartella `documenti/`** contiene file `.pages` (BIO DOCENTI, Piano di lavorazione) interni e `.docx` (CURRICULUM scherma — l'origine del bug Coder già risolto). Sono già `Disallow` in `robots.txt` e ignorati via `.gitignore`. Verificare che NON vengano committati per errore (controllo a `git status` prima del push).
7. **Favicon solo SVG**: alcuni vecchi browser desktop e iOS pinned tab continuano a richiedere PNG/ICO. Non bloccante.
8. **Foto docenti ancora in JPG** (~5-8 MB totali ipotetici). Conversione in WebP raccomandata per LCP `docenti.html`. Non bloccante.
9. **Nessun test reale form** possibile in questa sessione. Va fatto dall'utente con browser dopo il fix Formspree.
