/*
 * The Elementor Pro form-submit JS bundle isn't present in this static
 * export, so nothing calls preventDefault() on these forms — a real click
 * on Submit falls through to a native POST against the current page, which
 * 404/405s on static hosting. This patches that: prevent the native
 * submission and show a confirmation. The Found It lead-capture script
 * (loaded separately) still reads the real submit event before this runs,
 * since it listens in the capture phase.
 */
(function () {
  function patchForm(form) {
    if (form.dataset.fiPatched) return;
    form.dataset.fiPatched = '1';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.querySelector('.fi-form-success');
      if (!success) {
        success = document.createElement('div');
        success.className = 'fi-form-success';
        success.style.cssText = 'margin-top:15px;padding:15px 18px;background:#eafaf1;border:1px solid #2ecc71;color:#1e8449;border-radius:4px;font-size:15px;';
        success.textContent = "Thanks — we've received your message and will be in touch shortly.";
        form.appendChild(success);
      }
      success.style.display = 'block';
      form.reset();
    });
  }

  document.querySelectorAll('form.elementor-form').forEach(patchForm);
})();
