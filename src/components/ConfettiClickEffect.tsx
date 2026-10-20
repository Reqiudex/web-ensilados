import { useEffect } from 'react';

export const ConfettiClickEffect = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const count = 5; // cantidad de triguitos por clic
      const size = 3; // 1/5 del tamaño original (15px)

      for (let i = 0; i < count; i++) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'fixed';
        wrapper.style.left = `${e.clientX}px`;
        wrapper.style.top = `${e.clientY}px`;
        wrapper.style.width = `${size}px`;
        wrapper.style.height = `${size}px`;
        wrapper.style.pointerEvents = 'none';
        wrapper.style.zIndex = '9999';
        wrapper.style.opacity = '1';
        wrapper.style.transformOrigin = 'center center';
        wrapper.style.willChange = 'transform, opacity';

        wrapper.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"
            fill="none" stroke="gold" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" class="lucide-wheat">
            <path d="M2 22 16 8"/>
            <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
            <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
            <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
            <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/>
            <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>
            <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>
            <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>
          </svg>
        `;

        document.body.appendChild(wrapper);

        // Variables para animación estilo "hoja cayendo"
        const duration = 2000; // duración total animación en ms
        const startTime = performance.now();

        // Parámetros random para cada trigo
        const amplitudeX = 20 + Math.random() * 15; // amplitud oscilación horizontal
        const amplitudeY = 100 + Math.random() * 50; // distancia vertical total (caída)
        const oscillations = 2 + Math.random() * 2; // cantidad de oscilaciones
        const rotationDirection = Math.random() > 0.5 ? 1 : -1; // dirección rotación
        const rotationAmplitude = 15 + Math.random() * 15; // grados máximos de rotación

        function animate(time: number) {
          const elapsed = time - startTime;
          if (elapsed > duration) {
            // Animación completa, eliminar el elemento
            wrapper.remove();
            return;
          }

          // Progreso [0..1]
          const t = elapsed / duration;

          // Posición X: oscilación seno para simular viento
          const x = amplitudeX * Math.sin(t * oscillations * Math.PI * 2);

          // Posición Y: caída suave, acelerando con fórmula cuadrática
          const y = amplitudeY * (t * t);

          // Rotación: oscilando suavemente
          const rotation = rotationDirection * rotationAmplitude * Math.sin(t * oscillations * Math.PI * 2);

          // Opacidad: comienza en 1, termina en 0 en los últimos 20%
          const opacity = t > 0.8 ? 1 - (t - 0.8) / 0.2 : 1;

          wrapper.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
          wrapper.style.opacity = `${opacity}`;

          requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null;
};
