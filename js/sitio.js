// Menú móvil accesible: botón con aria-expanded, cierre con Escape, al elegir un enlace o al tocar fuera.
const boton = document.querySelector('.menu-boton');
const menu = document.getElementById('menu-principal');

if (boton && menu) {
  const abrir = (si) => {
    boton.setAttribute('aria-expanded', String(si));
    menu.classList.toggle('abierto', si);
  };
  boton.addEventListener('click', () => abrir(boton.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) abrir(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') { abrir(false); boton.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !boton.contains(e.target)) abrir(false);
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (m) => { if (m.matches) abrir(false); });
}
