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
