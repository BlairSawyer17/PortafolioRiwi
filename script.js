function suave(destino, duracion = 700) {
  const inicio = window.scrollY;
  const header = document.getElementById('header');
  const offset = header ? header.offsetHeight : 0;
  const fin = destino === 0 ? 0 : destino.getBoundingClientRect().top + inicio - offset;
  const distancia = fin - inicio;
  let t0 = null;

  const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  function paso(t) {
    if (t0 === null) t0 = t;
    const p = Math.min((t - t0) / duracion, 1);
    window.scrollTo(0, inicio + distancia * ease(p));
    if (p < 1) requestAnimationFrame(paso);
  }
  requestAnimationFrame(paso);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const destino = id === '#' ? 0 : document.querySelector(id);
    if (destino === null) return;
    e.preventDefault();
    suave(destino);
    const menu = document.getElementById('menu');
    if (menu) menu.checked = false;
  });
});