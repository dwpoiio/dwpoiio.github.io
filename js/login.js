let nombre = document.getElementById('nombre-usuario'), pass = document.getElementById('password'), divAlert = document.getElementById("alert-danger"); // Selecciono input de usuario y de password
function showAlertError() { divAlert.classList.remove("fade") }; // Muestro el alerta 
function cerrarDiv() { divAlert.classList.add("fade") }; // Oculto el alerta
function login() { // Guardo la informacion de inicio de sesion
    if (nombre.value.length > 0 && pass.value.length > 0) { localStorage.setItem('usuario', nombre.value), localStorage.setItem('password', pass.value), window.location.href = "index.html" } else { showAlertError() };
};