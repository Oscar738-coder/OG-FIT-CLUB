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

  // Cambios: mostrar el resto de las fotos
  const moreBtn = document.getElementById("moreChanges");
  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      const open = moreBtn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".change[data-more]").forEach((el) => {
        el.hidden = open;
        if (!open) el.classList.add("is-in");
      });
      moreBtn.setAttribute("aria-expanded", String(!open));
      moreBtn.textContent = open ? "Ver más cambios" : "Ver menos";
      if (open) document.getElementById("cambios").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Planes: foco de luz que sigue al cursor
  document.querySelectorAll(".tier").forEach((t) => {
    t.addEventListener("pointermove", (e) => {
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  // Tarjetas de membresía en 3D: inclinación con el cursor y giro al tocar
  document.querySelectorAll(".card3d").forEach((card) => {
    const tilt = card.querySelector(".card3d__tilt");
    const glares = card.querySelectorAll(".card3d__glare");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (finePointer && !reduce) {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.classList.add("is-active");
        tilt.style.setProperty("--ry", `${(x - 0.5) * 26}deg`);
        tilt.style.setProperty("--rx", `${(0.5 - y) * 20}deg`);
        const flipped = card.getAttribute("aria-pressed") === "true";
        glares.forEach((g) => {
          g.style.setProperty("--gx", `${(flipped ? 1 - x : x) * 100}%`);
          g.style.setProperty("--gy", `${y * 100}%`);
        });
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-active");
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      });
    }

    card.addEventListener("click", () => {
      const flipped = card.getAttribute("aria-pressed") === "true";
      card.setAttribute("aria-pressed", String(!flipped));
    });
  });

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
