// Cole no console (javascript_tool) numa página do Google Locais:
// https://www.google.com/search?q=RAMO+CIDADE&hl=pt-BR&udm=local
// Clica em cada card e lê o botão "Site" do painel. Retorna "nome | telefone | site" por linha.
// O painel do navegador precisa estar VISÍVEL (escondido, os timers ficam lentos e trava).
window.varrer = async () => {
  const lab = [...document.querySelectorAll('span[aria-label*="avaliações"]')]; const out = [];
  for (const s of lab) {
    let c = s; while (c.parentElement && c.parentElement.querySelectorAll('span[aria-label*="avaliações"]').length === 1) c = c.parentElement;
    const lines = c.innerText.split('\n').map(x => x.trim()).filter(Boolean);
    if (lines.includes('Patrocinado')) continue;
    const nome = lines[0]; const tel = ((lines.find(l => /\(\d\d\) \d/.test(l)) || '').match(/\(\d\d\) \d{4,5}-\d{4}/) || [''])[0];
    [...document.querySelectorAll('a')].filter(a => a.textContent.trim() === 'Site').forEach(a => a.dataset.old = 1);
    (c.querySelector('[role=heading]') || c.querySelector('span') || c).click();
    let site = '?';
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 250));
      const h = [...document.querySelectorAll('[role=heading],h2')].some(e => e.textContent.trim().startsWith(nome.slice(0, 15)) && !c.contains(e));
      if (h) {
        await new Promise(r => setTimeout(r, 500));
        const a = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Site' && !a.dataset.old);
        site = a ? (() => { try { const u = new URL(a.href); return u.searchParams.get('q') || u.searchParams.get('url') || a.href } catch (e) { return a.href } })() : 'SEM SITE';
        break;
      }
    }
    out.push([nome, tel, site].join(' | '));
  }
  return out.join('\n');
};
sessionStorage.v = '(' + window.varrer.toString() + ')';
// Depois, em cada nova busca (mesma aba), rode:
//   window.__r=null; (0,eval)(sessionStorage.v)().then(r=>{window.__r=r}); for(let i=0;i<40&&!window.__r;i++) await new Promise(r=>setTimeout(r,1000)); window.__r||'rodando'
// Se voltar 'rodando', rode de novo só o laço de espera e leia window.__r.
// Filtro útil (só celular e domínio próprio): linhas com "| (DD) 9" e sem instagram|facebook|linktr|wa.me|wixsite|sites.google|vercel|canva.site|lovable.
