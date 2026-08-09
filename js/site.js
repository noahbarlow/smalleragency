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

  /* horizontal image rails remain usable by keyboard as well as touch */
  document.querySelectorAll('.cs-gallery, .filmstrip').forEach(function (rail) {
    rail.setAttribute('tabindex', '0');
    if (!rail.getAttribute('aria-label')) rail.setAttribute('aria-label', 'Project images');
  });

  /* Accessible before/after comparisons shared by case studies and homepage proof. */
  document.querySelectorAll('[data-before-after]').forEach(function (compare) {
    var range = compare.querySelector('.bevp-compare-range');
    if (!range) return;
    var updateCompare = function () {
      var before = Number(range.value);
      compare.style.setProperty('--split', before + '%');
      range.setAttribute('aria-valuetext', before + '% before, ' + (100 - before) + '% after');
    };
    range.addEventListener('input', updateCompare);
    updateCompare();
  });

  /* reveal only supporting content; the primary headline is always immediate */
  var reveals = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (item) { item.classList.add('in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (item) { revealObserver.observe(item); });
  }

  /* Real project motion loads only when it is about to be seen. */
  var motionVideos = document.querySelectorAll('video.lazy-motion');
  if (!reduced && motionVideos.length) {
    var loadMotion = function (video) {
      if (video.dataset.loaded) return;
      video.querySelectorAll('source[data-src]').forEach(function (source) {
        source.src = source.getAttribute('data-src');
      });
      video.dataset.loaded = 'true';
      video.load();
      var playing = video.play();
      if (playing && typeof playing.catch === 'function') playing.catch(function () {});
    };
    if ('IntersectionObserver' in window) {
      var motionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          loadMotion(entry.target);
          motionObserver.unobserve(entry.target);
        });
      }, { rootMargin: '80px 0px', threshold: 0.01 });
      motionVideos.forEach(function (video) { motionObserver.observe(video); });
    } else {
      motionVideos.forEach(loadMotion);
    }
  }

  if (reduced) { document.body.classList.add('entered'); return; }

  /* hero entrance */
  requestAnimationFrame(function () { document.body.classList.add('entered'); });

  /* scroll progress hairline */
  var prog = document.createElement('div');
  prog.className = 'scroll-progress';
  document.body.appendChild(prog);

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
    /* hover previews that follow the cursor */
    var rows = document.querySelectorAll('[data-preview]');
    if (rows.length) {
      var pv = document.createElement('img');
      pv.className = 'row-preview';
      pv.alt = '';
      document.body.appendChild(pv);
      rows.forEach(function (row) {
        row.addEventListener('mouseenter', function () {
          pv.src = row.getAttribute('data-preview');
          pv.classList.add('on');
        });
        row.addEventListener('mouseleave', function () { pv.classList.remove('on'); });
        row.addEventListener('mousemove', function (e) {
          pv.style.transform = 'translate(' + (e.clientX + 26) + 'px,' + (e.clientY - 100) + 'px) rotate(2.5deg)';
        });
      });
    }

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
    var imgs = feature.querySelectorAll('.feature-stage > .feature-frame, .feature-stage > img');
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

      /* features: scroll-led proof wipes + settle.
         The stage pins below the sticky header, so the page never jumps.
         A clean wipe avoids the ghosted double-image feel of a crossfade. */
      features.forEach(function (feature) {
        var stage = feature.querySelector('.feature-stage');
        var imgs = feature.querySelectorAll('.feature-stage > .feature-frame, .feature-stage > img');
        var rect = feature.getBoundingClientRect();
        var total = feature.offsetHeight - stage.offsetHeight;
        if (total <= 0) return;
        var stickyTop = parseFloat(window.getComputedStyle(stage).top) || 0;
        var p = Math.min(1, Math.max(0, (stickyTop - rect.top) / total));
        var sc = 'scale(' + (1.06 - p * 0.06) + ')';
        imgs.forEach(function (im) { im.style.transform = sc; });
        if (imgs.length > 1) {
          var frame = p * (imgs.length - 1);
          imgs.forEach(function (im, i) {
            var reveal = i === 0 ? 1 : Math.min(1, Math.max(0, frame - (i - 1)));
            reveal = reveal * reveal * (3 - 2 * reveal); /* smoothstep */
            im.style.opacity = 1;
            im.style.clipPath = 'inset(0 ' + ((1 - reveal) * 100) + '% 0 0)';
            im.classList.toggle('on', i === Math.round(frame));
          });
          var dots = feature.querySelectorAll('.fs-dots i');
          dots.forEach(function (d, i) { d.classList.toggle('on', i === Math.round(frame)); });
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

  /* Services hub: the specialist list changes one deliberate proof image. */
  var specialistRows = document.querySelectorAll('.specialist-row');
  if (specialistRows.length) {
    var specialistImages = document.querySelectorAll('.specialist-preview > img');
    var specialistCount = document.querySelector('.specialist-index b');
    var setSpecialist = function (index) {
      specialistRows.forEach(function (row, i) { row.classList.toggle('on', i === index); });
      specialistImages.forEach(function (img, i) { img.classList.toggle('on', i === index); });
      if (specialistCount) specialistCount.textContent = '0' + (index + 1) + ' / 04';
    };
    specialistRows.forEach(function (row, index) {
      row.addEventListener('mouseenter', function () { setSpecialist(index); });
      row.addEventListener('focus', function () { setSpecialist(index); });
    });
    setSpecialist(0);
  }

  /* Service methods: project proof follows the step currently being read. */
  document.querySelectorAll('.service-method').forEach(function (method) {
    var rows = method.querySelectorAll('[data-method-step]');
    var images = method.querySelectorAll('.service-method-visual > img');
    var count = method.querySelector('.service-method-visual figcaption b');
    if (!rows.length || !images.length) return;
    var activate = function (index) {
      rows.forEach(function (row, i) { row.classList.toggle('on', i === index); });
      images.forEach(function (img, i) { img.classList.toggle('on', i === index); });
      if (count) count.textContent = '0' + (index + 1) + ' / 03';
    };
    rows.forEach(function (row, index) {
      row.addEventListener('mouseenter', function () { activate(index); });
      row.addEventListener('focusin', function () { activate(index); });
    });
    if ('IntersectionObserver' in window) {
      var methodObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) activate(parseInt(entry.target.getAttribute('data-method-step'), 10));
        });
      }, { rootMargin: '-38% 0px -38% 0px', threshold: 0 });
      rows.forEach(function (row) { methodObserver.observe(row); });
    }
    activate(0);
  });
})();
