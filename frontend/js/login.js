function login(){

let usuario=document.getElementById("usuario").value;

let password=document.getElementById("password").value;

if(usuario==="admin" && password==="1234"){

location.href="dashboard.html";

}else{

alert("Usuario o contraseña incorrectos");

}

}