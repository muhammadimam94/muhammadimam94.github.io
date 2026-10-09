/* ============================================================
   Pemilih bahasa otomatis (Google Translate)

   - Isi website ditulis SEKALI di index.html (bahasa asli: Indonesia).
   - Tombol ID / EN / KO menerjemahkan halaman otomatis.
   - Script Google hanya dimuat kalau pengunjung memilih EN / KO.
   - Bagian yang tidak ingin diterjemahkan: beri atribut translate="no".
   ============================================================ */
(function () {
  'use strict';

  var SRC = 'id';                 // bahasa asli isi index.html
  var LANGS = ['id', 'en', 'ko']; // harus sama dengan tombol data-lang di index.html

  var root = document.documentElement;
  var buttons = [].slice.call(document.querySelectorAll('.lang button'));

  // Bahasa aktif dibaca dari cookie yang dipakai Google ("/id/en" = id -> en)
  function currentLang() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=(?:\/|%2F)[^\/%;]+(?:\/|%2F)(\w+)/);
    return m && LANGS.indexOf(m[1]) > -1 ? m[1] : SRC;
  }

  function setLang(lang) {
    var host = location.hostname;
    var gone = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    if (lang === SRC) {
      document.cookie = 'googtrans=;path=/;' + gone;
      document.cookie = 'googtrans=;path=/;domain=' + host + ';' + gone;
      document.cookie = 'googtrans=;path=/;domain=.' + host + ';' + gone;
    } else {
      var v = '/' + SRC + '/' + lang;
      document.cookie = 'googtrans=' + v + ';path=/';
      document.cookie = 'googtrans=' + v + ';path=/;domain=' + host;
    }
    location.reload();
  }

  var lang = currentLang();
  root.setAttribute('data-lang', lang); // dipakai CSS untuk font Korea

  buttons.forEach(function (b) {
    var l = b.getAttribute('data-lang');
    b.setAttribute('aria-pressed', l === lang ? 'true' : 'false');
    b.addEventListener('click', function () { if (l !== lang) setLang(l); });
  });

  // Muat Google Translate hanya kalau bukan bahasa asli
  if (lang !== SRC) {
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement({
        pageLanguage: SRC,
        includedLanguages: LANGS.filter(function (l) { return l !== SRC; }).join(','),
        autoDisplay: false
      }, 'google_translate_element');
    };
    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.head.appendChild(s);
  }
})();
