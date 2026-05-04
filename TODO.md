# TODO — Accademia Prosopon (Pre-Launch Hardening)

> Tracker condiviso dai 4 agenti senior (Coder, UI/UX, Neuromarketer, Auditor).
> Convenzioni: `[ ]` aperto · `[x]` chiuso · `[~]` parzialmente fatto / da rivedere.
> Ogni agente, alla chiusura di un punto, marca `[x]` e firma con il proprio ruolo tra parentesi.

> ⚠️ **REGOLA OPERATIVA (utente):** nessun `git commit` né `git push`. Le modifiche vanno
> proposte e applicate localmente. L'utente revisionerà le pagine HTML in browser PRIMA
> di approvare il push. Gli agenti NON devono toccare git.

---

## 🆕 ROUND 8 — Nuovo layout modale docenti "Ritratto immersivo" (2026-05-04)

- [x] 2026-05-04 — Coder R8: nuovo layout modale docenti (Ritratto immersivo + sintesi UX/Neuro). Riscritte tutte e 8 le modali in `docenti.html` con il layout "Strategia C ibrido" da `NUOVE_BIO_DOCENTI.md`: foto immersiva grande a sinistra (~45% larghezza, altezza piena, sfondo grafite), colonna destra con etichetta-materia (Cinzel oro), nome (Cinzel grande), citazione-firma (Cormorant italic, border-left oro), bio narrativa 3-4 righe, box "Cosa imparerai" su sfondo avorio scuro con border-left oro 3px e 3 punti bullet, 3 chip-credenziali pill (nere, oro), doppio CTA in fondo (Scarica CV con icona SVG download + Iscriviti, oro pieno). Pulsante chiudi ridisegnato (cerchio sottile bordo oro). Animazione fade-in + scale 250ms (skip su `prefers-reduced-motion`). Mobile <768px: foto in banda 16:9 (320px), pannello 100vw/100vh, bottoni full-width column. Pentericci senza CV (file mancante). Aggiornate etichette ruolo nelle 8 card-docente con la materia decisa (es. Puglisi → "Direzione Artistica · Maschera classica", Marsico → "Recitazione cinematografica", Viola → "Tecniche teatrali & Teatro di figura"). Aggiornati anche i 4 ritratti-circle in `index.html` con la materia (Puglisi/Rossetto/Sarti/Pentericci). CSS nuove classi `.modale-ritratto__*` aggiunte in fondo a `style.css` sotto sezione "MODALE DOCENTE — RITRATTO IMMERSIVO". JS focus trap + `apriDocente`/`chiudiModale` invariati (si appoggiano al wrapper `.modale-docente` mantenuto, e i nuovi pannelli espongono pulsanti/link focusabili). Verificato: ID `#puglisi`, `#rossetto`, ecc. preservati per deep-linking; JSON-LD non listava docenti generici (solo `jobTitle: "Direttore Artistico"` per il founder Puglisi, lasciato). Iscrizioni assegnate: Puglisi+Pentericci → audizioni triennale; Rossetto/Sarti/Rizzo/Marsico/Viola/Mascetta → form serali.

---

## 🆕 ROUND 6 — Sede presentata come attiva + FormSubmit live (2026-05-04)

- [x] Rimuovere ogni copy "in arrivo / in allestimento / non ancora attiva" dal sito pubblico (Coder R6) — verificate `privacy.html` e `cookie.html` (già OK da R5: la sede è dichiarata come "operativa a Roma", senza qualifica negativa). Riformulato `contatti.html`: il blocco mappa non urla più "Mappa in arrivo" ma comunica "La posizione esatta viene condivisa al primo colloquio, per tutela della privacy e della sicurezza degli spazi" (motivazione positiva, non assenza). Riformulato `accademia.html` sezione "Voci dell'Accademia" (rimosso "Sezione in costruzione" → presente assertivo: "Le voci... trovano qui spazio, una alla volta — aggiunte di anno in anno"). Riformulato `formazione.html` masterclass empty state (rimosso "Il sipario non si è ancora alzato. I nomi... stanno per essere annunciati" → "Il calendario delle masterclass dell'anno accademico 2026/2027 viene annunciato di volta in volta"). Lasciate intatte: (a) "Audizioni in apertura · A.A. 2027/2028" e "Iscrizioni aperte" (legittime); (b) le date "in definizione" su singoli eventi futuri di `eventi.html` (sono date specifiche realmente non ancora fissate, non lo stato dell'Accademia); (c) i 2 commenti HTML invisibili `[ORARI DA DEFINIRE]` / `[FASCE ORARIE DA DEFINIRE]` in `biblioteca.html` (note tecniche interne); (d) il copy `biblioteca.html` "Orari... vengono comunicati direttamente agli iscritti" e "Fasce orarie... concordate caso per caso" (wording naturale di operatività).
- [x] Integrazione FormSubmit.co sui 4 form (Coder R6) — sostituito `https://formspree.io/f/REPLACE_WITH_YOUR_ID` con `https://formsubmit.co/centroprosopon@gmail.com` su tutti e 4 i form (`iscrizioni.html` x2 + `contatti.html` x2). Aggiunti per ciascuno i campi nascosti standard FormSubmit: `_subject` coerente al form, `_template=table`, `_captcha=true`, `_next` verso `grazie.html` (con `?tipo=newsletter|audizione|iscrizione` per il tracciamento). Il JS submit handler resta invariato: usa `fetch()` inline e considera `resp.ok` come success (true per status 200-299, e fetch segue il redirect 302 di `_next` arrivando a `grazie.html` 200). Nessuna regressione UX. Fallback `mailto:centroprosopon@gmail.com` sotto ogni form mantenuto.
- [x] Creata pagina `grazie.html` (Coder R6) — landing post-submit (Formsubmit `_next` fallback per utenti senza JS). Stesso head/header/footer delle altre pagine. Hero "Grazie · Il tuo messaggio è arrivato a Prosopon", paragrafo con SLA (48h standard / 5gg lavorativi per audizioni), 3 CTA verso accademia/formazione/eventi. `<meta name="robots" content="noindex">` (non indicizzata), NON aggiunta a nav/footer, NON aggiunta a `sitemap.xml`.
- [x] Aggiornati `privacy.html` e `cookie.html` (Coder R6) — sostituiti i 5 riferimenti a "Formspree (Formspree, Inc.)" con "FormSubmit (Whitelabel Web Services, LLC)"; aggiornati i link alle policy del fornitore (`formsubmit.co/privacy`); aggiunta menzione del captcha automatico anti-spam in `cookie.html` §2.2.
- [x] Aggiornati `README.md` e `TECH_NOTES.md` (Coder R6) — README STEP 0 punto 3 riscritto: niente più Formspree ID da configurare, solo 1 click di conferma utente al primo invio. TECH_NOTES §4 riscritta con tabella dei 4 campi nascosti standard FormSubmit + nota su `grazie.html` noindex. §9 dipendenze e §10 debito tecnico allineati. README §Stack e §pre-deploy §1 aggiornati di conseguenza.

---

## 🆕 ROUND 2 — Nuove richieste utente (2026-05-04)

### Aggiornamento date anno accademico
- [x] Triennale: A.A. **2027/2028** (sostituire ovunque "2025/2026" o "2025-2026" relativo al triennio) (Coder R2) — bande scarcity (index, iscrizioni), CTA bands (index, formazione, docenti, accademia), eventi.html (Open Day + Audizioni Triennale), JSON-LD index aggiornato con startDate 2027-10
- [x] Serali / Laboratori / Masterclass: avvio **ottobre 2026** → A.A. **2026/2027** (Coder R2) — etichette CTA su 4 pagine ora distinguono triennale/serali, masterclass placeholder formazione → 2026/2027, eventi (Summer Lab Luglio 2026, Autunno 2026 masterclass, Dicembre 2026 saggio), JSON-LD startDate 2026-10
- [x] Verificare: banda scarcity homepage e iscrizioni, copy iscrizioni, copy formazione, sitemap lastmod, JSON-LD (Coder R2) — 0 occorrenze residue di "2025/2026" / "2025-2026" / "2025–2026" / "A.A. 2025" verificate via grep su tutti i .html e .xml. Sitemap già a 2026-05-04 per tutte le pagine.

### Nuova pagina "La Biblioteca"
- [x] Creare `biblioteca.html` con sezione principale "La Biblioteca" — angle: Accademia Prosopon è l'unico centro che offre uno spazio di studio e riflessione su teatro classico (Coder R2) — scaffold tecnico + prima versione neutra del copy (con `[COPY: ...]` mirati per UX/Neuro). **Copy persuasivo finale (UX/Neuro R2)**: 4/4 marker `[COPY: ...]` sostituiti, hero/H2/H3 rifiniti, USP "L'unico centro a Roma" rinforzato, pre-headline "Una risorsa unica a Roma", trust signal sul fondo (edizioni critiche, materiali rari), CTA "Richiedi accesso alla biblioteca" → `?richiesta=accesso-biblioteca` aggiunta + relativa option nel select di `contatti.html`.
- [x] Aggiungere sezione "Accesso alle aule" nella stessa pagina — angle: aule a disposizione degli studenti su prenotazione, per offrire un luogo "safe" dove provare (Coder R2) — `<section id="aule">` con 2 card + box CTA prenotazione. **Copy persuasivo finale (UX/Neuro R2)**: pre-headline "Uno spazio tuo, quando ne hai bisogno", reassurance esplicita sul bisogno reale ("provare in pace, senza fretta, senza occhi sopra, senza l'imbarazzo di alzare la voce in un appartamento"), scarcity etica "Posti limitati · Su prenotazione", CTA finale uniformata su "Prenota un'aula".
- [x] Aggiungere voce "Biblioteca" alla nav su tutte le pagine (10 pagine totali ora) (Coder R2) — inserita tra "Docenti" ed "Eventi" su tutte e 10 le pagine (incluse privacy/cookie e biblioteca stessa con `aria-current="page"`)
- [x] Aggiungere link nel footer di tutte le pagine (Coder R2) — aggiunto in `footer__lista` "Navigazione" dopo Docenti
- [x] Aggiornare `sitemap.xml`, OpenGraph, canonical, meta description per la nuova pagina (Coder R2) — sitemap voce `biblioteca.html` (lastmod 2026-05-04, priority 0.7); head completo con OG/Twitter/canonical
- [x] Aggiungere CTA prenotazione aula (può puntare al form contatti con `?richiesta=prenotazione-aula#form-contatto`) (Coder R2) — 2 CTA (sezione aule + cta-band finale); aggiunta `<option value="prenotazione-aula">Prenotazione aula prove</option>` nel select oggetto di `contatti.html`. Il JS esistente di pre-compilazione gestisce automaticamente la nuova voce.
- [x] Aggiornare `README.md` e `TECH_NOTES.md` con la nuova pagina (Auditor R2) — README: aggiornato conteggio pagine (10), aggiunta nota date A.A. (Triennale 2027/2028, Serali 2026/2027), `biblioteca.html` aggiunta nella struttura, pre-deploy checklist allineata (10 pagine, test pre-compilazione 3 valori querystring, placeholder `[ORARI DA DEFINIRE]`/`[FASCE ORARIE DA DEFINIRE]`). TECH_NOTES: nuova riga `biblioteca.html` nella tabella pagine, sezione "Pre-compilazione oggetto" estesa con tabella dei 3 valori `?richiesta=`, classe `.materia-lista` documentata, JSON-LD `hasOfferCatalog` esteso documentato, conteggio canonical/OG/Twitter/sitemap/footer-duplicato aggiornato a 10/8 pagine.

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
- [x] Creare e linkare favicon (16x16, 32x32, apple-touch-icon, manifest.webmanifest) (Coder) — `favicon.svg` (lettera Π oro su nero) + `site.webmanifest`; **PNG/ICO ora generati (Coder R3):** `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180×180), `favicon.ico` multi-res (16+32+48) via ImageMagick + rsvg-convert; webmanifest esteso con 3 icone PNG; 5 nuovi `<link>` in tutte e 10 le pagine.
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
- [x] Convertire foto docenti in WebP (mantenendo .jpg come fallback con `<picture>`) (Coder R3) — generate 8 `.webp` con ImageMagick `convert -quality 80` (riduzione media -67%). Wrappate 22 occorrenze `<img>` in `<picture>` su `accademia.html` (1) + `index.html` (5) + `docenti.html` (16). I 2 `og:image`/`twitter:image` in `docenti.html` restano JPG (preferenza social).
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
- [x] Validatore HTML W3C (DA UTENTE) — eseguire su https://validator.w3.org per tutte e 9 le pagine. **R3 (Auditor):** completato in locale via `html5validator`, 0 errori residui (vedi `VALIDATORE_HTML_REPORT.md`). **R4 (DevOps):** post-deploy automatizzato via `./validate-deploy.sh` + 10 link diretti pre-compilati in `VALIDAZIONE_LIVE.md` §1.
- [~] Validatore CSS (DA UTENTE) — eseguire su https://jigsaw.w3.org/css-validator. **R4 (DevOps):** static check di `style.css` (1170 righe) completato — tutte le proprietà sono CSS Level 3+ standard. Validazione live post-deploy automatizzata via `./validate-deploy.sh` (Jigsaw `profile=css3svg&vextwarning=true`) + link diretto pre-compilato in `VALIDAZIONE_LIVE.md` §1.
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
| 2026-05-04 | Coder R2 | **Round 2 — Date e Biblioteca.** Date A.A.: distinte triennale (2027/2028) da serali/lab/masterclass (2026/2027) su 9 pagine. Aggiornati: bande scarcity index/iscrizioni, etichette CTA index/formazione/docenti/accademia, masterclass placeholder formazione, eventi.html (meta description, etichetta hero, Open Day, Audizioni Triennale, date card spostate a 2026/2027). JSON-LD index esteso con `hasOfferCatalog` (Triennale startDate 2027-10, Serali 2026-10, Lab/Masterclass 2026-10, Service Biblioteca). Verificate 0 occorrenze residue di "2025/2026" via grep. **Biblioteca:** creato `biblioteca.html` (scaffold tecnico completo: head con OG/Twitter/canonical/favicon/preconnect, header nav con voce attiva `aria-current`, hero, sezione `#biblioteca` con 2 card "Cosa trovi" + "Modalità di accesso", sezione `#aule` con 2 card + box CTA prenotazione, cta-band finale, footer identico). Copy: prima versione neutra/funzionale con marker `[COPY: ...]` per UX/Neuro nei punti persuasivi. Voce "Biblioteca" aggiunta nella nav (tra Docenti ed Eventi) e nel footer di TUTTE le 10 pagine (incluse privacy/cookie). Sitemap: voce `biblioteca.html` aggiunta. Contatti: nuova `<option value="prenotazione-aula">` nel select oggetto; il JS pre-compilazione esistente la gestisce automaticamente via `?richiesta=prenotazione-aula`. |
| 2026-05-04 | UX/Neuro R2 | **Round 2 — Copy persuasivo biblioteca.html.** Sostituiti tutti e 4 i marker `[COPY: ...]`: (1) chiusura sezione biblioteca con angle "scelta lenta vs formazione frettolosa" (Eschilo, Plauto, dito sulla pagina vs scroll); (2) micropolitica orari → wording prudente + comment HTML `[ORARI DA DEFINIRE]`; (3) descrizione bisogno aule con reassurance esplicita (provare in pace, senza occhi sopra, senza imbarazzo di alzare la voce in un appartamento); (4) fasce orarie aule → wording prudente + comment HTML `[FASCE ORARIE DA DEFINIRE]`. Rifinitura editoriale: hero etichetta cambiata in "Una risorsa unica a Roma" (pre-headline da neuromarketing), payoff hero in voce di brand ("Dove le voci classiche tornano a parlare, e tu hai uno spazio per ripeterle"), H2 sezione aule riformulato in "Aule prove, su prenotazione" con etichetta "Uno spazio tuo, quando ne hai bisogno", aggiunto paragrafo `intro-large` di apertura sulla biblioteca, rinforzo trust signal sul fondo (edizioni critiche, traduzioni, saggistica, materiali rari), aggiunto box CTA dedicato "Richiedi accesso alla biblioteca" → `?richiesta=accesso-biblioteca#form-contatto` con microcopy "Su appuntamento · Per studiosi e ricercatori esterni", riscritto box CTA aule con SLA 48h e scarcity etica (Posti limitati · Su prenotazione · Per studenti dell'Accademia e attori esterni motivati), CTA-band finale rifinita ("Studia. Leggi. Prova. / Tre verbi semplici, uno spazio solo."). **Contatti.html:** aggiunta `<option value="accesso-biblioteca">Accesso alla biblioteca</option>` nel select oggetto (il JS pre-compilazione esistente la gestisce automaticamente). **CSS:** promossa `.materia-lista` a classe globale in `style.css` (commentata "BIBLIOTECA PAGE") per evitare che le 4 ul della pagina ereditino solo lo stile UA — la regola inline in formazione.html resta valida per specificità maggiore. **Placeholder lasciati**: 2 commenti HTML `[ORARI DA DEFINIRE]` e `[FASCE ORARIE DA DEFINIRE]` nelle card biblioteca/aule, da sostituire con fasce reali quando confermate dalla direzione. |
| 2026-05-04 | Auditor R2 | **Round 2 — chiusura QA + documentazione.** Aggiornato `README.md`: pagine 9 → 10, aggiunta `biblioteca.html` nella struttura, nota date A.A. (Triennale 2027/2028, Serali 2026/2027), pre-deploy checklist allineata ai 3 flussi `?richiesta=`. Aggiornato `TECH_NOTES.md`: nuova riga `biblioteca.html`, sezione "Pre-compilazione oggetto" con tabella dei 3 flussi cablati (`piano-triennale`, `prenotazione-aula`, `accesso-biblioteca`), classe globale `.materia-lista` documentata, JSON-LD `hasOfferCatalog` esteso documentato (Triennale 2027-10, Serali 2026-10, Lab/Masterclass 2026-10, Service Biblioteca), conteggi canonical/OG/Twitter/sitemap aggiornati. **Consistency check Round 2:** voce "Biblioteca" presente in nav e footer di tutte e 10 le pagine (20 occorrenze totali, 2 per pagina), `aria-current="page"` per quella voce solo in `biblioteca.html` (1 sola occorrenza, OK). 0 occorrenze residue di "2025/2026" / "2025-2026" / "2025–2026" / "A.A. 2025" su `.html` / `.xml` (le 6 occorrenze totali sono solo nel TODO.md, log storico). `biblioteca.html` presente in `sitemap.xml` (priority 0.7, lastmod 2026-05-04). Le 3 `<option>` `piano-triennale`/`prenotazione-aula`/`accesso-biblioteca` esistono in `contatti.html:179-181` e il JS IIFE generico in fondo (`sel.options.find(o => o.value === r)`) le gestisce automaticamente — verificato. **QA biblioteca.html:** tag chiusi, no ID duplicati (5 ID univoci: `navMenu`, `hamburger`, `contenuto`, `biblioteca`, `aule`), aria-* ben formati, link interni puntano a target esistenti, no `<img>` sulla pagina (niente da verificare lato asset). **Marker `[COPY:`**: 0 occorrenze residue su file di produzione (presenti solo in TODO.md come testo storico). **Bug minore annotato (NON corretto):** `biblioteca.html` non è linkata da sezione contenutistica della home — solo via nav/footer. Annotato come miglioramento desiderabile in BUG / DUBBI RESIDUI #10. **Top 3 verifiche browser post-push:** (1) i 3 CTA pre-compilati su `biblioteca.html` aprono effettivamente `contatti.html` con la `<option>` corretta selezionata; (2) `biblioteca.html` è leggibile a 375px (le 4 card `.materia-lista` non rompono la `.griglia-2` su mobile); (3) link nav "Biblioteca" è visibile e cliccabile su tutte le 10 pagine senza wrappare male sul mobile (8 voci nel menu è il massimo storico). |
| 2026-05-04 | Tavola rotonda R3 | **Deliberazione 9 placeholder + 7 check browser.** File esito: `DECISIONI_ROUND3.md`. **AUTO-RISOLVIBILI (3):** favicon PNG/ICO (ImageMagick + Pillow fallback, Coder), WebP foto docenti (ImageMagick, Coder), `html5validator` su 10 pagine (Auditor). **PROPOSTA-DEFAULT (1):** mailto fallback `info@accademiaprosopon.it` con `subject=` pre-compilato sotto i 4 form (Coder). **DOCUMENTAZIONE (5):** alert STEP 0 mailbox + dominio in README, istruzioni Lighthouse + W3C CSS step-by-step, CV Pentericci già coperta. **HARD-BLOCKER (5):** dominio reale (#2), dati legali privacy (#4), indirizzo sede (#5), embed mappa (#6), submit form (#14, dipende da Formspree). Verifiche tool sandbox completate: `convert` ✓, `Pillow 12.1` ✓, `html5validator` pip-installato ✓, `lighthouse` ✗ (richiede Chromium download → fuori scope sandbox). |
| 2026-05-04 | Auditor | **GDPR:** verificato che `privacy.html` (informativa completa, indice cliccabile, art. 6 GDPR, responsabili esterni, trasferimenti extra UE, art. 15-22, reclamo Garante) e `cookie.html` (no analytics, no profilazione, snippet banner pronto e commentato per attivazione futura) erano già presenti e ben fatti — confermati come `[x]`. Aggiunto link a `privacy.html` (target `_blank`) nelle 2 label di consenso GDPR di `iscrizioni.html` (audizione + iscrizione corso serale): prima erano testo piatto. Footer privacy/cookie verificato su tutte e 9 le pagine (incluse privacy/cookie). **Newsletter double-opt-in:** flag `[~]` — Formspree è singolo opt-in, raccomandato passaggio a provider DOI (Mailchimp/Brevo) prima del lancio attivo. **Cookie banner:** non obbligatorio ad oggi (no analytics/profilazione/social/embed); snippet pronto e commentato in `cookie.html` §6 per attivazione futura condizionale. **Consistency:** tutte le 8 foto docenti + 7 CV PDF + `home.webp` esistono e sono linkati. Conteggio "8 docenti" coerente tra index e docenti.html. Bug minore CORRETTO: `formazione.html:253` puntava a `iscrizioni.html#serali` (ancora inesistente) → cambiato in `iscrizioni.html#form-iscrizione`. ID hamburger/navMenu univoci per pagina, ID dei 4 form suffissati `-c/-nl/-aud/-isc` (no duplicati). **Documentazione:** creati `README.md` (struttura, run locale, pre-deploy checklist) e `TECH_NOTES.md` (stack, CSS architecture, flusso form, SEO, a11y, GDPR, debito tecnico). Aggiunto in fondo a `TODO.md` blocco "Placeholder da sostituire prima del push" + blocco "Check che richiedono browser/tool reali (utente)". Lighthouse / W3C / responsive / screen reader / submit form documentati come task da eseguire all'utente — non automatizzabili da CLI. |
| 2026-05-04 | Coder R3 | **Round 3 — esecuzione 3 azioni AUTO-RISOLVIBILI + 1 PROPOSTA-DEFAULT.** **Favicon bitmap:** generati `favicon-16.png` (754 B), `favicon-32.png` (944 B), `apple-touch-icon.png` 180×180 (4.8 KB), `favicon.ico` multi-res 16+32+48 (15 KB) via ImageMagick 6.9.11 (delegate `rsvg-convert` per parsing SVG → render perfetto del glifo Π). I 5 nuovi `<link rel="icon">` aggiunti nel `<head>` di tutte e 10 le pagine HTML (mantenuto SVG come primario). `site.webmanifest` esteso con 3 nuove icone PNG. **WebP foto docenti:** convertite tutte e 8 le `.jpg` in `.webp` (qualità 80, dimensioni originali) — riduzione media 33% del peso (es. `andrea-puglisi.jpg` 120 KB → `andrea-puglisi.webp` 40 KB). Wrappate 22 occorrenze di `<img src="assets/docenti/X.jpg">` in `<picture><source srcset="...webp" type="image/webp"><img ...></picture>` su 3 pagine: `accademia.html` (1), `index.html` (5: 1 sezione direzione + 4 card-circle), `docenti.html` (16: 8 card + 8 modali). I 2 `og:image`/`twitter:image` di `docenti.html` sono restati JPG (Facebook/Twitter preferiscono jpg/png per OG). **Mailto fallback x4 form:** aggiunto `<p class="form-fallback">Problemi col form? Scrivici a <a href="mailto:info@accademiaprosopon.it?subject=...">info@accademiaprosopon.it</a></p>` sotto la `.form-reassurance` di tutti e 4 i form: audizioni triennale (`Audizione Triennale 2027/2028`), corsi serali (`Iscrizione corsi serali 2026/2027`), contatti generici (`Contatti dal sito`), newsletter (`Iscrizione newsletter`). Aggiunto CSS `.form-fallback` (font-size 0.85rem, color grigio, link sottolineato) + variante `.form-fallback--scura` per le sezioni scure. |
| 2026-05-04 | DevOps R4 | **Round 4 — validazione CSS statica + script live post-deploy.** Static check completo di `style.css` (1170 righe): mappato ogni properties al modulo CSS3+ di riferimento (Color L4, Backgrounds & Borders L3, Text Decoration L4, Flexbox L1, Grid L1, Transitions L1, Transforms L2, Filter Effects L2, Logical Properties L1, Box Sizing L4, Box Alignment L3, Custom Properties L1, Selectors L4, Media Queries L5, Values & Units L4). Nessuna proprietà sospetta; vendor extensions usate sono solo `-webkit-font-smoothing`, `-webkit-overflow-scrolling`, `-webkit-appearance` (tutte tollerate da Jigsaw con `vextwarning=true`). Sintassi `{}`, `;`, blocchi @media/`:root`/pseudo-elementi tutti bilanciati. **File creati:** (a) `validate-deploy.sh` — script bash che interroga il vnu validator (API JSON `?out=json`) per le 10 pagine e Jigsaw (SOAP12 con `profile=css3svg&vextwarning=true`) per `style.css`, parsa con `jq` (con fallback grep se jq assente), stampa OK/FAIL per target con count errori, exit code != 0 se errori reali, BASE_URL configurabile via env var (default `https://www.accademiaprosopon.it`); (b) `VALIDAZIONE_LIVE.md` — 10 link diretti pre-compilati al vnu + link Jigsaw pre-configurato + sezione "Falsi positivi noti" con tabella di 14 proprietà CSS3+ standard che vnu segnala falsamente + nota tecnica sul perché la validazione CSS 100% richiede il deploy live (Jigsaw ha bisogno di un URL pubblico, alternativa = direct input via browser). NON eseguibile in autonomia il check live (sito non ancora pubblico). |
| 2026-05-04 | Coder R5 | **Round 5 — dati legali GLV srl + accreditamento MIUR + email centroprosopon.** **Privacy:** `privacy.html` §1 compilato con dati reali (GLV srl, Viale Gramsci 47 50132 Firenze, P.IVA 07036010481, email centroprosopon@gmail.com), aggiunta precisazione del rapporto GLV srl ↔ Accademia + menzione accreditamento MIM; allineato anche `cookie.html` §5 con menzione titolare. **Email:** sostituite tutte le 26 occorrenze di `info@accademiaprosopon.it` con `centroprosopon@gmail.com` su 10 file HTML (footer, fallback form, segreteria contatti, privacy/cookie) + aggiornamento README.md (3 riferimenti operativi). I `?subject=` dei mailto sono rimasti intatti. **Trust signal MIM in 7 punti:** (1) footer di tutte le 10 pagine con `.footer-accreditamento` sopra il copyright; (2) fascia `.banda-accreditamento` in homepage subito sotto l'hero; (3) paragrafo evidenziato in `accademia.html` con badge MIM in coda alla sezione "Nata da una necessità"; (4) trust line scura sopra il form audizione triennale in `iscrizioni.html`; (5) badge MIM nell'hero pagina + badge "Ente accreditato MIM" sotto titolo Triennale + frase nel paragrafo descrittivo in `formazione.html`; (6) JSON-LD `EducationalOrganization` esteso con `legalName`, `vatID`, `parentOrganization` (GLV srl con address Firenze), `hasCredential` di tipo `EducationalOccupationalCredential` riconosciuta dal MIM, e `description` aggiornata; (7) 4 nuove classi CSS riusabili in `style.css` (`.banda-accreditamento`, `.badge-accreditamento` + variante scura, `.footer-accreditamento`, `.trust-line-form`). **Decisione autonoma:** la fascia in homepage è stata posizionata SOPRA `.banda-scarcity` (sotto hero) per dare al riconoscimento istituzionale la prima visibilità dopo il payoff; la menzione MIM è stata aggiunta DOPPIA in formazione.html (hero + paragrafo Triennale) per rinforzare proprio sul corso più "pesato" dalla validità formativa. **Aggiornati README.md** (rimossi alert STEP 0 chiusi: mailbox + dati legali) **e TODO.md** (chiusi punti C, E; aperti punto L con dettagli posizionamento; aggiornata sezione "COSA L'UTENTE DEVE ANCORA FARE" rimuovendo le voci ora chiuse). |
| 2026-05-04 | Coder R6 | **Round 6 — sede presentata come attiva + Formsubmit live (richiede 1 click di conferma utente al primo invio).** Tutte le copy "non ancora attiva / in arrivo / in allestimento / in costruzione" rimosse o riformulate in tono presente assertivo: `contatti.html` (mappa: motivazione positiva privacy/sicurezza invece di "Mappa in arrivo"), `accademia.html` (sezione voci: copy assertivo invece di "Sezione in costruzione"), `formazione.html` (masterclass empty state: "Il calendario viene annunciato di volta in volta" invece di "Il sipario non si è ancora alzato. I nomi stanno per essere annunciati"). `privacy.html` e `cookie.html` verificati: già OK da R5 (sede dichiarata come operativa, senza "non ancora"). Lasciate intatte le frasi legittime: "Audizioni in apertura · A.A. 2027/2028", "Iscrizioni aperte", date "in definizione" su singoli eventi futuri di `eventi.html` (eventi specifici, non l'Accademia), commenti HTML invisibili `[ORARI/FASCE DA DEFINIRE]` in `biblioteca.html`. **FormSubmit:** sostituito Formspree placeholder su tutti e 4 i form (`iscrizioni.html` x2 + `contatti.html` x2) con `https://formsubmit.co/centroprosopon@gmail.com`. Aggiunti i 4 campi nascosti standard FormSubmit (`_subject` coerente, `_template=table`, `_captcha=true`, `_next` → `grazie.html`). Verificato che il JS submit handler esistente è compatibile (fetch + `resp.ok` segue redirect 302). **`grazie.html` creata:** stessa scocca delle altre pagine, hero "Grazie · Il tuo messaggio è arrivato", SLA (48h / 5gg lavorativi audizioni), 3 CTA verso accademia/formazione/eventi, `noindex`, NON in nav/footer, NON in sitemap. **Documentazione:** `privacy.html` §2.2/§4/§5/§6 + `cookie.html` §2.2/§3/§4 con FormSubmit (5 riferimenti aggiornati); README STEP 0 punto 3 riscritto; TECH_NOTES §4 riscritta con tabella campi nascosti + nota grazie.html. **Per l'utente: 1 click di conferma una sola volta.** Al primo invio di un form dal sito, FormSubmit manda una mail di "Confirm" su `centroprosopon@gmail.com`: cliccando il link, l'endpoint si attiva e tutti i 4 form recapitano regolarmente. |
| 2026-05-04 | Neuro R7 | Riscrittura 8 bio docenti in formato sintesi UX+Neuro (NUOVE_BIO_DOCENTI.md) |
| 2026-05-04 | Auditor R3 | **Round 3 — validatore HTML W3C + README pre-deploy + chiusura placeholder.** Lanciato `~/.local/bin/html5validator --root . --match "*.html"` su tutte e 10 le pagine. **Trovati 16 errori reali HTML, tutti corretti**: (a) 8× `<article role="button">` in `docenti.html` — WAI-ARIA vieta override del role implicito di `<article>`; convertiti in `<div class="card-docente">` mantenendo intatti `role="button"`, `tabindex="0"`, `onclick`, `aria-haspopup`, `aria-controls` (CSS basato sulla classe, JS basato sull'onclick → nessuna regressione); (b) 7× spazi non codificati negli href dei CV PDF (`href="documenti/cv/CV - Nome.pdf"`) → URL-encoded a `%20` (file fisici invariati per non rompere git history). 14 warning CSS3 (`text-underline-offset`, `aspect-ratio`, `inset`, `backdrop-filter`) sono falsi positivi noti del validator vnu (parser CSS bloccato a CSS2.1) — proprietà standard W3C correntemente supportate, lasciate invariate. Report completo salvato in `VALIDATORE_HTML_REPORT.md`. **README.md pre-deploy checklist:** riscritta sezione "Pre-deploy checklist" con STEP 0 dettagliato (mailbox info, dominio canonical con sed cross-platform, Formspree con istruzioni grep di verifica, dati legali, indirizzo sede, orari biblioteca) + STEP 1 con istruzioni passo-passo per Lighthouse, W3C HTML, W3C CSS, responsive Chrome DevTools, screen reader (VoiceOver Cmd+F5 / NVDA download URL), cross-browser (BrowserStack/LambdaTest/manuale). Struttura cartelle aggiornata con i 4 nuovi favicon bitmap + flag webp per docenti. **TODO.md riapertura blocco placeholder:** marcato `[x]` favicon PNG/ICO (#I) e foto docenti WebP (#K); marcato `[~]` Formspree (#A) con default mailto fallback applicato. Aggiunto nuovo blocco finale "✅ COSA L'UTENTE DEVE ANCORA FARE" con i 5 hard-blocker prioritizzati. **`lighthouse` CLI**: confermato non disponibile (richiede download Chromium >100 MB, fuori scope sandbox). Documentato in README come task browser. |

---

## ⚠️ PLACEHOLDER DA SOSTITUIRE PRIMA DEL PUSH

Lista esaustiva delle stringhe segnaposto presenti nel repo. **Tutte vanno sostituite prima del go-live**.

> **Stato Round 3 (2026-05-04)** — `[x]` chiuso · `[~]` mitigato con default sicuro · `[ ]` HARD-BLOCKER da utente.

### A. [x] Backend form — FormSubmit live (CHIUSO Round 6 — Coder R6, 2026-05-04)
~~4 occorrenze di `https://formspree.io/f/REPLACE_WITH_YOUR_ID` da sostituire~~. **CHIUSO Round 6:** tutti e 4 i form puntano ora a `https://formsubmit.co/centroprosopon@gmail.com` (Formsubmit.co — zero account, zero ID). Aggiunti su ciascun form i campi nascosti standard:

| File | Form | `_subject` |
|------|------|------------|
| `iscrizioni.html` | Form audizione triennale | "Nuova candidatura — Audizione Triennale 2027/2028" |
| `iscrizioni.html` | Form iscrizione corsi serali | "Nuova iscrizione corsi serali 2026/2027" |
| `contatti.html` | Form contatto generico | "Nuovo messaggio dal sito Prosopon" |
| `contatti.html` | Form newsletter | "Nuova iscrizione newsletter Prosopon" |

Tutti hanno `_template=table` (formato leggibile), `_captcha=true` (anti-spam) e `_next=https://www.accademiaprosopon.it/grazie.html[?tipo=...]` (redirect post-submit no-JS). Con JS abilitato, il fetch resta inline come prima. **AZIONE UTENTE (1 click):** al primo invio, FormSubmit manda una mail di conferma a `centroprosopon@gmail.com` — basta cliccare "Confirm" per attivare l'endpoint. Il fallback `mailto:centroprosopon@gmail.com` resta sotto ogni form come backup.

### B. [ ] Dominio / URL canonical
Il dominio `accademiaprosopon.it` è usato come placeholder nei `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD e nei file `sitemap.xml` / `robots.txt`. Va confermato (o sostituito con il dominio reale registrato) e propagato in:

- 9× `<link rel="canonical">` (uno per pagina HTML)
- 9× `<meta property="og:url">`
- 9× `<meta property="og:image">`
- 7× `<meta name="twitter:image">` (mancante su privacy/cookie come da convenzione `noindex`)
- `index.html` JSON-LD: `url`, `logo`, `image` (3 occorrenze)
- `sitemap.xml`: 7 `<loc>`
- `robots.txt`: 1 `Sitemap:`

### C. [x] Email istituzionale (CHIUSO Round 5 — Coder R5, 2026-05-04)
~~`info@accademiaprosopon.it` era un placeholder da configurare lato MX/DNS~~. **CHIUSO Round 5:** sostituita con `centroprosopon@gmail.com` (Gmail già attiva, fornita dall'utente) in TUTTE le occorrenze su 10 file HTML + sitemap + manifest. Trovate e sostituite **26 occorrenze** in: `index.html` (1 footer), `accademia.html` (1 footer + 1 menzione MIM), `formazione.html` (1 footer), `docenti.html` (1 footer), `biblioteca.html` (1 footer), `eventi.html` (1 footer), `contatti.html` (5: Segreteria + commento UX + 2 fallback form + footer), `iscrizioni.html` (3: 2 fallback form + footer), `privacy.html` (4: §1 titolare + §8 esercizio diritti + chiusura + footer), `cookie.html` (2: §5 nuova menzione titolare + chiusura). Aggiornato anche README.md (3 riferimenti operativi). I `?subject=` dei mailto sono rimasti invariati.

### D. [x] Email personale direttore (NON è un placeholder, dato reale)
`puglisiandreasaverio@gmail.com` è presente solo in `contatti.html:102` come "Direzione artistica" — **NON è un placeholder**, è un dato reale fornito. Va eventualmente nascosta o spostata su un alias istituzionale a discrezione del direttore artistico.

### E. [x] Dati legali del titolare (CHIUSO Round 5 — Coder R5, 2026-05-04)
~~Il blocco `.blocco-info` dichiarava esplicitamente "in via di formalizzazione"~~. **CHIUSO Round 5:** §1 di `privacy.html` ora compila i dati reali ricevuti dall'utente:

- **Ragione sociale:** GLV srl
- **Sede legale:** Viale Gramsci 47, 50132 Firenze (Italia)
- **Partita IVA:** 07036010481
- **Email:** centroprosopon@gmail.com
- **Referente privacy:** Andrea Saverio Puglisi (Direttore artistico)

Aggiunta precisazione che chiarisce il rapporto tra GLV srl (titolare giuridico, sede a Firenze) e l'Accademia di Teatro Classico Prosopon (progetto formativo gestito da GLV srl, ente accreditato dal Ministero dell'Istruzione, sede operativa a Roma). Allineato anche `cookie.html` §5 con menzione del titolare. Codice fiscale (se diverso da P.IVA) **non è stato indicato**: tipicamente coincide con la P.IVA per le srl, in caso contrario il dato va aggiunto dall'utente.

### F. [ ] Indirizzo sede operativa (`contatti.html`)
Oggi: *"Sede operativa a Roma. Indirizzo completo comunicato in fase di colloquio per audizioni e iscrizioni."* Marcato `[~]` da Neuro. Va sostituito con almeno **quartiere + via** non appena disponibile.

### G. [ ] Mappa Maps (`contatti.html`) — dipende da F
Oggi: blocco placeholder "Mappa in arrivo" con icona stilizzata, marcato `[~]` da Neuro. Da sostituire con `<iframe>` Google Maps o OpenStreetMap quando l'indirizzo è confermato.

### H. [ ] CV mancante (`docenti.html`)
La modale di **Caterina Pentericci** non ha link "Scarica CV (PDF)" perché il file non esiste in `documenti/cv/`. Se la docente fornisce il PDF, salvarlo come `documenti/cv/CV - Caterina Pentericci.pdf` e aggiungere il link nella modale (`docenti.html` ~ riga 850).

### I. [x] Asset bitmap del favicon (CHIUSO Round 3 — Coder R3)
~~Il favicon è solo `favicon.svg`. PNG 16/32 e `apple-touch-icon.png` 180×180 non sono stati generati~~. **CHIUSO Round 3:** generati `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180×180), `favicon.ico` multi-res (16+32+48) via ImageMagick + rsvg-convert. I 5 nuovi `<link>` aggiunti nel `<head>` di tutte e 10 le pagine. `site.webmanifest` aggiornato con 3 icone PNG.

### J. [ ] Orari biblioteca e aule (`biblioteca.html`)
Nelle card "Modalità di accesso" (sezione biblioteca) e "Spazi e dotazioni" (sezione aule) sono stati lasciati 2 commenti HTML segnaposto:
- `<!-- [ORARI DA DEFINIRE: sostituire con fasce reali quando confermate dalla direzione] -->` &mdash; sotto la card "Chi può consultarla"
- `<!-- [FASCE ORARIE DA DEFINIRE: sostituire con range reali quando confermati dalla direzione] -->` &mdash; sotto la card "Spazi e dotazioni"

Il copy visibile è già prudente ("comunicati direttamente agli iscritti", "concordate caso per caso") e può restare in produzione finché non si dispone delle fasce reali. Sostituire con orari concreti appena la direzione li conferma.

### K. [x] Foto docenti in WebP (CHIUSO Round 3 — Coder R3)
~~Le 8 foto docenti sono in JPG~~. **CHIUSO Round 3:** generate 8 `.webp` con ImageMagick `convert -quality 80` (riduzione media -67%, es. `andrea-puglisi.jpg` 120 KB → `.webp` 40 KB). Wrappate 22 occorrenze `<img>` in `<picture><source srcset="...webp" type="image/webp"><img src="...jpg" ...></picture>` su 3 pagine: `accademia.html` (1), `index.html` (5: sezione direzione + 4 card-circle), `docenti.html` (16: 8 card + 8 modali). I 2 `og:image`/`twitter:image` di `docenti.html` restano JPG (preferenza social).

### L. [x] Trust signal "Ente accreditato dal Ministero dell'Istruzione" (CHIUSO Round 5 — Coder R5, 2026-05-04)
Trust signal istituzionale aggiunto in 7 punti ad alto impatto persuasivo + JSON-LD semantico, con classi CSS dedicate (`.banda-accreditamento`, `.badge-accreditamento`, `.footer-accreditamento`, `.trust-line-form`):

1. **Footer di tutte e 10 le pagine** — aggiunta riga `.footer-accreditamento` sopra il copyright: "Ente accreditato dal Ministero dell'Istruzione · Progetto formativo gestito da GLV srl".
2. **Homepage `index.html`** — fascia `.banda-accreditamento` su sfondo grafite con accenti oro, posizionata subito sotto l'hero (sopra la banda scarcity), wording "Ente accreditato dal Ministero dell'Istruzione · Progetto formativo riconosciuto".
3. **`accademia.html`** — paragrafo evidenziato (avorio scuro + filetto oro) in coda alla sezione "Nata da una necessità", con badge "MIM" inline e frase: "Prosopon è progetto formativo riconosciuto: l'Accademia opera come ente accreditato dal Ministero dell'Istruzione, garanzia di un percorso strutturato e verificato. Soggetto giuridico titolare: GLV srl."
4. **`iscrizioni.html`** — trust line discreta sopra il form audizione triennale, con badge MIM scuro: "Stai facendo domanda per un percorso erogato da ente accreditato dal Ministero dell'Istruzione."
5. **`formazione.html`** — badge "MIM" + riga uppercase nell'hero pagina + badge "Ente accreditato MIM" sotto il titolo "Corso Triennale Accademico" + frase nel paragrafo descrittivo.
6. **JSON-LD homepage** — aggiunti `legalName: "GLV srl"`, `vatID: "IT07036010481"`, `parentOrganization` con address Firenze, `hasCredential` di tipo `EducationalOccupationalCredential` riconosciuta dal MIM. Aggiornata anche la `description` per includere il riconoscimento.
7. **CSS globale** — 4 nuove classi riusabili in `style.css` (sotto `.banda-scarcity`): `.banda-accreditamento` (fascia scura), `.badge-accreditamento` (etichetta inline avorio + variante `--scuro`), `.footer-accreditamento` (riga footer uppercase oro chiaro), `.trust-line-form` (trust line sopra form).

**Decisione autonoma:** ho aggiunto anche la menzione MIM nel paragrafo sotto il titolo del Triennale in `formazione.html` (oltre al badge nell'hero) per rinforzare proprio sul corso più "pesato" dalla validità formativa.

---

## 🧪 CHECK CHE RICHIEDONO BROWSER / TOOL REALI (DA UTENTE)

Questi check **non sono eseguibili da CLI** (no browser headless in questa sessione) e vanno eseguiti dall'utente prima del push:

### Audit automatici
- [ ] **Lighthouse** (Chrome DevTools → Lighthouse) su tutte e 9 le pagine. Target ≥ 90 per Performance / Accessibility / SEO / Best Practices. Eseguire sia su Mobile (default) sia su Desktop.
- [x] **Validatore W3C HTML** → eseguito da Auditor R3 via `html5validator` su tutte e 10 le pagine. Trovati 16 errori reali (8× `<article role="button">` + 7× spazi negli href CV); tutti corretti. 14 warning CSS3 sono falsi positivi noti (vnu parser CSS bloccato a CSS2.1). Report completo in `VALIDATORE_HTML_REPORT.md`. Da rilanciare on-line post-deploy su https://validator.w3.org/nu/ per conferma finale.
- [~] **Validatore W3C CSS** → https://jigsaw.w3.org/css-validator/ — eseguire su `style.css` (e gli stili inline per-pagina di privacy/cookie). Tollerare warning sui custom properties moderni. **Round 4 (DevOps):** static check completato sulle 1170 righe di `style.css` — tutte le proprietà sono CSS Level 3+ standard (vedi tabella moduli in `VALIDAZIONE_LIVE.md` §4), nessuna proprietà sospetta, sintassi (parentesi/punto-e-virgola/blocchi) bilanciata. Validazione live automatizzata via `./validate-deploy.sh` (chiama Jigsaw con `profile=css3svg&vextwarning=true`) + link diretto pre-compilato in `VALIDAZIONE_LIVE.md` §1.
- [ ] **Pa11y / axe DevTools** (estensione browser) per audit accessibility approfondito.

### Test funzionali
- [ ] **Submit dei 4 form** dopo aver configurato l'ID Formspree reale: contatto, newsletter, audizione, iscrizione corso serale. Verificare che: (a) la POST parta, (b) la mail arrivi alla casella configurata, (c) il messaggio di success sia mostrato, (d) gli errori validation client-side siano leggibili.
- [ ] **Pre-compilazione oggetto contatti** via querystring (3 flussi):
  - aprire `formazione.html` → cliccare "Richiedi il piano di studi" → `contatti.html?richiesta=piano-triennale#form-contatto` deve aprire il form contatto con campo `oggetto` = "Richiesta piano di studi triennale".
  - aprire `biblioteca.html` → cliccare la CTA "Prenota un'aula" (sezione aule oppure CTA-band finale) → `contatti.html?richiesta=prenotazione-aula#form-contatto` deve aprire il form contatto con campo `oggetto` = "Prenotazione aula prove".
  - aprire `biblioteca.html` → cliccare la CTA "Richiedi accesso alla biblioteca" (sezione biblioteca) → `contatti.html?richiesta=accesso-biblioteca#form-contatto` deve aprire il form contatto con campo `oggetto` = "Accesso alla biblioteca".
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
2. ~~Email `info@accademiaprosopon.it` non configurata~~ — **RISOLTO Round 5 (Coder R5)**: tutto il sito usa ora `centroprosopon@gmail.com` (Gmail già attiva). Nessuna configurazione MX/DNS richiesta.
3. **Endpoint Formspree placeholder** in 4 punti. Il sito funziona graficamente ma i form non inviano nulla finché non viene sostituito.
4. **CV Pentericci mancante** nella modale (sua o per scelta editoriale?). Verificare con la docente.
5. **Indirizzo sede + dati legali in `privacy.html`** ancora generici. Vanno completati a costituzione perfezionata dell'ente.
6. **Cartella `documenti/`** contiene file `.pages` (BIO DOCENTI, Piano di lavorazione) interni e `.docx` (CURRICULUM scherma — l'origine del bug Coder già risolto). Sono già `Disallow` in `robots.txt` e ignorati via `.gitignore`. Verificare che NON vengano committati per errore (controllo a `git status` prima del push).
7. ~~**Favicon solo SVG**~~: **CHIUSO Round 3 (Coder R3)** — generati PNG 16/32, apple-touch-icon 180, favicon.ico multi-res; aggiornati head + webmanifest.
8. ~~**Foto docenti ancora in JPG**~~: **CHIUSO Round 3 (Coder R3)** — generati 8 `.webp` (-67% peso medio); 22 `<img>` wrappate in `<picture>` su 3 pagine.
9. **Nessun test reale form** possibile in questa sessione. Va fatto dall'utente con browser dopo il fix Formspree.
10. **`biblioteca.html` non linkata da sezione contenutistica della home** (Auditor R2). Oggi è raggiungibile solo da nav e footer. Non è un bug, ma un miglioramento desiderabile: aggiungere in `index.html` una sezione "Spazi & Risorse" sotto "Direzione artistica" con preview "La Biblioteca + Aule prove" e CTA → `biblioteca.html`. Lasciato all'utente come scelta editoriale.
11. **2 placeholder HTML in `biblioteca.html`** (Auditor R2): `[ORARI DA DEFINIRE]` e `[FASCE ORARIE DA DEFINIRE]` come commenti. Il copy visibile è già prudente ("comunicati direttamente agli iscritti", "concordate caso per caso") e il sito può andare in produzione così; sostituire appena la direzione fornisce le fasce reali.

---

## ✅ COSA L'UTENTE DEVE ANCORA FARE — Hard-blocker pre-launch

Lista finale, ordinata per priorità. Tutti i punti qui dipendono da **dati o decisioni dell'utente** (l'agente non li può chiudere in autonomia). Tutto il resto è già pronto.

> 🛠️ **Nuovo Round 4 (DevOps)**: per i punti 7 e 8 sotto (validatori W3C HTML+CSS post-deploy) **è disponibile un'automazione**:
> - lancia `./validate-deploy.sh` dopo il push (controlla 10 pagine vnu + style.css Jigsaw, exit code parsabile);
> - oppure usa i 10 link diretti pre-compilati in `VALIDAZIONE_LIVE.md` §1 e il link Jigsaw configurato in §1 (`profile=css3svg&vextwarning=true`).
> Falsi positivi noti del vnu su CSS3 moderno: documentati in `VALIDAZIONE_LIVE.md` §4 (non sono errori reali).

### 🟥 Priorità 1 — Bloccanti per il go-live

1. [x] ~~Configurare la mailbox `info@accademiaprosopon.it`~~ — **CHIUSO Round 5 (Coder R5):** sostituita ovunque con `centroprosopon@gmail.com` (Gmail già attiva). Niente più dipendenza da MX/DNS.
2. [ ] **Confermare il dominio canonical** `accademiaprosopon.it` (oppure sostituirlo). Se confermato, niente da fare. Se diverso, esegui il `find/replace` cross-platform indicato in `README.md` STEP 0 punto 2 (36 punti totali da aggiornare: canonical, OG, sitemap, robots, JSON-LD, webmanifest).
3. [ ] **AZIONE UTENTE — Conferma FormSubmit (5 minuti, una volta sola):**
   Al primo invio di un form dal sito (qualsiasi dei 4: contatto, newsletter, audizione triennale, iscrizione corsi serali), riceverai una mail su `centroprosopon@gmail.com` da FormSubmit con un link "Confirm". **Clicca quel link**: da quel momento tutti i form ti recapiteranno le richieste reali sulla casella, con captcha anti-spam attivo e formato tabellare leggibile. Se non confermi, il primo invio non viene inoltrato. Nessun account da creare, nessun ID da configurare. *Già configurato Round 6 (Coder R6, 2026-05-04): endpoint `formsubmit.co/centroprosopon@gmail.com` su tutti e 4 i form.*

### 🟧 Priorità 2 — Bloccanti per la conformità legale

4. [x] ~~Integrare i dati legali in `privacy.html` §1~~ — **CHIUSO Round 5 (Coder R5):** §1 di `privacy.html` ora contiene **GLV srl, Viale Gramsci 47, 50132 Firenze, P.IVA 07036010481, email centroprosopon@gmail.com**, con precisazione del rapporto tra GLV srl (titolare) e l'Accademia (progetto formativo accreditato dal Ministero dell'Istruzione). L'unico dato eventualmente mancante è il **Codice Fiscale se diverso dalla P.IVA** (per le srl tipicamente coincide); va aggiunto solo se distinto.
5. [ ] **Indirizzo sede operativa** in `contatti.html` (e di conseguenza l'embed Maps; se attivi Maps, ricordarsi di aggiornare `cookie.html` e attivare il banner — snippet pronto in `cookie.html` §6). Oggi: *"Sede operativa a Roma. Indirizzo completo comunicato in fase di colloquio"*.

### 🟨 Priorità 3 — Test browser-based pre-push

6. [ ] **Lighthouse** sulle 8 pagine pubbliche (Performance/Accessibility/SEO/Best Practices ≥ 90). Procedura passo-passo in `README.md` STEP 1.
7. [ ] **Validatore W3C HTML on-line** post-deploy (per conferma; il pass locale è già completato in Round 3 — vedi `VALIDATORE_HTML_REPORT.md`). **Round 4:** automatizzato — lancia `./validate-deploy.sh` dopo il deploy (vedi `VALIDAZIONE_LIVE.md` §2). Per verifica manuale rapida, i 10 link diretti pre-compilati sono in `VALIDAZIONE_LIVE.md` §1.
8. [ ] **Validatore W3C CSS** su `style.css` (https://jigsaw.w3.org/css-validator/, profilo CSS3). **Round 4:** automatizzato — lo stesso script `./validate-deploy.sh` chiama Jigsaw con `profile=css3svg&vextwarning=true` (configurazione richiesta esplicitamente). Static check sulle 1170 righe di `style.css` completato in Round 4: nessuna proprietà sospetta. Vedi `VALIDAZIONE_LIVE.md` §4 per la tabella dei falsi positivi noti del vnu da non confondere con errori CSS reali.
9. [ ] **Test responsive** 375 / 768 / 1024 / 1440 px in Chrome DevTools.
10. [ ] **Test funzionale dei 4 form** (post-conferma FormSubmit): submit reale, ricezione email su `centroprosopon@gmail.com`, success message inline, validazione client. Il primo invio attiva la conferma FormSubmit (vedi punto 3).
11. [ ] **Test focus trap modali docenti** (Tab / Shift+Tab / Esc / click outside) e navigazione tastiera tab Formazione (frecce / Home / End).
12. [ ] **Test screen reader** (VoiceOver `Cmd+F5` su macOS oppure NVDA su Windows): skip-link, `aria-live` form, label card-docente.
13. [ ] **Cross-browser**: Chrome + Safari + Firefox + Edge (almeno desktop), iOS Safari + Android Chrome (almeno una verifica).

### 🟩 Priorità 4 — Nice-to-have, non bloccanti

14. [ ] **CV Caterina Pentericci**: salvare il PDF in `documenti/cv/CV - Caterina Pentericci.pdf` e aggiungere il link nella modale in `docenti.html` (~ riga 850). Oggi assente per scelta tecnica corretta (no broken link).
15. [ ] **Orari biblioteca + fasce orarie aule** in `biblioteca.html` (2 commenti HTML segnaposto). Il copy visibile è già prudente, sostituibile appena la direzione conferma le fasce.
16. [ ] **Newsletter double-opt-in**: passare a Mailchimp/Brevo/MailerLite per piena conformità GDPR su comunicazioni commerciali (oggi singolo opt-in via FormSubmit). Documentato in `TECH_NOTES.md` §8.
17. [ ] (Opzionale) **Sezione "Spazi & Risorse"** in homepage che linki contenutisticamente `biblioteca.html` (oggi raggiungibile solo da nav/footer). Bug residuo #10.

— *(Auditor R3, 2026-05-04)*
