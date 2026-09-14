(() => {
  requestAnimationFrame(() => document.body.classList.add('ready'));

  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  if (!hero || !art || matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let frame;
  hero.addEventListener('pointermove', (event) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      art.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
    });
  });
  hero.addEventListener('pointerleave', () => {
    art.style.transform = '';
  });
})();
