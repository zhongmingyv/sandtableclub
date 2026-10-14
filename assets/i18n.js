'use strict';
(function () {
  var LANGS = ['zh', 'cht', 'en', 'ja'];
  var HTML_LANG = { zh: 'zh-CN', cht: 'zh-TW', en: 'en', ja: 'ja' };

  function detectLang() {
    var m = location.search.match(/[?&]lang=([\w-]+)/);
    if (m && LANGS.indexOf(m[1]) >= 0) return m[1];
    var saved = null;
    try { saved = localStorage.getItem('stc-lang'); } catch (e) { /* file:// 或隐私模式下不可用 */ }
    if (saved && LANGS.indexOf(saved) >= 0) return saved;
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('zh') === 0) {
      var trad = nav.indexOf('tw') >= 0 || nav.indexOf('hk') >= 0 || nav.indexOf('mo') >= 0 || nav.indexOf('hant') >= 0;
      return trad ? 'cht' : 'zh';
    }
    if (nav.indexOf('ja') === 0) return 'ja';
    return 'en';
  }

  // 官方服务器：在线游戏的列表与游戏本身都在它上面（/web-games、/play/{游戏编号}/）
  var API = 'https://api.sandtable.club';

  var cur = detectLang();
  var page = document.body.getAttribute('data-page');

  function T() { return window.I18N[cur]; }

  function withLang(href) {
    var i = href.indexOf('#');
    var base = i < 0 ? href : href.slice(0, i);
    var hash = i < 0 ? '' : href.slice(i);
    return base + '?lang=' + cur + hash;
  }

  function renderChrome() {
    var c = T().common;

    var links = [
      { href: 'index.html', key: 'home', active: page === 'home' },
      { href: 'games.html', key: 'games', active: page === 'games' },
      { href: 'terms.html', key: 'terms', active: page === 'terms' },
      { href: 'disclaimer.html', key: 'disclaimer', active: page === 'disclaimer' },
    ];
    var navHtml = '<span class="brand">' + c.brand + '</span>';
    for (var i = 0; i < links.length; i++) {
      navHtml += '<a href="' + withLang(links[i].href) + '"' + (links[i].active ? ' class="active"' : '') + '>' +
        c.nav[links[i].key] + '</a>';
    }
    navHtml += '<span class="spacer"></span><select id="lang-select" aria-label="Language">';
    for (var j = 0; j < LANGS.length; j++) {
      navHtml += '<option value="' + LANGS[j] + '"' + (LANGS[j] === cur ? ' selected' : '') + '>' +
        window.I18N[LANGS[j]].langName + '</option>';
    }
    navHtml += '</select>';
    document.getElementById('nav').innerHTML = navHtml;

    document.getElementById('lang-select').addEventListener('change', function () {
      cur = this.value;
      try { localStorage.setItem('stc-lang', cur); } catch (e) { /* 忽略 */ }
      if (history.replaceState) {
        history.replaceState(null, '', location.pathname + '?lang=' + cur + location.hash);
      }
      renderAll();
    });

    document.getElementById('footer').innerHTML =
      '<div><a href="' + withLang('terms.html') + '">' + c.nav.terms + '</a> · ' +
      '<a href="' + withLang('disclaimer.html') + '">' + c.nav.disclaimer + '</a></div>' +
      '<div style="margin-top: 8px;">' + c.contactLabel + ': ' +
      '<a href="mailto:mingyvzhong@outlook.com">mingyvzhong@outlook.com</a></div>' +
      '<div style="margin-top: 8px;">' + c.footerCopy + '</div>';
  }

  function renderHome() {
    var h = T().home;
    var html =
      '<div class="hero">' +
      '<img src="assets/sandtableclub.png" alt="' + h.heroAlt + '">' +
      '<h1>' + h.heroTitle + '</h1>' +
      '<p class="tagline">' + h.tagline + '</p>' +
      '</div>' +
      '<section id="about"><h2>' + h.about.title + '</h2><p>' + h.about.html + '</p>' +
      '<div class="cards" style="margin-top: 20px;">';
    for (var i = 0; i < h.cards.length; i++) {
      var card = h.cards[i];
      html += '<div class="card ' + card.cls + '"><h3>' + card.title + '</h3><p>' + card.text + '</p></div>';
    }
    html += '</div></section>';
    var main = document.getElementById('main');
    main.className = '';
    main.innerHTML = html;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', h.metaDesc);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // 在线游戏：列表只取一次，切语言时用同一份重画
  var games = null; // null = 还在取；'error' = 取不到；否则是列表
  var gamesRequested = false;

  function renderGames() {
    var g = T().games;
    var mail = '<a href="mailto:mingyvzhong@outlook.com">mingyvzhong@outlook.com</a>';
    var html = '<h1 class="page-title">' + g.heading + '</h1><p class="page-intro">' + g.intro + '</p>' +
      '<div class="notice">' + g.notice.replace('{email}', mail) + '</div>';
    if (games === null) html += '<p class="muted">' + g.loading + '</p>';
    else if (games === 'error') html += '<p class="muted">' + g.error + '</p>';
    else if (games.length === 0) html += '<p class="muted">' + g.empty + '</p>';
    else {
      html += '<div class="games">';
      for (var i = 0; i < games.length; i++) {
        var x = games[i];
        var url = API + x.playPath;
        var meta = [];
        if (x.era) meta.push(esc(x.era));
        meta.push(g.author.replace('{a}', esc(x.ownerName)));
        meta.push(g.updated.replace('{d}', new Date(x.updatedAt).toLocaleDateString(HTML_LANG[cur])));
        html += '<div class="game"><div class="game-body"><h3>' + esc(x.title) + '</h3>' +
          '<p class="muted">' + meta.join(' · ') + (x.loginRequired ? ' · <span class="tag">' + g.login + '</span>' : '') + '</p>' +
          '<a class="btn-gold" href="' + esc(url) + '" target="_blank" rel="noopener">' + g.play + '</a></div></div>';
      }
      html += '</div>';
    }
    var main = document.getElementById('main');
    main.className = '';
    main.innerHTML = html;

    if (gamesRequested) return;
    gamesRequested = true;
    fetch(API + '/web-games')
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) { games = d.items || []; })
      .catch(function () { games = 'error'; })
      .then(renderGames);
  }

  function blockHtml(b) {
    if (b.t === 'p') return '<p>' + b.h + '</p>';
    if (b.t === 'ol' || b.t === 'ul') {
      var lis = '';
      for (var i = 0; i < b.items.length; i++) lis += '<li>' + b.items[i] + '</li>';
      return '<' + b.t + '>' + lis + '</' + b.t + '>';
    }
    if (b.t === 'hl') {
      var ps = '';
      for (var j = 0; j < b.ps.length; j++) ps += '<p>' + b.ps[j] + '</p>';
      return '<div class="highlight">' + ps + '</div>';
    }
    return '';
  }

  function renderLegal(key) {
    var d = T()[key];
    var html = '<h1>' + d.docTitle + '</h1><p class="updated">' + d.updated + '</p><p>' + d.intro + '</p>';
    for (var i = 0; i < d.sections.length; i++) {
      var s = d.sections[i];
      html += '<h2>' + s.title + '</h2>';
      for (var j = 0; j < s.blocks.length; j++) html += blockHtml(s.blocks[j]);
    }
    var main = document.getElementById('main');
    main.className = 'legal';
    main.innerHTML = html;
  }

  function renderAll() {
    document.documentElement.lang = HTML_LANG[cur];
    renderChrome();
    if (page === 'home') renderHome();
    else if (page === 'games') renderGames();
    else renderLegal(page);
    document.title = (page === 'home' ? T().home : T()[page]).title;
  }

  renderAll();
})();
