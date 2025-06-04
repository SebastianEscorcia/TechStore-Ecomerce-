class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
        this.total = 0;
        this.init();
    }

    init() {
        // Crear elementos del DOM
        this.createCarritoElements();
        // Agregar event listeners
        this.addEventListeners();
        // Actualizar carrito
        this.updateCarrito();
    }

    createCarritoElements() {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        // Crear sidebar del carrito
        const carritoSidebar = document.createElement('div');
        carritoSidebar.className = 'carrito-sidebar';
        carritoSidebar.innerHTML = `
            <div class="carrito-header">
                <h2>Carrito de Compras</h2>
                <button class="cerrar-carrito">&times;</button>
            </div>
            <div class="carrito-items"></div>
            <div class="carrito-total">
                <h3>Total: <span class="total-precio">$0</span></h3>
                <button class="checkout-btn">Proceder al Pago</button>
            </div>
        `;
        document.body.appendChild(carritoSidebar);
    }

    addEventListeners() {
        // Event listener para abrir carrito
        document.querySelector('.carrito').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleCarrito();
        });

        // Event listener para cerrar carrito
        document.querySelector('.cerrar-carrito').addEventListener('click', () => {
            this.toggleCarrito();
        });

        // Event listener para overlay
        document.querySelector('.overlay').addEventListener('click', () => {
            this.toggleCarrito();
        });

        // Event listener para checkout
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            this.procederAlPago();
        });
    }

    toggleCarrito() {
        document.querySelector('.carrito-sidebar').classList.toggle('active');
        document.querySelector('.overlay').classList.toggle('active');
    }

    agregarProducto(producto) {
        const itemExistente = this.items.find(item => item.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            this.items.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1
            });
        }

        this.guardarCarrito();
        this.updateCarrito();
    }

    eliminarProducto(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardarCarrito();
        this.updateCarrito();
    }

    actualizarCantidad(id, cantidad) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.cantidad = Math.max(0, cantidad);
            if (item.cantidad === 0) {
                this.eliminarProducto(id);
            } else {
                this.guardarCarrito();
                this.updateCarrito();
            }
        }
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    updateCarrito() {
        const carritoItems = document.querySelector('.carrito-items');
        const totalPrecio = document.querySelector('.total-precio');

        if (this.items.length === 0) {
            carritoItems.innerHTML = '<div class="carrito-vacio">El carrito está vacío</div>';
            totalPrecio.textContent = '$0';
            this.updateBadge();
            return;
        }

        this.total = this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        totalPrecio.textContent = `$${this.total.toFixed(2)}`;

        carritoItems.innerHTML = this.items.map(item => `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="item-details">
                    <h3>${item.nombre}</h3>
                    <p class="item-price">$${item.precio}</p>
                    <div class="cantidad-controls">
                        <button class="decrementar" data-id="${item.id}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="incrementar" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="eliminar-item" data-id="${item.id}">&times;</button>
            </div>
        `).join('');

        // Agregar event listeners a los botones
        carritoItems.querySelectorAll('.decrementar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item) {
                    this.actualizarCantidad(id, item.cantidad - 1);
                }
            });
        });

        carritoItems.querySelectorAll('.incrementar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item) {
                    this.actualizarCantidad(id, item.cantidad + 1);
                }
            });
        });

        carritoItems.querySelectorAll('.eliminar-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.dataset.id);
                this.eliminarProducto(id);
            });
        });

        this.updateBadge();
    }

    procederAlPago() {
        if (this.items.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        // Aquí iría la lógica para proceder al pago
        alert('Procediendo al pago...');
    }

    updateBadge() {
        const badge = document.getElementById('carrito-badge');
        const icon = document.querySelector('.carrito');
        const totalItems = this.items.reduce((sum, item) => sum + item.cantidad, 0);
        if (badge && icon) {
            badge.textContent = totalItems;
            if (totalItems > 0) {
                badge.style.display = 'inline-block';
                icon.classList.add('has-items');
            } else {
                badge.style.display = 'none';
                icon.classList.remove('has-items');
            }
        }
    }
}

// Inicializar el carrito
const carrito = new Carrito();

// Exportar la instancia del carrito para usarla en otros archivos
window.carrito = carrito; 