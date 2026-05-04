# Validazione live W3C — Accademia Prosopon

> Strumenti operativi per validare HTML e CSS **dopo** il deploy su GitHub Pages,
> contro i validator ufficiali W3C (vnu per HTML, Jigsaw per CSS).
> Generato dalla pass DevOps R4 il 2026-05-04.

**Convenzione URL** — In tutti i link sotto, `https://www.accademiaprosopon.it`
è il placeholder del dominio canonical. Se il dominio reale è diverso, sostituiscilo
con un find/replace (es. `sed -i '' 's|www.accademiaprosopon.it|tuo-dominio.tld|g' VALIDAZIONE_LIVE.md` su macOS).

---

## 1. Validazione manuale rapida (10 link diretti)

Apri ogni link nel browser e controlla che il contatore errori sia **0**.
Eventuali warning su proprietà CSS3 moderne (vedi §4) sono **falsi positivi noti** del parser CSS interno di vnu — la fonte di verità per il CSS è Jigsaw (link sotto).

### HTML — vnu validator (Nu Html Checker)

| # | Pagina | Link diretto al validator |
|---|--------|---------------------------|
| 1  | `index.html`       | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Findex.html       |
| 2  | `accademia.html`   | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Faccademia.html   |
| 3  | `formazione.html`  | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Fformazione.html  |
| 4  | `docenti.html`     | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Fdocenti.html     |
| 5  | `biblioteca.html`  | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Fbiblioteca.html  |
| 6  | `eventi.html`      | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Feventi.html      |
| 7  | `iscrizioni.html`  | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Fiscrizioni.html  |
| 8  | `contatti.html`    | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Fcontatti.html    |
| 9  | `privacy.html`     | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Fprivacy.html     |
| 10 | `cookie.html`      | https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.accademiaprosopon.it%2Fcookie.html      |

### CSS — W3C CSS Validator (Jigsaw)

Profilo richiesto dall'utente (CSS Level 3 + SVG, tolleranza alle vendor extensions):

> https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fwww.accademiaprosopon.it%2Fstyle.css&profile=css3svg&vextwarning=true&warning=1

Cosa significano i parametri:

- `profile=css3svg` → CSS Level 3 con estensioni SVG (è il profilo più ampio e moderno disponibile su Jigsaw).
- `vextwarning=true` → vendor extensions (`-webkit-`, `-moz-`, `-ms-`) trattate come **warning** invece che come errori. Indispensabile dato che `style.css` usa `-webkit-font-smoothing`, `-webkit-overflow-scrolling`, `-webkit-appearance`.
- `warning=1` → mostra anche warning dettagliati (ti permette di valutarli, non bloccano il pass).

---

## 2. Validazione automatica (script `validate-deploy.sh`)

In root del repo è stato generato lo script `validate-deploy.sh`. Fa esattamente quello che faresti a mano sopra, ma in batch e con exit code parsabile da CI/Make.

### Setup una tantum

```bash
chmod +x validate-deploy.sh

# Consigliato (ma non obbligatorio): jq per parsing JSON puntuale
brew install jq        # macOS
# oppure: sudo apt install jq    (Linux)
```

### Uso normale

```bash
# 1) Default: usa BASE_URL=https://www.accademiaprosopon.it
./validate-deploy.sh

# 2) Override del dominio (utile se il sito vive ancora su github.io o staging)
BASE_URL="https://username.github.io/repo" ./validate-deploy.sh

# 3) In CI / pre-push hook
if ./validate-deploy.sh; then
  echo "Pass W3C: posso pushare."
else
  echo "Errori reali — leggi sopra prima di pushare."
  exit 1
fi
```

### Output atteso (sito pulito)

```
========================================================
  Validazione live W3C — Accademia Prosopon
========================================================
Base URL: https://www.accademiaprosopon.it
Pagine:   10
Tool:     vnu (HTML) + Jigsaw (CSS, profile=css3svg, vextwarning=true)

--- HTML ---
Endpoint vnu: https://validator.w3.org/nu/

  [ OK ] index.html  (warn: 0)
  [ OK ] accademia.html  (warn: 0)
  ...
  [ OK ] cookie.html  (warn: 0)

--- CSS ---
Endpoint Jigsaw: https://jigsaw.w3.org/css-validator/validator
Profilo: css3svg + vextwarning=true (tollera vendor prefix accettabili)
  [ OK ] style.css  (warn: 0)

========================================================
  Riepilogo
========================================================
TUTTO OK. 10 pagine HTML + style.css passano i validator W3C.
```

### Output con errori

```
  [FAIL] docenti.html  (errors: 2, warn: 1)
         · Bad value "..." for attribute "..." (line 314)
         · ...
...
TROVATI ERRORI su 1 target (errori totali: 2):
  - docenti.html
```

Exit code: `0` se tutto pulito, `1` se almeno una pagina o il CSS ha errori reali, `2` se mancano dipendenze (curl).

---

## 3. Cosa fare se trovi errori reali

1. **Identifica la pagina e la riga** dall'output dello script (o aprendo il link manuale §1).
2. **Apri il file localmente** (`code formazione.html` ecc.) e correggi.
3. **Ri-deploy** (push su `main` se GitHub Pages è collegato a `main`).
4. **Aspetta 1-2 minuti** per la propagazione GitHub Pages, poi rilancia `./validate-deploy.sh`.
5. **Loop** finché non torna verde.

Per il CSS valgono le stesse regole, con due caveat operativi:

- Se l'errore è su una proprietà CSS3 moderna (es. `gap` su flex era flag fino a poco fa, oggi pieno standard) **rileggi prima §4 — falsi positivi noti**: spesso non è errore.
- Jigsaw cacha le risposte ~5 minuti. Se hai appena ridepositato un fix CSS e Jigsaw mostra ancora l'errore vecchio, aspetta o aggiungi `?...&v=2` (qualsiasi querystring extra) per forzare un re-fetch.

---

## 4. Falsi positivi noti (non sono errori)

Il validator vnu per HTML include un mini-parser CSS bloccato a CSS Level 2.1: qualunque proprietà introdotta in CSS3+ viene segnalata come *"Property X doesn't exist"* nel campo `style="..."` o nei blocchi `<style>` inline. **Sono warning ignorabili**: la fonte di verità per il CSS è Jigsaw con profilo `css3svg`.

Proprietà ricorrenti che vnu segnala falsamente (tutte standard W3C, supportate cross-browser):

| Proprietà | Modulo CSS3 di riferimento | Supporto reale |
|---|---|---|
| `text-underline-offset`     | CSS Text Decoration Module Level 4   | Chrome 87+, Safari 12.1+, Firefox 70+, Edge 87+ |
| `text-decoration-thickness` | CSS Text Decoration Module Level 4   | Chrome 89+, Safari 12.1+, Firefox 70+, Edge 89+ |
| `text-decoration-color`     | CSS Text Decoration Module Level 3   | Tutti i browser moderni |
| `aspect-ratio`              | CSS Box Sizing Module Level 4         | Chrome 88+, Safari 15+, Firefox 89+, Edge 88+   |
| `inset`                     | CSS Logical Properties Level 1        | Chrome 87+, Safari 14.1+, Firefox 66+, Edge 87+ |
| `backdrop-filter`           | Filter Effects Module Level 2         | Chrome 76+, Safari 9+ (`-webkit-`), Firefox 103+, Edge 79+ |
| `gap` (su flex)             | CSS Box Alignment Module Level 3      | Tutti i browser moderni                          |
| `clamp()` / `min()` / `max()` | CSS Values and Units Module Level 4 | Chrome 79+, Safari 13.1+, Firefox 75+, Edge 79+ |
| `scroll-behavior`           | CSSOM View Module                     | Tutti i browser moderni                          |
| `object-fit`                | CSS Images Module Level 3             | Tutti i browser moderni                          |
| Custom properties (`--var`) | CSS Custom Properties Module Level 1  | Tutti i browser moderni                          |
| `:focus-visible`            | Selectors Level 4                     | Chrome 86+, Safari 15.4+, Firefox 85+, Edge 86+ |
| `prefers-reduced-motion`    | Media Queries Level 5                 | Tutti i browser moderni                          |
| `-webkit-font-smoothing`    | Vendor extension (Safari/Chrome)      | Webkit-based browsers                            |
| `-webkit-overflow-scrolling`| Vendor extension (iOS Safari)         | iOS Safari                                       |
| `-webkit-appearance`        | Vendor extension                      | Webkit/Blink                                     |

Vendor extensions (`-webkit-*`, `-moz-*`, `-ms-*`): Jigsaw le segnala come **warning** quando si passa `vextwarning=true` (esattamente quello che vogliamo: warning ≠ errore).

---

## 5. Perché il CSS non si valida 100% offline (nota tecnica)

Il W3C CSS Validator (Jigsaw) è scritto in Java e parsa il CSS con un motore proprietario. Esiste come progetto open source (https://github.com/w3c/css-validator) e si può eseguire localmente come `.jar` runtime, ma:

- richiede Java 8+ installato sul sistema dell'utente (non è un dato di fatto su un Mac/Linux pulito);
- il `.jar` ufficiale va scaricato e mantenuto aggiornato manualmente;
- non risponde a un'API HTTP semplice come Jigsaw on-line, va invocato da CLI con flag specifici;
- nella nostra pass DevOps non possiamo affidarci a uno strumento esterno richiesto come dipendenza dell'utente: lo script `validate-deploy.sh` punta direttamente all'endpoint pubblico Jigsaw che è già il riferimento autoritativo.

In sintesi: **per il CSS la validazione 100% definitiva è online**. Lo script automatizza la chiamata, ma il sito deve essere già pubblico (raggiungibile via HTTPS) perché Jigsaw possa fetch-arlo.

In alternativa, per validare il CSS **prima** del deploy si può usare la modalità "Direct Input" o "By File Upload" del Jigsaw via browser:
https://jigsaw.w3.org/css-validator/#validate_by_input
incollando lo `style.css` (assicurandosi di selezionare `CSS level 3 + SVG` e di abilitare `Vendor Extensions: Warnings`).

---

## 6. Quando rilanciare la validazione

- **Sempre dopo un deploy** (o un push che modifica HTML/CSS).
- **Dopo aver sostituito i placeholder** (`README.md` STEP 0): dominio canonical, ID Formspree, dati legali — questi cambi tipicamente toccano `<link rel="canonical">`, `og:url`, `sitemap.xml`. Vale la pena ri-confermare il pass HTML su tutte e 10 le pagine.
- **Prima di una release pubblica annunciata** (apertura audizioni, lancio newsletter, ecc.): la validazione formale W3C è un fallback di reputazione utile se il sito viene linkato da terze parti.

---

— *(DevOps R4, 2026-05-04)*
