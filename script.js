const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
function openLightbox(src) { lightboxImage.src = src; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); }
document.querySelectorAll('[data-image]').forEach(item => item.addEventListener('click', () => openLightbox(item.dataset.image)));
document.querySelector('[data-open-gallery]')?.addEventListener('click', () => openLightbox('public/images/exterior.jpeg'));
document.querySelector('.lightbox-close').addEventListener('click', () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); });
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.classList.remove('open'); });

document.getElementById('booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = document.getElementById('guests').value;
  const message = `Hi Puteri, saya ingin semak ketersediaan The Pool Casa.\n\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nTetamu: ${guests}`;
  window.open(`https://wa.me/60137706124?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

// Calm, purposeful motion for the stay experience.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reduceMotion.matches) {
  document.documentElement.classList.add('motion-ready');

  const revealSections = document.querySelectorAll('.quick-stats, .guest-fit-section, .rate-section, .story-section, .stay-guide-section, .gallery-section, .amenities-section, .location-section, .reviews-section, .booking-section');
  const revealItems = document.querySelectorAll('.guest-fit-grid article, .stay-guide-grid article, .gallery-item, .amenities-list > div, .quick-stats > div');

  revealSections.forEach(section => section.setAttribute('data-reveal', ''));
  revealItems.forEach((item, index) => {
    item.setAttribute('data-reveal-item', '');
    item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll('[data-reveal], [data-reveal-item]').forEach(item => revealObserver.observe(item));

  requestAnimationFrame(() => document.querySelector('.hero')?.classList.add('is-ready'));

  const header = document.querySelector('.site-header');
  const heroVisual = document.querySelector('.hero-visual');
  const navLinks = [...document.querySelectorAll('.nav-links a:not(.nav-cta)')];
  const sections = [...document.querySelectorAll('main section[id]')];
  let scrolling = false;

  const updateScrollEffects = () => {
    const scrollY = window.scrollY;
    header?.classList.toggle('is-scrolled', scrollY > 18);

    if (heroVisual && window.innerWidth > 760) {
      heroVisual.style.setProperty('--scroll-shift', `${Math.min(scrollY * -0.035, 18)}px`);
    }

    const activeSection = sections.find(section => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= window.innerHeight * 0.38 && bounds.bottom >= window.innerHeight * 0.38;
    });
    const activeId = activeSection?.id;
    navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`));
    scrolling = false;
  };

  window.addEventListener('scroll', () => {
    if (scrolling) return;
    scrolling = true;
    window.requestAnimationFrame(updateScrollEffects);
  }, { passive: true });
  window.addEventListener('resize', updateScrollEffects, { passive: true });
  updateScrollEffects();

  const whatsappButton = document.querySelector('.whatsapp-float');
  window.setTimeout(() => {
    whatsappButton?.classList.add('is-attention');
    window.setTimeout(() => whatsappButton?.classList.remove('is-attention'), 1250);
  }, 7000);
}
