(() => {
  document.querySelectorAll('.site-header').forEach(header => {
    const nav = header.querySelector('.nav-wrap');
    const cta = header.querySelector('.mobile-cta');
    if (!nav || !cta) return;
    const programsNav = nav.querySelector('.programs-nav');
    const programsLink = programsNav?.querySelector(':scope > a');
    const isSmallNav = window.matchMedia('(max-width: 900px)');

    if (programsLink) {
      programsLink.setAttribute('aria-expanded', 'false');
      programsLink.addEventListener('click', event => {
        if (!isSmallNav.matches) return;
        event.preventDefault();
        const open = !programsNav.classList.contains('submenu-open');
        programsNav.classList.toggle('submenu-open', open);
        programsLink.setAttribute('aria-expanded', String(open));
      });
      programsNav.addEventListener('mouseenter', () => {
        if (!isSmallNav.matches) programsLink.setAttribute('aria-expanded', 'true');
      });
      programsNav.addEventListener('mouseleave', () => {
        if (!isSmallNav.matches) programsLink.setAttribute('aria-expanded', 'false');
      });
    }

    let toggle = header.querySelector('.menu-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'menu-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.setAttribute('aria-expanded', 'false');
      const icon = document.createElement('span');
      icon.className = 'menu-toggle__icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '☰';
      toggle.append(icon);
      cta.after(toggle);
    }

    const icon = toggle.querySelector('.menu-toggle__icon');
    const setOpen = open => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (icon) icon.textContent = open ? '×' : '☰';
      nav.classList.toggle('is-open', open);
      if (!open && programsNav) {
        programsNav.classList.remove('submenu-open');
        programsLink?.setAttribute('aria-expanded', 'false');
      }
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    cta.addEventListener('click', () => setOpen(false));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      if (link === programsLink && isSmallNav.matches) return;
      setOpen(false);
    }));
    document.addEventListener('pointerdown', event => {
      if (!header.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') setOpen(false);
    });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const revealItems = [...document.querySelectorAll(
    'main > .banner, main > .inner-hero, main > .section, main > .community, main > .ticker, .feature, .program, .learning-panel, .vision-card, .value-card, .location-card, .footer, .site-footer'
  )];

  if (!revealItems.length) return;

  revealItems.forEach((item, index) => {
    item.classList.add('motion-reveal');
    item.style.setProperty('--motion-delay', `${index % 4 * 65}ms`);
  });
  document.body.classList.add('motion-ready');

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  revealItems.forEach(item => observer.observe(item));
})();