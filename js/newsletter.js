(function () {
  'use strict';

  document.querySelectorAll('[data-newsletter-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!window.fetch) return;
      event.preventDefault();

      var button = form.querySelector('button[type="submit"]');
      var status = form.querySelector('[data-newsletter-status]');
      var email = form.querySelector('input[type="email"]');
      var signupDate = form.querySelector('input[name="signup_date"]');
      var originalLabel = button.textContent;

      if (signupDate) signupDate.value = new Date().toISOString();

      button.disabled = true;
      button.textContent = 'Adding you…';
      status.textContent = '';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error('Signup failed');
        form.reset();
        status.textContent = 'You’re on the list. The next brief will land in your inbox.';
        button.textContent = 'You’re in';
        if (window.smallerTrack) {
          window.smallerTrack('newsletter_signup', {
            newsletter: 'challenger_brief',
            page_path: window.location.pathname
          });
        }
      }).catch(function () {
        status.textContent = 'That did not go through. Email noah@smalleragency.com and we’ll add you.';
        button.disabled = false;
        button.textContent = originalLabel;
        if (email) email.focus();
      });
    });
  });
})();
