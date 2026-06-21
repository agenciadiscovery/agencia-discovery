document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const pill = document.getElementById('header-pill');
  const onScroll = () => {
    if (window.scrollY > 40) pill.classList.add('scrolled');
    else pill.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuToggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    };
    const openMenu = () => {
      mobileMenu.classList.remove('hidden');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  const fadeEls = document.querySelectorAll('.fade-up');

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow, .hero-title, .hero-sub, .hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.2,
      });

      fadeEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });

      gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });

      gsap.utils.toArray('.destino-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });
    });
  } else {
    // Fallback: simple IntersectionObserver reveal if GSAP/CDN fails
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.2 }
    );
    fadeEls.forEach((el) => io.observe(el));
  }
});
