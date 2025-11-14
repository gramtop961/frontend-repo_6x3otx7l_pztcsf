// Core interactions for construction theme
(function(){
  // Loader
  const loader = document.createElement('div');
  loader.className = 'loader-overlay';
  loader.innerHTML = '<div class="spinner"></div>';
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(loader);
  });
  window.addEventListener('load', () => {
    setTimeout(()=> loader.classList.add('hidden'), 400);
  });

  // Intersection Observer for reveal animations
  const observer = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        obs.unobserve(e.target); // trigger once
      }
    })
  }, {threshold: 0.15});

  const toReveal = () => document.querySelectorAll('.reveal');
  document.addEventListener('DOMContentLoaded', ()=>{
    toReveal().forEach(el=>observer.observe(el));
  });

  // Mobile menu toggle
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-menu]');
    if(btn){
      const menu = document.querySelector('#mobileMenu');
      menu?.classList.toggle('open');
    }
  });

  // Lightbox for gallery
  function setupLightbox(){
    const figures = document.querySelectorAll('.gallery figure');
    if(!figures.length) return;
    let box = document.querySelector('.lightbox');
    if(!box){
      box = document.createElement('div');
      box.className = 'lightbox';
      box.innerHTML = '<button class="close">Close</button><img alt="Project" />';
      document.body.appendChild(box);
      box.addEventListener('click', (e)=>{
        if(e.target.classList.contains('close') || e.target === box){
          box.classList.remove('open');
        }
      });
    }
    figures.forEach(fig=>{
      fig.addEventListener('click', ()=>{
        const img = fig.querySelector('img');
        box.querySelector('img').src = img.src;
        box.classList.add('open');
      })
    })
  }
  document.addEventListener('DOMContentLoaded', setupLightbox);

  // Form validation (basic)
  document.addEventListener('submit', (e)=>{
    const form = e.target.closest('[data-validate]');
    if(!form) return;
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    let valid = true;
    const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
    const phoneOk = /^[0-9+\-()\s]{7,}$/.test(phone);
    form.querySelectorAll('.error').forEach(e=>e.textContent='');

    if(!name){ valid=false; form.querySelector('[data-err="name"]').textContent='Please enter your name.' }
    if(!emailOk){ valid=false; form.querySelector('[data-err="email"]').textContent='Enter a valid email.' }
    if(!phoneOk){ valid=false; form.querySelector('[data-err="phone"]').textContent='Enter a valid phone.' }
    if(message.length < 10){ valid=false; form.querySelector('[data-err="message"]').textContent='Message should be at least 10 characters.' }

    if(!valid){ e.preventDefault(); }
  });
})();
