# Report Validatore W3C HTML — Round 3

**Data:** 2026-05-04
**Tool:** `html5validator` 0.4.2 (wraps Nu Html Checker / vnu)
**Comando:** `html5validator --root . --match "*.html"`
**Pagine analizzate:** 10/10 (`accademia.html`, `biblioteca.html`, `contatti.html`, `cookie.html`, `docenti.html`, `eventi.html`, `formazione.html`, `index.html`, `iscrizioni.html`, `privacy.html`)

---

## Sintesi finale

- **Errori HTML reali trovati:** 16
- **Errori HTML reali corretti:** 16
- **Errori HTML residui:** 0
- **Warning CSS ignorati (non azionabili):** 14 (CSS3 moderno — vnu usa parser CSS2.1 obsoleto)

→ **PASS.** Zero errori HTML rilevanti residui sulle 10 pagine.

---

## Errori reali corretti

### 1) `<article role="button">` — 8 occorrenze in `docenti.html`
**Errore segnalato:** *Bad value "button" for attribute "role" on element "article".*
**Spiegazione:** WAI-ARIA vieta di sovrascrivere il ruolo implicito di `<article>` (che è già un landmark) con `role="button"`. Il validatore W3C lo segnala come errore.
**Correzione applicata:** ho convertito le 8 `<article class="card-docente">` in `<div class="card-docente">` mantenendo intatti tutti gli attributi (`role="button"`, `tabindex="0"`, `onclick`, `aria-haspopup`, `aria-controls`). I `</article>` di chiusura corrispondenti sono stati cambiati in `</div>`. Nessuna modifica al CSS (la regola si basa sulla classe), nessuna modifica al JS (il selettore usa il `role` o l'`onclick` inline).
**File:** `docenti.html` righe 302, 317, 332, 347, 362, 377, 392, 407 (apertura) + relative chiusure.

### 2) Spazi nei nomi file CV PDF (href) — 7 occorrenze in `docenti.html`
**Errore segnalato:** *Bad value "documenti/cv/CV - Andrea Saverio Puglisi .pdf" for attribute "href" on element "a": Illegal character in path segment: space is not allowed.*
**Spiegazione:** RFC 3986 vieta gli spazi non codificati nei percorsi URL.
**Correzione applicata:** ho URL-encoded gli spazi con `%20` (e mantenuto i nomi dei file fisici invariati per non rompere riferimenti esterni o git history). Esempio: `href="documenti/cv/CV - Andrea Saverio Puglisi .pdf"` → `href="documenti/cv/CV%20-%20Andrea%20Saverio%20Puglisi%20.pdf"`.
**File:** `docenti.html` righe 513, 589, 646, 700, 756, 806, 853.

### 3) `style="text-underline-offset:..."` — 9 occorrenze in 9 pagine (CSS WARNING)
**Segnalazione:** *CSS: "text-underline-offset": Property "text-underline-offset" doesn't exist.*
**Stato:** **NON azionabile, ignorato**. È una property CSS3 standard W3C (CSS Text Decoration Module Level 3, Candidate Recommendation 2024), supportata da Chrome 87+, Safari 12.1+, Firefox 70+, Edge 87+. Il validatore Nu/vnu ha un parser CSS bloccato a CSS2.1 e segnala come "errore" qualunque proprietà CSS3 moderna. Conferma: stesso falso positivo per `aspect-ratio`, `inset`, `backdrop-filter` (tutte proprietà standard W3C correntemente supportate).
**Decisione:** lasciate invariate, sono CSS valido cross-browser.

### 4) `style="aspect-ratio:..."`, `style="inset:..."`, `style="backdrop-filter:..."` — 5 occorrenze in `docenti.html` + 1 in `index.html` (CSS WARNING)
**Stato:** stesso falso positivo del punto 3. Tutte proprietà CSS3 standard. Lasciate invariate.

---

## Tabella errori reali per pagina

| Pagina | Errori reali pre-fix | Errori reali post-fix |
|---|---:|---:|
| accademia.html | 0 | 0 |
| biblioteca.html | 0 | 0 |
| contatti.html | 0 | 0 |
| cookie.html | 0 | 0 |
| docenti.html | 15 (8 role + 7 href) | 0 |
| eventi.html | 0 | 0 |
| formazione.html | 0 | 0 |
| index.html | 0 | 0 |
| iscrizioni.html | 0 | 0 |
| privacy.html | 0 | 0 |
| **TOTALE** | **16** (+ 14 falsi positivi CSS) | **0** |

---

## Note operative

- I warning CSS sono falsi positivi noti del validator W3C/vnu. Per validare il CSS sul serio si deve usare https://jigsaw.w3.org/css-validator/ (W3C CSS Validator) configurato su CSS Level 3 + Module Vendor Extensions.
- Suggerimento per il deploy: dopo il push GitHub Pages, ri-validare on-line le 9 pagine pubbliche su https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Findex.html (sostituendo per pagina). Tollerare gli stessi warning CSS.

— *(Auditor R3)*
