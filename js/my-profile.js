let usuario = JSON.parse(localStorage.getItem('usuario')); document.getElementById("nav-usuario").innerHTML = usuario.email; //Tomo la informacion desde localstorage y lo pongo en el nav
let pNombre = document.getElementById("pNombre"), sNombre = document.getElementById("sNombre"), pApellido = document.getElementById("pApellido"), sApellido = document.getElementById("sApellido"), telefono = document.getElementById("telefono"), email = document.getElementById("email"), btnGuardar = document.getElementById("btnGuardar"), formPerfil = document.getElementById("formPerfil"); /* Recojo todos los elementos mediante ID*/

email.value = usuario.email;
if (usuario.primerNombre != undefined) { pNombre.value = usuario.primerNombre };
if (usuario.segundoNombre != undefined) { sNombre.value = usuario.segundoNombre };
if (usuario.primerNombre != undefined) { pApellido.value = usuario.primerApellido };
if (usuario.primerNombre != undefined) { sApellido.value = usuario.segundoApellido };
if (usuario.primerNombre != undefined) { telefono.value = usuario.telefono };

btnGuardar.addEventListener("click", event => {
    let arrayUsuario =  {
        primerNombre: pNombre.value,
        segundoNombre: sNombre.value,
        primerApellido: pApellido.value,
        segundoApellido: sApellido.value,
        email: email.value,
        telefono: telefono.value,
        password: usuario.password
    };
    localStorage.setItem('usuario', JSON.stringify(arrayUsuario))
});






console.log();
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