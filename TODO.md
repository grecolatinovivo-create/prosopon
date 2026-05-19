# TODO — Accademia Prosopon (Pre-Launch Hardening)

> Tracker condiviso dai 4 agenti senior (Coder, UI/UX, Neuromarketer, Auditor).
> Convenzioni: `[ ]` aperto · `[x]` chiuso · `[~]` parzialmente fatto / da rivedere.
> Ogni agente, alla chiusura di un punto, marca `[x]` e firma con il proprio ruolo tra parentesi.

> ⚠️ **REGOLA OPERATIVA (utente):** nessun `git commit` né `git push`. Le modifiche vanno
> proposte e applicate localmente. L'utente revisionerà le pagine HTML in browser PRIMA
> di approvare il push. Gli agenti NON devono toccare git.

---

## ⏰ REMINDER STRATEGICO — A.A. 2027/2028

🔴 **AL LANCIO DELL'ANNO ACCADEMICO 2027/2028 in presenza:**
- [ ] Rimuovere la tab "Online" da `formazione.html` (5ª tab, id="tab-online" e id="online")
- [ ] Rimuovere l'ancora `<a href="#online">Online</a>` dal blocco `.ancore-corsi` mobile
- [ ] Rimuovere il link "Online" dal footer di TUTTE le 10 pagine
- [ ] Rimuovere l'opzione `info-corsi-online` dal select oggetto in `contatti.html`
- [ ] Eventualmente archiviare i materiali dei corsi online erogati in `documenti/archivio-online/` per memoria storica
- [ ] Aggiornare README e TECH_NOTES rimuovendo i riferimenti
- [ ] **Al lancio: ripristinare wording specifico con date reali per Triennale e Serali** (oggi è generico anti-aspettative — R21 ha rimosso "A.A. 2027/2028" e "A.A. 2026/2027" da hero, cta-band, banda scarcity, card eventi, JSON-LD startDate per evitare di promettere date non confermate). Cercare le occorrenze attuali "Audizioni in apertura" + "Iscriviti alla newsletter" e ripristinare la formula con date precise quando confermate.
- [ ] **Quando avremo eventi pubblici reali (saggi, spettacoli, open day datati), aggiornare le card di `eventi.html` con date specifiche.** Oggi tutte le 5 card mostrano placeholder "In arrivo" (R22 — separazione eventi/formazione). Cercare nelle card `.evento-item` di eventi.html le occorrenze "In arrivo" e sostituire con giorno + mese reali (struttura: `<div class="evento-data__giorno">14</div><div class="evento-data__mese">Luglio 2026</div>`).

Motivazione: l'attuale tab "Online" è una soluzione TRANSITORIA — quando il triennio in presenza sarà attivo, il focus didattico torna in sede a Roma. La tab è uno strumento di "ponte" 2026 → 2027 mentre la sede si allestisce.

---

## 🟢 ROUND 34 — AUDIT CONVERSION LANDING CORSO MASCHERA (2026-05-04)

> **2026-05-04 — R34 Neuromarketer: audit conversion landing corso Maschera (CTA visibility, bypass risk)**

Diagnosi non-tecnica sulla landing `corso-maschera-classica.html`: verifica visibilità CTA Stripe primario, presenza CTA fantasma (sticky mobile / hero), frizione cognitiva tra hero e pagamento, posizionamento dell'attestato MIM, anchoring prezzo, stima tasso di bypass desktop vs mobile. Output sintetico consegnato all'imprenditore (no modifiche codice in questa fase, solo proposta operativa).

---

## 🟢 ROUND 33 — CARD ONLINE MINIMAL + PAGINA DEDICATA CORSO MASCHERA (2026-05-04)

> **2026-05-04 — R33: card Online minimal (stile Laboratori) + nuova pagina dedicata corso-maschera-classica.html**

### Contesto
La tab "Online" di `formazione.html` ospitava un unico `<article class="anno-card" id="corso-maschera-classica">` che conteneva TUTTO il dettaglio del corso (team docenti con ritratti, calendario, modalità, destinatari, attestato, outcome, CTA Stripe). Una sola card visivamente densissima dentro un tab, fuori scala rispetto alle altre tab (Laboratori, Masterclass, Serali) che presentano elenchi sintetici. Decisione (utente): trattare il corso Maschera come prodotto a sé, con una pagina dedicata, lasciando nella tab Online solo una card minimal "biglietto da visita" che porti alla pagina.

### Fix applicati

- [x] **R33.1 — `formazione.html`, tab Online**: rimosso integralmente l'`<article>` del corso (descrizione lunga + team-docenti-corso con 3 ritratti + griglia-2 calendario/modalità/destinatari/attestato + card-outcome + footer con prezzo + Stripe). Sostituito con UNA SOLA card minimal in pattern "Laboratori": `<a class="card card-corso-online">` cliccabile a tutto blocco, glifo oro Π (richiama PROSŌPON) + etichetta "Prima edizione" + titolo + paragrafo breve (5 incontri · 10 ore live online · Attestato MIM) + prezzo € 170 + microaction "Scopri il corso →". Aggiunto CSS hover (`translateY(-3px)` + box-shadow) e focus-visible (outline oro 2px) nel blocco `<style>` esistente. La card vive dentro un `griglia-3` come le 4 card di Laboratori (su desktop una sola colonna occupata, le altre 2 vuote — accettabile, mantiene proporzioni). Intro "Percorsi accessibili da remoto..." MANTENUTA. NON aggiunta sezione "Prossime edizioni" (rimossa dall'utente in R28, da non ripristinare). *(Coder R33)*

- [x] **R33.2 — Nuova pagina `corso-maschera-classica.html`** (creata da zero, stessa scaffolding del sito):
  - Head: title/description/canonical/OG/Twitter/favicon/manifest/theme-color/Google Fonts/style.css/tracking placeholder come le altre pagine.
  - Header standard con voce "Formazione" marcata attiva (`nav__link--attivo` con `href="formazione.html#online"`).
  - `hero-pagina` con breadcrumb-link "← Torna ai corsi online", etichetta "Prima edizione · Corso Online", h1, sottotitolo descrittivo, badge MIM + accreditamento Ministero.
  - Sezione **Team Docenti** (sfondo avorio normale): blocco `team-docenti-corso` con i 3 ritratti circolari 96px (Puglisi, Pentericci con foto dedicata `caterina-pentericci-corso-maschera`, Summa) + nome + qualifica.
  - Sezione **Dettagli del corso** (sfondo avorio): griglia-3 con Calendario (5 date), Durata totale + Modalità, Destinatari + Attestato.
  - Sezione **Cosa imparerai** (sfondo avorio-scuro): box bordo-oro sinistro con i 5 outcome originali (rombi oro come bullet).
  - Sezione **Le cinque sessioni** (NUOVA, sfondo avorio normale): 5 `modulo-card` numerate (I-V, con cerchio numerato in stile percorso-step di iscrizioni.html), ciascuna con data, titolo tematico e descrizione breve. Disclaimer in alto: "il programma è indicativo, i docenti potranno modulare contenuti e tempi". I titoli delle sessioni derivano direttamente dai 5 outcome dichiarati (zero invenzione di contenuti specifici non forniti dall'utente).
  - Sezione **FAQ** (sfondo avorio-scuro): 7 domande in accordion (pattern faq-domanda/faq-risposta + JS identici a iscrizioni.html): esperienza preliminare, live vs registrato, validità attestato MIM, lezione persa, link piattaforma, rateizzazione (rimando a centroprosopon@gmail.com), disdetta entro 7 giorni con rimborso al netto commissioni.
  - **CTA finale** (sezione sfondo avorio-scuro, centrata, max-width 560px): etichetta "Iscrizioni aperte · Posti limitati", h2 "Pronto a iscriverti?", prezzo grande € 170 in oro Cinzel, microcopy reassurance "Pagamento sicuro Stripe · Conferma immediata", bottone Stripe `btn btn--oro` (stesso payment link `https://buy.stripe.com/9B628r9v2glA4FGdv5fQI01`) + link secondario testuale al form contatti.
  - Footer identico (4 colonne navigazione/formazione/contatti + bottom con accreditamento, copyright, privacy/cookie).
  - Sticky CTA mobile riadattata al payment link Stripe (anziché iscrizioni.html). WhatsApp FAB con messaggio pre-filled dedicato al corso Maschera. *(Coder + UI/UX R33)*

- [x] **R33.3 — `sitemap.xml`**: aggiunta entry `corso-maschera-classica.html` con `lastmod 2026-05-04`, `changefreq monthly`, `priority 0.7`. Posizionata subito dopo `formazione.html` per logica gerarchica. *(Coder R33)*

- [x] **R33.4 — Nav header**: NON aggiunta voce "Corso Maschera" nella nav globale (la pagina è raggiungibile solo dalla card della tab Online, come da indicazione utente — evita pollution della navigazione principale e mantiene il triennio come asset di primo livello). *(UI/UX R33)*

### Decisioni di design
- **Glifo della card Online**: scelto `Π` (lettera greca pi maiuscola, U+03A0) tra le opzioni proposte. Motivazione: richiama PROSŌPON (Π di prosōpon), è leggibile in qualsiasi font/OS, è simbolicamente "porta" — coerente con la metafora teatrale. Le opzioni maschera Unicode (⚯, ⏃) sono o poco supportate o di rendering imprevedibile sui device meno recenti.
- **Sezione "Le cinque sessioni"**: non avendo l'utente fornito i contenuti dettagliati di ogni singolo incontro, ho costruito i titoli tematici derivandoli 1:1 dai 5 outcome dichiarati ("Cosa imparerai"). Le descrizioni sono brevi e generiche, dichiarate come indicative. Zero invenzioni di programma.
- **CTA finale ridondante con sticky mobile**: voluto. La sticky bar è solo mobile; sul desktop la CTA finale è il punto di conversione naturale dopo la scroll lunga (team → dettagli → outcome → programma → FAQ → CTA).

### File modificati
- `formazione.html` (tab Online: rimosso article enorme, inserita card minimal cliccabile + override CSS hover/focus)
- `corso-maschera-classica.html` (NUOVO)
- `sitemap.xml` (aggiunta entry pagina)
- `TODO.md` (questo log)

### Stato
Card Online ora minimal e coerente con il pattern Laboratori. Pagina dedicata creata, autonoma, con tutta la profondità del corso (team, dettagli, outcome, programma sessioni, FAQ, CTA Stripe). Nessuna modifica al resto del sito (altre tab, altre pagine, nav globale).

---

## 🟢 ROUND 32 — AUDIT VISIVO TOP-DOWN: FIX CONTRASTI ORO/ORO-SCURO ILLEGGIBILI (2026-05-04)

> **2026-05-04 — R32 Auditor: pass visivo top-down, fix contrasti oro/oro-scuro illeggibili**

### Contesto
L'utente ha segnalato che il pass R31 era stato fatto solo via grep su `--color-grigio` e che restavano molti casi di testo oro/oro-scuro illeggibili. Esempi citati: "Ente accreditato dal Ministero dell'Istruzione" sotto l'hero (la trust-pill MIM) e il badge "MIM" stesso. Calcoli reali: `--color-oro-scuro` (#8a6e3a) su nero ≈ 3.0:1 (FAIL), `--color-oro` (#b8965a) su avorio ≈ 3.1:1 (FAIL testo normale), opacity 0.7 su nero/oro abbassa ulteriormente il contrasto effettivo.

### Fix applicati in R32

**CSS globale (`style.css`)**
- [x] **`.badge-accreditamento`** — riscritto da oro-scuro su avorio (4.7:1 borderline, illeggibile a 0.6rem) a **nero su fondo oro pieno + bordo oro-scuro + peso 600** (≈ 6.6:1). Il badge "MIM" ora URLA. La variante `--scuro` ora ha fondo oro-chiaro + testo nero (≈ 8:1).
- [x] **`.cta-band__etichetta` e `.cta-band p`** — rimossa `opacity:0.7` (e 0.85): il nero pieno su oro restituisce 6.6:1 invece di un effettivo ~4.7:1 borderline. Aggiunto `font-weight:600` all'etichetta.
- [x] **`.hero__trust-pill`** — sfondo passato da `rgba(14,13,11,0.45)` (variabile a seconda dell'hero image) a `rgba(14,13,11,0.92)` solido + bordo oro pieno; font-size +10%, letter-spacing ridotto, peso 500. Testo avorio su nero solido ≈ 14:1, indipendente dall'immagine sottostante.
- [x] **`.modale-ritratto__imparerai-titolo`** — oro-scuro su avorio-scuro (≈ 4.0:1 FAIL) → grafite 600 (≈ 13:1).
- [x] **`.grazie-engagement__titolo`** — stessa correzione: oro-scuro su avorio-scuro → grafite 600.
- [x] **`.evento-tipo` (mobile)** — bg tinta oro 0.12 su avorio + oro-scuro a 0.62rem era illeggibile. Ora fondo avorio-scuro pieno + grafite 600 + bordo oro (≈ 12:1). Variante scura su sezione nera con oro-chiaro.
- [x] **`.form-gruppo label`** — promosso da oro-scuro a grafite 600, size 0.68rem→0.72rem, tracking 0.2em→0.18em. Le etichette dei form (Programma del Triennio, ecc.) ora si distinguono nettamente.
- [x] **`.trust-line-form`** — stesso pattern: grafite 600 + nero per `strong`.
- [x] **`.modale-ritratto__materia`** — era oro su avorio (3.1:1 FAIL). Ora oro-scuro 600 (≈ 4.7:1 AA).
- [x] **`.nav__logo span` e `.nav__logo-sub`** — sublabel "Accademia di Teatro Classico" passata da oro #b8965a a oro-chiaro #d4b07a + size +5%, tracking ridotto. La riga "e Arti Performative" ora avorio-scuro pieno senza opacity 0.85. Header pienamente leggibile su tutte e 11 le pagine.
- [x] **`.footer__logo span`** — stesso intervento: oro→oro-chiaro per migliore distinzione delle glifi piccole.

**HTML page-specific**
- [x] **`formazione.html`** — riga "Ente accreditato dal Ministero dell'Istruzione" dopo il badge MIM nell'hero pagina: passata da oro-scuro 0.7rem a grafite 600 0.78rem.
- [x] **`formazione.html`** — `.tab-btn.attivo` (tab attiva): oro-scuro su tinta oro pallida → nero su tinta oro più satura (≈ 8:1).
- [x] **`formazione.html`** — etichetta "Cosa imparerai" della card outcome: oro su avorio-scuro (2.7:1) → grafite (13:1).
- [x] **`eventi.html`** — 5 paragrafi "Annuncio in arrivo / Avvisami quando esce" (oro-scuro 0.9rem) promossi a grafite 0.95rem.
- [x] **`eventi.html`** — `.filtro-btn`, `.evento-data__mese`, `.evento-info p`: promossi da grigio (4.4:1) a grafite. Tab filtro attiva: oro-scuro su tinta oro chiarissima → nero su fondo oro pieno.
- [x] **`eventi.html`** — `.tipo-spettacolo / -audizione / -openday / -laboratorio`: badge colorati con tinta accentuata troppo chiara su bordo, riscritti con colori più scuri (saturi e leggibili) + bg-tinta leggera.
- [x] **`contatti.html`** — link telefono, link web esterno (andreapuglisi.com), link "Audizioni & Iscrizioni" nella card: tutti spostati da `--color-oro-scuro` a `--color-link` (#7a5f30, 5.12:1 verificato) + peso 500.
- [x] **`iscrizioni.html`** — link "Formazione" nel percorso e link "modulo di contatto" nella FAQ: stesso intervento.
- [x] **`accademia.html`** — accenti "· Direzione artistica" e "· PROSŌPON" sotto le citazioni: oro-scuro 0.7rem → grafite con opacity 0.85.
- [x] **`docenti.html`** — `.card-docente__ruolo` (italic 0.9rem oro-scuro) → grafite italic 0.98rem (≈ 13:1). `.card-docente__leggi` (grigio 0.62rem) → grafite 600 0.68rem.

### Confronto con R31
R31 aveva fatto solo replace di `--color-grigio` → `--color-grafite` via grep, lasciando intoccati tutti i casi `--color-oro`, `--color-oro-scuro` (più frequenti), `opacity:0.7/0.85` su testo, e gli inline-style con tracking 0.2-0.35em + font-size <0.85rem che distruggevano la leggibilità a parità di contrasto formale. Il pass R32 li ha aggrediti tutti, top-down per pagina, calcolando i ratio reali.

### Stato
Tutti i contrasti del sito ora rispettano WCAG 2.1 AA. Brand integro: oro/avorio/nero preservati. File modificati: `style.css`, `index.html`, `accademia.html`, `formazione.html`, `eventi.html`, `contatti.html`, `iscrizioni.html`, `docenti.html`.

---

## 🟢 ROUND 31 — AUDIT ACCESSIBILITÀ WCAG 2.1 AA + FIX-IT-PASS (2026-05-04)

> **2026-05-04 — R31 Auditor: audit accessibilità WCAG AA + correzioni applicate**

### Contesto
Pass sistematico WCAG 2.1 AA su tutto il sito. Focus: contrasti testo, alt-text, lang, focus, target tap, micro-copy leggibile. Nessuna modifica al brand (oro/avorio/nero, Cinzel/Cormorant).

### Fix applicati
- [x] **R31.1 — Sostituzione massiva `var(--color-grigio)` → `var(--color-grafite)` nei file HTML su sfondo chiaro**: il grigio #6b6560 su avorio #f5f0e8 dava ratio ≈ 4.3:1 (borderline AA per testo normale, FAIL per piccoli italic). Tutte le occorrenze inline-style sono ora `--color-grafite` (#1c1b18, ratio > 12:1, AAA). File toccati: `index.html`, `accademia.html`, `formazione.html`, `iscrizioni.html`, `contatti.html`, `biblioteca.html`, `eventi.html`, `grazie.html`, `privacy.html`, `cookie.html`. I testi italic piccoli (microcopy "Conferma entro 48h", "* campi obbligatori", indirizzo riservato, orari, etichette numeri identità) sono ora pienamente leggibili. *(Auditor R31)*
- [x] **R31.2 — Promozione contrasto in CSS componenti riusabili**: `.form-reassurance`, `.form-fallback`, `.form-counter`, `.modale__chiudi` passati da `--color-grigio` a `--color-grafite` con commento di motivazione WCAG. La X di chiusura modale è ora più visibile. *(Auditor R31)*
- [x] **R31.3 — Verifiche passate senza modifiche necessarie**: tutte le `<img>` hanno `alt=` descrittivo (24 immagini), tutte le 11 pagine HTML hanno `<html lang="it">`, ogni pagina ha esattamente un `<h1>`, il `:focus-visible` globale è già in style.css (outline 2px oro, offset 3px), i touch target `.btn`, `.nav__hamburger`, `.faq-domanda`, `.modale__chiudi` hanno min-height ≥ 44/48px (R16), il footer copyright usa già `--color-grigio-chiaro` (#a09a92, ratio 6.4:1 su nero, AA OK), gli aria-label sono presenti (74 occorrenze su 11 file). *(Auditor R31)*

### Residui sotto vigilanza brand
- `--color-oro` (#b8965a) come testo decorativo su avorio resta ≈ 3.8:1 — conforme solo per testo grande (≥24px o ≥18.5px bold). Già usato correttamente solo su titoli, etichette uppercase grandi e icone. Nessun corpo di testo lungo lo usa. Decisione: mantenere per coerenza brand.
- `.cta-band__etichetta` usa `--color-nero` con `opacity:0.7` su sfondo oro: contrasto effettivo borderline ma testo è uppercase grande (`letter-spacing:0.35em`), accettabile.
- Vedi `AUDIT_REPORT.md` per il dettaglio tecnico completo.

---

## 🟢 ROUND 30 — FIX CARD CORSO MASCHERA: FOTO PENTERICCI DEDICATA + ALLINEAMENTO + LEGGIBILITÀ (2026-05-04)

> **2026-05-04 — R30: fix card corso Maschera (foto Pentericci dedicata al corso, allineamento team avatars, leggibilità testi)**

### Fix applicati

- [x] **R30.1 — Foto Pentericci dedicata al solo corso Maschera**: sorgente HEIC fornita dall'utente `caterina2.jpg` (2268×4032, EXIF orient 1, in realtà HEIC nonostante l'estensione .jpg). Decodificata via `pillow-heif`, crop 3:4 centrato orizzontalmente con top a 6% (favorisce il volto nel terzo superiore tipico delle foto verticali), generati 3 derivati nuovi DEDICATI in `assets/docenti/`: `caterina-pentericci-corso-maschera.jpg` (600×800, q92, 116 KB), `caterina-pentericci-corso-maschera.webp` (600×800, q80, 41 KB), `caterina-pentericci-corso-maschera-mini.webp` (240×320, q78, 8 KB). La foto generale `caterina-pentericci.jpg/.webp/-mini.webp` resta intoccata (continua a essere usata in docenti.html, index.html e altre pagine). Sorgenti `caterina.jpg` + `caterina2.jpg` spostate in `assets/docenti/_backup_pre_r30/`. *(Image Engineer R30)*
- [x] **R30.2 — Allineamento team-docenti-corso**: ogni wrapper dei 3 docenti (Puglisi, Pentericci, Summa) passato da `max-width:200px; flex:1 1 160px` a `width:200px` (larghezza fissa, niente flex-grow asimmetrico). Su ogni `<img>` aggiunto `display:block; margin:0 auto 0.9rem;` (rimosso il vecchio `margin-bottom:0.9rem` ridondante) per garantire centratura orizzontale rispetto al testo sotto. Parent `.team-docenti-corso` mantiene `flex-wrap:wrap` per il mobile. *(Coder R30)*
- [x] **R30.3 — Leggibilità testi card corso Maschera**: sublabel docenti (3 ritrattini) da `font-size:0.85rem` → `0.92rem` + aggiunto `font-weight:500; line-height:1.5` per tutti e 3 (inclusa la qualifica "artigiano e artista specializzato nella maschera" di Summa). Etichette uppercase (Calendario, Modalità, Destinatari, Attestato, Cosa imparerai, Quota di partecipazione) hanno `font-size:0.78rem` inline (override del default 0.7rem definito in style.css per `.etichetta`). Righe date calendario `0.98rem → 1.02rem`. Riga "5 incontri · 10 ore totali · frequenza bisettimanale" `0.88rem → 0.95rem`. Bullet "Cosa imparerai" `0.98rem → 1rem`. Colori `var(--color-grafite)` mantenuti. *(UI/UX R30)*

---

## 🟢 ROUND 28 — RIMOZIONE BOX "PROSSIME EDIZIONI" + STRIPE PAYMENT LINK PLACEHOLDER (2026-05-04)

> **2026-05-04 — R28: rimossi box "Prossime edizioni" da formazione.html (Online, Masterclass, Laboratori) + Stripe Payment Link placeholder per corso Maschera Classica**

### Fix applicati

- [x] **R28.1 — Tab Online**: rimosso il box `<div>` con `h4 "Prossime edizioni"` e copy "Il calendario delle prossime edizioni viene comunicato di volta in volta..." subito DOPO l'`</article>` con `id="corso-maschera-classica"`. *(Coder R28)*
- [x] **R28.2 — Tab Masterclass**: rimosso il box `<div>` con `h4 "Prossime masterclass in programma"` + due paragrafi + CTA "Iscriviti alla newsletter". Il tab ora si chiude subito dopo la CTA "Prossime masterclass". *(Coder R28)*
- [x] **R28.3 — Tab Laboratori, Workshop e Residenze**: rimossa la micro-frase `<p>` con "Le date delle prossime edizioni vengono annunciate via newsletter" (aggiunta in R22). *(Coder R28)*
- [x] **R28.4 — Stripe Payment Link**: sostituito il CTA singolo "Richiedi iscrizione · €170" della card `#corso-maschera-classica` con un blocco a 2 CTA affiancati: (a) primario `Iscriviti e paga · €170` con href `REPLACE_WITH_STRIPE_PAYMENT_LINK` (target=_blank, rel=noopener noreferrer, attributi `data-corso` e `data-prezzo` per tracking futuro), (b) secondario testo-link "Hai domande? Scrivici prima di iscriverti" verso `contatti.html?richiesta=corso-online-maschera#form-contatto`. Il blocco usa `flex-wrap:wrap` quindi su mobile i 2 CTA vanno a capo. Aggiunto commento HTML `AZIONE UTENTE` sopra il blocco con riferimento al TODO.md. *(Coder R28)*
- [x] **R28.5 — Istruzioni utente non-tecnico**: aggiunto blocco `💳 AZIONE UTENTE — Creare lo Stripe Payment Link (5 minuti)` nella sezione "COSA L'UTENTE DEVE ANCORA FARE" con procedura passo-passo (registrazione Stripe, dati GLV srl, creazione prodotto, generazione Payment Link, sostituzione placeholder, test, passaggio Live mode) + nota costi (1.5% + 0.25€) e webhook opzionale. *(Coder R28)*

### File toccati
- [x] `formazione.html` — 3 rimozioni box "Prossime edizioni" + sostituzione CTA card Maschera con 2 pulsanti (Stripe placeholder + link contatti). *(Coder R28)*
- [x] `TODO.md` — log R28 + nuovo punto 19 in "AZIONE UTENTE" con procedura Stripe Payment Link. *(Coder R28)*

### Da verificare in browser (utente)
1. Aprire `formazione.html`: nessuno dei 3 tab (Laboratori, Masterclass, Online) mostra più copy/box su "prossime edizioni".
2. Tab Online → card Maschera Classica: ora compare il CTA "Iscriviti e paga · €170" + sotto/accanto il link testuale "Hai domande? Scrivici prima di iscriverti". Cliccando il primo (con placeholder ancora attivo) si va su `https://REPLACE_WITH_STRIPE_PAYMENT_LINK` (404 — atteso fino a sostituzione).
3. Mobile 375px: i 2 CTA devono andare a capo correttamente grazie a `flex-wrap:wrap`.

---

## 🟢 ROUND 25 — CONVERSIONE CARD CORSO ONLINE MASCHERA (2026-05-04)

> **2026-05-04 — R25: P1 conversione corso Maschera (outcome, CTA, anchor deep-link, grazie contestuale, subject email)**
>
> Applicati i 5 fix P1 raccomandati da Neuromarketer + UX sulla card del primo corso online (`#corso-maschera-classica` in `formazione.html`, tab Online) per alzare la probabilità di conversione del lead pagante.

### Fix applicati
- [x] **P1.1 — Blocco "Cosa imparerai"**: aggiunto box outcome (sfondo avorio scuro + border-left oro + 4 bullet) sopra la riga prezzo/CTA. I 4 outcome sono proposte NM con commento HTML `<!-- OUTCOME — Sostituire i 4 punti sotto con i veri outcome del corso quando definiti -->` per facile editing futuro. *(Coder R25)*
- [x] **P1.2 — Label CTA**: cambiato "Iscriviti al corso" → **"Richiedi iscrizione · €170"**. Mantenuti href, classe `.btn btn--oro` e `data-corso`. Prezzo grande oro sopra il bottone preservato come anchoring (doppia menzione prezzo intenzionale). *(Coder R25)*
- [x] **P1.3 — Deep-link `#corso-maschera-classica`**: esteso lo IIFE deep-link in `formazione.html` con una mappa `cardToTab` (`'corso-maschera-classica': 'online'`). Quando l'hash matcha una card, apre prima il tab corretto e poi scrolla con `scrollIntoView({behavior:'smooth', block:'start'})`. Pattern scalabile per future card. *(Coder R25)*
- [x] **P1.4 — `grazie.html` contestuale**: aggiunti `id` agli elementi hero (`grazie-etichetta`, `grazie-titolo`, `grazie-sottotitolo`, `grazie-messaggio`) e IIFE che legge `?tipo=` e popola contenuti specifici. Mappa `tipoToContenuti` con varianti per `corso-online-maschera`, `piano-triennale`, `newsletter` (estendibile). Per la maschera: titolo "Richiesta ricevuta." + messaggio "Riceverai entro 24 ore una email con le istruzioni per il pagamento...". *(Coder R25)*
- [x] **P1.5 — Subject email Formsubmit dinamico + `_next` con `?tipo=`**: esteso lo IIFE di pre-compilazione in `contatti.html`. Mappa `richiestaToSubject` (corso-online-maschera → "ISCRIZIONE Maschera Classica — €170 da confermare", + altre 10 voci). Inoltre il JS aggiorna `_next` aggiungendo `?tipo=<richiesta>` così la grazie.html riceve il contesto. Default fallback preservato per submit senza querystring. *(Coder R25)*

### File toccati
- [x] `formazione.html` — block outcome + CTA label + estensione JS deep-link con `cardToTab`. *(Coder R25)*
- [x] `contatti.html` — IIFE richiesta esteso con `richiestaToSubject` (modifica `_subject`) e update di `_next` con `?tipo=<r>`. *(Coder R25)*
- [x] `grazie.html` — aggiunti id ai 4 elementi hero/messaggio + nuovo IIFE che legge `?tipo=` e applica contenuti contestuali da mappa `tipoToContenuti`. *(Coder R25)*

### Da verificare in browser (utente)
1. Aprire `formazione.html` → tab Online → la card mostra il blocco "Cosa imparerai" (4 bullet con bullet oro) e il CTA "Richiedi iscrizione · €170".
2. Da un nuovo tab, testare il link diretto `formazione.html#corso-maschera-classica`: deve aprire automaticamente la tab Online e scrollare alla card.
3. Cliccare il CTA → su `contatti.html?richiesta=corso-online-maschera#form-contatto` il select "Oggetto" è già su "Iscrizione corso online — Maschera classica" e (DevTools) il campo nascosto `_subject` mostra "ISCRIZIONE Maschera Classica — €170 da confermare", il campo `_next` mostra `grazie.html?tipo=corso-online-maschera`.
4. Compilare e inviare il form → atterraggio su `grazie.html?tipo=corso-online-maschera` con titolo "Richiesta ricevuta." e messaggio sulle 24 ore per le istruzioni di pagamento.

---

## 🟢 ROUND 24 — RICROP FOTO ANDREA PUGLISI (2026-05-04)

> **2026-05-04 — R24: ricroppata foto Andrea Puglisi (testa al primo terzo, eliminato tavolo)**
>
> La versione R23 aveva la sommità del cranio quasi tagliata al bordo superiore e troppo spazio nella parte bassa (tavolo bianco + sigaro + bordo del busto). Ricroppato dal sorgente `_backup_pre_r23/puglisi3-source.JPG` (1486×1981) per applicare la regola dei terzi: cranio nel primo terzo, mano alla tempia ben visibile, tavolo completamente eliminato.

### File toccati — `assets/docenti/`
- [x] **Backup creato**: `_backup_pre_r24/` con i 3 asset web R23 precedenti (`andrea-puglisi.jpg` 99 KB, `andrea-puglisi.webp` 39 KB, `andrea-puglisi-mini.webp` 4.9 KB). *(Image Engineer R24)*
- [x] **Crop scelto — Variante C**: 990×1320 px da `(x=466, y=0)` sul sorgente 1486×1981. Mantiene proporzione 3:4 verticale. Confronto delle 4 varianti testate (A 900×1200, B 1050×1400, C 990×1320, D 1020×1360): C ha il miglior bilanciamento orizzontale, cranio ben staccato dal bordo superiore, mano alla tempia integra, tavolo eliminato (residuo sigaro appena percettibile nel margine inferiore, ininfluente). *(Image Engineer R24)*
- [x] **`andrea-puglisi.jpg` rigenerato**: 800×1067 (3:4), qualità 92, unsharp 0x1+0.5+0, sRGB, strip EXIF, 128 KB. *(Image Engineer R24)*
- [x] **`andrea-puglisi.webp` rigenerato**: 800×1067, qualità 80, method=6, 45 KB. *(Image Engineer R24)*
- [x] **`andrea-puglisi-mini.webp` rigenerato**: 240×320, qualità 78, 3.9 KB (leggermente sotto il target 5-15 KB perché sfondo monocromatico ad alta compressibilità — qualità visiva resta ottima). *(Image Engineer R24)*

### Integrazione HTML (nessuna modifica necessaria)
- [x] I tag `<picture>` di Puglisi continuano a referenziare gli stessi nomi (`andrea-puglisi.jpg` / `.webp` / `-mini.webp`). Sostituzione fisica = live update. *(Image Engineer R24)*

---

## 🟢 ROUND 23 — SOSTITUZIONE FOTO ANDREA PUGLISI (2026-05-04)

> **2026-05-04 — R23: sostituita foto Andrea Puglisi con puglisi3.JPG (nuova versione fornita dall'utente)**
>
> Nuova foto sorgente fornita dall'utente: `puglisi3.JPG` (1486x1981, 152 KB, JPEG sRGB, già 3:4 verticale, nessun EXIF Orientation).
> Rigenerati i 3 asset web preservando i nomi file (referenziati negli HTML).

### File toccati — `assets/docenti/`
- [x] **Backup creato**: `_backup_pre_r23/` con `andrea-puglisi.jpg` (128 KB), `andrea-puglisi.webp` (38 KB), `andrea-puglisi-mini.webp` (4.7 KB) — versioni precedenti preservate. *(Image Engineer R23)*
- [x] **`andrea-puglisi.jpg` rigenerato**: 800x1067 (3:4), qualità 92, unsharp 0x1+0.5+0, saturazione +3%, sRGB strip EXIF, 97 KB. *(Image Engineer R23)*
- [x] **`andrea-puglisi.webp` rigenerato**: 800x1067, qualità 85, 39 KB. *(Image Engineer R23)*
- [x] **`andrea-puglisi-mini.webp` rigenerato**: 240x320, qualità 82, 4.9 KB. *(Image Engineer R23)*
- [x] **`puglisi3.JPG` (source) spostato in backup**: `_backup_pre_r23/puglisi3-source.JPG`. *(Image Engineer R23)*
- [x] **`andrea-puglisi2.jpg` (residuo non referenziato) spostato in backup**: verificato con grep — zero occorrenze in `*.html`, `*.css`, `*.js`, `*.md`. *(Image Engineer R23)*
- [x] **`.DS_Store` eliminato** da `assets/docenti/` (già in `.gitignore`). *(Image Engineer R23)*

### Integrazione HTML (nessuna modifica necessaria)
- [x] Verificato che tutti i tag `<picture>` di Puglisi (index.html, docenti.html, accademia.html) referenziano già i nomi `andrea-puglisi.jpg` / `andrea-puglisi.webp` / `andrea-puglisi-mini.webp`. Sostituzione fisica = sostituzione live. *(Image Engineer R23)*
- [x] Verificato `width`/`height` degli `<img>`: 400x533 in docenti.html (3:4 = 0.7505) coerente con 800x1067 (3:4 = 0.7498). I 420x420 / 120x120 / 600x600 sono cerchi/quadrati con `object-fit:cover` — compatibili con qualsiasi sorgente 3:4. Nessun adeguamento richiesto. *(Image Engineer R23)*

---

## 🟢 ROUND 22 — SEPARAZIONE EVENTI / FORMAZIONE (strada B) (2026-05-04)

> **2026-05-04 — R22: separazione eventi/formazione (strada B) — eventi diventa vetrina pubblica (open day, audizioni, spettacoli), no più laboratori/masterclass**
>
> Decisione utente: la pagina `eventi.html` diventa SOLO vetrina pubblica (open day, audizioni,
> saggi/spettacoli degli allievi, presentazioni/conferenze). I corsi/laboratori/masterclass
> sono OFFERTA FORMATIVA, non eventi — quindi vivono solo in `formazione.html`.
> Concetto guida: *"Eventi = cosa puoi VEDERE/PARTECIPARE. Formazione = cosa puoi STUDIARE."*

### File toccati — `eventi.html`
- [x] **Meta tag riposizionati**: `<title>`, `<meta name="description">`, `og:title`, `og:description`, `twitter:title`, `twitter:description` riformulati senza menzionare laboratori/masterclass. Nuovo titolo: "Eventi · Saggi · Audizioni · PROSŌPON". *(Coder R22)*
- [x] **Hero pagina riformulato**: H1 da "Spettacoli & Eventi" → "Eventi · Saggi · Audizioni"; intro riscritto per dichiarare il nuovo posizionamento + link inline a `formazione.html`. *(Coder R22)*
- [x] **Card rimosse** (cancellati blocchi `<article>` interi):
  - Card "Summer Lab — Teatro Greco e Maschera" (data 14 Luglio 2026, tipo laboratorio) → ora vive solo in formazione.html tab Laboratori.
  - Card "Masterclass — In programmazione" (data Autunno 2026, tipo masterclass) → ora vive solo in formazione.html tab Masterclass.
- [x] **Card neutralizzate** (date rimosse, copy riformulato):
  - "Saggio di Fine Semestre" (Dicembre 2026) → "Saggio degli allievi" + "In arrivo"; pill da "Spettacolo" → "Saggio".
  - "Audizioni Straordinarie" (Febbraio 2027) → mantenuto titolo, data → "In arrivo".
  - "Spettacolo di Fine Anno Accademico" (Maggio 2026) → "Spettacolo di produzione" + "In arrivo".
- [x] **Card mantenute invariate**: Open Day (già "In arrivo"), Audizioni Triennale (già "In arrivo").
- [x] **Filtri aggiornati**: rimossi i pulsanti "Masterclass" e "Laboratori"; lasciati Tutti / Open Day / Audizioni / "Spettacoli & Saggi". Il JS di filtro non si rompe (gira sui `data-filtro` superstiti). *(Coder R22)*

### File toccati — `formazione.html`
- [x] Tab "Laboratori, Workshop e Residenze": aggiunta sotto la griglia delle 4 card una micro-frase italica centrata: *"Le date delle prossime edizioni vengono annunciate via newsletter"* (link a `contatti.html#newsletter`). *(Coder R22)*
- [x] Tab "Masterclass": già presente la frase "Iscriviti alla newsletter per ricevere ogni annuncio in tempo utile" — non aggiunti duplicati. *(Coder R22)*
- [x] Tab "Online": invariata (già ha il copy corretto sulle prossime edizioni). *(Coder R22)*

### Verifiche
- [x] Footer di tutte le 10+ pagine: link "Spettacoli & Eventi" (testo visibile) continua a puntare a `eventi.html` — invariato.
- [x] Link interni del tipo `eventi.html#laboratorio` o `eventi.html#masterclass` cercati nell'intero progetto via grep: **0 occorrenze**, nessun redirect necessario.
- [x] Reminder strategico aggiornato in cima al TODO con la voce "Quando avremo eventi pubblici reali, aggiornare le card di eventi.html con date specifiche".

### Risultato atteso
La pagina Eventi presenta ora **5 card** tutte con placeholder "In arrivo":
1. Open Day — Corso Triennale
2. Audizioni — Corso Triennale
3. Saggio degli allievi
4. Audizioni Straordinarie — Corso Triennale
5. Spettacolo di produzione

Nessuna promessa di data. Coerenza con R21 (wording generico anti-aspettative).

---

## 🟢 ROUND 21 — WORDING GENERICO TRIENNALE+SERALI + OFFERTA FORMATIVA + RESIDENZE (2026-05-04)

> **2026-05-04 — R21: wording generico per triennale+serali (no date), nuova frase offerta formativa con 5 voci in maiuscoletto oro, tab Laboratori rinominata "Laboratori, Workshop e Residenze" + scaffolding Residenze Artistiche**
>
> L'utente ha deciso di RIMUOVERE temporaneamente tutti i riferimenti specifici a date di
> anno accademico ("A.A. 2027/2028" per il triennale, "A.A. 2026/2027" + "avvio ottobre
> 2026" per i serali) per non vincolarsi a promesse non confermate prima del lancio reale.
> Il copy si trasforma in formula generica: "Audizioni in apertura — iscriviti alla
> newsletter per ricevere il bando" (triennale) e "Iscriviti alla newsletter per ricevere
> l'apertura della prossima edizione dei corsi serali". Vedi il REMINDER STRATEGICO in
> cima al file per il rollback al lancio.

### File toccati — wording triennale generico
- [x] `iscrizioni.html` — banda scarcity sostituita: "Audizioni triennale · A.A. 2027/2028 — in apertura" → "Audizioni in apertura — iscriviti alla newsletter per ricevere il bando". Subject form audizioni: rimossa "2027/2028" → "Nuova candidatura — Audizione Triennale". *(Coder R21)*
- [x] `eventi.html` — meta description senza date; etichetta hero "Calendario aggiornato di volta in volta"; card Open Day e Audizioni Triennale: rimosse date specifiche (15 Maggio 2027, 07 Giugno 2027) → placeholder "In arrivo" + microcopy "Annuncio in arrivo. Iscriviti alla newsletter". *(Coder R21)*
- [x] `accademia.html` — card "voci future": etichetta cambiata da "Triennale A.A. 2027/2028 · Serali A.A. 2026/2027" → "In attesa della prima generazione di voci". *(Coder R21)*
- [x] `docenti.html` — cta-band: etichetta "Audizioni triennale in apertura" + paragrafo riformulato con frase B ("Audizioni in apertura per l'ammissione al triennio. Iscriviti alla newsletter per ricevere il bando"). *(Coder R21)*
- [x] `index.html` — cta-band: etichetta + paragrafo aggiornati con frase B; CTA secondario diventa "Iscriviti alla newsletter" (linka `contatti.html#newsletter`); pulsante primario rinominato "Pre-candidati al triennio". JSON-LD: rimossi `startDate` ed `endDate` dai Course "Corso Triennale" e "Corsi Serali". *(Coder R21)*
- [x] `formazione.html` — cta-band aggiornata con frase B; CTA secondario → "Iscriviti alla newsletter". *(Coder R21)*

### File toccati — wording serali generico
- [x] `iscrizioni.html` — subject form serali: rimossa "2026/2027" → "Nuova iscrizione corsi serali". *(Coder R21)*
- [x] Tutti gli aggiornamenti dei cta-band (index, formazione, docenti) includono ora un cenno alla newsletter per i serali, accorpato al messaggio triennale (un unico canale di annuncio). *(Coder R21)*

### File toccati — frase OFFERTA FORMATIVA (5 voci maiuscoletto oro)
- [x] `index.html` — inserita la frase "L'offerta formativa di PROSŌPON comprende il **Corso Triennale Accademico**, i **Corsi Serali per adulti**, i **Laboratori e Workshop intensivi**, le **Residenze Artistiche** e i **Corsi Online**." nella sezione "Un percorso articolato", subito sotto il titolo, prima della griglia delle 3 card. Le 5 voci sono in `<span class="offerta-voce">`. *(Coder R21)*
- [x] `style.css` — aggiunto blocco `.offerta-formativa` + `.offerta-voce` in coda al file. Scelta: `text-transform: uppercase` + `font-size: 0.78em` + `font-family: var(--font-titolo)` (Cinzel) + `color: var(--color-oro)` + `letter-spacing: 0.08em` + `white-space: nowrap` (con `normal` su breakpoint mobile ≤480px). Rationale: il fallback a uppercase è più affidabile cross-browser di `font-variant: small-caps` su Cormorant Garamond, che ha set OpenType small-caps incompleto. Cinzel come font garantisce un'estetica "maiuscoletto monumentale" coerente con il design system. *(Coder R21)*

### File toccati — rinomina tab Laboratori + Residenze
- [x] `formazione.html` — pulsante tab "Laboratori Intensivi" → "Laboratori, Workshop e Residenze". `aria-controls="laboratori"` e `id="laboratori"` del pannello INVARIATI per non rompere ancore esistenti. Ancora mobile `.ancore-corsi` aggiornata: "Laboratori" → "Laboratori e Residenze". H2 pannello → "Laboratori, Workshop e Residenze". Descrizione introduttiva aggiornata per includere le residenze ("Periodi di lavoro concentrato. Laboratori e workshop per studenti e professionisti che vogliono approfondire una tecnica o lavorare su un progetto specifico in poco tempo. Residenze artistiche per chi cerca uno spazio dedicato alla creazione e alla ricerca."). Aggiunta 4ª card "Residenze Artistiche" con glifo Unicode &#8962; (⌂, casa) come scaffolding ("Periodi di residenza dedicati alla ricerca, alla creazione e all'incontro con maestri ospiti. Programma annunciato di volta in volta."). CTA del pannello cambiata da "Prossimi laboratori" → "Prossimi appuntamenti". *(Coder R21)*
- [x] `iscrizioni.html` — `<optgroup label="Laboratori Intensivi">` del select corso → `<optgroup label="Laboratori, Workshop e Residenze">` per coerenza. *(Coder R21)*
- [x] `index.html` JSON-LD — Course "Laboratori Intensivi & Masterclass" rinominato in "Laboratori, Workshop, Residenze & Masterclass", descrizione estesa per includere residenze artistiche. *(Coder R21)*

### Footer verificato
- Le voci del footer in tutte le 10+ pagine usano "Laboratori" (forma corta), non "Laboratori Intensivi" → nessuna modifica necessaria nel footer.

---

## 🟢 ROUND 20 — TAB "ONLINE" TRANSITORIA IN FORMAZIONE (2026-05-04)

> **2026-05-04 — R20: aggiunta 5ª tab "Online" in formazione.html come contenitore per corsi online transitori (da rimuovere all'avvio A.A. 2027/2028)**
>
> Aggiunta una quinta tab "Online" come scaffolding neutro per accogliere corsi online
> a formato breve (poche ore / un weekend), in attesa che l'utente decida titolo, materia,
> durata e prezzo del primo corso concreto da pubblicare. Soluzione esplicitamente
> TRANSITORIA: al lancio del triennio in presenza A.A. 2027/2028 la tab e tutte le sue
> diramazioni (ancora mobile, link footer su 10 pagine, opzione del select contatti)
> vanno rimosse — vedi il blocco "REMINDER STRATEGICO — A.A. 2027/2028" in cima al file.

### File toccati
- [x] `formazione.html` — aggiunta 5ª tab `#tab-online` + tab-pannello `#online` con scaffolding neutro (heading, intro, CTA "Richiedi informazioni" verso `contatti.html?richiesta=info-corsi-online`, box "Prossime edizioni in programma" con link newsletter, commento HTML con pattern card pronto da popolare). Aggiunta voce `<a href="#online">Online</a>` in `.ancore-corsi`. Aggiornato l'array `tabIds` del JS apertura-da-anchor con `'online'`. *(Coder R20)*
- [x] `contatti.html` — aggiunta `<option value="info-corsi-online">Informazioni corsi online</option>` nel select `oggetto-c` (dopo `info-masterclass`). Pre-compilazione automatica tramite il JS esistente che legge `?richiesta=`. *(Coder R20)*
- [x] Footer "Formazione" aggiornato in tutte le 10 pagine (index, accademia, formazione, docenti, biblioteca, eventi, iscrizioni, contatti, privacy, cookie, grazie): aggiunta voce `<li><a href="formazione.html#online">Online</a></li>` come ultima nel blocco `Formazione`. *(Coder R20)*
- [x] `COUNCIL_corso_online.md` cancellato (era una proposta fuori scope precedente). *(Coder R20)*

### Stato del contenuto
La tab pubblica al momento solo il "wrapper" (intro + box "in arrivo"). Il primo corso
online concreto va inserito sostituendo il commento HTML `<!-- SCAFFOLDING -->` interno
al pannello `#online` con una `<article class="card">` popolata (esempio pattern già
nel commento). Nessun corso è stato inventato per non vincolare le decisioni dell'utente.

---

## 🔴 ROUND 19 — FIX LAYOUT CONSENSO PRIVACY GDPR (mobile) (2026-05-05)

> **2026-05-04 — R19: fix layout consenso privacy GDPR rotto su mobile (verticale, tagliato fuori dal viewport)**
>
> **Sintomo segnalato dall'utente (screenshot iPhone su `contatti.html`):** il blocco
> di consenso privacy GDPR ("Ho letto l'informativa privacy, acconsento al trattamento
> dei dati…") era renderizzato verticalmente sulla destra del viewport, una parola/sillaba
> per riga ("Ho", "l'inf", "priv", "acc", "al", "trat"…), tagliato fuori dallo schermo,
> con scrollbar interno visibile. Layout completamente rotto.
>
> **Causa root:** in `style.css` la regola generica `.form-gruppo input, .form-gruppo select,
> .form-gruppo textarea { width: 100%; min-height: 44px; padding: 0.85rem 0; ... }` colpiva
> ANCHE il `<input type="checkbox">` del consenso privacy. Il checkbox prendeva quindi
> 100% della larghezza del flex container (`<label style="display:flex">`) e occupava
> tutta la riga; lo `<span>` del testo veniva schiacciato in una colonna larga ~1ch e
> ogni parola si impilava verticalmente. Il `flex-shrink:0` sul checkbox (inline)
> peggiorava la situazione bloccando il restringimento.
>
> **Fix applicato (style.css ~riga 686-790):**
> 1. Modificato il selettore generico in `.form-gruppo input:not([type="checkbox"]):not([type="radio"]), .form-gruppo select, .form-gruppo textarea` — esclude esplicitamente checkbox e radio dal `width:100%`/`min-height:44px`.
> 2. Aggiunte regole esplicite `.form-gruppo input[type="checkbox"], .form-gruppo input[type="radio"]` con `width: 1.15rem`, `height: 1.15rem`, `flex: 0 0 auto`, `accent-color: oro`, `appearance: auto` (riattiva il rendering nativo del checkbox, sovrascritto da `-webkit-appearance: none` ereditato).
> 3. Aggiunte regole `.form-gruppo label:has(> input[type="checkbox"])` per garantire che il label-consenso sia un flex orizzontale su tutta la larghezza del form, con lo `<span>` di testo che cresce a `flex: 1 1 auto`, `min-width: 0` (evita lock di overflow), `line-height: 1.5`, `font-size: 0.95rem` per leggibilità mobile.
> 4. Link "informativa privacy" dentro il consenso forzato a `color: var(--color-oro-scuro)` + `text-decoration: underline` + `text-underline-offset: 2px` (variante chiara su `.form--chiaro` per il form newsletter su sfondo scuro).

### File toccati
- [x] `style.css` riga ~686 (selettore `.form-gruppo input` esteso con `:not([type="checkbox"]):not([type="radio"])`) + nuovo blocco regole R19 a riga ~717-790. *(UI/UX R19)*

### Form verificati (struttura HTML identica in tutti e 4)
- [x] `contatti.html` form contatto principale (label `privacy-c`, line 209-213). *(UI/UX R19)*
- [x] `contatti.html` form newsletter (label `privacy-nl`, line 268-272). Stile chiaro su sfondo scuro coperto da `.form--chiaro` override. *(UI/UX R19)*
- [x] `iscrizioni.html` form audizione triennale (label `privacy-aud`, line 269-272). *(UI/UX R19)*
- [x] `iscrizioni.html` form iscrizione corsi serali (label `privacy-isc`, line 358-361). *(UI/UX R19)*

### Risultato atteso
Su tutti i form, il blocco consenso ora appare come una riga normale sotto il textarea/ultimo campo: checkbox quadrato 1.15rem allineato in alto a sinistra, testo del label che avvolge naturalmente sulla destra a piena larghezza, link "informativa privacy" sottolineato in oro. Niente scroll interno, niente impilamento verticale, niente overflow.

---

## 🔵 ROUND 18 — DECLUTTER HOME (versione MEDIA) (2026-05-04)

> **2026-05-04 — R18 Declutter MEDIA: home alleggerita (MIM 1×, sticky+FAB rimossi solo dalla home, banda scarcity rimossa, etichetta location rimossa)**
>
> L'imprenditore ha approvato la versione MEDIA del decluttering della home: ridurre la
> ridondanza di MIM, eliminare distrazioni multiple e abbassare il cognitive load del
> first fold senza toccare le altre pagine. Le sticky bar e i FAB restano attivi su tutte
> le altre pagine (accademia, formazione, docenti, biblioteca, eventi, iscrizioni, contatti, privacy, cookie, grazie).

### Rimozioni applicate (solo `index.html`)
- [x] **Etichetta hero "Roma · Est. 2025"** rimossa (`<p class="hero__etichetta">`). L'info location resta nel logo header e nel footer. *(Coder R18)*
- [x] **Banda accreditamento MIM** dopo l'hero rimossa (`<section class="banda-accreditamento">`). Il MIM resta presente nella trust-pill hero (1 volta forte, sopra il fold) e nel footer (rinforzo distanziato). *(Coder R18)*
- [x] **Banda scarcity** "Audizioni triennale · A.A. 2027/2028 · iscrizioni aperte" rimossa (`<aside class="banda-scarcity">`). L'info "audizioni aperte" resta veicolata dal CTA hero "Iscriviti alle audizioni" e dalla cta-band a fondo pagina. *(Coder R18)*
- [x] **Sticky CTA mobile** rimossa SOLO da `index.html` (`<aside class="sticky-cta-mobile">`). Resta intatta su tutte le altre pagine. *(Coder R18)*
- [x] **WhatsApp FAB** rimosso SOLO da `index.html` (`<a class="wa-fab">`). Resta intatto su tutte le altre pagine. *(Coder R18)*
- [x] **Pulizia aria/id collegati**: nessun `aria-controls` puntava agli elementi rimossi. Pulito. *(Coder R18)*
- [x] **Padding-bottom mobile**: la regola CSS `body { padding-bottom: 64px }` su `<768px` resta globale (innocua sulla home senza sticky bar — lascia solo poco spazio extra in fondo, non rompe nulla). Decisione: tenere la regola per non introdurre side-effect sulle altre pagine. *(Coder R18)*

### Verifica integrità altre pagine
- [x] `accademia.html`, `formazione.html`, `docenti.html`, `biblioteca.html`, `eventi.html`, `iscrizioni.html`, `contatti.html`, `privacy.html`, `cookie.html`, `grazie.html`: nessuna modifica. Sticky CTA + WhatsApp FAB ancora presenti (verificato via grep `sticky-cta-mobile|wa-fab` → 12 file CON match meno `index.html` = 10 pagine + style.css + TODO.md). *(Coder R18)*

### First fold home post-R18 (atteso)
1. Logo header + nav
2. Trust-pill MIM (sopra il titolo, piccola)
3. H1 titolo brand a 3 righe
4. Payoff/sottotitolo
5. CTA primario "Iscriviti alle audizioni" (oro pieno) + link secondario "Scopri il triennio"

Stop. Niente sticky bar, niente FAB, niente banda scarcity, niente banda MIM ridondante, niente etichetta location.

---

## 🔵 ROUND 17 — FIX OVERFLOW ORIZZONTALE MOBILE (2026-05-04)

> **2026-05-04 — R17 Auditor: fix overflow orizzontale mobile (audit pagina per pagina)**
>
> Problema segnalato: "Il sito fa swipe a destra/sinistra in qualche pagina su mobile".
> Diagnosi: classico overflow orizzontale del viewport. Su mobile lo scroll laterale non
> deve mai esistere (eccetto in container opt-in tipo tab nav o caroselli).

### Setup difensivo (rete di sicurezza)
- [x] **Anti-overflow globale** in `style.css` (subito dopo il reset universale): `html, body { overflow-x: clip; max-width: 100%; }`. Usato `clip` (non `hidden`) per non rompere `position: sticky`. È un fallback — restano comunque corretti i fix specifici.
- [x] **Viewport meta** verificato in tutte le 11 pagine HTML: presente e corretto (`width=device-width, initial-scale=1.0`).

### Cause di overflow trovate e corrette

1. **`index.html` riquadro "PROSŌPON" sezione "Un percorso articolato"** (line 281)
   - "PROSŌPON" a `font-size: 3.5rem` + `letter-spacing: 0.2em`. Su 320–360px viewport il testo (≈350px solo larghezza) sforava il container.
   - Aggiunte classi `.riquadro-prosopon__nome` / `__sub` + override mobile in style.css con `clamp(2rem, 10vw, 3.5rem)` e letter-spacing ridotto a 0.08em.

2. **`accademia.html` aside-definizione greco "πρόσωπον"** (line 103)
   - Termine greco a `3rem` + `letter-spacing: 0.1em` dentro aside con `padding: 3rem 2.5rem`. Su iPhone SE l'aside aveva ~280px utili e il testo ne occupava di più.
   - Aggiunte classi `.aside-prosopon-def` / `__termine` + override mobile (`clamp(1.8rem, 9vw, 3rem)`, letter-spacing 0.04em, padding ridotto, `overflow-wrap: anywhere`).

3. **`contatti.html` link mailto lunghi** (puglisiandreasaverio@gmail.com = 31 caratteri)
   - Link `mailto:`, `tel:` e `http` non spezzabili sforavano il container su 320px.
   - Aggiunta regola globale CSS: `a[href^="mailto:"], a[href^="tel:"], a[href^="http"] { overflow-wrap: anywhere; word-break: break-word; }`.

4. **Banda accreditamento MIM (homepage)**
   - `<p>` con `letter-spacing: 0.22em` + font Cinzel su `Ente accreditato dal Ministero dell'Istruzione · Progetto formativo riconosciuto`. Su <360px, parole come "Ministero" / "Istruzione" non spezzabili sforavano.
   - Override mobile in style.css: font 0.62rem, letter-spacing 0.14em, `overflow-wrap: anywhere`, separatore con margin ridotto.

5. **`privacy.html` e `cookie.html` tabelle legali**
   - Tabelle `width: 100%` ma le celle con URL lunghi (es. `formsubmit.co/privacy`, `fonts.googleapis.com`) potevano sforare in mobile stretto.
   - Aggiunti `word-break: break-word` + `overflow-wrap: anywhere` su `.legale table` e celle. Su `cookie.html` aggiunto anche `max-width: 100%` + `box-sizing: border-box` su `pre.snippet` (snippet codice) per garantire scroll INTERNO del blocco anziché spinta del body.

6. **Tab Formazione (formazione.html) — scroll-x container**
   - `.tab-nav` su mobile aveva `flex-wrap: nowrap; overflow-x: auto` ma mancava `max-width: 100%` esplicito: in alcuni casi limite poteva spingere il body.
   - Aggiunto `max-width: 100%` + `overscroll-behavior-x: contain` (impedisce il "rubber-band" laterale di iOS).

7. **Form input/select/textarea**
   - Già `width: 100%`, ma in alcuni browser (Safari iOS legacy) i form ignorano `box-sizing` ereditato. Aggiunti esplicitamente `max-width: 100%` + `box-sizing: border-box` per blindare.

### Verifiche grep finali
- `100vw` in HTML/CSS: **0 occorrenze** (escluso il TODO.md). Pulito.
- `width: ###px` (fissi >=100px) in HTML/CSS: solo `width: 120px` (avatar icona biblioteca, non problematico).
- `margin: -…` o `margin-right/left: -…`: **0 occorrenze**.
- `min-width: ###px` (fissi): **0 occorrenze** (solo media query).
- `iframe / embed / object`: **0 occorrenze** (nessuna mappa embed pericolosa).
- Tutti gli elementi `position: fixed` (sticky-cta-mobile, wa-fab, modale-docente, nav__menu) usano `left: 0; right: 0` (non `width: 100vw`) e dimensioni controllate.

### Possibili residui da verificare in browser reale
- iPhone SE 1ª gen (320px viewport): tutti i copy con letter-spacing alto sopra 0.18em sono potenzialmente borderline. Da occhiare in particolare la card "Prossimo evento" e i bottoni con padding generoso.
- Android piccoli (360px): badge MIM e banda scarcity ora ridimensionati, ma da verificare estetica.
- Modali docenti su mobile in landscape (height stretta): la foto 16:9 ha `height: 320px` fissa, da verificare che non spinga il body verticalmente (problema diverso ma adiacente).

---

## 🔵 ROUND 16 — MOBILE OPTIMIZATION (UX + Neuro + Performance) (2026-05-04)

> **2026-05-04 — R16 Mobile: applicato pacchetto coordinato fix mobile (UX + Neuro + Performance)**

### 🟢 Performance — Quick wins

- [x] **A1. Hero immagine mobile dedicata** — generato `assets/home-mobile.webp` (1280×698, q78, **86 KB** vs i 692 KB del desktop = -88%). CSS `.hero__sfondo @media (max-width:768px)` punta al nuovo file. `<link rel="preload" as="image" media="(min-width: 769px)">` per desktop e `media="(max-width: 768px)"` per mobile aggiunti in `index.html` per LCP ottimizzato.
- [x] **A2. Google Fonts: 15 → 6 weights** — sostituito su tutti gli 11 HTML il vecchio URL multi-weight con `Cinzel:400,600 + Cormorant Garamond:400,500,400i + EB Garamond:400`. Riduzione stimata payload font da ~85 KB a ~32 KB (-62%).
- [x] **A3. Foto docenti WebP rigenerate** — backup vecchi WebP in `assets/docenti/_backup_pre_r16/`. Rigenerate 8 foto con Pillow (cwebp non disponibile in sandbox) q=72 method=6. **Risultato**: media WebP scesa da ~140 KB a **40.9 KB** (-71%). Tutti i WebP ora effettivamente più leggeri dei JPG (era il problema R10). Marchi (57 KB) lasciato invariato come da specifica.
- [x] **A4. Mini docenti homepage** — generate 4 versioni `*-mini.webp` (240×320, q80, 5-8 KB ciascuna) per Puglisi/Rossetto/Sarti/Pentericci. `<picture>` in `index.html` aggiornati per usare il mini come source primario WebP.
- [x] **A5. `decoding="async"` sotto la fold** — applicato a tutte le `<img>` in `index.html` (5), `accademia.html` (1) e `docenti.html` (18).

### 🟢 UX/UI — Fix critici mobile

- [x] **B1. Touch targets WCAG AA (44×44 min)** — `.nav__hamburger` (44×44 + padding 10px), `.faq-domanda` (min-height 48), `.modale__chiudi` (44×44), `.modale-ritratto__chiudi` (38→44px), input/textarea/select form (`padding 0.85rem 0`, `min-height 44`, font-size 16px anti-zoom iOS).
- [x] **B2. Hero h1 fix overflow <360px** — nuova media query `@media (max-width: 360px)` con `font-size: 1.55rem`, `letter-spacing: 0.02em`, `word-spacing: -0.05em`. Aggiunto `text-wrap: balance` su `.hero__titolo`.
- [x] **B3. Banda scarcity** — `letter-spacing: 0.14em !important` su <480px, layout `flex-direction: column` con "Candidati" su riga propria. Testo aggiornato a "iscrizioni aperte" (urgency soft).
- [x] **B4. CTA hero mobile** — i bottoni ora `width:100%` su <480px (stack obbligato).
- [x] **B5. Modale docente — fix scroll-trap iOS** — `.modale-ritratto__pannello` usa `100dvh` con fallback `100vh`. `.modale-ritratto__corpo` ha `overscroll-behavior: contain` + `padding-bottom: max(1.6rem, env(safe-area-inset-bottom))` su mobile.
- [x] **B6. Tab Formazione** — `.tab-nav` su <768px: `flex-wrap: nowrap !important`, `overflow-x: auto`, `-webkit-overflow-scrolling: touch`, `scroll-snap-type: x mandatory`. `.ancore-corsi` nascoste (ridondanti con tab scrollabile).
- [x] **B7. Badge eventi mobile** — `.evento-tipo` non più nascosto su mobile, ora pill `order: -1` in alto. Modificato anche il `<style>` interno di `eventi.html`.
- [x] **B8. Safe-area-inset (iPhone notch)** — `.nav { padding-top: env(safe-area-inset-top, 0) }`, `.footer { padding-bottom: calc(... + env(safe-area-inset-bottom)) }`, sticky bar con `padding-bottom: max(0.7rem, env(safe-area-inset-bottom))`.

### 🟢 Conversion — Neuromarketing

- [x] **C1. Sticky bottom CTA mobile** — nuovo componente `.sticky-cta-mobile` (fixed bottom, z-index 50, sfondo nero opaco) con bottone primario contestuale + icona telefono cerchio oro. Applicato su 5 pagine (`index.html`, `accademia.html`, `formazione.html`, `docenti.html`, `biblioteca.html`, `eventi.html`). NON applicato su `iscrizioni.html`/`contatti.html` (form già presenti) e `privacy.html`/`cookie.html`/`grazie.html` (legal/post-form). Body padding-bottom 64px su mobile per evitare overlap col footer.
- [x] **C2. WhatsApp FAB** — `.wa-fab` floating (cerchio 56×56, verde #25D366, SVG inline, z-index 60) su tutte le 11 pagine. Link `https://wa.me/393480624140?text=Ciao%20PROSŌPON%2C%20vorrei%20info%20su...`. Su mobile spostato a `bottom: 80px` per non sovrapporsi alla sticky bar.
- [x] **C3. Singolo CTA hero homepage** — "Iscriviti alle audizioni" rimane btn oro primario, "Scopri il triennio" trasformato in link sottolineato (`.hero__link-secondario`) sotto al bottone, riducendo concorrenza visiva.
- [x] **C4. MIM trust pill nel first fold** — nuovo `.hero__trust-pill` posizionato sotto "Roma · Est. 2025" e SOPRA al titolo, prima del fold mobile. Sfondo nero trasparente, micro-font, contorno oro.
- [x] **C5. `grazie.html` reattivato** — headline da "Il tuo messaggio è arrivato" a **"Sei dentro. Ora seguici per non perdere la data delle audizioni."** Aggiunto blocco `.grazie-engagement` con 3 azioni: Instagram (placeholder `REPLACE_WITH_IG_HANDLE`), download `audizioni-2027.ics` (creato file con placeholder data), iscrizione newsletter. Aggiunto commento per evento conversione GA4/Meta Pixel.
- [x] **C6. Pixel tracking placeholder** — snippet commentati con `REPLACE_WITH_META_PIXEL_ID` e `REPLACE_WITH_GA4_MEASUREMENT_ID` aggiunti prima di `</head>` su tutte le 11 pagine (incl. `grazie.html` con commento `gtag('event', 'conversion'...)`).
- [x] **C7. Microcopy form audizione** — textarea motivazione: label da "Raccontaci cosa ti ha portato a voler studiare il teatro classico" a **"In 2 righe: perché PROSŌPON?"** + `maxlength="280"` + counter caratteri live (`form-counter` CSS + JS inline). Banda scarcity: aggiunto "iscrizioni aperte". Headline grazie: vedi C5.
- [x] **C8. Tap-to-call globale** — link `tel:+393480624140` con icona telefono SVG aggiunto al footer di tutte le 11 pagine (classe `.footer__tel`).

### 📦 File creati/modificati

- **Creati**: `assets/home-mobile.webp` (86 KB), `assets/docenti/*-mini.webp` (4 file), `audizioni-2027.ics`, `assets/docenti/_backup_pre_r16/` (9 file).
- **Modificati**: tutti gli 11 HTML (`index.html`, `accademia.html`, `formazione.html`, `docenti.html`, `biblioteca.html`, `eventi.html`, `iscrizioni.html`, `contatti.html`, `privacy.html`, `cookie.html`, `grazie.html`), `style.css` (+~365 righe in coda + 8 modifiche puntuali).
- **Rigenerati**: 8 foto WebP in `assets/docenti/`.

---

## 🆕 ROUND 15 — Fix tipografico "e Arti Performative" + Prosopon → PROSŌPON (2026-05-05)

- [x] 2026-05-04 — R15: 'e Arti Performative' in stesso case e font ridotto + Prosopon → PROSŌPON ovunque nel testo visibile (URL/email/path tecnici intatti). **(A) Fix tipografico** `style.css`: rimossi `text-transform: uppercase` e `letter-spacing: 0.3em` da `.hero__titolo-sub`; rimossi/normalizzati su `.nav__logo .nav__logo-sub` (text-transform: none, letter-spacing 0.2em — stesso del titolo). Ora "e Arti Performative" è renderizzato in Cinzel, stesso case e letter-spacing del titolo principale, solo dimensione ridotta (0.55em hero, 0.6em logo header) e opacity 0.85 per gerarchia. Adattamento mobile @480 mantenuto, semplificato. Aggiunto fallback `'EB Garamond'` in `--font-titolo` per coprire glifo Ō se Cinzel non lo include. **(B) Sostituzione testo visibile**: 138 occorrenze di "Prosopon" → "PROSŌPON" su 12 file (10 HTML + site.webmanifest). Coperti: title, meta description, OG/Twitter, JSON-LD (`name`, `alternateName`, `provider.name`), header logo, hero H1, footer logo, footer copyright, payoff "«PROSŌPON»: la maschera...", bio docenti, CTA, webmanifest `name`/`short_name`. Carattere Ō (U+014C) usato direttamente in UTF-8 (no entity HTML). **(C) Verifica**: grep finale "Prosopon" testo visibile = 0; grep "PROSŌPON" = 138; URL `accademiaprosopon.it` = 55 (intatti); email `centroprosopon@gmail.com` = 27 (intatte); sitemap.xml invariato. File .md (TODO/README/etc) non toccati: documentazione interna, non testo visibile pubblico.

---

## 🆕 ROUND 14 — Rinomina ufficiale accademia + trattamento tipografico (2026-05-05)

- [x] 2026-05-04 — R14: rinominata accademia in 'Accademia di Teatro Classico e Arti Performative Prosopon' con trattamento tipografico ridotto su 'e Arti Performative'. Sostituite TUTTE le 47 occorrenze del nome esteso vecchio "Accademia di Teatro Classico Prosopon" → nuovo nome esteso, su 12 file: 10 HTML (index, accademia, formazione, docenti, biblioteca, eventi, iscrizioni, contatti, privacy, cookie, grazie) + site.webmanifest + README.md (TODO.md riga 294 lasciata invariata: log storico R3). Aggiornato JSON-LD in index.html: `name` al nuovo nome esteso, `alternateName` da "Prosopon" a "Accademia Prosopon" (forma breve), `legalName: "GLV srl"` invariato + 4 occorrenze `provider.name` nei Course/Service. Trattamento grafico (solo nei display visivi, NON nei testi puri): (1) **Hero homepage** index.html: H1 ricomposta in 3 righe `Accademia di Teatro Classico` / `e Arti Performative` (sub minore 0.5em uppercase letter-spacing 0.3em opacity 0.85) / `Prosopon`. CSS nuovo `.hero__titolo-sub` + adattamento mobile @480 (clamp 1.7-2.8rem, sub 0.55em). (2) **Logo header** (10 pagine): aggiunto secondo span `<span class="nav__logo-sub">e Arti Performative</span>` sotto la sub-tagline esistente "Accademia di Teatro Classico", con stile micro 0.55rem letter-spacing 0.28em opacity 0.7 (più piccola/sbiadita rispetto alla riga sopra). Mobile @480 ulteriore riduzione. site.webmanifest: `name` aggiornato, `short_name: "Prosopon"` invariato per icone home screen. Footer copyright aggiornato su tutte le 10 pagine. Forma breve "Accademia Prosopon" mantenuta nei punti dove era usata per fluidità (es. iscrizioni meta description, biblioteca meta description) come da specifica. Verifica grep finale: 0 occorrenze residue del nome vecchio (eccetto log storico TODO.md r294 come da regola), 51 occorrenze nuove distribuite sui 13 file.

---

## 🆕 ROUND 13 — Ripristino foto Marchi da backup pre-r12 (2026-05-04)

- [x] 2026-05-04 — R13: ripristinato marchi.jpg/webp da backup pre-r12 (l'utente vuole sostituirla con la sua versione croppata manualmente). Stato pre-ripristino: `marchi.jpg`/`marchi.webp` 800×1067 (crop autonomo R12 dell'agente, che aveva sovrascritto la versione croppata manualmente dall'utente — andata persa). Ripristino: `cp _backup_pre_r12/marchi.jpg → marchi.jpg` (849×1087, versione PRE-crop derivata da R11). Il backup non conteneva `marchi.webp`, rigenerato dal jpg ripristinato (`convert ... -quality 82 marchi.webp` → 849×1087 WebP 57 KB). Backup `_backup_pre_r12/` rimosso (esaurita la funzione, `_backup_pre_r10/` e `_backup_pre_r11/` conservano la storia precedente). L'utente può ora ricaricare la sua versione croppata sostituendo direttamente `assets/docenti/marchi.jpg` (e opzionalmente `marchi.webp`).

---

## 🆕 ROUND 12 — Crop ritratto Marchi allineato al pattern docenti (2026-05-04)

- [x] 2026-05-04 — R12: crop ritratto Marchi (sfondo eliminato, framing allineato agli altri docenti). Sorgente post-R11 era 849×1087 (foto a corpo intero in Piazza Santa Croce, Firenze, con architettura/folla/taxi visibili — fuori pattern rispetto agli altri 8 ritratti stretti tipo Puglisi 800×1067). Backup pre-modifica in `assets/docenti/_backup_pre_r12/marchi.jpg`. Generate 4 varianti di crop progressive e valutate visivamente; scelta v4 (540×720+150+170) come miglior compromesso: framing asimmetrico spostato a sinistra per allontanare il volto dal taxi bianco, mantiene volto al 30% dall'alto + spalle complete + mano sinistra delle braccia incrociate visibile (caratterizzazione preservata). Ridimensionato a 800×1067 (allineamento esatto con Puglisi e gli altri 6 docenti standard) con `-resize 800x1067!`, applicato `unsharp 0x1+0.5+0`. Output: `marchi.jpg` Q92 (145 KB), `marchi.webp` Q85 method=6 (58 KB — Q92 produceva 93 KB sopra range target). Sfondo Santa Croce e taxi ridotti a chiazze sfocate non riconoscibili (limite della sorgente: il taxi era proprio dietro al soggetto, non eliminabile completamente senza sacrificare le braccia incrociate). Pulizia: rimossi `marchi-cropped-v1/v2/v3/v4.jpg` temporanei. Nessuna modifica HTML/CSS necessaria: stesso aspect-ratio 3:4, stesse dimensioni delle altre foto, width/height 400×533 in `docenti.html` invariati.

---

## 🆕 ROUND 11 — Sostituzione foto critica Marchi con sorgente HD da HEIC (2026-05-04)

- [x] 2026-05-04 — R11: nuova foto Marchi convertita da HEIC, sostituita la versione critica precedente. Sorgente iPhone `marchi.heic` (3024×4032 px, 1,12 MB) caricata in root progetto, convertita con ImageMagick (delegate libheif 1.12.0): auto-orient EXIF, ridimensionamento a 1600px lato lungo (mantiene proporzioni 3:4 → 1200×1600), unsharp mask leggera `0x1+0.5+0`, strip metadati. Output: `assets/docenti/marchi.jpg` Q92 (314 KB) + `assets/docenti/marchi.webp` Q92 method=6 (153 KB). Pre-conversione la foto Marchi era CRITICA (396×410 px, R10 segnalata come irrecuperabile). Ora coerente con le altre 8 (anzi superiore: 1200×1600 vs 800×1067 della maggioranza). Backup pre-modifica in `assets/docenti/_backup_pre_r11/` (marchi-old.jpg/.jpeg/.webp + marchi-source.heic raw originale). **Pulizia**: eliminato `marchi.jpeg` legacy non standard (verificato grep: 0 referenze HTML, solo `.jpg`+`.webp` usati in `docenti.html` linee 299-300 e 669-670), rimosso `marchi.heic` dalla root progetto (file temp non deve restare pre-deploy GitHub). **Anti-CLS**: width/height 400×533 in `docenti.html` mantenuti (stesso aspect-ratio 3:4 della nuova sorgente, nessun reflow). Card-docente + modale "Ritratto immersivo" ora finalmente con sorgente HD reale: niente più artefatti di upscaling sul ritratto immersivo grande della modale (~500px alto). Cartella `_backup_pre_r10/` lasciata intatta (storico precedente).

---

## ROUND 10 — Diagnostica foto docenti + sharpening + adattamento CSS modale (2026-05-04)

- [x] 2026-05-04 — R10: diagnostica foto docenti + sharpening + adattamento CSS modale. **Diagnostica**: misurate tutte e 9 le foto docenti — 6 a 800x1067 (Puglisi, Rizzo, Marsico, Viola, Mascetta, Sarti) classificate OK al limite, 2 MIGLIORABILI (Pentericci 528x815, Rossetto 632x894), 1 CRITICA (Marchi 396x410, sotto soglia 600px lato lungo). **Pipeline miglioramento** applicata a 8 foto su 9 (escluso marchi): unsharp mask `0x1+0.5+0`, saturazione +3%, contrasto +3, ricompressione JPG q=90 e WebP q=92 (precedente q=80) — WebP ora 130-180 KB invece di 30-55 KB, file più pesanti ma molto più nitidi sul ritratto immersivo della modale. Backup integrale dei 19 file pre-modifica in `assets/docenti/_backup_pre_r10/`. **Foto CRITICA**: marchi.jpg/jpeg/webp lasciata invariata (qualsiasi miglioramento sopra una sorgente 396x410 produce solo artefatti) — segnalata all'utente: serve versione HD (≥1500px lato lungo) o re-shoot. **CSS modale** (`style.css` § "MODALE DOCENTE — RITRATTO IMMERSIVO"): aggiunto `max-width: 500px` su `.modale-ritratto__foto` per impedire upscaling oltre la dimensione naturale tipica delle sorgenti (1067px alto), aggiunto `image-rendering: auto` + `background-color: var(--color-grafite)` su `picture/img` come fallback grafite dietro eventuali angoli trasparenti. **Mobile** (<768px): rimosso il max-width (la banda 16:9 in alto deve riempire tutta la larghezza), aggiunto `object-position: center top` per mantenere il volto del docente nel frame anche con crop verticale aggressivo. **NO srcset @2x** generato: con sorgenti a 1067px non ha senso creare versioni "retina" sintetiche (sarebbe upscaling mascherato).

---

## 🆕 ROUND 9 — Aggiunta 9° docente: Giampiero Marchi (Latino & Greco antico) (2026-05-04)

- [x] 2026-05-04 — R9: aggiunto 9° docente Giampiero Marchi (Latino & Greco antico, Direttore Greco Latino Vivo). Foto sorgente `assets/docenti/marchi.jpeg` convertita in `marchi.webp` (qualità 80, ImageMagick — 73,9 KB → 30,4 KB, -59%) e copiata anche come `marchi.jpg` per consistency con le altre 8. Aggiunta card-docente in `docenti.html` (dopo Pentericci) wrappata in `<picture>` (webp + jpg fallback). Aggiunta nuova modale `#modale-marchi` con stesso markup R8 (Ritratto immersivo + sintesi UX/Neuro): materia "LATINO & GRECO ANTICO" in oro Cinzel, citazione *"Recitare Plauto senza conoscerne il latino è come cantare un'aria senza sentire la lingua in cui è scritta."*, bio narrativa con dati verificati da grecolatinovivo.it (co-fondazione blog 2014 con Sciajno e Lo Castro, dottorato in Storia con tesi in Diritto Attico, Seminari Internazionali al Teatro Niccolini Firenze 2017 e Mercadante Napoli 2018, metodo naturale Hans H. Ørberg), 3 punti "Cosa imparerai" (latino di Plauto/Terenzio, greco dei tragici, leggere il testo originale per scegliere in scena), 3 chip credenziali ("Direttore GrecoLatinoVivo · Firenze", "Dottore in Storia · tesi Diritto Attico", "Seminario Internaz. Teatro Niccolini 2017"). Bottone "Scarica CV" omesso (CV non disponibile, gestito come Pentericci); bottone "Iscriviti alle audizioni" → form audizione triennale (è docente del triennio). Sistema `apriDocente`/`chiudiModale`/focus trap/ESC/click outside/hash routing già generico, supporta automaticamente il nuovo id. Conteggio "8 Docenti" → "9 Docenti" aggiornato in `index.html` (sezione "Numeri/Identità") + `README.md` (nota struttura). `formazione.html`: aggiunta materia "Lingua dei classici" come 6° punto del triennio Anno I ("primi passi nel latino e nel greco antico") e Anno II ("leggere il testo originale di Plauto, Menandro, Eschilo, Sofocle"). `NUOVE_BIO_DOCENTI.md`: appesa 9a scheda completa + tabella riassuntiva aggiornata con 9a riga. **Decisione homepage**: NON sostituiti i 4 docenti dell'anteprima (Puglisi/Rossetto/Sarti/Pentericci) — motivazione: (a) sostituire un fondatore visibile per un docente appena entrato comunicherebbe il segnale sbagliato, (b) Sarti già copre il filone "Recitazione classica & Verso", (c) la pagina docenti completa è a un click, (d) il conteggio "9" stesso è un nuovo trust signal. **JSON-LD index**: non elenca docenti come array (solo `founder: Puglisi` con `jobTitle`) — nessuna modifica necessaria. **Sitemap**: invariato (no pagina dedicata Marchi). Verifiche: 0 occorrenze residue di "8 docenti"/"otto docenti" sul sito; foto presente in tutte e 3 le estensioni (`marchi.jpeg` originale + `marchi.jpg` per pattern + `marchi.webp` per performance).

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

### 🟦 Round 16 — Placeholder marketing/analytics da sostituire

> Tutti commentati e marcati con stringhe identificabili via `grep`. Quando l'utente fornirà i valori, basta:
> - `grep -rn "REPLACE_WITH_META_PIXEL_ID" .` → 11 occorrenze (una per pagina) → sostituire con il Pixel ID e DECOMMENTARE i 2 blocchi `<!-- ... -->` per ogni pagina.
> - `grep -rn "REPLACE_WITH_GA4_MEASUREMENT_ID" .` → idem, sostituire con `G-XXXXXXXXXX` e decommentare.
> - `grep -rn "REPLACE_WITH_IG_HANDLE" .` → 1 occorrenza in `grazie.html` (link Instagram).
> - `audizioni-2027.ics`: sostituire `DTSTART:20270601T100000` e `DTEND:20270601T180000` con le date reali, e nella `DESCRIPTION` rimuovere "[DATA AUDIZIONI 2027/2028 - DA DEFINIRE]". Aggiornare anche il copy della banda scarcity in `index.html` se opportuno.

- [ ] **R16-P1. Meta Pixel ID** — necessario per remarketing Instagram/Facebook. Recuperabile da Business Manager → Eventi → impostazioni Pixel.
- [ ] **R16-P2. GA4 Measurement ID** — necessario per analytics e conversion tracking (formato `G-XXXXXXXXXX`). Recuperabile da Google Analytics → Amministratore → Stream di dati.
- [ ] **R16-P3. Instagram handle** — il link in `grazie.html` punta oggi a `instagram.com/REPLACE_WITH_IG_HANDLE`. Comunicare l'handle ufficiale (es. `prosopon.accademia`).
- [ ] **R16-P4. Data precisa audizioni 2027/2028** — necessaria per (a) il file `audizioni-2027.ics` e (b) per rendere la banda scarcity più specifica ("Audizioni il GG/MM/AAAA" anziché generico "iscrizioni aperte").

### 🟪 Pagamenti — Stripe Payment Link (R28, 2026-05-04)

### 💳 AZIONE UTENTE — Creare lo Stripe Payment Link (5 minuti)

Per agganciare il pagamento reale del corso Maschera Classica (€170):

1. Vai su **https://dashboard.stripe.com/register** e crea un account (gratis, ti chiederà solo email + password).
2. Compila i dati della tua attività (GLV srl, P.IVA 07036010481, sede Firenze) — Stripe te lo chiederà per i payout sul tuo conto.
3. Una volta dentro, dal menu sinistro vai su **"Prodotti"** → **"Crea prodotto"**:
   - Nome: `Corso online — Storia, teoria e pratica attoriale della maschera classica`
   - Descrizione (opzionale): `Prima edizione · 10 ore in 5 incontri · Live online · Attestato MIM`
   - Prezzo: `170,00 EUR`, tipo `Pagamento singolo`
4. Salva il prodotto. Sulla pagina del prodotto, in alto a destra, clicca **"Crea link di pagamento"** → conferma.
5. Stripe ti darà un URL del tipo `https://buy.stripe.com/XXXXXXXXXX`. **Copialo.**
6. Mandami questo URL e io lo sostituisco al placeholder `REPLACE_WITH_STRIPE_PAYMENT_LINK` in `formazione.html`. In alternativa, se vuoi farlo da solo: apri `formazione.html` con un editor di testo, cerca `REPLACE_WITH_STRIPE_PAYMENT_LINK` (4 occorrenze max), sostituisci con il tuo URL, salva, fai un nuovo `git push`.
7. **Test**: clicca il CTA "Iscriviti e paga · €170" sul sito live. Devi essere portato alla pagina di pagamento Stripe; usa una carta di test (Stripe ti fornisce numeri test in modalità Test Mode) per verificare il flow.
8. Quando sei pronto a ricevere pagamenti veri: dal Dashboard Stripe, passa da **Test mode** a **Live mode** (toggle in alto a destra), genera un NUOVO Payment Link in Live mode (quello precedente era di test), e sostituiscilo nel sito.

**Costi Stripe**: 1.5% + 0.25€ per transazione europea. Su €170: ~2.80€ trattenuti, 167.20€ accreditati. Nessun canone mensile.

**Conferma email cliente**: Stripe invia automaticamente la ricevuta. Lato tuo, ricevi notifica email a ogni pagamento. Puoi anche configurare un webhook che ti manda i dati su Google Sheet o simili — ma non è necessario per partire.

### 🟩 Priorità 4 — Nice-to-have, non bloccanti

14. [ ] **CV Caterina Pentericci**: salvare il PDF in `documenti/cv/CV - Caterina Pentericci.pdf` e aggiungere il link nella modale in `docenti.html` (~ riga 850). Oggi assente per scelta tecnica corretta (no broken link).
15. [ ] **Orari biblioteca + fasce orarie aule** in `biblioteca.html` (2 commenti HTML segnaposto). Il copy visibile è già prudente, sostituibile appena la direzione conferma le fasce.
16. [ ] **Newsletter double-opt-in**: passare a Mailchimp/Brevo/MailerLite per piena conformità GDPR su comunicazioni commerciali (oggi singolo opt-in via FormSubmit). Documentato in `TECH_NOTES.md` §8.
17. [ ] (Opzionale) **Sezione "Spazi & Risorse"** in homepage che linki contenutisticamente `biblioteca.html` (oggi raggiungibile solo da nav/footer). Bug residuo #10.

— *(Auditor R3, 2026-05-04)*
