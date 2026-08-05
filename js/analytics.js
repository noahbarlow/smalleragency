/*
  Smaller Agency measurement layer.
  Set GTM_ID once a Google Tag Manager web container exists (GTM-XXXXXXX).
  Events are pushed now, so the site does not need another code pass later.
*/
(function () {
  'use strict';

  var GTM_ID = '';
  window.dataLayer = window.dataLayer || [];
  window.smallerTrack = function (eventName, parameters) {
    window.dataLayer.push(Object.assign({ event: eventName }, parameters || {}));
  };

  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var firstScript = document.getElementsByTagName('script')[0];
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(GTM_ID);
    firstScript.parentNode.insertBefore(tag, firstScript);
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100);

    if (href.indexOf('mailto:') === 0) {
      window.smallerTrack('contact_email_clicked', { link_text: label, page_path: location.pathname });
      return;
    }
    if (/diagnostics|scorecard|packaging-audit|modern-brand-os/.test(href)) {
      window.smallerTrack('diagnostic_link_clicked', { link_url: href, link_text: label, page_path: location.pathname });
      return;
    }
    if (/supa-power|bestdish|grolsch|edwin-county-farms|lob/.test(href)) {
      window.smallerTrack('case_study_clicked', { case_study: href.replace('.html', ''), page_path: location.pathname });
      return;
    }
    if (/^https?:\/\//.test(href) && link.hostname !== location.hostname) {
      window.smallerTrack('outbound_link_clicked', { link_url: href, link_text: label, page_path: location.pathname });
    }
  });

  var milestones = { 50: false, 90: false };
  function trackDepth() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var percent = Math.round((window.scrollY / max) * 100);
    [50, 90].forEach(function (mark) {
      if (!milestones[mark] && percent >= mark) {
        milestones[mark] = true;
        window.smallerTrack('scroll_depth', { percent_scrolled: mark, page_path: location.pathname });
      }
    });
  }
  window.addEventListener('scroll', trackDepth, { passive: true });
})();
