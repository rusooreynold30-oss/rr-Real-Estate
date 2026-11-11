// Sticky navbar colour on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal
document.querySelectorAll('.card, .about-box, .contact-grid').forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter animation
const counters = document.querySelectorAll('.num');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n + suffix;
      if (n >= target) clearInterval(timer);
    }, 30);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => counterObserver.observe(c));

// Enquiry form -> WhatsApp
document.getElementById('enquiryForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const interest = document.getElementById('interest').value;
  const message = document.getElementById('message').value.trim();
  const text =
    `Hello RR Real Estates,%0AName: ${encodeURIComponent(name)}` +
    `%0AMobile: ${encodeURIComponent(phone)}` +
    `%0AInterested in: ${encodeURIComponent(interest)}` +
    `%0AMessage: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/919655752929?text=${text}`, '_blank');
});
