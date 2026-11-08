// Greek or English: the visitor's choice, else the browser's language
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('kdc-lang'); } catch (e) {}
  var lang = saved || ((navigator.language || 'el').toLowerCase().indexOf('el') === 0 ? 'el' : 'en');

  function apply(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
  }
  apply(lang);

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('lang-toggle');
    if (!button) return;
    button.addEventListener('click', function () {
      lang = lang === 'el' ? 'en' : 'el';
      apply(lang);
      try { localStorage.setItem('kdc-lang', lang); } catch (e) {}
    });
  });
})();
