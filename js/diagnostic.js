/* Smaller Agency — one focused diagnostic engine, three sharp reads. */
(function () {
  'use strict';

  var root = document.getElementById('diagnostic-root');
  if (!root || !window.SMALLER_DIAGNOSTICS) return;

  var kind = document.body.getAttribute('data-diagnostic');
  var source = window.SMALLER_DIAGNOSTICS[kind];
  var page = window.DIAGNOSTIC_PAGE || {};
  if (!source) return;

  var questions = source.questions;
  var tiers = source.tiers;
  var state = { index: -1, answers: new Array(questions.length).fill(null), locked: false };
  var progress = document.getElementById('diagnostic-progress');
  var coverImage = document.getElementById('diagnostic-cover-image');
  var coverPrinciple = document.getElementById('diagnostic-principle');

  function esc(value) {
    return String(value).replace(/[&<>\"]/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' }[character];
    });
  }

  function track(name, details) {
    if (typeof window.smallerTrack === 'function') window.smallerTrack(name, details || {});
  }

  function setProgress(percent) {
    if (progress) progress.style.setProperty('--progress', percent + '%');
  }

  function updateCover(question) {
    if (!question || !question.img || !coverImage) return;
    coverImage.classList.add('changing');
    window.setTimeout(function () {
      coverImage.src = question.img;
      coverImage.alt = question.principle ? question.principle + ' — Modern Brand OS principle' : '';
      if (coverPrinciple) coverPrinciple.textContent = question.principle || '';
      coverImage.classList.remove('changing');
    }, 140);
  }

  function focusHeading() {
    var heading = root.querySelector('[data-focus-heading]');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  function renderQuestion() {
    var question = questions[state.index];
    var percent = Math.round(((state.index + 1) / questions.length) * 100);
    setProgress(percent);
    updateCover(question);

    var options = question.a.map(function (option, optionIndex) {
      return '<button class="diagnostic-option" type="button" data-score="' + option.s + '">' +
        '<span class="option-key">' + String.fromCharCode(65 + optionIndex) + '</span>' +
        '<span class="option-copy">' + esc(option.t) + '</span>' +
        '<span class="option-arrow" aria-hidden="true">↗</span>' +
      '</button>';
    }).join('');

    root.innerHTML =
      '<section class="diagnostic-step question-step" aria-live="polite">' +
        '<div class="question-meta"><span>' + String(state.index + 1).padStart(2, '0') + ' / ' + String(questions.length).padStart(2, '0') + '</span>' +
        (question.principle ? '<span>' + esc(question.principle) + '</span>' : '<span>' + esc(page.shortName || 'Brand diagnostic') + '</span>') + '</div>' +
        '<h1 class="diagnostic-question" data-focus-heading>' + esc(question.q) + '</h1>' +
        '<div class="diagnostic-options">' + options + '</div>' +
        '<div class="question-footer"><span>Use A–D or 1–4</span>' +
        (state.index > 0 ? '<button type="button" class="text-button" id="diagnostic-back">← previous question</button>' : '') + '</div>' +
      '</section>';

    root.querySelectorAll('[data-score]').forEach(function (button, optionIndex) {
      button.addEventListener('click', function () {
        if (state.locked) return;
        state.locked = true;
        state.answers[state.index] = Number(button.getAttribute('data-score'));
        button.classList.add('selected');
        window.setTimeout(function () {
          state.index += 1;
          state.locked = false;
          if (state.index >= questions.length) renderResults();
          else renderQuestion();
        }, 240);
      });
      button.setAttribute('aria-keyshortcuts', String.fromCharCode(65 + optionIndex) + ' ' + (optionIndex + 1));
    });

    var back = document.getElementById('diagnostic-back');
    if (back) back.addEventListener('click', function () {
      if (state.locked) return;
      state.index = Math.max(0, state.index - 1);
      renderQuestion();
    });
    window.scrollTo({ top: window.innerWidth <= 900 ? document.querySelector('.diagnostic-panel').offsetTop : 0, behavior: 'auto' });
    focusHeading();
  }

  function renderResults() {
    var score = state.answers.reduce(function (total, answer) { return total + (answer || 0); }, 0);
    var tierIndex = tiers.findIndex(function (tier) { return score >= tier.range[0] && score <= tier.range[1]; });
    var tier = tiers[tierIndex > -1 ? tierIndex : 0];
    var max = questions.length * 3;
    var recommendations = tier.recs.map(function (recommendation, index) {
      return '<li><span>' + String(index + 1).padStart(2, '0') + '</span><p>' + esc(recommendation) + '</p></li>';
    }).join('');

    setProgress(100);
    track('diagnostic_completed', { diagnostic_name: page.id, score: score, tier: tier.name });
    root.innerHTML =
      '<section class="diagnostic-step result-step" aria-live="polite">' +
        '<div class="result-topline"><span class="result-stamp">' + esc(tier.name) + '</span><span class="result-score"><b data-score-count>0</b> / ' + max + '</span></div>' +
        '<h1 data-focus-heading>' + esc(tier.headline) + '</h1>' +
        '<p class="result-body">' + esc(tier.body) + '</p>' +
        '<div class="result-focus"><div class="eyebrow">What to do next</div><ol>' + recommendations + '</ol></div>' +
        '<div class="diagnostic-gate" id="diagnostic-gate">' +
          '<div class="eyebrow">' + esc(page.gateEyebrow) + '</div>' +
          '<h2>' + esc(page.gateHeadline) + '</h2>' +
          '<p>' + esc(page.gateBody) + '</p>' +
          '<form id="diagnostic-form" action="https://formspree.io/f/xkoerznn" method="POST">' +
            '<input type="hidden" name="_subject" value="' + esc(page.emailSubject) + '">' +
            '<input type="hidden" name="diagnostic" value="' + esc(page.id) + '">' +
            '<input type="hidden" name="score" value="' + score + '">' +
            '<input type="hidden" name="tier" value="' + esc(tier.name) + '">' +
            '<label><span>Email</span><input type="email" name="email" autocomplete="email" placeholder="you@company.com" required></label>' +
            '<div class="gate-row"><label><span>Brand or company</span><input type="text" name="company" autocomplete="organization" placeholder="Brand or company"></label>' +
            '<label><span>' + esc(page.optionalLabel) + '</span><input type="url" name="' + esc(page.optionalName) + '" placeholder="https://"></label></div>' +
            '<button class="btn hot" type="submit">' + esc(page.submitLabel) + '</button>' +
            '<p class="gate-legal">No newsletter. No drip. One human reply.</p>' +
          '</form>' +
          '<div class="gate-thanks" hidden><div class="eyebrow">Sent</div><h2>Got it.</h2><p>' + esc(page.thanksBody) + '</p><a class="btn" href="contact.html">Talk about a project</a></div>' +
        '</div>' +
        '<div class="result-actions"><button type="button" class="text-button" id="diagnostic-retake">Retake this</button><a href="diagnostics.html">Try another diagnostic →</a></div>' +
      '</section>';

    var count = root.querySelector('[data-score-count]');
    var start = performance.now();
    function animate(now) {
      var p = Math.min(1, (now - start) / 900);
      count.textContent = Math.round(score * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    document.getElementById('diagnostic-retake').addEventListener('click', function () {
      state.index = 0;
      state.answers = new Array(questions.length).fill(null);
      renderQuestion();
    });

    var form = document.getElementById('diagnostic-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (response) {
          if (!response.ok) throw new Error('Send failed');
          track('generate_lead', { lead_source: 'diagnostic', diagnostic_name: page.id, score: score, tier: tier.name });
          form.hidden = true;
          root.querySelector('.gate-thanks').hidden = false;
        })
        .catch(function () {
          button.disabled = false;
          button.textContent = page.submitLabel;
          var existing = form.querySelector('.form-error');
          if (!existing) form.insertAdjacentHTML('beforeend', '<p class="form-error">That did not send. Email <a href="mailto:noah@smalleragency.com">noah@smalleragency.com</a> instead.</p>');
        });
    });
    window.scrollTo({ top: window.innerWidth <= 900 ? document.querySelector('.diagnostic-panel').offsetTop : 0, behavior: 'auto' });
    focusHeading();
  }

  var startButton = document.getElementById('diagnostic-start');
  if (startButton) startButton.addEventListener('click', function () {
    state.index = 0;
    track('diagnostic_started', { diagnostic_name: page.id });
    renderQuestion();
  });

  document.addEventListener('keydown', function (event) {
    if (state.index < 0 && event.key === 'Enter' && startButton) {
      event.preventDefault();
      startButton.click();
      return;
    }
    if (state.index < 0 || state.index >= questions.length || state.locked) return;
    var key = event.key.toLowerCase();
    var map = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };
    if (!(key in map)) return;
    var options = root.querySelectorAll('[data-score]');
    if (options[map[key]]) {
      event.preventDefault();
      options[map[key]].click();
    }
  });
})();
