const API = "http://localhost:8080/clientes";

let idEditar = null;

async function cargarClientes() {
  const respuesta = await fetch(API);

  const clientes = await respuesta.json();

  let html = "";

  clientes.forEach((c) => {
    html += `

        <tr>

        <td>${c.dni}</td>

        <td>${c.nombre}</td>

        <td>${c.apellido}</td>

        <td>${c.telefono}</td>

        <td>${c.correo}</td>

        <td>${c.direccion}</td>

        <td>

        <button
        class="btn btn-warning btn-sm"
        onclick="editar(${c.idCliente})">

        ✏️

        </button>

        <button
        class="btn btn-danger btn-sm"
        onclick="eliminar(${c.idCliente})">

        🗑️

        </button>

        </td>

        </tr>

        `;
  });

  document.getElementById("tablaClientes").innerHTML = html;
}

cargarClientes();

async function guardarCliente() {
  const cliente = {
    dni: document.getElementById("dni").value,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    telefono: document.getElementById("telefono").value,
    correo: document.getElementById("correo").value,
    direccion: document.getElementById("direccion").value,
    estado: true,
  };

  if (idEditar == null) {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
  } else {
    await fetch(API + "/" + idEditar, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
  }

  location.reload();
}

async function editar(id) {
  const respuesta = await fetch(API + "/" + id);

  const c = await respuesta.json();

  idEditar = id;

  document.getElementById("dni").value = c.dni;
  document.getElementById("nombre").value = c.nombre;
  document.getElementById("apellido").value = c.apellido;
  document.getElementById("telefono").value = c.telefono;
  document.getElementById("correo").value = c.correo;
  document.getElementById("direccion").value = c.direccion;

  new bootstrap.Modal(document.getElementById("modalCliente")).show();
}

async function eliminar(id) {
  if (!confirm("¿Eliminar cliente?")) return;

  await fetch(API + "/" + id, {
    method: "DELETE",
  });

  cargarClientes();
}

function limpiarFormulario() {
  idEditar = null;

  document.getElementById("dni").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("direccion").value = "";
}
