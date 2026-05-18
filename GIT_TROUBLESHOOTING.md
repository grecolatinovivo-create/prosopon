# Git Troubleshooting — Accademia PROSŌPON

Soluzioni rapide ai problemi più comuni con Git su questo progetto.

## Sblocco file `.lock` (errori "Another git process seems to be running")

Quando Git si blocca (di solito dopo un'interruzione brusca, una chiusura forzata, o un altro processo Git ancora aperto), lascia dei file `.lock` nella cartella `.git/`. Va eliminato il file `.lock` corrispondente.

### Lock più comuni

**`index.lock`** (il più frequente) — appare durante `git add`, `git commit`, `git checkout`, `git pull`:

```bash
cd /Users/giampieromarchi/Desktop/Accademia_prosopon
rm -f .git/index.lock
```

**`HEAD.lock`** — appare durante operazioni che modificano HEAD (`git reset`, `git checkout`, `git rebase`):

```bash
rm -f .git/HEAD.lock
```

**Lock sui refs** (`refs/heads/main.lock`, `refs/heads/master.lock`, ecc.) — appare durante `git push`, `git fetch`, `git merge`:

```bash
rm -f .git/refs/heads/*.lock
```

**Lock pack/objects** (raro, durante `git gc` o `git repack`):

```bash
rm -f .git/objects/pack/*.lock
rm -f .git/gc.pid
```

### Comando "tutto in uno" (sicuro)

Se non sei sicuro quale lock c'è, esegui questo che li toglie tutti senza errori se non esistono:

```bash
cd /Users/giampieromarchi/Desktop/Accademia_prosopon
rm -f .git/index.lock .git/HEAD.lock .git/refs/heads/*.lock .git/objects/pack/*.lock .git/gc.pid 2>/dev/null
echo "Lock puliti."
```

### Prima di togliere il lock — controlla che non ci sia un processo Git attivo

Se cancelli un `.lock` mentre un'altra istanza di Git sta ancora lavorando, puoi corrompere il repository. Controlla prima:

```bash
ps aux | grep -i git | grep -v grep
```

Se vedi un processo `git` ancora attivo (es. da un altro terminale o da VS Code), aspettalo o chiudilo (`kill PID`) prima di rimuovere il `.lock`.

---

## Altri problemi comuni

### `error: pathspec ... did not match any file(s) known to git`
Il file referenziato non esiste o è stato spostato. Verifica con `git status` cosa Git vede.

### `fatal: refusing to merge unrelated histories`
Tipicamente succede al primo push di un repo locale verso uno remoto già inizializzato. Soluzione:
```bash
git pull origin main --allow-unrelated-histories
```

### `Updates were rejected because the remote contains work that you do not have`
Il remoto ha commit nuovi che non hai in locale. Soluzione standard:
```bash
git pull --rebase origin main
git push origin main
```

### File `.DS_Store` continuano a tornare nel repo
Sono cache di Finder su macOS. Già coperti in `.gitignore`. Se ne resta uno nel repo tracciato:
```bash
git rm --cached .DS_Store
git rm --cached "**/.DS_Store"
git commit -m "Rimuove .DS_Store dal tracking"
```

### Resettare un commit ancora non pushato (annullare un commit locale sbagliato)
```bash
git reset --soft HEAD~1   # mantiene le modifiche in staging
git reset HEAD~1          # mantiene le modifiche ma le toglie da staging
git reset --hard HEAD~1   # CANCELLA le modifiche definitivamente (attento!)
```

### Vedere cosa ha modificato un commit
```bash
git show <commit-hash>
git log --stat -1         # ultimo commit con elenco file
```

### Vedere chi ha modificato una riga di un file (blame)
```bash
git blame nome-file.html
```

---

## Note specifiche al progetto

- Il repo è hostato su GitHub Pages. Il branch attivo del deploy è probabilmente `main`.
- Non esistono submodule, hook custom o LFS.
- I file di backup creati dagli agenti durante lo sviluppo (`_backup_pre_r10/`, `_backup_pre_r11/`, `_backup_pre_r12/`, `_backup_pre_r16/` in `assets/docenti/`) **non devono essere committati**. Aggiungili al `.gitignore` se non già coperti.

```bash
# Verifica .gitignore copre i backup
grep -q "_backup_" .gitignore || echo "_backup_*" >> .gitignore
```
