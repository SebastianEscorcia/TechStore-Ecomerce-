const slides = document.querySelectorAll(".carrusel .image");
const prevBtn = document.getElementById("control-prev");
const nextBtn = document.getElementById("control-next");
const indicadoresContainer = document.querySelector(".indicadores");
let current = 0;
let intervalo;

function crearIndicadores() {
  slides.forEach((_, i) => {
    const span = document.createElement("span");
    if (i === 0) span.classList.add("active");
    indicadoresContainer.appendChild(span);
  });
}

function mostrarSlide(index, direccion = "right") {
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "slide-left", "slide-right");
    if (i === current) {
      slide.classList.add(direccion === "right" ? "slide-left" : "slide-right");
    }
    if (i === index) {
      slide.classList.add("active");
    }
  });

  // Indicadores
  Array.from(indicadoresContainer.children).forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  current = index;
}

function siguienteSlide() {
  const nextIndex = (current + 1) % slides.length;
  mostrarSlide(nextIndex, "right");
}

function anteriorSlide() {
  const prevIndex = (current - 1 + slides.length) % slides.length;
  mostrarSlide(prevIndex, "left");
}

prevBtn.addEventListener("click", () => {
  anteriorSlide();
  reiniciarIntervalo();
});

nextBtn.addEventListener("click", () => {
  siguienteSlide();
  reiniciarIntervalo();
});

function iniciarIntervalo() {
  intervalo = setInterval(siguienteSlide, 4000);
}

function reiniciarIntervalo() {
  clearInterval(intervalo);
  iniciarIntervalo();
}

crearIndicadores();
mostrarSlide(current);
iniciarIntervalo();
