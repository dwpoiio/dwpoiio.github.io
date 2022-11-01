let email = document.getElementById('email'), pass = document.getElementById('password'), divAlert = document.getElementById("alert-danger"), login = document.getElementById("login"); // Selecciono los elementos mediante Id
function cerrarDiv() { divAlert.classList.add("fade") }; // Oculto el alerta
login.addEventListener("click", event => { // Evento al clickear en submit ingresar
    if (email.checkValidity() && pass.checkValidity()) { // Guardo la informacion de inicio de sesion si los input son validos
        event.preventDefault(), localStorage.setItem('usuario', JSON.stringify({ email: email.value, password: pass.value })), window.location.href = "index.html";
    } else { divAlert.classList.remove("fade") }; // De lo contrario muestro en pantalla un alerta
});
(function () { // Funcion de bootstrap para validar formulario
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) { event.preventDefault(), event.stopPropagation() }
                form.classList.add('was-validated')
            }, false)
        })
})()