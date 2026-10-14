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

  // Steam 商店页；utm_campaign 区分入口，Steamworks 的 UTM 统计里能看到各入口带来的访问
  var STEAM = 'https://store.steampowered.com/app/5099480/SandTableClub/';
  var STEAM_LOGO = '<svg class="steam-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>';

  var QQ_GROUP = '1109204158';

  function steamUrl(from) {
    return STEAM + '?utm_source=sandtable.club&utm_medium=web&utm_campaign=' + from;
  }
  function steamLink(from, cls, inner) {
    return '<a class="' + cls + '" href="' + steamUrl(from) + '" target="_blank" rel="noopener">' + inner + '</a>';
  }

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
      { href: 'creators.html', key: 'creators', active: page === 'creators' },
      { href: 'terms.html', key: 'terms', active: page === 'terms' },
      { href: 'disclaimer.html', key: 'disclaimer', active: page === 'disclaimer' },
    ];
    var navHtml = '<span class="brand">' + c.brand + '</span>';
    for (var i = 0; i < links.length; i++) {
      navHtml += '<a href="' + withLang(links[i].href) + '"' + (links[i].active ? ' class="active"' : '') + '>' +
        c.nav[links[i].key] + '</a>';
    }
    navHtml += '<span class="spacer"></span>' + steamLink('nav', 'nav-steam', STEAM_LOGO + '<span>' + T().steam.nav + '</span>') +
      '<select id="lang-select" aria-label="Language">';
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
      '<a href="mailto:mingyvzhong@outlook.com">mingyvzhong@outlook.com</a>' +
      '<span class="footer-sep">·</span>' + c.qqLabel + ': ' + QQ_GROUP + '</div>' +
      '<div style="margin-top: 8px;">' + c.footerCopy + '</div>';
  }

  function renderHome() {
    var h = T().home;
    var html =
      '<div class="hero">' +
      '<img src="assets/sandtableclub.png" alt="' + h.heroAlt + '">' +
      '<h1>' + h.heroTitle + '</h1>' +
      '<p class="tagline">' + h.tagline + '</p>' +
      '</div>' + steamCta() +
      '<section id="about"><h2>' + h.about.title + '</h2><p>' + h.about.html + '</p>' +
      '<div class="cards" style="margin-top: 20px;">';
    for (var i = 0; i < h.cards.length; i++) {
      var card = h.cards[i];
      html += '<div class="card ' + card.cls + '"><h3>' + card.title + '</h3><p>' + card.text + '</p></div>';
    }
    html += '</div></section>' + communityHtml();
    var main = document.getElementById('main');
    main.className = '';
    main.innerHTML = html;
    bindCopyGroup();
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', h.metaDesc);
  }

  // 首页的 Steam 愿望单大入口
  function steamCta() {
    var s = T().steam;
    var shots = ['shot_map', 'shot_battle', 'shot_rules'];
    var html =
      '<section class="steam-cta">' +
      '<div class="steam-cta-bg" style="background-image: url(' + s.header + ')"></div>' +
      '<div class="steam-cta-main">' +
      steamLink('capsule', 'steam-capsule', '<img src="' + s.header + '" alt="' + s.capsuleAlt + '" width="460" height="215">') +
      '<div class="steam-cta-body">' +
      '<span class="steam-badge"><i></i>' + s.badge + '</span>' +
      '<h2>' + s.title + '</h2>' +
      '<p>' + s.text + '</p>' +
      '<ul class="steam-points">';
    for (var i = 0; i < s.points.length; i++) html += '<li>' + s.points[i] + '</li>';
    html += '</ul>' +
      steamLink('home', 'btn-steam', STEAM_LOGO + '<span>' + s.btn + '</span>') +
      steamLink('home_store', 'steam-store-link', s.store) +
      '</div></div><div class="steam-shots">';
    for (var j = 0; j < shots.length; j++) {
      html += steamLink('shot', 'steam-shot', '<img src="assets/steam/' + shots[j] + '.jpg" alt="' + s.shots[j] +
        '" loading="lazy" width="600" height="338"><span>' + s.shots[j] + '</span>');
    }
    return html + '</div></section>';
  }

  // 首页的 QQ 群入口
  function communityHtml() {
    var m = T().community;
    var html =
      '<section id="community"><h2>' + m.title + '</h2><div class="community-panel">' +
      '<div class="community-qr"><img src="assets/qq_group.png" alt="' + m.qrAlt + '" width="480" height="480"></div>' +
      '<div class="community-body"><p class="community-lead">' + m.lead + '</p><ul class="community-points">';
    for (var i = 0; i < m.points.length; i++) html += '<li>' + m.points[i] + '</li>';
    return html + '</ul>' +
      '<div class="community-group"><span class="community-label">' + m.groupLabel + '</span>' +
      '<span class="community-num">' + QQ_GROUP + '</span>' +
      '<button type="button" id="copy-group" class="btn-copy">' + m.copy + '</button></div>' +
      '<p class="community-tip">' + m.scanTip + '</p>' +
      '</div></div></section>';
  }

  function bindCopyGroup() {
    var btn = document.getElementById('copy-group');
    btn.addEventListener('click', function () {
      function done() {
        btn.textContent = T().community.copied;
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = T().community.copy; btn.classList.remove('copied'); }, 2000);
      }
      function fallback() {
        // 非 https 或旧浏览器时退回到选中文本 + execCommand
        var ta = document.createElement('textarea');
        ta.value = QQ_GROUP;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { if (document.execCommand('copy')) done(); } catch (e) { /* 复制不了就算了，群号就在旁边 */ }
        document.body.removeChild(ta);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(QQ_GROUP).then(done, fallback);
      else fallback();
    });
  }

  // 制作者乐园：15 大优势 + 招募 + QQ 群 + 宣传海报
  function renderCreators() {
    var k = T().creators;
    var html =
      '<div class="cr-head"><span class="cr-kicker">' + k.kicker + '</span>' +
      '<h1>' + k.heading + '</h1><p>' + k.lead + '</p></div><div class="cr-grid">';
    for (var i = 0; i < k.items.length; i++) {
      var it = k.items[i];
      var star = i === 10;
      html += '<div class="cr-item' + (star ? ' star' : '') + '"><div class="cr-hex">' + (i + 1) + '</div><div>' +
        '<h3>' + it.t + (it.o ? '<small>' + k.optional + '</small>' : '') + '</h3><p>' + it.d + '</p>';
      if (star) {
        html += '<div class="cr-agents">';
        for (var a = 0; a < k.agents.length; a++) html += '<span>' + k.agents[a] + '</span>';
        html += '</div>';
      }
      html += '</div></div>';
    }
    html += '</div><div class="cr-call"><h2>' + k.callTitle + '</h2><div class="cr-roles">';
    for (var r = 0; r < k.roles.length; r++) html += '<span>' + k.roles[r] + '</span>';
    html += '</div><p>' + k.callText + '</p><div class="cr-actions">' +
      '<a class="btn-gold" href="#community">' + k.joinBtn + '</a>' +
      steamLink('creators', 'btn-steam btn-steam-sm', STEAM_LOGO + '<span>' + T().steam.btn + '</span>') +
      '</div></div>' + communityHtml() +
      '<section class="cr-poster"><h2>' + k.posterTitle + '</h2><div class="cr-poster-row">' +
      '<a href="assets/creators_poster.jpg" target="_blank" rel="noopener"><img src="assets/creators_poster.jpg" alt="' + k.posterAlt + '" loading="lazy" width="1080" height="2943"></a>' +
      '<div><p>' + k.posterText + '</p><a class="btn-gold" href="assets/creators_poster.jpg" download="sandtableclub_poster.jpg">' + k.posterBtn + '</a></div>' +
      '</div></section>';
    var main = document.getElementById('main');
    main.className = '';
    main.innerHTML = html;
    bindCopyGroup();
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
    var s = T().steam;
    html += '<div class="steam-strip">' +
      steamLink('games_capsule', 'steam-strip-capsule', '<img src="' + s.header + '" alt="' + s.capsuleAlt + '" width="460" height="215">') +
      '<p>' + s.strip + '</p>' +
      steamLink('games', 'btn-steam btn-steam-sm', STEAM_LOGO + '<span>' + s.stripBtn + '</span>') +
      '</div>';
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
    else if (page === 'creators') renderCreators();
    else renderLegal(page);
    document.title = (page === 'home' ? T().home : T()[page]).title;
  }

  renderAll();
})();
