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

  /* images fade in on load */
  document.querySelectorAll('.chip-card .photo img, .cs-cell img').forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) { img.classList.add('ldd'); return; }
    img.addEventListener('load', function () { img.classList.add('ldd'); });
    img.addEventListener('error', function () { img.classList.add('ldd'); });
  });

  if (reduced) { document.body.classList.add('entered'); return; }

  /* hero entrance */
  requestAnimationFrame(function () { document.body.classList.add('entered'); });

  /* scroll progress hairline */
  var prog = document.createElement('div');
  prog.className = 'scroll-progress';
  document.body.appendChild(prog);

  /* years-operating: a live clock, ticking since day one */
  document.querySelectorAll('.yrs[data-since]').forEach(function (el) {
    var t0 = new Date(el.getAttribute('data-since') + 'T00:00:00').getTime();
    var tick = function () {
      var y = (Date.now() - t0) / 3.15576e10;
      var s = y.toFixed(8);
      el.innerHTML = s.slice(0, s.indexOf('.')) + '<span class="dec">.' + s.slice(s.indexOf('.') + 1) + '</span>';
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  /* count-up stats */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        nio.unobserve(en.target);
        var el = en.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var t0 = null;
        var dur = 1100;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { nio.observe(c); });
  }

  /* filmstrip drag-to-scroll */
  document.querySelectorAll('.filmstrip').forEach(function (strip) {
    var down = false, startX = 0, startScroll = 0;
    strip.addEventListener('pointerdown', function (e) {
      down = true; startX = e.clientX; startScroll = strip.scrollLeft;
      strip.classList.add('dragging');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      strip.scrollLeft = startScroll - (e.clientX - startX);
    });
    window.addEventListener('pointerup', function () {
      down = false; strip.classList.remove('dragging');
    });
  });

  /* magnetic buttons */
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (fine) {
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        btn.style.transform = 'translate(' + (dx * 5) + 'px,' + (dy * 4) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* features with multiple frames get an indicator dot per frame */
  document.querySelectorAll('.feature').forEach(function (feature) {
    var imgs = feature.querySelectorAll('.feature-stage img');
    if (imgs.length < 2) return;
    var dots = document.createElement('div');
    dots.className = 'fs-dots';
    dots.setAttribute('aria-hidden', 'true');
    imgs.forEach(function (im, i) {
      var d = document.createElement('i');
      if (i === 0) d.className = 'on';
      dots.appendChild(d);
    });
    feature.querySelector('.feature-stage').appendChild(dots);
  });

  /* unified scroll loop: features, progress bar, marquee velocity skew */
  var features = document.querySelectorAll('.feature');
  var marquees = document.querySelectorAll('.marquee, .mq-parade, .mq-shout');
  var lastY = window.scrollY, vel = 0;
  var ticking = false;
  var onScroll = function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      vel = vel * 0.82 + (y - lastY) * 0.18;
      lastY = y;

      /* progress hairline */
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      if (prog && max > 0) prog.style.transform = 'scaleX(' + (y / max) + ')';

      /* marquee skew follows scroll velocity */
      var skew = Math.max(-6, Math.min(6, vel * 0.35));
      marquees.forEach(function (m) {
        if (m.closest('.mq-collide')) return; /* keep the tape's own tilt */
        m.style.transform = 'skewX(' + (-skew) + 'deg)';
      });

      /* features: frame swaps + settle + caption parallax */
      features.forEach(function (feature) {
        var imgs = feature.querySelectorAll('.feature-stage img');
        var cap = feature.querySelector('.feature-caption');
        var rect = feature.getBoundingClientRect();
        var total = feature.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        var p = Math.min(1, Math.max(0, -rect.top / total));
        var sc = 'scale(' + (1.08 - p * 0.08) + ')';
        imgs.forEach(function (im) { im.style.transform = sc; });
        if (imgs.length > 1) {
          var idx = Math.min(imgs.length - 1, Math.floor(p * imgs.length));
          imgs.forEach(function (im, i) { im.classList.toggle('on', i === idx); });
          var dots = feature.querySelectorAll('.fs-dots i');
          dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
        }
        if (cap) {
          cap.style.transform = 'translateY(' + (p * -26) + 'px)';
          cap.style.opacity = String(Math.min(1, 0.35 + p * 2.2));
        }
      });

      /* pinned framework progress hairline */
      var pinbar = document.querySelector('.pin-progress i');
      var pinwrapEl = document.querySelector('.pinwrap');
      if (pinbar && pinwrapEl) {
        var pr = pinwrapEl.getBoundingClientRect();
        var pt = pinwrapEl.offsetHeight - window.innerHeight;
        if (pt > 0) {
          var pp = Math.min(1, Math.max(0, -pr.top / pt));
          pinbar.style.width = (pp * 100) + '%';
        }
      }

      if (Math.abs(vel) > 0.2) { ticking = false; onScroll(); return; }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
