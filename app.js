let carrito = [];

const vistaDetalle = document.getElementById('vista-detalle');
const detalleImg = document.getElementById('detalle-img');
const detalleNombreSub = document.getElementById('detalle-nombre-sub');
const detallePrecio = document.getElementById('detalle-precio');
const contadorProductos = document.getElementById('contador-productos');
const menuCarrito = document.getElementById('carrito-menu');
const itemsCarritoLista = document.getElementById('items-carrito-lista');
const precioTotalCuenta = document.getElementById('precio-total-cuenta');

let productoActivoActual = { nombre: 'iPhone 17 Pro Max', precio: 1731.00, img: 'REEMPLAZA_CON_TU_LINK_AQUI' };

function verDetalle(nombre, precioTexto, urlImagen) {
    detalleImg.src = urlImagen;
    detalleNombreSub.textContent = nombre;
    detallePrecio.textContent = `$${precioTexto}`;
    
    const valorNumerico = parseFloat(precioTexto.replace(/,/g, ''));
    productoActivoActual = { nombre: nombre, precio: valorNumerico, img: urlImagen };
    
    vistaDetalle.scrollIntoView({ behavior: 'smooth' });
}

function agregarAlCarrito(event, nombre, precio) {
    if (event) {
        event.stopPropagation();
    }
    
    const producto = { nombre, precio };
    carrito.push(producto);
    actualizarCarritoInterfaz();
    
    menuCarrito.style.display = 'flex';
}

document.getElementById('btn-agregar-detalle').addEventListener('click', () => {
    agregarAlCarrito(null, productoActivoActual.nombre, productoActivoActual.precio);
});

function actualizarCarritoInterfaz() {
    contadorProductos.textContent = carrito.length;
    itemsCarritoLista.innerHTML = '';
    
    if(carrito.length === 0) {
        itemsCarritoLista.innerHTML = '<p style="color: #666; text-align: center;">Tu carrito está vacío.</p>';
        precioTotalCuenta.textContent = '0.00';
        return;
    }
    
    let sumaTotal = 0;
    carrito.forEach((item) => {
        sumaTotal += item.precio;
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.padding = '10px 0';
        div.style.borderBottom = '1px solid #e5e5ea';
        div.innerHTML = `
            <span style="font-weight: 500;">${item.nombre}</span>
            <strong>$${item.precio.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong>
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