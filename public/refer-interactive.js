
  var _y = document.getElementById('year'); if (_y) _y.textContent = new Date().getFullYear();
  document.querySelectorAll('.nav-links a').forEach(function(a){ a.addEventListener('click', function(){ var t=document.getElementById('nav-toggle'); if(t) t.checked=false; }); });
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

  var rform = document.getElementById('refer-form-el');
  if (rform) rform.addEventListener('submit', function(e){
    e.preventDefault();
    rform.classList.remove('state-success','state-error');
    var data = new FormData(rform);
    data.set('form_name', 'refer_earn');
    data.set('form_location', 'refer_earn_page');
    data.set('source_url', window.location.href);
    fetch('https://formspree.io/f/mlgyeqrg', { method:'POST', body:data, headers:{'Accept':'application/json'} })
      .then(function(res){
        if (res.ok) {
          rform.classList.add('state-success');
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ 'event':'ndp_referral_submit', 'form_location':'refer_earn_page' });
          rform.reset();
        } else { rform.classList.add('state-error'); }
      }).catch(function(){ rform.classList.add('state-error'); });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
    a.addEventListener('click', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'event':'ndp_phone_click', 'phone_number': a.getAttribute('href').replace('tel:','') });
    });
  });
