let carrito = [];

const vistaDetalle = document.getElementById('vista-detalle');
const detalleImg = document.getElementById('detalle-img');
const detalleNombreSub = document.getElementById('detalle-nombre-sub');
const detallePrecio = document.getElementById('detalle-precio');
const contadorProductos = document.getElementById('contador-productos');
const menuCarrito = document.getElementById('carrito-menu');
const itemsCarritoLista = document.getElementById('items-carrito-lista');
const precioTotalCuenta = document.getElementById('precio-total-cuenta');

let productoActivoActual = { 
    nombre: 'iPhone 17 Pro Max', 
    precio: 1731.00, 
    img: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png' 
};

function verDetalle(nombre, precioTexto, urlImagen) {
    detalleImg.src = urlImagen;
    detalleNombreSub.textContent = nombre;
    detallePrecio.textContent = `$${precioTexto}`;
    
    const valorNumerico = parseFloat(precioTexto.replace(/,/g, ''));
    productoActivoActual = { nombre: nombre, precio: valorNumerico, img: urlImagen };
    
    vistaDetalle.scrollIntoView({ behavior: 'smooth' });
}

function agregarAlCarrito(event, nombre, precio, urlImagen) {
    if (event) {
        event.stopPropagation();
    }
    
    const producto = { nombre, precio, img: urlImagen };
    carrito.push(producto);
    actualizarCarritoInterfaz();
    
    menuCarrito.style.display = 'flex';
}

document.getElementById('btn-agregar-detalle').addEventListener('click', () => {
    agregarAlCarrito(null, productoActivoActual.nombre, productoActivoActual.precio, productoActivoActual.img);
});

function actualizarCarritoInterfaz() {
    contadorProductos.textContent = carrito.length;
    itemsCarritoLista.innerHTML = '';
    
    if(carrito.length === 0) {
        itemsCarritoLista.innerHTML = '<p style="color: #666; text-align: center; margin-top: 2rem;">Tu carrito está vacío.</p>';
        precioTotalCuenta.textContent = '0.00';
        return;
    }
    
    let sumaTotal = 0;
    carrito.forEach((item) => {
        sumaTotal += item.precio;
        const div = document.createElement('div');
        div.className = 'item-carrito-tarjeta';
        
        div.innerHTML = `
            <div class="carrito-mini-contenedor-img">
                <img src="${item.img}" alt="${item.nombre}" class="carrito-mini-img">
            </div>
            <div class="item-carrito-detalles">
                <span class="item-carrito-nombre">${item.nombre}</span>
                <strong class="item-carrito-precio">$${item.precio.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong>
            </div>
        `;
        itemsCarritoLista.appendChild(div);
    });
    
    precioTotalCuenta.textContent = sumaTotal.toLocaleString('en-US', {minimumFractionDigits: 2});
}

document.getElementById('abrir-carrito').addEventListener('click', () => menuCarrito.style.display = 'flex');
document.getElementById('cerrar-carrito').addEventListener('click', () => menuCarrito.style.display = 'none');
document.getElementById('vaciar-orden-btn').addEventListener('click', () => {
    carrito = [];
    actualizarCarritoInterfaz();
});
