# Pré-filtro rápido (NÃO é prova de defeito; serve só pra escolher quais sites abrir na tela).
# Uso: bash pre.sh URL1 URL2 ...
# Segurança: pede só o cabeçalho (HEAD). Não baixa a página e não grava nada no disco
# (sites de lead podem estar hackeados; em 21/11 um tinha o golpe ClickFix e o Defender bloqueou).
for u in "$@"; do
  r=$(curl -sIL -m 15 -A "Mozilla/5.0 (Linux; Android 13) Mobile" -o /dev/null -w "%{http_code} %{url_effective}" "$u")
  echo "$u => $r"
done
# Suspeitos pra abrir na tela: URL final em http, 000 (não respondeu), 4xx/5xx.
# 405/403 às vezes é só o servidor recusando HEAD: abrir no navegador do app pra conferir.
