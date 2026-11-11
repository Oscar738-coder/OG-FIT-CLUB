/* ============================================================
   CONFIGURACIÓN — edita estos datos antes de publicar
   ============================================================ */
const CONFIG = {
  // Número de WhatsApp con lada de país, solo dígitos (ej. México: 52 + 10 dígitos).
  whatsapp: "522284041575",
  mensajeBase: "Hola Oscar, vi la página de OG Fit Club y quiero empezar.",
};

(() => {
  // Año del footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Nav con fondo al hacer scroll
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Enlaces a WhatsApp (si no hay número configurado, llevan a la sección de contacto)
  const waLink = (interes) => {
    const text = interes ? `${CONFIG.mensajeBase} Me interesa ${interes}.` : CONFIG.mensajeBase;
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  };
  document.querySelectorAll("[data-wa]").forEach((a) => {
    if (!CONFIG.whatsapp) {
      if (a.getAttribute("href") === "#") a.setAttribute("href", "#agendar");
      return;
    }
    a.href = waLink(a.dataset.service);
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Animaciones de entrada
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    // Escalonar elementos hermanos
    const groups = new Map();
    items.forEach((el) => {
      const p = el.parentElement;
      const i = groups.get(p) || 0;
      el.style.setProperty("--d", `${Math.min(i, 5) * 0.08}s`);
      groups.set(p, i + 1);
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  // Video del hero: botón de sonido y pausa cuando no se ve
  const video = document.getElementById("heroVideo");
  const btn = document.getElementById("soundBtn");
  if (video && btn) {
    const label = btn.querySelector("span");
    btn.addEventListener("click", () => {
      video.muted = !video.muted;
      if (!video.muted) { video.currentTime = 0; video.play().catch(() => {}); }
      btn.setAttribute("aria-pressed", String(!video.muted));
      label.textContent = video.muted ? "Activar sonido" : "Silenciar";
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
      video.controls = true;
    } else if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) video.play().catch(() => {}); else video.pause();
      }, { threshold: 0.2 }).observe(video);
    }
  }
})();
