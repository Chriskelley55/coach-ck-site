// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('mobileMenu');
toggle.addEventListener('click', () => {
  menu.classList.toggle('open');
  toggle.classList.toggle('active');
});

// Close mobile menu on link click
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.classList.remove('active');
  });
});

// Nav background on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(245, 240, 232, 0.12)'
    : 'rgba(245, 240, 232, 0.08)';
});

// Smooth reveal on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .approach-card, .deliverable, .timeline-item, .about-photo, .video-embed, .coaches-bar, .booking-inner, .pull-quote').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Add revealed class styles
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Stagger card animations
document.querySelectorAll('.cards').forEach(grid => {
  const cards = grid.querySelectorAll('.card');
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('revealed'), i * 120);
        });
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  gridObserver.observe(grid);
});
