(() => {
  'use strict';
  const config = window.SWAP_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const menu = $('#primary-nav');
  const menuButton = $('.mobile-menu-toggle');
  const header = $('#site-header');
  const toast = $('#toast');
  let toastTimer;

  function notify(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3300);
  }

  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove('is-open');
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  }

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      menuButton.classList.toggle('is-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', isOpen);
    });
  }
  $$('#primary-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (e) => {
    if (menu && menu.classList.contains('is-open') && !e.target.closest('.nav-wrap')) closeMenu();
  });

  const contract = String(config.contractAddress || 'Coming Soon..');
  const contractNode = $('#contract-value');
  if (contractNode) contractNode.textContent = contract;
  const copyButton = $('#copy-contract');
  if (copyButton) copyButton.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(contract);
      } else {
        const area = document.createElement('textarea');
        area.value = contract;
        area.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        if (!ok) throw new Error('Copy unavailable');
      }
      notify('Copied: ' + contract);
      copyButton.classList.add('copied');
      const label = copyButton.querySelector('span');
      if (label) label.textContent = 'Copied!';
      setTimeout(() => { copyButton.classList.remove('copied'); if (label) label.textContent = 'Copy'; }, 2300);
    } catch (error) {
      notify('Copy unavailable in this browser. Address: ' + contract);
    }
  });

  $$('[data-social]').forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.social;
      const url = type === 'x' ? config.xUrl : config.telegramUrl;
      if (url && /^https:\/\//i.test(url)) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        notify(type === 'x' ? 'Official X link coming soon.' : 'Official Telegram link coming soon.');
      }
    });
  });

  function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 16); }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealEls = $$('[data-reveal]');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  const anchors = $$('.primary-nav a');
  const sections = anchors.map(anchor => document.querySelector(anchor.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-28% 0px -60% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
