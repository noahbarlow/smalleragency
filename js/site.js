/* smaller agency — scroll systems (vanilla, no deps) */
(function () {
  document.body.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* chip swatches develop like a polaroid when they enter the viewport */
  var chips = document.querySelectorAll('.chip-card');
  if (chips.length && 'IntersectionObserver' in window && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          setTimeout(function () { en.target.classList.add('dev'); }, 150);
          cio.unobserve(en.target);
        }
      });
    }, { threshold: 0.35 });
    chips.forEach(function (c) { cio.observe(c); });
  } else {
    chips.forEach(function (c) { c.classList.add('dev'); });
  }

  if (reduced) return;

  /* full-bleed features: swatch wipes away + image settles as you scroll */
  var features = document.querySelectorAll('.feature');
  if (features.length) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        features.forEach(function (feature) {
          var swatch = feature.querySelector('.feature-swatch');
          var img = feature.querySelector('.feature-stage img');
          var rect = feature.getBoundingClientRect();
          var total = feature.offsetHeight - window.innerHeight;
          if (total <= 0) return;
          var p = Math.min(1, Math.max(0, -rect.top / total));
          if (swatch) swatch.style.opacity = String(1 - p * 0.95);
          if (img) img.style.transform = 'scale(' + (1.08 - p * 0.08) + ')';
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* case-study gallery: hide tiles whose image hasn't been supplied yet */
  document.querySelectorAll('.cs-gallery img').forEach(function (img) {
    var hide = function () {
      var cell = img.closest('.cs-cell');
      if (cell) cell.style.display = 'none';
    };
    if (img.complete && img.naturalWidth === 0) { hide(); return; }
    img.addEventListener('error', hide);
  });

  /* pinned framework: steps light up in sequence */
  var pinwrap = document.querySelector('.pinwrap');
  if (pinwrap && window.matchMedia('(min-width: 821px)').matches) {
    var steps = pinwrap.querySelectorAll('.pin-step');
    var pticking = false;
    var onPin = function () {
      if (pticking) return;
      pticking = true;
      requestAnimationFrame(function () {
        var rect = pinwrap.getBoundingClientRect();
        var total = pinwrap.offsetHeight - window.innerHeight;
        var p = Math.min(0.999, Math.max(0, -rect.top / total));
        var idx = Math.floor(p * steps.length);
        steps.forEach(function (s, i) { s.classList.toggle('active', i <= idx); });
        pticking = false;
      });
    };
    window.addEventListener('scroll', onPin, { passive: true });
    onPin();
  } else if (pinwrap) {
    pinwrap.querySelectorAll('.pin-step').forEach(function (s) { s.classList.add('active'); });
  }
})();
