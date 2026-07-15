const API = "http://localhost:8080";

async function cargarDashboard() {
  const productos = await fetch(API + "/productos").then((r) => r.json());

  const clientes = await fetch(API + "/clientes").then((r) => r.json());

  const ventas = await fetch(API + "/ventas").then((r) => r.json());

  document.getElementById("totalProductos").innerHTML = productos.length;

  document.getElementById("totalClientes").innerHTML = clientes.length;

  document.getElementById("totalVentas").innerHTML = ventas.length;

  // Última venta
  if (ventas.length > 0) {
    const ultima = ventas[ventas.length - 1];

    document.getElementById("clienteUltima").innerHTML = ultima.idCliente;

    document.getElementById("totalUltima").innerHTML =
      "S/. " + Number(ultima.total).toFixed(2);

    document.getElementById("fechaUltima").innerHTML = ultima.fecha.replace(
      "T",
      " ",
    );
  }
}

cargarDashboard();

function actualizarReloj() {
  const ahora = new Date();

  document.getElementById("reloj").innerHTML =
    ahora.toLocaleDateString("es-PE") +
    "<br>" +
    ahora.toLocaleTimeString("es-PE");
}

setInterval(actualizarReloj, 1000);

actualizarReloj();
