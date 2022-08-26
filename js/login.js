function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    document.getElementById("alert-danger").classList.remove("noShow");
}
function cerrarDiv(){
    document.getElementById("alert-danger").classList.add("noShow");
    document.getElementById("alert-danger").classList.remove("show");
}

// Selecciono input de usuario y de password
var nombre = document.getElementById('nombre-usuario');
var pass = document.getElementById('password');

function login() {
    // Guardo la informacion de inicio de sesion
    localStorage.setItem('usuario', nombre.value);
    localStorage.setItem('password', pass.value);
    // Verificamos si las condiciones se cumplen 
    if (nombre.value.length > 0 && pass.value.length > 0) {
        // Redirigimos a la pagina de portada
        window.location.href = "portada.html";
        return true;
    }
    else {
        // Si las condiciones no se cumplen mostramos un mensaje
        showAlertError();
        return false;
    }
};

