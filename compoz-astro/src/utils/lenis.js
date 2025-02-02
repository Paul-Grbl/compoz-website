import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  /* For Anchor Links Scrolling */
  const anchorLinks = document.querySelectorAll('a[href^="#"], a[href^="/#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // e.preventDefault();

      const t = e.currentTarget;

      if (t) {
        let href = t.getAttribute("href");
        let target = href.startsWith("/#") ? href.substring(1) : href;
        // lenis.scrollTo(target, { offset: -132 } ?? "");
        lenis.scrollTo(target);
      }
    });
  });
});
