#!/usr/bin/env bash
# ============================================================================
# validate-deploy.sh
# Re-validazione live POST-DEPLOY delle 10 pagine pubbliche di Accademia
# Prosopon contro i validator W3C ufficiali.
#
# Cosa fa:
#   1) Per ogni pagina HTML (10) interroga il Nu Html Checker (vnu) di W3C
#      via API JSON: https://validator.w3.org/nu/?doc=URL&out=json
#   2) Per il CSS interroga il W3C CSS Validator (Jigsaw) configurato su
#      profilo CSS3 + SVG con tolleranza alle vendor extensions (vextwarning):
#      https://jigsaw.w3.org/css-validator/validator?uri=...&profile=css3svg&vextwarning=true&output=soap12
#   3) Stampa un riepilogo OK/ERROR per pagina + count errori.
#   4) Exit code: 0 se tutto pulito, !=0 se almeno una pagina ha errori reali.
#
# Falsi positivi noti del vnu (CSS3 moderno):
#   - text-underline-offset, aspect-ratio, inset, backdrop-filter
#   sono tutti standard W3C ma il parser CSS interno di vnu è bloccato a CSS2.1
#   e li segnala come warning. Sono ignorabili: la fonte di verità per il CSS
#   resta Jigsaw (sezione CSS in fondo a questo script).
#
# Uso:
#   ./validate-deploy.sh                                # usa BASE_URL di default
#   BASE_URL=https://username.github.io/repo ./validate-deploy.sh
#
# Dipendenze: curl (sempre); jq (consigliato, fallback automatico a grep/sed).
# ============================================================================

set -u  # variabili non definite = errore (ma niente set -e: vogliamo continuare anche dopo errori per pagina)

# ---------- Configurazione (modificabile) ------------------------------------

# Sostituisci con il dominio reale del sito una volta pubblicato.
# Esempi:
#   BASE_URL="https://www.accademiaprosopon.it"
#   BASE_URL="https://accademiaprosopon.github.io/sito"
BASE_URL="${BASE_URL:-https://www.accademiaprosopon.it}"

# Le 10 pagine pubbliche del sito.
PAGES=(
  "index.html"
  "accademia.html"
  "formazione.html"
  "docenti.html"
  "biblioteca.html"
  "eventi.html"
  "iscrizioni.html"
  "contatti.html"
  "privacy.html"
  "cookie.html"
)

# Endpoint validatori W3C
VNU_ENDPOINT="https://validator.w3.org/nu/"
JIGSAW_ENDPOINT="https://jigsaw.w3.org/css-validator/validator"

# User-Agent: alcuni endpoint W3C rifiutano richieste senza UA significativo.
UA="AccademiaProsopon-DeployValidator/1.0 (+${BASE_URL})"

# ---------- Setup ------------------------------------------------------------

# Colori (solo se stdout è un terminale)
if [ -t 1 ]; then
  C_RED='\033[0;31m'; C_GREEN='\033[0;32m'; C_YELLOW='\033[0;33m'
  C_BOLD='\033[1m';   C_RESET='\033[0m'
else
  C_RED=''; C_GREEN=''; C_YELLOW=''; C_BOLD=''; C_RESET=''
fi

# Rileva jq
if command -v jq >/dev/null 2>&1; then
  HAS_JQ=1
else
  HAS_JQ=0
  echo "[INFO] jq non installato: userò grep/sed come fallback (output meno preciso)." >&2
fi

# Verifica curl
if ! command -v curl >/dev/null 2>&1; then
  echo "ERRORE: curl non trovato. Installalo e riprova." >&2
  exit 2
fi

TOTAL_ERRORS=0
PAGES_FAILED=()

echo ""
echo -e "${C_BOLD}========================================================${C_RESET}"
echo -e "${C_BOLD}  Validazione live W3C — Accademia Prosopon${C_RESET}"
echo -e "${C_BOLD}========================================================${C_RESET}"
echo "Base URL: $BASE_URL"
echo "Pagine:   ${#PAGES[@]}"
echo "Tool:     vnu (HTML) + Jigsaw (CSS, profile=css3svg, vextwarning=true)"
echo ""

# ---------- Funzione: valida una pagina HTML via vnu (JSON) ------------------
validate_html_page() {
  local page="$1"
  local url="${BASE_URL%/}/${page}"
  local api_url="${VNU_ENDPOINT}?doc=$(printf '%s' "$url" | sed 's/:/%3A/g; s|/|%2F|g')&out=json"

  # Scarica il JSON. Timeout di 30s per pagina (vnu può essere lento).
  local response
  response="$(curl -sS -A "$UA" --max-time 30 "$api_url" 2>&1)" || {
    echo -e "  ${C_RED}[FAIL]${C_RESET} $page  (curl error: ${response:0:80})"
    PAGES_FAILED+=("$page")
    return 1
  }

  local err_count=0
  local warn_count=0

  if [ "$HAS_JQ" -eq 1 ]; then
    err_count=$(echo "$response"  | jq '[.messages[]? | select(.type=="error")]   | length' 2>/dev/null || echo 0)
    warn_count=$(echo "$response" | jq '[.messages[]? | select(.subType=="warning" or .type=="info")] | length' 2>/dev/null || echo 0)
  else
    # Fallback grep: conta le occorrenze di "type":"error" nel JSON.
    err_count=$(echo  "$response" | grep -o '"type":"error"'   | wc -l | tr -d ' ')
    warn_count=$(echo "$response" | grep -o '"type":"info"'    | wc -l | tr -d ' ')
  fi

  if [ "$err_count" -eq 0 ]; then
    echo -e "  ${C_GREEN}[ OK ]${C_RESET} $page  (warn: $warn_count)"
  else
    echo -e "  ${C_RED}[FAIL]${C_RESET} $page  (errors: $err_count, warn: $warn_count)"
    PAGES_FAILED+=("$page")

    # Se jq c'è, stampiamo i primi 3 errori per dare un hint
    if [ "$HAS_JQ" -eq 1 ]; then
      echo "$response" | jq -r '.messages[]? | select(.type=="error") | "         · \(.message) (line \(.lastLine // "?"))"' 2>/dev/null | head -n 3
    fi

    TOTAL_ERRORS=$((TOTAL_ERRORS + err_count))
  fi
}

# ---------- Funzione: valida style.css via Jigsaw (SOAP12 XML) ---------------
validate_css() {
  local css_url="${BASE_URL%/}/style.css"
  local api_url="${JIGSAW_ENDPOINT}?uri=$(printf '%s' "$css_url" | sed 's/:/%3A/g; s|/|%2F|g')&profile=css3svg&vextwarning=true&output=soap12&warning=1"

  echo ""
  echo -e "${C_BOLD}--- CSS ---${C_RESET}"
  echo "Endpoint Jigsaw: $JIGSAW_ENDPOINT"
  echo "Profilo: css3svg + vextwarning=true (tollera vendor prefix accettabili)"

  local response
  response="$(curl -sS -A "$UA" --max-time 30 "$api_url" 2>&1)" || {
    echo -e "  ${C_RED}[FAIL]${C_RESET} style.css  (curl error: ${response:0:80})"
    PAGES_FAILED+=("style.css")
    return 1
  }

  # SOAP12 espone: <m:errorcount>N</m:errorcount> e <m:warningcount>N</m:warningcount>
  local css_errors css_warnings
  css_errors=$(  echo "$response" | grep -oE '<m:errorcount>[0-9]+'   | grep -oE '[0-9]+' | head -n1)
  css_warnings=$(echo "$response" | grep -oE '<m:warningcount>[0-9]+' | grep -oE '[0-9]+' | head -n1)
  css_errors="${css_errors:-0}"
  css_warnings="${css_warnings:-0}"

  if [ "$css_errors" -eq 0 ]; then
    echo -e "  ${C_GREEN}[ OK ]${C_RESET} style.css  (warn: $css_warnings)"
  else
    echo -e "  ${C_RED}[FAIL]${C_RESET} style.css  (errors: $css_errors, warn: $css_warnings)"
    PAGES_FAILED+=("style.css")
    TOTAL_ERRORS=$((TOTAL_ERRORS + css_errors))

    # Estrai i primi messaggi di errore (best-effort grep)
    echo "$response" \
      | grep -oE '<m:message>[^<]+</m:message>' \
      | sed -E 's/<\/?m:message>//g' \
      | head -n 5 \
      | sed 's/^/         · /'
  fi
}

# ---------- Esecuzione -------------------------------------------------------

echo -e "${C_BOLD}--- HTML ---${C_RESET}"
echo "Endpoint vnu: $VNU_ENDPOINT"
echo ""

for page in "${PAGES[@]}"; do
  validate_html_page "$page"
done

validate_css

# ---------- Riepilogo --------------------------------------------------------

echo ""
echo -e "${C_BOLD}========================================================${C_RESET}"
echo -e "${C_BOLD}  Riepilogo${C_RESET}"
echo -e "${C_BOLD}========================================================${C_RESET}"

if [ "${#PAGES_FAILED[@]}" -eq 0 ]; then
  echo -e "${C_GREEN}TUTTO OK.${C_RESET} 10 pagine HTML + style.css passano i validator W3C."
  echo ""
  echo "Promemoria: i validator W3C sono autorevoli. I warning vnu su"
  echo "proprietà CSS3 moderne (text-underline-offset, aspect-ratio, inset,"
  echo "backdrop-filter) sono falsi positivi noti — il giudizio definitivo sul"
  echo "CSS lo dà Jigsaw qui sopra."
  exit 0
else
  echo -e "${C_RED}TROVATI ERRORI${C_RESET} su ${#PAGES_FAILED[@]} target (errori totali: $TOTAL_ERRORS):"
  for p in "${PAGES_FAILED[@]}"; do
    echo "  - $p"
  done
  echo ""
  echo "Per ispezionare manualmente, vedi VALIDAZIONE_LIVE.md (link diretti pre-compilati)."
  exit 1
fi
