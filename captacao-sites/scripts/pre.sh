# Pré-filtro rápido (NÃO é prova de defeito; serve só pra escolher quais sites abrir na tela).
# Uso: bash pre.sh URL1 URL2 ...
# Mostra: código/URL final (http = sem https), descrição pro Google, título, viewport (celular), ano do rodapé, tecnologia.
for u in "$@"; do
  f=$(mktemp 2>/dev/null || echo "./pre_$$.tmp")
  r=$(curl -sL -m 15 -A "Mozilla/5.0 (Linux; Android 13) Mobile" -o "$f" -w "%{http_code} %{url_effective}" "$u")
  vp=$(grep -aqi 'name=["'"'"']\?viewport' "$f" && echo vp || echo NOVP)
  yr=$(grep -aoE '(©|&copy;|Copyright)[^<]{0,40}(19|20)[0-9]{2}' "$f" | grep -oE '(19|20)[0-9]{2}' | sort | tail -1)
  gen=$(grep -aoiE 'wix|wordpress|elementor|jimdo|webnode|bootstrap/[0-9]|jquery[-.]1\.[0-9]+|flash|swfobject|<table' "$f" | sort -u | tr '\n' ',')
  ti=$(grep -aoiE "<title[^>]*>[^<]{0,40}" "$f" | head -1 | sed "s/<title[^>]*>//")
  md=$(grep -aqi "name=[\"']\?description" "$f" && echo desc || echo NODESC)
  echo "$u => $r | $md | t:$ti | $vp | ano:${yr:-?} | $gen"
  rm -f "$f"
done
# Suspeitos pra abrir na tela: URL final em http, 000 (não respondeu), 4xx/5xx, NOVP, ano antigo,
# jquery-1.x / <table / flash, NODESC ou título genérico ("Home", "Bem vindo", "Página Inicial").
