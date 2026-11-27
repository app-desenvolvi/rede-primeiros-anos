/* Rede Primeiros Anos — renderização dirigida pela configuração (config.js) */
(function () {
  'use strict';

  var CFG = window.REDE_CONFIG;
  if (!CFG) { console.error('REDE_CONFIG não encontrado. Verifique assets/js/config.js.'); return; }

  /* ---------- utilitários ---------- */
  function escapeHtml(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function soDigitos(v) { return String(v || '').replace(/\D/g, ''); }
  function urlSegura(u) {
    var s = String(u || '').trim();
    return /^(https?:\/\/|assets\/|\/)/i.test(s) ? s : '';
  }
  function $(id) { return document.getElementById(id); }
  function cidadesAtivas() { return (CFG.cidades || []).filter(function (c) { return c.ativa !== false; }); }

  function whatsapp(telefone, modelo, cidade) {
    var msg = String(modelo || '').replace('{cidade}', cidade || '');
    return 'https://api.whatsapp.com/send?phone=' + soDigitos(telefone) + '&text=' + encodeURIComponent(msg);
  }
  function mapsUrl(c) {
    return 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent([c.local, c.nome, c.uf].filter(Boolean).join(', '));
  }

  /* gancho de medição: compatível com Google Tag Manager / GA4 (se instalados) */
  function track(evento, detalhe) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: evento, detalhe: detalhe || '' });
    } catch (e) { console.warn('track falhou', e); }
  }
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-evento]') : null;
    if (el) track(el.getAttribute('data-evento'), el.getAttribute('data-detalhe'));
  });

  /* ---------- renderizadores (montam HTML em buffer e escrevem uma única vez) ---------- */
  function renderHero() {
    var cs = cidadesAtivas();
    var n = $('contagem-cidades');
    if (n) n.textContent = cs.length + (cs.length === 1 ? ' cidade' : ' cidades');
    var alvo = $('hero-cidades');
    if (!alvo) return;
    var buf = '';
    cs.forEach(function (c) {
      var href = whatsapp(c.telefone, CFG.mensagens.contato, c.nome);
      buf += `<a class="btn btn-primary btn-sm" href="${escapeHtml(href)}" data-evento="whatsapp_cidade" data-detalhe="${escapeHtml(c.id)}">${escapeHtml(c.nome)} · ${escapeHtml(c.uf)} →</a>`;
    });
    buf += '<a class="btn btn-dashed btn-sm" href="#parceiros">Minha cidade não está aqui</a>';
    alvo.innerHTML = buf;
  }

  function renderCidades() {
    var alvo = $('cidades-lista');
    if (!alvo) return;
    var buf = '';
    cidadesAtivas().forEach(function (c) {
      var wa = whatsapp(c.telefone, CFG.mensagens.aulaExperimental, c.nome);
      buf += `
        <article class="city">
          <h3>${escapeHtml(c.nome)} · ${escapeHtml(c.uf)}</h3>
          <p>${escapeHtml(c.local)}</p>
          <div class="actions">
            <a class="btn btn-primary btn-sm" href="${escapeHtml(wa)}" data-evento="agendar_whatsapp" data-detalhe="${escapeHtml(c.id)}">Agendar aula experimental</a>
            <a class="btn btn-outline btn-sm" href="${escapeHtml(mapsUrl(c))}" target="_blank" rel="noopener">Como chegar</a>
          </div>
        </article>`;
    });
    buf += `
      <article class="city soon">
        <h3>Sua cidade aqui</h3>
        <p>Estamos ampliando a rede com profissionais e centros que compartilham o nosso propósito.</p>
        <div class="actions"><a class="btn btn-dashed btn-sm" href="#parceiros">Quero levar a rede para minha cidade</a></div>
      </article>`;
    alvo.innerHTML = buf;
  }

  function renderEquipe() {
    var alvo = $('equipe-lista');
    if (!alvo) return;
    var buf = '';
    (CFG.equipe || []).forEach(function (p) {
      var foto = urlSegura(p.foto);
      var avatar = foto
        ? `<img src="${escapeHtml(foto)}" alt="Foto de ${escapeHtml(p.nome)}" loading="lazy">`
        : escapeHtml(p.iniciais || '');
      var apelido = p.apelido ? ` <span style="font-weight:600;font-size:18px">(${escapeHtml(p.apelido)})</span>` : '';
      buf += `
        <article class="person">
          <div class="avatar" ${foto ? '' : 'aria-hidden="true"'}>${avatar}</div>
          <div class="info">
            <h3>${escapeHtml(p.nome)}${apelido}</h3>
            <p class="role">${escapeHtml(p.cargo)}</p>
            <p>${escapeHtml(p.texto)}</p>
          </div>
        </article>`;
    });
    alvo.innerHTML = buf;
  }

  function renderDepoimentos() {
    var secao = $('depoimentos');
    var alvo = $('depoimentos-lista');
    var lista = CFG.depoimentos || [];
    if (!secao || !alvo) return;
    if (!lista.length) { secao.hidden = true; return; }
    var buf = '';
    lista.forEach(function (d) {
      buf += `
        <figure class="quote">
          <blockquote>“${escapeHtml(d.texto)}”</blockquote>
          <figcaption>${escapeHtml(d.autor)}${d.detalhe ? ' · ' + escapeHtml(d.detalhe) : ''}</figcaption>
        </figure>`;
    });
    alvo.innerHTML = buf;
    secao.hidden = false;
  }

  function renderParceiros() {
    var alvo = $('parceiros-lista');
    var lista = CFG.parceiros || [];
    if (alvo) {
      var buf = '';
      lista.forEach(function (p) {
        var u = urlSegura(p.url);
        buf += u
          ? `<a href="${escapeHtml(u)}" target="_blank" rel="noopener">${escapeHtml(p.nome)}</a>`
          : `<span>${escapeHtml(p.nome)}</span>`;
      });
      alvo.innerHTML = buf;
    }
    /* diretório de membros: só aparece quando houver nomes em config.js */
    var dir = $('diretorio');
    if (dir) dir.hidden = !lista.length;
    var cta = $('parceiro-cta');
    var tel = soDigitos(CFG.contatoRede && CFG.contatoRede.telefone);
    if (cta) {
      if (tel) {
        cta.href = whatsapp(tel, (CFG.mensagens || {}).parceiro, '');
        cta.target = '_blank';
        cta.rel = 'noopener';
      } else {
        cta.hidden = true;
      }
    }
  }

  /* "Como cuidar": uma aba por parte da casa (config.orientacoes) */
  function renderComo() {
    var alvo = $('como-orientacoes');
    var lista = CFG.orientacoes || [];
    if (!alvo || !lista.length) return;
    var abas = '', paineis = '';
    lista.forEach(function (o, i) {
      var id = 'como-' + String(o.id).replace(/[^\w-]/g, '');
      var ativa = i === 0;
      abas += `<button type="button" class="como-aba" role="tab" id="${id}-aba" aria-controls="${id}" aria-selected="${ativa}" tabindex="${ativa ? 0 : -1}" style="--c:${escapeHtml(o.cor)}">
          <b>${escapeHtml(o.titulo)}</b><span>${escapeHtml(o.fase)}</span></button>`;
      var itens = '';
      (o.itens || []).forEach(function (it) {
        itens += `<li><b>${escapeHtml(it.tema)}</b><span>${escapeHtml(it.texto)}</span></li>`;
      });
      var fontes = (o.fontes || []).map(function (f) {
        var u = urlSegura(f.url);
        return u ? `<a href="${escapeHtml(u)}" target="_blank" rel="noopener">${escapeHtml(f.nome)}</a>` : escapeHtml(f.nome);
      }).join('; ');
      paineis += `<div class="como-painel" role="tabpanel" id="${id}" aria-labelledby="${id}-aba" style="--c:${escapeHtml(o.cor)}"${ativa ? '' : ' hidden'}>
          <ul class="como-lista">${itens}</ul>
          ${fontes ? `<p class="fonte">Fontes: ${fontes}.</p>` : ''}
        </div>`;
    });
    alvo.innerHTML = `<div class="como-abas" role="tablist" aria-label="Partes da casa">${abas}</div>${paineis}`;
    var botoes = alvo.querySelectorAll('.como-aba');
    function ativar(btn, foco) {
      botoes.forEach(function (b) {
        var sel = b === btn;
        b.setAttribute('aria-selected', sel); b.tabIndex = sel ? 0 : -1;
        var painel = $(b.getAttribute('aria-controls'));
        if (painel) painel.hidden = !sel;
      });
      if (foco) btn.focus();
    }
    botoes.forEach(function (b, i) {
      b.addEventListener('click', function () { ativar(b, false); });
      b.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!n) return;
        e.preventDefault();
        ativar(botoes[(i + n + botoes.length) % botoes.length], true);
      });
    });
  }

  /* "Boas notícias": mural (config.noticias); vazio = a seção fica escondida */
  function renderNoticias() {
    var sec = $('noticias'), alvo = $('noticias-lista');
    var lista = (CFG.noticias || []).slice().sort(function (a, b) { return String(b.data || '').localeCompare(String(a.data || '')); });
    if (!sec || !alvo) return;
    if (!lista.length) { sec.hidden = true; return; }
    var buf = '';
    lista.forEach(function (n) {
      var u = urlSegura(n.url);
      var d = /^\d{4}-\d{2}-\d{2}$/.test(n.data || '') ? n.data.split('-').reverse().join('/') : '';
      buf += `<article class="noticia">
          ${d ? `<time datetime="${escapeHtml(n.data)}">${escapeHtml(d)}</time>` : ''}
          <h3>${u ? `<a href="${escapeHtml(u)}" target="_blank" rel="noopener">${escapeHtml(n.titulo)}</a>` : escapeHtml(n.titulo)}</h3>
          <p>${escapeHtml(n.resumo)}</p>
          ${n.fonte ? `<p class="fonte">${escapeHtml(n.fonte)}</p>` : ''}
        </article>`;
    });
    alvo.innerHTML = buf;
    sec.hidden = false;
  }

  /* links opcionais da configuração: vazio = o link não aparece */
  function renderLinks() {
    var m = CFG.marca || {};
    var mapa = { 'data-instagram': m.instagram, 'data-bebeminhada': m.bebeminhadaUrl };
    Object.keys(mapa).forEach(function (attr) {
      var u = urlSegura(mapa[attr]);
      document.querySelectorAll('[' + attr + ']').forEach(function (el) {
        if (u) { el.href = u; el.hidden = false; } else { el.hidden = true; }
      });
    });
  }

  /* seletor de cidade do fechamento: estado local simples */
  var cidadeSelecionada = null;
  function renderContato() {
    var cs = cidadesAtivas();
    var alvo = $('contato-cidades');
    var cta = $('contato-cta');
    var info = $('contato-info');
    if (!alvo || !cta || !cs.length) return;
    if (!cidadeSelecionada || !cs.some(function (c) { return c.id === cidadeSelecionada; })) {
      cidadeSelecionada = cs[0].id;
    }
    var buf = '';
    cs.forEach(function (c) {
      var ativa = c.id === cidadeSelecionada;
      buf += `<button type="button" class="opt" data-cidade="${escapeHtml(c.id)}" aria-pressed="${ativa}">${escapeHtml(c.nome)} · ${escapeHtml(c.uf)}</button>`;
    });
    alvo.innerHTML = buf;
    var atual = cs.filter(function (c) { return c.id === cidadeSelecionada; })[0];
    cta.href = whatsapp(atual.telefone, CFG.mensagens.aulaExperimental, atual.nome);
    cta.setAttribute('data-detalhe', atual.id);
    if (info) info.textContent = 'Atendimento: ' + atual.nome + ' · ' + atual.local + '. Você será direcionado ao WhatsApp da unidade.';
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest ? ev.target.closest('[data-cidade]') : null;
    if (!b) return;
    cidadeSelecionada = b.getAttribute('data-cidade');
    renderContato();
  });

  /* fotos opcionais: preencha CFG.fotos em config.js; vazio = nada aparece (hero usa a ilustração) */
  function renderFotos() {
    var f = CFG.fotos || {};
    document.querySelectorAll('[data-foto]').forEach(function (el) {
      var item = f[el.getAttribute('data-foto')];
      if (!item || !item.src) return;
      var img = document.createElement('img');
      var u = urlSegura(item.src); if (!u) return; img.src = u;
      img.alt = item.alt || '';
      img.loading = el.getAttribute('data-foto') === 'hero' ? 'eager' : 'lazy';
      el.innerHTML = '';
      el.appendChild(img);
      el.hidden = false;
    });
  }

  /* abertura em vídeo: tela cheia; ao terminar (ou ao pular) encolhe até a foto do topo.
     Clicar (ou Enter/Espaço) na foto do topo reabre o vídeo em tela cheia, já com som, de onde parou. */
  function initIntro() {
    var root = document.documentElement, el = $('intro');
    if (!el) return;
    var cfg = CFG.intro || {};
    var src = urlSegura(cfg.video || '');
    var alvo = document.querySelector('.ht-frame');
    var podeReabrir = !!(src && alvo && cfg.reabrir !== false);
    var poupar = !!(navigator.connection && navigator.connection.saveData);
    var semMov = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    var automatico = !!src && root.classList.contains('intro-on') && cfg.ativo !== false && !poupar;
    if (!automatico) {
      root.classList.remove('intro-on', 'intro-lock');
      if (!podeReabrir) { el.remove(); return; }
    }
    var v = $('intro-video'), clip = $('intro-clip'), pular = $('intro-pular'), som = $('intro-som');
    var de = document.documentElement;
    var encerrado = !automatico, tocou = false, tempo = null, reaberto = false, carregado = false;
    var aoTerminarTransicao = null;
    var borda = 8, ar = 16 / 9, dur = '1.2s cubic-bezier(.65,0,.25,1)';

    function px(n) { return n + 'px'; }
    function irPara(y) { de.style.scrollBehavior = 'auto'; window.scrollTo(0, y); de.style.scrollBehavior = ''; }
    /* geometria do vídeo dentro da caixa: cover (moldura / tela horizontal) ou contain (tela vertical) */
    function geo(w, h, cobrir, px_, py_) {
      var largo = w / h > ar, W, H;
      if (cobrir ? largo : !largo) { W = w; H = w / ar; } else { H = h; W = h * ar; }
      return { w: W, h: H, l: (w - W) * px_, t: (h - H) * py_ };
    }
    function transicoes(ligar) {
      clip.style.transition = ligar ? ['left', 'top', 'width', 'height', 'border-radius', 'border-width', 'box-shadow'].map(function (p) { return p + ' ' + dur; }).join(',') : 'none';
      v.style.transition = ligar ? ['left', 'top', 'width', 'height'].map(function (p) { return p + ' ' + dur; }).join(',') : 'none';
    }
    function caixa(r, cs) {   /* coloca o recorte exatamente sobre a moldura */
      clip.style.left = px(r.left); clip.style.top = px(r.top);
      clip.style.width = px(r.width); clip.style.height = px(r.height);
      clip.style.borderRadius = cs.borderRadius; clip.style.borderWidth = px(borda);
      clip.style.boxShadow = '0 28px 60px rgba(11,42,94,.35)';
      var g = geo(r.width - 2 * borda, r.height - 2 * borda, true, 0.58, 0.5);
      v.style.left = px(g.l); v.style.top = px(g.t); v.style.width = px(g.w); v.style.height = px(g.h);
    }
    function videoSolto(g) {
      v.style.cssText = 'position:absolute;object-fit:fill;max-width:none;left:' + px(g.l) + ';top:' + px(g.t) + ';width:' + px(g.w) + ';height:' + px(g.h);
    }
    clip.addEventListener('transitionend', function (e) {
      if (e.target !== clip || e.propertyName !== 'width' || !aoTerminarTransicao) return;
      var f = aoTerminarTransicao; aoTerminarTransicao = null; f();
    });
    function depoisDaTransicao(f, seguranca) {
      var feito = false;
      function uma() { if (feito) return; feito = true; if (aoTerminarTransicao === uma) aoTerminarTransicao = null; f(); }
      aoTerminarTransicao = uma;
      setTimeout(uma, seguranca);
    }

    function limpar() {
      root.classList.remove('intro-on', 'intro-lock');
      document.body.classList.remove('site-entra');
      if (!podeReabrir) { if (el.parentNode) el.remove(); return; }
      el.classList.remove('saindo', 'abrindo', 'manual');
      clip.classList.remove('fade');
      clip.removeAttribute('style');
      if (v.parentNode === clip) v.removeAttribute('style');
    }
    function colocarNaMoldura() {
      alvo.innerHTML = '';
      v.removeAttribute('style');
      v.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:58% 50%;display:block';
      if (podeReabrir) { v.setAttribute('aria-hidden', 'true'); v.removeAttribute('aria-label'); }
      else { v.removeAttribute('aria-hidden'); v.setAttribute('aria-label', 'Vídeo de abertura'); }
      alvo.appendChild(v);
    }

    function encerrar(motivo) {
      if (encerrado) return; encerrado = true;
      clearTimeout(tempo);
      try { v.pause(); } catch (e) {}
      track((reaberto ? 'video_' : 'intro_') + motivo, tocou ? Math.round(v.currentTime) : 0);
      root.classList.remove('intro-lock');
      var yVolta = reaberto ? window.pageYOffset : 0;
      if (!reaberto) {
        irPara(0);
        document.body.classList.add('site-entra');
        setTimeout(function () { document.body.classList.remove('site-entra'); }, 2600);
      }
      el.classList.remove('abrindo');
      el.classList.add('saindo');
      if (!alvo || semMov) {
        clip.classList.add('fade');
        setTimeout(function () { limpar(); if (reaberto && alvo) alvo.focus({ preventScroll: true }); }, 900);
        return;
      }
      /* se a moldura não estiver toda visível (celular), rola a página por baixo da abertura até ela */
      var topoFixo = 0;
      ['.site-header', '.site-bar'].forEach(function (s) {
        var n = document.querySelector(s);
        if (n && getComputedStyle(n).position !== 'static') { var b = n.getBoundingClientRect(); if (b.height && b.bottom > topoFixo && b.top < 5) topoFixo = b.bottom; }
      });
      var r = alvo.getBoundingClientRect(), vh = window.innerHeight, rolou = false;
      if (r.top < topoFixo + 8 || r.bottom > vh - 8) {
        var desejado = Math.max(topoFixo + 16, (vh - r.height) / 2);
        var maxY = Math.max(0, de.scrollHeight - vh);
        irPara(Math.min(maxY, Math.max(0, window.pageYOffset + r.top - desejado)));
        rolou = Math.abs(window.pageYOffset - yVolta) > 4;
        r = alvo.getBoundingClientRect();
      }
      var voltou = false;
      function cancelarVolta() { voltou = true; }
      ['touchstart', 'wheel', 'keydown'].forEach(function (ev) { window.addEventListener(ev, cancelarVolta, { once: true, passive: true }); });
      var cr = clip.getBoundingClientRect();
      transicoes(false);
      videoSolto(geo(cr.width, cr.height, cr.width >= cr.height, 0.5, 0.5));
      void clip.offsetWidth;
      transicoes(true);
      void clip.offsetWidth;
      caixa(r, getComputedStyle(alvo));
      depoisDaTransicao(function () {
        if (cfg.final === 'video') {
          colocarNaMoldura();
          limpar();
        } else {
          clip.style.transition = 'opacity .6s ease'; clip.style.opacity = '0';
          setTimeout(limpar, 650);
        }
        if (reaberto) alvo.focus({ preventScroll: true });
        /* se a página foi rolada para mostrar a moldura, volta suavemente, a menos que a pessoa já tenha interagido */
        if (rolou) setTimeout(function () { if (!voltou) window.scrollTo({ top: yVolta, behavior: 'smooth' }); }, 1100);
      }, 1600);
    }

    function marcarSom() {
      var on = !v.muted;
      som.setAttribute('aria-pressed', on ? 'true' : 'false');
      som.setAttribute('aria-label', on ? 'Desligar o som do vídeo' : 'Ativar o som do vídeo');
      som.classList.toggle('pede-som', !on && !!cfg.avisoSom);
    }
    function tocar(comSom, aoFalhar) {
      v.muted = !comSom;
      if (comSom) v.removeAttribute('muted');
      marcarSom();
      var p = v.play();
      if (p && p.catch) p.catch(aoFalhar);
    }
    /* se o navegador bloquear o som, toca mudo e liga o som no primeiro toque/clique/tecla */
    function ligarNoGesto(e) {
      if (e && e.target && e.target.closest && e.target.closest('.intro-ctrl')) return;
      ['pointerdown', 'keydown', 'touchend'].forEach(function (ev) { document.removeEventListener(ev, ligarNoGesto, true); });
      if (encerrado || !v.muted) return;
      v.muted = false; marcarSom();
      if (v.paused) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
    }
    function tocarMudo() {
      tocar(false, function () { encerrar('bloqueado'); });
      ['pointerdown', 'keydown', 'touchend'].forEach(function (ev) { document.addEventListener(ev, ligarNoGesto, true); });
    }

    /* reabre o vídeo a partir da moldura do topo */
    function abrir() {
      if (!encerrado || !podeReabrir) return;
      encerrado = false; reaberto = true; tocou = false;
      clearTimeout(tempo);
      var r = alvo.getBoundingClientRect(), cs = getComputedStyle(alvo);
      if (v.parentNode !== clip) { v.removeAttribute('style'); clip.appendChild(v); }
      v.setAttribute('aria-hidden', 'true');
      clip.classList.remove('fade');
      clip.removeAttribute('style');
      if (cfg.textoFechar) {
        pular.textContent = String(cfg.textoFechar) + ' ';
        var x = document.createElement('span'); x.setAttribute('aria-hidden', 'true'); x.textContent = '×'; pular.appendChild(x);
      }
      el.classList.add('manual', 'saindo', 'abrindo');
      if (!semMov) { transicoes(false); caixa(r, cs); v.style.position = 'absolute'; v.style.objectFit = 'fill'; v.style.maxWidth = 'none'; }
      root.classList.add('intro-on', 'intro-lock');
      if (!carregado || v.error) { v.src = src; carregado = true; }
      /* continua de onde parou; só recomeça se o vídeo já tinha chegado ao fim */
      var fim = v.ended || (v.duration && v.currentTime >= v.duration - 0.3);
      if (fim) { try { v.currentTime = 0; } catch (e) {} }
      tocar(true, function () { tocar(false, function () { encerrar('erro'); }); });
      tempo = setTimeout(function () { if (!tocou) encerrar('lento'); }, 15000);
      track('video_abriu');
      void clip.offsetWidth;
      el.classList.remove('saindo');
      if (!semMov) {
        var W = window.innerWidth, H = window.innerHeight;
        transicoes(true);
        void clip.offsetWidth;
        clip.style.left = '0px'; clip.style.top = '0px'; clip.style.width = px(W); clip.style.height = px(H);
        clip.style.borderRadius = '0px'; clip.style.borderWidth = '0px'; clip.style.boxShadow = 'none';
        videoSolto(geo(W, H, W >= H, 0.5, 0.5));
        v.style.transition = ['left', 'top', 'width', 'height'].map(function (p) { return p + ' ' + dur; }).join(',');
        depoisDaTransicao(function () {
          if (encerrado) return;
          clip.removeAttribute('style'); v.removeAttribute('style');
          el.classList.remove('abrindo');
        }, 1600);
      } else {
        el.classList.remove('abrindo');
      }
      pular.focus({ preventScroll: true });
    }

    v.addEventListener('ended', function () { setTimeout(function () { encerrar('assistiu'); }, 700); });
    v.addEventListener('error', function () { encerrar('erro'); });
    v.addEventListener('playing', function () { tocou = true; clearTimeout(tempo); });
    pular.addEventListener('click', function () { encerrar(reaberto ? 'fechou' : 'pulou'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') encerrar(reaberto ? 'fechou' : 'pulou'); });
    som.addEventListener('click', function () {
      v.muted = !v.muted;
      marcarSom();
      if (v.paused && !encerrado) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
    });
    if (cfg.avisoSom) { var av = document.createElement('span'); av.className = 'som-txt'; av.textContent = String(cfg.avisoSom); som.appendChild(av); }

    if (podeReabrir) {
      alvo.classList.add('ht-play');
      alvo.setAttribute('role', 'button');
      alvo.setAttribute('tabindex', '0');
      alvo.setAttribute('aria-label', String(cfg.textoAssistir || 'Assistir ao vídeo em tela cheia'));
      alvo.addEventListener('click', abrir);
      alvo.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); abrir(); }
      });
    }

    if (!automatico) return;
    v.src = src; carregado = true;
    if (cfg.som === true) tocar(true, tocarMudo);
    else tocarMudo();
    tempo = setTimeout(function () { if (!tocou) encerrar('lento'); }, 6000);
    pular.focus({ preventScroll: true });
  }

  /* menu hambúrguer (celular) */
  function initMenu() {
    var btn = $('menu-toggle'), bar = $('menu-bar'), hd = document.querySelector('.site-header');
    if (!btn || !bar) return;
    function medir() { if (hd) document.documentElement.style.setProperty('--hh', hd.offsetHeight + 'px'); }
    function fechar() { bar.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Abrir menu'); }
    btn.addEventListener('click', function () {
      medir();
      var abrir = !bar.classList.contains('open');
      bar.classList.toggle('open', abrir);
      btn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      btn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    });
    bar.addEventListener('click', function (e) { if (e.target.closest('a')) fechar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
    window.addEventListener('resize', function () { medir(); if (window.innerWidth > 700) fechar(); });
    medir();
    /* cabeçalho compacto ao rolar (com histerese para não oscilar) */
    var compacto = false;
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (!compacto && y > 90) { compacto = true; hd.classList.add('compacto'); medir(); }
      else if (compacto && y < 20) { compacto = false; hd.classList.remove('compacto'); medir(); }
    }, { passive: true });
    window.addEventListener('load', medir);
  }

  /* vídeo com carregamento sob demanda (só carrega o YouTube ao clicar; privacidade e velocidade) */
  function renderVideos() {
    var v = CFG.videos || {};
    document.querySelectorAll('[data-video]').forEach(function (el) {
      var item = v[el.getAttribute('data-video')];
      if (!item || !/^[\w-]{6,20}$/.test(item.id || '')) { el.closest('section') && (el.hidden = true); return; }
      var titulo = escapeHtml(item.titulo || 'Vídeo');
      el.innerHTML = `<button type="button" class="video-play" aria-label="Assistir ao vídeo: ${titulo}"><img src="https://i.ytimg.com/vi/${item.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()"><span>${titulo}</span></button>`;
      el.querySelector('button').addEventListener('click', function () {
        el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&hl=pt-BR&cc_load_policy=1" title="${titulo}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      });
    });
  }

  /* casa animada: toca ao entrar na tela e pode ser reproduzida de novo */
  function initCasa() {
    var el = $('casa-anim'), btn = $('casa-replay');
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    function tocar() { el.classList.remove('rodando'); void el.offsetWidth; el.classList.add('rodando'); }
    if (btn) btn.addEventListener('click', tocar);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { tocar(); io.disconnect(); } });
      }, { threshold: 0.4 });
      io.observe(el);
    }
  }

  function init() {
    initIntro();
    initMenu();
    initCasa();
    renderVideos();
    renderFotos();
    renderHero();
    renderCidades();
    renderEquipe();
    renderDepoimentos();
    renderParceiros();
    renderLinks();
    renderComo();
    renderNoticias();
    renderContato();
    var ano = $('ano');
    if (ano) ano.textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
