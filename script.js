(function () {
  'use strict';

  // 1. Semua tombol CTA (class "js-wa") diarahkan ke WhatsApp
  var WA_LINK = 'https://wa.me/6287841624072?text=Halo%20kak%2C%20saya%20mau%20tanya%20info%20akses%20linknya.';
  document.querySelectorAll('.js-wa').forEach(function (el) {
    el.setAttribute('href', WA_LINK);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // 2. Bayangan header saat halaman di-scroll
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. Menu mobile
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  }
  btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // 4. Angka statistik naik sekali saat terlihat (dilewati bila pengguna mengurangi animasi)
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var counters = document.querySelectorAll('.count');
  function run(el) {
    var to = parseInt(el.dataset.to, 10), start = null, dur = 1200;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { io.observe(c); });
  }

  // 5. Tahun di footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
