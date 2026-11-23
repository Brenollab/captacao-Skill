# captacao-Skill

Skill do Claude Code pra captar clientes de site: acha empresas com site ruim (ou sem site), confere o defeito de verdade e ajuda a mandar mensagem no WhatsApp Web, uma por vez e com aprovação.

## Instalar
1. Baixe este repositório (Code → Download ZIP) ou clone.
2. Copie a pasta `captacao-sites` para a pasta de skills do Claude Code:
   - Windows: `C:\Users\SEU_USUARIO\.claude\skills\`
   - Mac/Linux: `~/.claude/skills/`
3. Abra o Claude Code e digite `/captacao-sites`.
4. Na primeira vez ele pergunta seu nome, onde guardar as anotações, ramos que você não quer, região e horário. Fica salvo em `config.md` (que não vai pro Git).

## Precisa ter
- Navegador do app (pra buscar e abrir os sites) e a extensão **Claude in Chrome** (pro WhatsApp Web).
- `curl` e `bash` (Git Bash no Windows) pro pré-filtro, e Python pras anotações.

## Como funciona
1. **Análise:** busca empresas no Google Locais (ou num CSV), abre cada site no tamanho de celular e classifica em Muito ruim, Ruim, Médio ou Bom. Só cita defeito que viu na tela.
2. **Aprovação:** você aprova a lista e as 3 primeiras mensagens.
3. **Envio:** uma mensagem por vez no WhatsApp Web, com intervalo de 2 a 4 min. Quem responder com interesse fica com você: a skill não fala preço nem fecha nada.

## Atualizações
Eu uso essa skill no dia a dia e vou melhorando ela a cada uso: regras novas, ramos que rendem mais, mensagens e scripts. Vale baixar de novo de tempos em tempos pra pegar a versão mais nova.

## Aviso
Ler resultados do Google de forma automática e mandar mensagens frias no WhatsApp pode ir contra os termos desses serviços. Use com moderação e por sua conta.
