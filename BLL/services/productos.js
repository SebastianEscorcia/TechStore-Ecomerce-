const productos = [
  { id: 1, nombre: "Diademas Corsair", categoria: "diadema", imagen: "/assets/Images/diademas_corsair.jpg" },
  { id: 2, nombre: "Diademas JBL", categoria: "diadema", imagen: "/assets/Images/diademas_jbl.jpg" },
  { id: 3, nombre: "Diademas Logitech", categoria: "diadema", imagen: "/assets/Images/diademas_logitec.jpg" },
  { id: 4, nombre: "Micrófono Fifine", categoria: "microfono", imagen: "/assets/Images/microfono_fifine.jpg" },
  { id: 5, nombre: "Mouse Logitech", categoria: "mouse", imagen: "/assets/Images/mouse_logitec.jpg" },
  { id: 6, nombre: "Teclado HyperX", categoria: "teclado", imagen: "/assets/Images/teclad_hyperX.webp" },
  { id: 7, nombre: "Teclado Logitech K360", categoria: "teclado", imagen: "/assets/Images/teclado_logitec_k360.jpg" },
  { id: 8, nombre: "Teclado HyperX Alloy", categoria: "teclado", imagen: "/assets/Images/teclado-hyperx-alloy-origins-1-1140x676.webp" },
];

const contenedor = document.getElementById("productos-container");

function renderProductos(filtro = "todos") {
  contenedor.innerHTML = "";
  const filtrados = filtro === "todos" ? productos : productos.filter(p => p.categoria === filtro);
  filtrados.forEach(prod => {
    const card = document.createElement("div");
    card.className = "card-producto";
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h4>${prod.nombre}</h4>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito`);
}

// ✅ ESTA FUNCIÓN DEBE ESTAR FUERA DEL DOMContentLoaded
function filtrar(categoria) {
  renderProductos(categoria);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductos();
});
