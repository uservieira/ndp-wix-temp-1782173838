/* Homepage option 6: Duralast plank picker (filter by collection, tap a plank for room + specs). */
(function () {
  'use strict';
  var dataEl = document.getElementById('v6-data');
  if (!dataEl) return;
  var D;
  try { D = JSON.parse(dataEl.textContent || '[]'); } catch (e) { return; }
  var by = {};
  D.forEach(function (c) { by[c.slug] = c; });
  function $(id) { return document.getElementById(id); }
  function track(name, params) {
    try { if (window.gtag) window.gtag('event', name, params); } catch (e) {}
    try { if (window.fbq) window.fbq('trackCustom', name, params); } catch (e) {}
  }
  function pick(b, scroll) {
    var c = by[b.getAttribute('data-g')];
    if (!c) return;
    var s = b.getAttribute('data-s');
    var col = null;
    for (var i = 0; i < c.colors.length; i++) if (c.colors[i].s === s) col = c.colors[i];
    if (!col) return;
    document.querySelectorAll('.v6-plank').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
    var pv = $('v6-pv');
    pv.src = '/assets/duralast/' + c.slug + '/' + col.s + '-room-md.webp';
    pv.alt = col.n + ' ' + c.name + ' plank in a room';
    $('v6-pn').textContent = col.n;
    $('v6-pc').textContent = 'Duralast ' + c.name;
    $('v6-sp-pk').textContent = c.tierName + ', ' + c.price + ' per sq ft installed';
    $('v6-sp-w').textContent = c.wear;
    $('v6-sp-t').textContent = c.thickness;
    $('v6-sp-p').textContent = c.plank;
    $('v6-sp-k').textContent = col.k;
    var q = $('v6-pq');
    q.textContent = 'Quote ' + col.n;
    q.href = col.href;
    if (scroll) {
      track('rios_color_select', { color: col.n, collection: c.name });
      if (window.innerWidth < 900) {
        var el = $('v6-preview');
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    }
  }
  document.querySelectorAll('.v6-plank').forEach(function (b) {
    b.addEventListener('click', function () { pick(b, true); });
  });
  document.querySelectorAll('.v6-cats button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.v6-cats button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var f = b.getAttribute('data-f');
      document.querySelectorAll('.v6-grp').forEach(function (g) { g.hidden = !(f === 'all' || g.getAttribute('data-g') === f); });
      if (f !== 'all') {
        var first = document.querySelector('.v6-grp[data-g="' + f + '"] .v6-plank');
        if (first) pick(first, false);
      }
    });
  });
  var q = $('v6-pq');
  if (q) q.addEventListener('click', function () { track('rios_quote_cta', { color: $('v6-pn').textContent }); });
  var start = document.querySelector('.v6-plank[data-g="v-evo-xl"][data-s="caramel"]') || document.querySelector('.v6-plank');
  if (start) pick(start, false);
})();
