const API="http://localhost:8080";

let productos=[];

let carrito=[];

cargarClientes();

cargarProductos();

async function cargarClientes(){

const datos=await fetch(API+"/clientes").then(r=>r.json());

let html="";

datos.forEach(c=>{

html+=`<option value="${c.idCliente}">

${c.nombre} ${c.apellido}

</option>`;

});

document.getElementById("cliente").innerHTML=html;

}

async function cargarProductos(){

productos=await fetch(API+"/productos").then(r=>r.json());

let html="";

productos.forEach(p=>{

html+=`<option value="${p.idProducto}">

${p.nombre}

</option>`;

});

document.getElementById("producto").innerHTML=html;

}

function agregarProducto() {

    const id = Number(document.getElementById("producto").value);
    const cantidad = Number(document.getElementById("cantidad").value);

    if (cantidad <= 0) {
        alert("Ingrese una cantidad válida");
        return;
    }

    const producto = productos.find(p => p.idProducto == id);

    if (!producto) return;

    carrito.push({
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        subtotal: producto.precio * cantidad
    });

    actualizarTabla();

}

function actualizarTabla() {

    let html = "";

    let total = 0;

    carrito.forEach(item => {

        total += item.subtotal;

        html += `
        <tr>

            <td>${item.nombre}</td>

            <td>${item.cantidad}</td>

            <td>S/. ${item.precio}</td>

            <td>S/. ${item.subtotal}</td>

        </tr>
        `;

    });

    document.getElementById("carrito").innerHTML = html;

    document.getElementById("total").innerHTML =
        "S/. " + total.toFixed(2);

}

document.getElementById("btnVenta").addEventListener("click", realizarVenta);

async function realizarVenta() {

    if (carrito.length === 0) {
        alert("Debe agregar productos.");
        return;
    }

    const venta = {

        idCliente: Number(document.getElementById("cliente").value),

        productos: carrito.map(item => ({

            idProducto: item.idProducto,
            cantidad: item.cantidad

        }))

    };

    const respuesta = await fetch("http://localhost:8080/ventas", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(venta)

    });

    if (respuesta.ok) {

        alert("Venta registrada correctamente");

        carrito = [];

        actualizarTabla();

    } else {

        alert("Error al registrar la venta");

    }

}

async function cargarDashboard(){

    const productos = await fetch("http://localhost:8080/productos").then(r=>r.json());
    const clientes  = await fetch("http://localhost:8080/clientes").then(r=>r.json());
    const ventas    = await fetch("http://localhost:8080/ventas").then(r=>r.json());

    document.getElementById("productos").textContent = productos.length;
    document.getElementById("clientes").textContent = clientes.length;
    document.getElementById("ventas").textContent = ventas.length;

}

cargarDashboard();