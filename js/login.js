let nombre = document.getElementById('nombre-usuario'), pass = document.getElementById('password'), divAlert = document.getElementById("alert-danger"); // Selecciono input de usuario y de password
function showAlertError() { divAlert.classList.remove("fade") }; // Muestro el alerta 
function cerrarDiv() { divAlert.classList.add("fade") }; // Oculto el alerta
function login() { // Guardo la informacion de inicio de sesion
    localStorage.setItem('usuario', nombre.value), localStorage.setItem('password', pass.value);
    if (nombre.value.length > 0 && pass.value.length > 0) { window.location.href = "index.html" } else { showAlertError() };
};

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   }