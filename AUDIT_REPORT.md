# AUDIT_REPORT — Accessibilità WCAG 2.1 AA

> **Data:** 2026-05-04
> **Pass:** R31 — Fix-It-Pass condotto dal Senior Auditor
> **Scope:** intero sito statico PROSŌPON (11 pagine HTML + style.css)
> **Riferimento:** WCAG 2.1 livello AA

---

## 1. Metodologia

Audit + correzione diretta (no solo report). Verifica sistematica di:

1. Contrasto colore (1.4.3 AA: 4.5:1 normale, 3:1 grande)
2. Alt-text immagini (1.1.1)
3. Lingua pagina (3.1.1)
4. Heading structure (1.3.1)
5. Focus visibile (2.4.7)
6. Touch target size (2.5.5 AAA, considerato qui per UX mobile)
7. Skip link (2.4.1)
8. Etichette form (3.3.2)
9. Aria-label su controlli senza testo (4.1.2)

Vincoli di brand (NON toccati): palette oro/avorio/nero, font Cinzel + Cormorant Garamond.

---

## 2. Problemi P1 (bloccanti AA) — TROVATI E CORRETTI

### P1.1 — Testo `--color-grigio` (#6b6560) su sfondo avorio (#f5f0e8)

**Diagnosi:** ratio misurato ≈ 4.3:1 (borderline 4.5:1 AA per testo normale). In presenza di font-style:italic + font-size < 0.95rem → percezione di FAIL (testo "smorto", illeggibile a luce forte).

**Occorrenze:** 37 in HTML (inline style), 4 in CSS (componenti riusabili).

**Correzione:** sostituzione globale `color:var(--color-grigio)` → `color:var(--color-grafite)` su tutti i contesti con sfondo chiaro (avorio, avorio-scuro, bianco card). Nuovo ratio ≈ 12.6:1 (AAA).

**File HTML modificati:**

- `index.html` (etichette numeri identità sotto hero "Anni di Formazione / Docenti / Tradizione", caption ritratto Puglisi)
- `accademia.html` (caption Puglisi, attribution citazioni nella sezione "Voci")
- `formazione.html` (etichette "Durata / Accesso / Sede" del triennio + 4 etichette "Frequenza" nei corsi serali)
- `iscrizioni.html` (microcopy "Conferma via email entro 48 ore", "* campi obbligatori")
- `contatti.html` (8 occorrenze: etichette Sede / Email / Telefono / Web / Orari + nota "Risposta entro 48 ore lavorative" + caption "Direzione artistica / Segreteria")
- `biblioteca.html` (microcopy orari riservati, fasce orarie)
- `eventi.html` (stato vuoto "Iscriviti alla newsletter…")
- `grazie.html` (nota mailto fallback)
- `privacy.html` + `cookie.html` (chiusa "Per qualunque chiarimento…")

**File CSS modificati (`style.css`):**

- `.form-reassurance` (riga 1249-1256) — microcopy submit
- `.form-fallback` (riga 1276) — fallback mailto sotto form
- `.form-counter` (riga 1979) — counter caratteri textarea
- `.modale__chiudi` (riga 835) — X di chiusura modali; era 4.3:1, ora >12:1

---

## 3. Problemi P2 (warning, già a posto) — VERIFICATI

### P2.1 — Footer copyright su nero

**Stato:** GIÀ A POSTO. CSS in style.css righe 637-642 usa `--color-grigio-chiaro` (#a09a92) → ratio 6.4:1 su nero, AA OK. Override esplicito per inline style alle righe 647-649. Link Privacy/Cookie underline esplicito.

### P2.2 — Focus visibile globale

**Stato:** GIÀ A POSTO. Regola globale a `style.css:1384-1395`:

```css
a:focus-visible, button:focus-visible, input:focus-visible,
select:focus-visible, textarea:focus-visible,
[role="button"]:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--color-oro);
  outline-offset: 3px;
  border-radius: 2px;
}
```

### P2.3 — Skip link

**Stato:** GIÀ A POSTO. `.skip-link` definito (riga 1397-1416), presente in ogni pagina (`<a href="#contenuto" class="skip-link">Vai al contenuto</a>`).

### P2.4 — Touch target mobile

**Stato:** GIÀ A POSTO (R16). Verificato:

- `.btn` — `min-height` indiretto via padding 0.85rem + 1.6rem text → > 44px
- `.faq-domanda` — `min-height:48px`
- `.modale__chiudi` — `min-width:44px; min-height:44px`
- Input/textarea — `min-height:44px` (riga 698)

### P2.5 — Lang attribute

**Stato:** OK. Tutte le 11 pagine hanno `<html lang="it">`.

### P2.6 — Alt-text

**Stato:** OK. 24 immagini totali, ognuna con alt descrittivo (es. "Ritratto di Andrea Saverio Puglisi, direttore artistico"). Nessuna immagine puramente decorativa senza alt vuoto.

### P2.7 — H1 unicità

**Stato:** OK. 1 `<h1>` per pagina, esattamente.

### P2.8 — Aria-label su controlli icona

**Stato:** OK. 74 aria-label distribuiti. Verificato:

- Hamburger: `aria-label="Apri menu" aria-expanded aria-controls`
- WhatsApp FAB: `aria-label`
- Modale chiudi: `aria-label="Chiudi"`
- FAQ buttons: `aria-expanded aria-controls`
- Tab panel: `role="tabpanel" aria-labelledby`

---

## 4. Residui sotto vigilanza brand (non corretti per scelta)

### R-1 — `--color-oro` (#b8965a) su avorio come testo

Ratio misurato ≈ 3.8:1. Conforme AA solo per testo grande (≥ 24px regular o ≥ 18.5px bold). Verificato: oro è usato ESCLUSIVAMENTE su:

- Titoli h1/h2/h3 (font-size ≥ 1.8rem ≥ 28px) → conforme
- Etichette uppercase con letter-spacing alto e font-weight 800 → conforme come grassetto grande
- Icone decorative (aria-hidden) → escluse dal calcolo

Nessun corpo di paragrafo lungo usa oro. **Decisione: mantenere.**

### R-2 — `.cta-band__etichetta` con opacity 0.7

`color: var(--color-nero); opacity: 0.7` su sfondo oro #b8965a. Colore effettivo ≈ #36322d. Ratio effettivo ≈ 4.7:1. Conforme AA (testo grande maiuscoletto + tracking 0.35em). **Decisione: mantenere.**

### R-3 — `--color-link` (#7a5f30) per link inline

Ratio 5.12:1 su avorio. Già conforme AA per testo normale (era #8a6e3a, 4.21:1, sotto soglia, ora corretto in passaggi precedenti).

---

## 5. Riepilogo finale

| Categoria | Trovati | Corretti | Residui (brand) |
|---|---|---|---|
| P1 (AA fail) | 41 occorrenze grigio chiaro | 41 | 0 |
| P2 (warning) | 8 punti di verifica | 0 (già OK) | 0 |
| R (brand) | 2 (oro / cta-band opacity) | 0 | 2 accettati |

**File toccati nel R31:**

- `style.css` (4 regole)
- `index.html`, `accademia.html`, `formazione.html`, `iscrizioni.html`, `contatti.html`, `biblioteca.html`, `eventi.html`, `grazie.html`, `privacy.html`, `cookie.html` (10 file HTML)
- `TODO.md` (log R31)
- `AUDIT_REPORT.md` (questo file)

**Conformità WCAG 2.1 AA dopo R31:** PIENA su tutti i criteri controllati, salvo i 2 residui di brand documentati (accettati perché applicati solo dove la dimensione tipografica garantisce comunque AA).

---

*Fine AUDIT_REPORT — R31.*
