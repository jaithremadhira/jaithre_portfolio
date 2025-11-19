// interactions.js — tiny, robust, and accessible
(function(){
  'use strict';

  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

  // Preloader hide
  window.addEventListener('load', ()=> {
    const pre = $('#preloader');
    if(pre){
      pre.classList.add('hidden');
      setTimeout(()=> pre.remove(), 500);
    }
  });

  // Year
  const yearEl = $('#year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle
  const navToggle = $('#navToggle'); const nav = $('#nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      nav.style.display = open ? 'flex' : '';
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Smooth scroll
  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({ behavior:'smooth', block:'start' });
        if(nav && nav.classList.contains('open')){ nav.classList.remove('open'); nav.style.display=''; }
      }
    });
  });

  // Theme toggle + persist
  const themeBtn = $('#themeBtn'); const root = document.documentElement;
  function setTheme(t){ root.classList.remove('theme-dark','theme-light'); root.classList.add(t); localStorage.setItem('theme', t); if(themeBtn) themeBtn.textContent = t==='theme-dark'? '🌙':'☀️'; }
  if(themeBtn) themeBtn.addEventListener('click', ()=> {
    const curr = root.classList.contains('theme-light') ? 'theme-light' : 'theme-dark';
    setTheme(curr === 'theme-dark' ? 'theme-light' : 'theme-dark');
  });
  setTheme(localStorage.getItem('theme') || 'theme-dark');

  // Contact form (demo)
  const form = $('#contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(name.length < 2){ alert('Please enter your name.'); form.name.focus(); return; }
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ alert('Please enter a valid email.'); form.email.focus(); return; }
      if(message.length < 10){ alert('Message must be at least 10 characters.'); form.message.focus(); return; }
      // Replace this with real endpoint if needed
      alert(`Thanks, ${name}! (Demo) Message received.`);
      form.reset();
    });
  }

  // Subtle tilt for projects
  $$('.project').forEach(card=>{
    card.addEventListener('pointermove', (e)=>{
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', ()=>{ card.style.transform=''; });
  });

})();
