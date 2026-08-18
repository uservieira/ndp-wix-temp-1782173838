
  var _y = document.getElementById('year'); if (_y) _y.textContent = new Date().getFullYear();
  document.querySelectorAll('.nav-links a').forEach(function(a){ a.addEventListener('click', function(){ var t=document.getElementById('nav-toggle'); if(t) t.checked=false; }); });
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
    a.addEventListener('click', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'event':'ndp_phone_click', 'phone_number': a.getAttribute('href').replace('tel:','') });
    });
  });
