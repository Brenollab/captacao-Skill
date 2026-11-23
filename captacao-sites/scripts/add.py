# Anota leads na tabela de "Leads analisados" (cria o arquivo se não existir).
# Uso: python add.py CAMINHO_DO_ARQUIVO.md "Empresa;Cidade;Telefone;Site;Veredito;Defeito" ["..."]
import sys, os, io, datetime

HEADER = ("# Leads analisados\n\n"
          "Todo lead aberto entra aqui. Antes de analisar ou mandar mensagem, conferir se já está na lista.\n\n"
          "| Data | Empresa | Cidade | Telefone | Site | Veredito | Defeito confirmado | Mensagem | Status |\n"
          "|---|---|---|---|---|---|---|---|---|\n")

def main(path, rows):
    s = io.open(path, encoding="utf-8").read() if os.path.exists(path) else HEADER
    d = datetime.date.today().strftime("%d/%m/%Y")
    new = ""
    for r in rows:
        cols = r.split(";")
        assert len(cols) == 6, f"precisa de 6 campos separados por ';': {r}"
        new += "| " + d + " | " + " | ".join(c.strip() for c in cols) + " | - | - |\n"
    # entra logo depois da última linha da tabela (texto depois da tabela fica onde está)
    lines = s.rstrip("\n").split("\n")
    last = max(i for i, l in enumerate(lines) if l.startswith("|"))
    s = "\n".join(lines[:last + 1]) + "\n" + new + "\n".join(lines[last + 1:]) + "\n"
    io.open(path, "w", encoding="utf-8").write(s)
    print("ok", len(rows))

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__ or "uso: python add.py ARQUIVO.md \"Empresa;Cidade;Tel;Site;Veredito;Defeito\"")
    main(sys.argv[1], sys.argv[2:])
