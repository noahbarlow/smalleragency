/* Smaller Agency measurement layer — GA4, kept off the critical render path. */
(function () {
  'use strict';

  var GA4_ID = 'G-1CGPCW0ZTH';
  var loaded = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { send_page_view: true, transport_type: 'beacon' });

    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(tag);
    interactionEvents.forEach(function (name) {
      window.removeEventListener(name, loadAnalytics, interactionOptions);
    });
  }

  var interactionEvents = ['pointerdown', 'keydown', 'touchstart'];
  var interactionOptions = { passive: true, once: true };
  interactionEvents.forEach(function (name) {
    window.addEventListener(name, loadAnalytics, interactionOptions);
  });

  /* Keep passive visits measurable, but wait until the page is fully quiet. */
  window.addEventListener('load', function () {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadAnalytics, { timeout: 9000 });
    } else {
      window.setTimeout(loadAnalytics, 9000);
    }
  }, { once: true });

  window.smallerTrack = function (eventName, parameters) {
    loadAnalytics();
    window.gtag('event', eventName, parameters || {});
  };

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100);

    if (href.indexOf('mailto:') === 0) {
      window.smallerTrack('contact_email_clicked', { link_text: label, page_path: location.pathname });
      return;
    }
    if (/diagnostics|scorecard|packaging-audit|modern-brand-os|agency-economics/.test(href)) {
      window.smallerTrack('diagnostic_link_clicked', { link_url: href, link_text: label, page_path: location.pathname });
      return;
    }
    if (/services|toronto-branding-agency|packaging-design-agency-toronto|brand-strategy-agency-toronto|cpg-branding-agency|food-beverage-branding-agency|challenger-brand-strategy|consumer-brand-packaging-design/.test(href)) {
      window.smallerTrack('service_link_clicked', { service_page: href.replace('.html', ''), page_path: location.pathname });
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
