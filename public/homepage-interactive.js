
  // Year
  var _y = document.getElementById('year'); if (_y) _y.textContent = new Date().getFullYear();

  // Services tabs (v21)
  (function() {
    var tabs = document.querySelectorAll('.svc-tab');
    var panels = document.querySelectorAll('.svc-panel');
    if (!tabs.length || !panels.length) return;
    function activate(target) {
      tabs.forEach(function(t) {
        var on = t.getAttribute('data-target') === target;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function(p) {
        var on = p.id === target;
        p.classList.toggle('is-active', on);
        if (on) { p.removeAttribute('hidden'); } else { p.setAttribute('hidden', ''); }
      });
    }
    tabs.forEach(function(t) {
      t.addEventListener('click', function() { activate(t.getAttribute('data-target')); });
    });
  })();

  // Services dots — derive step from actual first-card width so count and progress match reality
  (function() {
    var track = document.getElementById('services-track');
    var dotsWrap = document.getElementById('services-dots');
    if (!track || !dotsWrap) return;
    var cards = track.querySelectorAll('.service-card');
    if (!cards.length) return;
    dotsWrap.innerHTML = '';
    for (var i = 0; i < cards.length; i++) {
      var d = document.createElement('span');
      if (i === 0) d.className = 'active';
      d.setAttribute('data-idx', String(i));
      dotsWrap.appendChild(d);
    }
    var dots = dotsWrap.querySelectorAll('span');
    function step() {
      var first = cards[0];
      var second = cards[1];
      if (second) return second.offsetLeft - first.offsetLeft;
      return first.getBoundingClientRect().width + 16;
    }
    function updateDot() {
      var s = step();
      if (s <= 0) return;
      var idx = Math.round(track.scrollLeft / s);
      idx = Math.max(0, Math.min(dots.length - 1, idx));
      dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
    }
    track.addEventListener('scroll', updateDot, { passive: true });
    window.addEventListener('resize', updateDot);
    dots.forEach(function(d) {
      d.addEventListener('click', function() {
        var i = parseInt(d.getAttribute('data-idx'), 10) || 0;
        track.scrollTo({ left: i * step(), behavior: 'smooth' });
      });
    });
  })();

  // Close mobile menu when a nav link is tapped, and scroll after close
  (function() {
    var toggle = document.getElementById('nav-toggle');
    if (!toggle) return;

    function closeMenu() {
      toggle.checked = false;
      // Clear any focus so :focus-within on dropdown releases
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
      document.querySelectorAll('.nav-dd.is-open').forEach(function(dd){
        dd.classList.remove('is-open');
        var t = dd.querySelector('.nav-dd-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    function smoothScrollTo(hash) {
      if (!hash || hash === '#') return;
      var el = document.querySelector(hash);
      if (!el) return;
      var y = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Global anchor smooth-scroll for ALL in-page anchor links (hero CTAs, tier CTAs, etc.)
    // This runs BEFORE the nav-specific handler and only fires for anchor links outside the nav.
    document.addEventListener('click', function(e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      // Skip nav links - they have their own handler that closes the menu too
      if (a.closest('.nav-links, .nav-dd-menu')) return;
      var href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      var openTile = a.getAttribute('data-open-tile') === '1';
      var openLvp = a.getAttribute('data-open-lvp') === '1';
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (openTile) {
        var tileTab = document.querySelector('[data-target="tiers-tile"]');
        if (tileTab) tileTab.click();
      } else if (openLvp) {
        var lvpTab = document.querySelector('[data-target="tiers-lvp"]');
        if (lvpTab) lvpTab.click();
      }
      smoothScrollTo(href);
      if (history.replaceState) history.replaceState(null, '', href);
    }, false);

    // Handle all mobile menu link taps: close menu first, then act
    document.querySelectorAll('.nav-links a, .nav-dd-menu a').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var href = a.getAttribute('href') || '';
        var isAnchor = href.charAt(0) === '#';
        var openTile = a.getAttribute('data-open-tile') === '1';
        var openLvp = a.getAttribute('data-open-lvp') === '1';
        var isMobile = window.matchMedia('(max-width: 900px)').matches;

        if (isMobile && (isAnchor || openTile || openLvp)) {
          // We handle the scroll ourselves after the menu closes
          e.preventDefault();
          closeMenu();
          window.setTimeout(function() {
            if (openTile) {
              var tileTab = document.querySelector('[data-target="tiers-tile"]');
              if (tileTab) tileTab.click();
            } else if (openLvp) {
              var lvpTab = document.querySelector('[data-target="tiers-lvp"]');
              if (lvpTab) lvpTab.click();
            }
            if (isAnchor) smoothScrollTo(href);
            // Update URL hash without extra scroll
            if (isAnchor && history.replaceState) history.replaceState(null, '', href);
          }, 260);
        } else if (isMobile) {
          // External or absolute link: just close the menu, let the nav happen
          closeMenu();
        } else if (openTile) {
          // Desktop: still switch tab on Tile click
          window.setTimeout(function(){
            var tileTab = document.querySelector('[data-target="tiers-tile"]');
            if (tileTab) tileTab.click();
          }, 60);
        } else if (openLvp) {
          // Desktop: switch tab back to LVP
          window.setTimeout(function(){
            var lvpTab = document.querySelector('[data-target="tiers-lvp"]');
            if (lvpTab) lvpTab.click();
          }, 60);
        }
      });
    });

    // Backdrop tap closes menu.
    // Because .nav-backdrop is a <label for="nav-toggle">, a click natively
    // toggles the checkbox. If we also call closeMenu() the label's toggle
    // fires afterward and re-checks it. So we intercept the click, prevent
    // the label from toggling, and close ourselves.
    var backdrop = document.querySelector('.nav-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }

    // Escape key closes menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && toggle.checked) closeMenu();
    });

    // Browser back button: if menu is open, close it instead of leaving
    if (window.history && window.history.pushState) {
      var pushed = false;
      toggle.addEventListener('change', function() {
        if (toggle.checked && !pushed) {
          window.history.pushState({ ndpMenu: true }, '');
          pushed = true;
        } else if (!toggle.checked && pushed) {
          pushed = false;
        }
      });
      window.addEventListener('popstate', function(e) {
        if (toggle.checked) {
          closeMenu();
          pushed = false;
        }
      });
    }
  })();

  // Tier button preselects scope
  document.querySelectorAll('[data-tier]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var tier = btn.getAttribute('data-tier');
      var scope = document.getElementById('scope');
      if (!scope) return;
      if (tier === 'labor') scope.value = 'lvp-labor';
      else if (tier === 'standard' || tier === 'premium' || tier === 'entry') scope.value = 'lvp-supplied';
    });
  });

  // Quote form submission — routes to Formspree
  var form = document.getElementById('quote-form');
  if (form) form.addEventListener('submit', function(e) {
    e.preventDefault();
    form.classList.remove('state-success', 'state-error');

    var smsConsentEl = document.getElementById('sms_consent');
    var smsConsent = !!(smsConsentEl && smsConsentEl.checked);
    var consentTs = new Date().toISOString();

    var data = new FormData(form);
    data.set('sms_consent', smsConsent ? 'YES' : 'NO');
    data.set('sms_consent_timestamp', smsConsent ? consentTs : '');
    data.set('sms_consent_language', smsConsent ? 'I agree to receive text messages from New Design Pro about my quote. Message and data rates may apply. Message frequency ~1-4 per active quote. Reply STOP to opt out, HELP for help.' : '');
    data.set('consent_source_url', window.location.href);
    data.set('form_location', 'v3_pplx_app');

    // Helper: read a cookie (used to forward fbp/fbc to CAPI)
    function readCookie(name) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : '';
    }

    // Fire server-side Meta CAPI event in parallel (does nothing if env vars not set)
    var scopeVal = (document.getElementById('scope') || {}).value || '';
    var sqftVal = (document.getElementById('sqft') || {}).value || '';
    var zipVal = (document.getElementById('zip') || {}).value || '';
    var nameVal = (form.elements.name && form.elements.name.value) || '';
    var phoneVal = (form.elements.phone && form.elements.phone.value) || '';

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameVal,
        phone: phoneVal,
        scope: scopeVal,
        sqft: sqftVal,
        zip: zipVal,
        fbp: readCookie('_fbp'),
        fbc: readCookie('_fbc'),
        event_source_url: window.location.href
      })
    }).catch(function() { /* silent — CAPI is best-effort */ });

    fetch('https://formspree.io/f/mlgyeqrg', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function(res) {
      if (res.ok) {
        form.classList.add('state-success');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'ndp_lead_submit',
          'form_location': 'v3_pplx_app',
          'form_name': 'quote_form',
          'sms_consent': smsConsent,
          'lead_scope': scopeVal,
          'lead_sqft': sqftVal,
          'lead_zip': zipVal
        });
        if (typeof fbq === 'function') {
          fbq('track', 'Lead', {
            content_name: 'quote_form',
            content_category: scopeVal,
            value: 300.00,
            currency: 'USD'
          });
        }
        var _hsq = window._hsq = window._hsq || [];
        _hsq.push(['identify', {
          firstname: (form.elements.name && form.elements.name.value.split(' ')[0]) || '',
          phone: (form.elements.phone && form.elements.phone.value) || '',
          sms_consent: smsConsent ? 'yes' : 'no'
        }]);
        _hsq.push(['trackEvent', { id: 'quote_form_submit', value: 300 }]);
        form.reset();
      } else {
        form.classList.add('state-error');
      }
    }).catch(function() {
      form.classList.add('state-error');
    });
  });

  // Track phone taps
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a) {
    a.addEventListener('click', function() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'ndp_phone_click',
        'phone_number': a.getAttribute('href').replace('tel:', '')
      });
    });
  });

  // Flooring type toggle (LVP ↔ Tile)
  document.querySelectorAll('.floor-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.getAttribute('data-target');
      document.querySelectorAll('.floor-tab').forEach(function(t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      document.querySelectorAll('#lvp-pricing .price-tiers').forEach(function(panel) {
        var show = panel.id === target;
        panel.classList.toggle('is-hidden', !show);
        panel.setAttribute('aria-hidden', show ? 'false' : 'true');
      });
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'ndp_floor_toggle', floor_type: target === 'tiers-tile' ? 'tile' : 'lvp' });
      }
    });
  });

  // Mobile: tap Flooring trigger toggles is-open (close handled above)
  document.querySelectorAll('.nav-dd').forEach(function(dd) {
    var trig = dd.querySelector('.nav-dd-trigger');
    if (!trig) return;
    trig.addEventListener('click', function(e) {
      if (window.matchMedia('(max-width: 900px)').matches) {
        e.preventDefault();
        var open = dd.classList.toggle('is-open');
        trig.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    });
  });



/* =============================================================
   LVP COLOR SELECTOR + TILE GALLERY — added Aug 11, 2026
   ============================================================= */
(function() {
  var colorCards = document.querySelectorAll('.lvp-color-card');
  var tileCards = document.querySelectorAll('.tile-card');
  var notes = document.getElementById('notes');

  function scrollToContact() {
    var el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  colorCards.forEach(function(card) {
    card.addEventListener('click', function() {
      var color = card.getAttribute('data-color') || '';
      colorCards.forEach(function(c) { c.classList.remove('is-selected'); });
      card.classList.add('is-selected');

      if (notes) {
        var prefill = 'Interested in LVP color: ' + color + '. ';
        if (notes.value.indexOf('LVP color: ' + color) === -1) {
          notes.value = notes.value.trim().length ? (prefill + notes.value) : prefill;
          notes.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }

      try {
        if (window.dataLayer) window.dataLayer.push({ event: 'lvp_color_select', color: color });
        if (window.fbq) window.fbq('trackCustom', 'LVPColorSelect', { color: color });
      } catch (e) {}

      scrollToContact();
    });
  });

  tileCards.forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
      if (e.target && e.target.closest && e.target.closest('a')) return;
      try {
        if (window.dataLayer) window.dataLayer.push({ event: 'tile_gallery_click' });
      } catch (e2) {}
      scrollToContact();
    });
  });
})();

/* ================================================================
   RIOS FLOOR LVP CAROUSEL — Aug 12, 2026
   ================================================================ */
(function () {
  'use strict';
  var rail = document.getElementById('rios-rail');
  var detail = document.getElementById('rios-detail');
  if (!rail || !detail) return;

  var cards = rail.querySelectorAll('.rios-card');
  var arrows = document.querySelectorAll('.rios-arrow');
  var media = detail.querySelector('.rios-detail-media');
  var img = document.getElementById('rios-detail-img');
  var nameEl = document.getElementById('rios-detail-name');
  var descEl = document.getElementById('rios-detail-desc');
  var dimsEl = document.getElementById('rios-detail-dims');
  var wearEl = document.getElementById('rios-detail-wear');
  var thickEl = document.getElementById('rios-detail-thickness');
  var ctaLink = document.getElementById('rios-detail-cta-link');
  var ctaName = document.getElementById('rios-detail-cta-name');

  function selectCard(card) {
    if (!card) return;
    // Update aria-selected on all cards
    cards.forEach(function (c) { c.setAttribute('aria-selected', c === card ? 'true' : 'false'); });

    var sku = card.dataset.sku;
    var name = card.dataset.name;
    var desc = card.dataset.desc;
    var dims = card.dataset.dims;
    var wear = card.dataset.wear;
    var thickness = card.dataset.thickness;

    // Swap detail image with fade
    if (media && img) {
      media.classList.add('is-swapping');
      var newSrc = '/assets/rios/hero/lvp_' + sku + '-md.jpg';
      var newSrcSet = '/assets/rios/hero/lvp_' + sku + '-md.jpg 800w, /assets/rios/hero/lvp_' + sku + '-lg.jpg 1400w';
      var srcWebp = '/assets/rios/hero/lvp_' + sku + '-md.webp 800w, /assets/rios/hero/lvp_' + sku + '-lg.webp 1400w';
      var sourceWebp = media.querySelector('source[type="image/webp"]');
      var newImage = new Image();
      newImage.onload = function () {
        if (sourceWebp) sourceWebp.setAttribute('srcset', srcWebp);
        img.src = newSrc;
        img.srcset = newSrcSet;
        img.alt = name + ' in a real Florida home';
        setTimeout(function () { media.classList.remove('is-swapping'); }, 30);
      };
      newImage.onerror = function () { media.classList.remove('is-swapping'); };
      newImage.src = newSrc;
    }

    if (nameEl) nameEl.textContent = name;
    if (descEl) descEl.textContent = desc;
    if (dimsEl) dimsEl.textContent = dims;
    if (wearEl) wearEl.textContent = wear;
    if (thickEl) thickEl.textContent = thickness;
    if (ctaName) ctaName.textContent = name;
    if (ctaLink) ctaLink.setAttribute('data-name', name);

    // Analytics
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'rios_color_select', color_name: name, sku: sku });
      if (window.fbq) window.fbq('trackCustom', 'RiosColorSelect', { color: name, sku: sku });
    } catch (e) {}
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () { selectCard(card); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCard(card); }
    });
  });

  // Arrow scrolling
  function scrollRail(dir) {
    if (!rail) return;
    var scrollAmount = rail.clientWidth * 0.7 * dir;
    rail.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  arrows.forEach(function (arrow) {
    arrow.addEventListener('click', function () {
      var dir = parseInt(arrow.dataset.dir, 10) || 1;
      scrollRail(dir);
    });
  });

  // Update arrow disabled state based on scroll position
  function updateArrows() {
    var prev = document.querySelector('.rios-arrow[data-dir="-1"]');
    var next = document.querySelector('.rios-arrow[data-dir="1"]');
    if (!prev || !next) return;
    var atStart = rail.scrollLeft <= 4;
    var atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    prev.disabled = atStart;
    next.disabled = atEnd;
  }
  rail.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();

  // CTA click — prefill notes textarea
  if (ctaLink) {
    ctaLink.addEventListener('click', function (e) {
      var name = ctaLink.dataset.name || 'Rios Floor LVP';
      var notes = document.querySelector('#contact textarea, textarea[name="notes"], textarea[name="message"]');
      if (notes) {
        var msg = 'Interested in Rios ' + name + '. Please bring a sample to the free measure.';
        if (!notes.value || notes.value.trim().length === 0) {
          notes.value = msg;
        } else if (!notes.value.includes(name)) {
          notes.value = msg + '\n\n' + notes.value;
        }
        notes.dispatchEvent(new Event('input', { bubbles: true }));
        notes.dispatchEvent(new Event('change', { bubbles: true }));
      }
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'rios_quote_cta', color_name: name });
        if (window.fbq) window.fbq('trackCustom', 'RiosQuoteCTA', { color: name });
      } catch (err) {}
    });
  }
})();
