const API="http://localhost:8080/productos";

let idEditar = null;

async function cargarProductos(){

    const respuesta=await fetch(API);

    const productos=await respuesta.json();

    let html="";

    productos.forEach(p=>{

        html+=`

        <tr>

        <td>${p.codigo}</td>

        <td>${p.nombre}</td>

        <td>${p.tipoTela}</td>

        <td>${p.talla}</td>

        <td>${p.color}</td>

        <td>S/. ${p.precio}</td>

        <td>

        <span class="badge bg-success">

        ${p.stock}

        </span>

        </td>

        <td>

        <button
        class="btn btn-warning btn-sm"
        onclick="editar(${p.idProducto})">

        ✏️

        </button>

        <button
        class="btn btn-danger btn-sm"
        onclick="eliminar(${p.idProducto})">

        🗑️

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("tablaProductos").innerHTML=html;

}

cargarProductos();

async function guardarProducto(){

    const producto = {

        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        tipoTela: document.getElementById("tipoTela").value,
        talla: document.getElementById("talla").value,
        color: document.getElementById("color").value,
        precio: parseFloat(document.getElementById("precio").value),
        stock: parseInt(document.getElementById("stock").value),
        descripcion: document.getElementById("descripcion").value,
        imagen:"",
        estado:true

    };

    if(idEditar==null){

        await fetch(API,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(producto)
        });

    }else{

        await fetch(API+"/"+idEditar,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(producto)
        });

    }

    location.reload();

}

async function editar(id){

    const respuesta=await fetch(API+"/"+id);

    const p=await respuesta.json();

    idEditar=id;

    document.getElementById("codigo").value=p.codigo;
    document.getElementById("nombre").value=p.nombre;
    document.getElementById("tipoTela").value=p.tipoTela;
    document.getElementById("talla").value=p.talla;
    document.getElementById("color").value=p.color;
    document.getElementById("precio").value=p.precio;
    document.getElementById("stock").value=p.stock;
    document.getElementById("descripcion").value=p.descripcion;

    const modal = new bootstrap.Modal(document.getElementById("modalProducto"));

    modal.show();

}

async function eliminar(id){

    if(!confirm("¿Eliminar producto?"))
        return;

    await fetch(API+"/"+id,{
        method:"DELETE"
    });

    cargarProductos();

}

function limpiarFormulario(){

    idEditar=null;

    document.getElementById("codigo").value="";
    document.getElementById("nombre").value="";
    document.getElementById("tipoTela").value="";
    document.getElementById("talla").value="";
    document.getElementById("color").value="";
    document.getElementById("precio").value="";
    document.getElementById("stock").value="";
    document.getElementById("descripcion").value="";

}