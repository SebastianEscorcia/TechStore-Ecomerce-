 // Función para animar una sección
  function animarElemento(idDestino) {
    const destino = document.querySelector(idDestino);
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' }); // desplazamiento suave

      // Le agregamos la clase de animación
      destino.classList.add('resaltar');

      // La eliminamos después de un tiempo para que pueda reutilizarse
      setTimeout(() => destino.classList.remove('resaltar'), 1000);
    }
  }

  // Asignar evento a los submenús
  document.getElementById('preguntas-frecuentes').addEventListener('click', function (e) {
    e.preventDefault();
    animarElemento('#footer-info');
  });

  document.getElementById('contacto').addEventListener('click', function (e) {
    e.preventDefault();
    animarElemento('#footer-contacto');
  });