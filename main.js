// Mobile nav toggle
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
burger?.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll fade-in
const observer = new IntersectionObserver(
  entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.12 }
);

document.querySelectorAll('.card, .writing-card, .about__text, .about__skills, .hero__inner, .contact__inner')
  .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

// Active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 80;
  sections.forEach(s => {
    if (scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${s.id}"]`);
      active?.classList.add('active');
    }
  });
}, { passive: true });
