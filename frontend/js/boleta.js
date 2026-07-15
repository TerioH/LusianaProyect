const datos = JSON.parse(localStorage.getItem("boleta"));

if (!datos) {

    alert("No existe una venta para mostrar.");

    window.location = "ventas.html";

}

document.getElementById("numeroBoleta").textContent =
String(datos.numero).padStart(6, "0");

document.getElementById("fecha").textContent =
datos.fecha;

document.getElementById("cliente").textContent =
datos.cliente;

let html = "";

datos.productos.forEach(producto => {

    html += `

    <tr>

        <td>${producto.nombre}</td>

        <td>${producto.cantidad}</td>

        <td>S/. ${Number(producto.precio).toFixed(2)}</td>

        <td>S/. ${Number(producto.subtotal).toFixed(2)}</td>

    </tr>

    `;

});

document.getElementById("detalleBoleta").innerHTML = html;

document.getElementById("total").textContent =
"S/. " + Number(datos.total).toFixed(2);