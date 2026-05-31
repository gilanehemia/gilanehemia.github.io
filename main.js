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

// Contact form — submit via AJAX, stay on page
const form = document.querySelector('.contact-form');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.innerHTML = `
        <div style="text-align:center; padding: 2rem 0;">
          <p style="font-size:1.5rem; margin-bottom:0.5rem;">✓</p>
          <p style="color:var(--clr-text); font-weight:600; margin-bottom:0.25rem;">Message sent!</p>
          <p style="color:var(--clr-muted); font-size:0.9rem;">Thanks for reaching out. I'll get back to you soon.</p>
        </div>`;
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Something went wrong — try again';
    btn.disabled = false;
  }
});

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
