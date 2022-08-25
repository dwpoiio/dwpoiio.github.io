document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = window.localStorage.getItem('nombre');
let password_usuario = localStorage.getItem('password');
document.getElementById("nav-usuario").innerHTML=nombre_usuario;

console.log(nombre_usuario);
console.log(password_usuario);