/* Smaller Agency measurement layer — GA4 web stream. */
(function () {
  'use strict';

  var GA4_ID = 'G-1CGPCW0ZTH';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, {
    send_page_view: true,
    transport_type: 'beacon'
  });

  var firstScript = document.getElementsByTagName('script')[0];
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
  firstScript.parentNode.insertBefore(tag, firstScript);

  window.smallerTrack = function (eventName, parameters) {
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
