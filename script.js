// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Fade-in animation on scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.project, .timeline-item, .certificate-card'
  );

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Auto-calculate duration for "Present" positions
document.querySelectorAll('span[data-start]').forEach(span => {
  const [startYear, startMonth] = span.dataset.start.split('-').map(Number);
  const now = new Date();
  let months = (now.getFullYear() - startYear) * 12 + (now.getMonth() + 1 - startMonth);
  if (months < 1) months = 1;
  const yrs = Math.floor(months / 12);
  const mo = months % 12;
  let duration = '';
  if (yrs > 0) duration += yrs + ' yr' + (yrs > 1 ? 's' : '');
  if (yrs > 0 && mo > 0) duration += ' ';
  if (mo > 0) duration += mo + ' mo';
  span.textContent = span.textContent.replace(/Present/, 'Present \u2022 (' + duration + ')');
});

// Burger menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Banner carousel
(function () {
  const slides = document.querySelectorAll('.banner-slide');
  const dotsContainer = document.querySelector('.banner-dots');
  const prevBtn = document.querySelector('.banner-prev');
  const nextBtn = document.querySelector('.banner-next');
  let current = 0;
  let autoTimer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('banner-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.banner-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  resetAuto();
})();

// Navbar background on scroll + active link highlight
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
  }

  // Highlight active section link
  let currentId = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentId = section.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
  });
});
