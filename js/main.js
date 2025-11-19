// Small utilities and interactions for the portfolio
(function(){

  // DOM helpers
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Year in footer
  const yearEl = $('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  const navToggle = $('#navToggle');
  const nav = $('#nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      nav.style.display = nav.classList.contains('open') ? 'flex' : '';
    });
  }

  // Smooth scroll for anchor links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          nav.style.display = '';
        }
      }
    });
  });

  // Theme toggle
  const themeBtn = $('#themeBtn');
  const root = document.documentElement;

  function setTheme(theme) {
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
    if (themeBtn) themeBtn.textContent = theme === 'theme-dark' ? '🌙' : '☀️';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.classList.contains('theme-light') ? 'theme-light' : 'theme-dark';
      setTheme(current === 'theme-dark' ? 'theme-light' : 'theme-dark');
    });
  }

  // Initialize theme button
  const savedTheme = localStorage.getItem('theme') || 'theme-dark';
  setTheme(savedTheme);

  // Contact form validation
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (name.length < 2) {
        alert('Please enter your name.');
        form.name.focus();
        return;
      }

      if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
        alert('Please enter a valid email.');
        form.email.focus();
        return;
      }

      if (message.length < 10) {
        alert('Message must be at least 10 characters.');
        form.message.focus();
        return;
      }

      alert(`Thanks, ${name}! Your message has been received.`);
      form.reset();
    });
  }

  // Tilt effect on project cards
  $$('.project').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

})(); // END of main IIFE
