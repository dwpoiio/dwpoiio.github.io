if (!localStorage.getItem('usuario')) { window.location.href = "login.html" }; //verifico que exista un usuario
let nombre_usuario = JSON.parse(localStorage.getItem('usuario')).email; document.getElementById("nav-usuario").innerHTML = nombre_usuario; //Tomo la informacion desde localstorage y lo pongo en el nav

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





