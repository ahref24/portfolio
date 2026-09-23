// Dossier nav: highlight the section currently in view.
// User-triggered motion only; no scroll-jacking, respects reduced motion.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail-link'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('active'); });
      var link = map[entry.target.id];
      if (link) link.classList.add('active');
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: 0.05 });

  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
