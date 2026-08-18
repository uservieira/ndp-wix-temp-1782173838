
  var _y = document.getElementById('year'); if (_y) _y.textContent = new Date().getFullYear();
  document.querySelectorAll('.nav-links a').forEach(function(a){ a.addEventListener('click', function(){ var t=document.getElementById('nav-toggle'); if(t) t.checked=false; }); });
  // Mobile: tap Flooring trigger toggles is-open
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
    dd.querySelectorAll('.nav-dd-menu a').forEach(function(a) {
      a.addEventListener('click', function() {
        var toggle = document.getElementById('nav-toggle');
        if (toggle && toggle.checked) toggle.checked = false;
      });
    });
  });
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
    a.addEventListener('click', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'event':'ndp_phone_click', 'phone_number': a.getAttribute('href').replace('tel:','') });
    });
  });
