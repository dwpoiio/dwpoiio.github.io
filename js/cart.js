let nombre_usuario = localStorage.getItem("usuario"); document.getElementById("nav-usuario").innerHTML = nombre_usuario; /* Tomo la informacion de inicio de sesion Y las guardo en variables escribo en el nav el nombre de usuario */
let divMain = document.getElementById("main"), subTotalDiv = document.getElementById("subTotal"), cantidadDiv = document.getElementById("cantidad"), envioGold = document.getElementById("goldradio"), envioPremium = document.getElementById("premiumradio"), envioStandard = document.getElementById("standardradio"), tarjetaCredito = document.getElementById("tarjetaCredito"), transferencia = document.getElementById("transferencia"), numeroSeg = document.getElementById("numeroSeg"), numeroTarjeta = document.getElementById("numeroTarjeta"), numeroCuenta = document.getElementById("numeroCuenta"), vencimientoMonth = document.getElementById("vencimientoMonth"), vencimientoYear = document.getElementById("vencimientoYear"), metodoDePago = document.getElementById("metodoDePago"), btnAlerta = document.getElementById("btnAlerta"); /* Tomo todos los elementos necesarios por el ID */
let datos = JSON.parse(localStorage.getItem("productInit")); // Creo Datos para usar el localStorage de productInit
let sumaSubTotal = 0, tipoEnvio = 15;
for (let i = 0; i < datos.length; i++) { // Recorro mediante un for el array datos
  crearCompra(datos[i]) // Coloco en pantalla los elementos
  let btnDelete = document.getElementById(datos[i].id) // Btn para borrar los elementos y quitarlos del array
  btnDelete.addEventListener("click", event => { if (datos[i].id == btnDelete.id) { datos.splice(i, 1), localStorage.setItem("productInit", JSON.stringify(datos)), location.reload() } })
  // ############ Subtotal ############
  if (datos[i].currency === "UYU") { sumaSubTotal += (datos[i].subTotal / 40) } else { sumaSubTotal += datos[i].subTotal }; /* Pasar datos a Dolares si es necesario */
  imprimirTipoEnvio(sumaSubTotal) //Imprimir valores
  document.getElementsByClassName("inputInterior")[i].addEventListener("input", event => { // Actualizar cada vez que ocurre un cambio en el input
    let sumaTotal = 0
    for (let i = 0; i < JSON.parse(localStorage.getItem("productInit")).length; i++) {
      let datos1 = JSON.parse(localStorage.getItem("productInit"));
      if (datos1[i].currency === "UYU") { sumaTotal += (datos1[i].subTotal / 40) } else { sumaTotal += datos1[i].subTotal }
    } imprimirTipoEnvio(sumaTotal) //Imprimir valores
  })
};
numeroTarjeta.addEventListener("input", event => { // Comprobaciones en timepo real para el pago con tarjeta
  if (numeroTarjeta.checkValidity() && numeroSeg.checkValidity() && vencimientoYear.checkValidity() && vencimientoMonth.checkValidity() && tarjetaCredito.checked) { metodoDePago.classList.remove("is-invalid"), metodoDePago.classList.add("is-valid") } else { metodoDePago.classList.add("is-invalid"), metodoDePago.classList.remove("is-valid") }
});
numeroSeg.addEventListener("input", event => { // Comprobaciones en timepo real para el pago con tarjeta
  if (numeroTarjeta.checkValidity() && numeroSeg.checkValidity() && vencimientoYear.checkValidity() && vencimientoMonth.checkValidity() && tarjetaCredito.checked) { metodoDePago.classList.remove("is-invalid"), metodoDePago.classList.add("is-valid") } else { metodoDePago.classList.add("is-invalid"), metodoDePago.classList.remove("is-valid") }
});
numeroCuenta.addEventListener("input", event => { // Comprobaciones en timepo real para el pago con transferencia
  if (numeroCuenta.checkValidity() && transferencia.checked) { metodoDePago.classList.remove("is-invalid"), metodoDePago.classList.add("is-valid") } else { metodoDePago.classList.add("is-invalid"), metodoDePago.classList.remove("is-valid") }
});
btnAlerta.addEventListener("click", event => { // Btn finalizar compra
  if ((numeroTarjeta.checkValidity() && numeroSeg.checkValidity() && numeroCuenta.checkValidity()) || !(!tarjetaCredito.checked || !transferencia.checked)) { metodoDePago.classList.add("is-valid"), metodoDePago.classList.remove("is-invalid") } else { metodoDePago.classList.remove("is-valid"), metodoDePago.classList.add("is-invalid") }; // If para imprimir aviso sobre "debe ingresar forma de pago"
  if (datos.length == 0) { let divPrincipal1 = document.createElement("div"); divPrincipal1.innerHTML = `<div class="form-control is-invalid text-center">Carrito vacio</div><div class="invalid-feedback">Es necesario poner al menos un articulo en el carrito</div><hr>`; divMain.appendChild(divPrincipal1); }; // If para agregar alerta sobre carrito vacio
  if (document.getElementById("formulario").checkValidity() == true) { event.preventDefault(), document.getElementById("alertaEnvio").innerHTML = `<div class="alert alert-success p-4 row" id="alertaCompra" style="top: 30%; z-index: 1;"><div class="col-6">¡Has comprado con exito!</div><button type="button" class="btn-close col-6 ms-auto" data-bs-dismiss="alert" aria-label="Close" onclick="redirigir()"></button></div>` }; // Si el form esta completo agrego alerta exitosa y evito el envio del formulario
});
tarjetaCredito.addEventListener("input", event => { // Opcion pago con tarjeta de credito
  numeroCuenta.disabled = true, vencimientoMonth.disabled = false, vencimientoYear.disabled = false, numeroSeg.disabled = false, numeroTarjeta.disabled = false, metodoDePago.innerHTML = `Tarjeta de credito`
});
transferencia.addEventListener("input", event => { // Opcion pago con transferencia bancaria
  numeroCuenta.disabled = false, vencimientoMonth.disabled = true, vencimientoYear.disabled = true, numeroSeg.disabled = true, numeroTarjeta.disabled = true, metodoDePago.innerHTML = `Transferencia bancaria`
});
function redirigir() { localStorage.removeItem('productInit'), location.href = "index.html" }; // Redirigir y limpiar localStorage
function crearCompra(elementoArray) { // Agregar elementos al dom
  /* Creo todos los elementos necesarios */ let divPrincipal = document.createElement("div"), hr = document.createElement("hr"), imgDiv = document.createElement("div"), nameDiv = document.createElement("div"), costDiv = document.createElement("div"), inputDiv = document.createElement("div"), inputInterior = document.createElement("input"), divInvalid = document.createElement("div"), diValid = document.createElement("div"), subTotalDivCompra = document.createElement("div"), divEliminar = document.createElement("div"), btnEliminar = document.createElement("button");
  /* Clases de los elementos */ divPrincipal.className += "row", hr.className += "mt-2", imgDiv.className += "col-4 col-md-2 mb-1", nameDiv.className += "col-4 col-md-2 mb-1 text-center", costDiv.className += "col-4 col-md-2 mb-1 text-center", inputInterior.className += "form-control inputInterior", divInvalid.className += "invalid-feedback", diValid.className += "valid-feedback", inputDiv.className += "col-4 col-md-2 mb-1", subTotalDivCompra.className += "col-4 col-md-2 mb-1 fw-bold text-center", btnEliminar.className += "btn btn-danger btn-small mx-auto d-block", divEliminar.className += "col-4 col-md-2 mb-1"
  /* InnerHTML */ imgDiv.innerHTML = `<img src="${elementoArray.images[0]}" width="100" alt="imgVenta" class="img-fluid mx-auto d-block">`, nameDiv.innerHTML = elementoArray.name, costDiv.innerHTML = `${elementoArray.currency} ${elementoArray.cost}`, divInvalid.innerHTML = `Numero invalido de objetos`, diValid.innerHTML = `Campo correcto`, subTotalDivCompra.innerHTML = `${elementoArray.currency} ${elementoArray.cost * elementoArray.count}<br>`, btnEliminar.innerHTML = `<i class="fas fa-trash mr-1"></i>`
  /* Agrego atributos */inputInterior.setAttribute('type', 'number'), inputInterior.setAttribute('min', '1'), inputInterior.setAttribute('value', elementoArray.count), btnEliminar.setAttribute('type', 'submit'), btnEliminar.setAttribute('id', elementoArray.id)
  inputInterior.addEventListener("input", event => {
    elementoArray.count = inputInterior.value
    let elSubTotal = elementoArray.cost * elementoArray.count
    subTotalDivCompra.innerHTML = `${elementoArray.currency} ${elSubTotal}<br>`
    elementoArray.subTotal = elSubTotal
    localStorage.setItem("productInit", JSON.stringify(datos))
  }); /* Subtotal actualizado en tiempo real */
  /* Appendicheo todos los elementos */ divEliminar.appendChild(btnEliminar), inputDiv.appendChild(inputInterior), inputDiv.appendChild(diValid), inputDiv.appendChild(divInvalid), divMain.appendChild(divPrincipal), divPrincipal.appendChild(imgDiv), divPrincipal.appendChild(nameDiv), divPrincipal.appendChild(costDiv), divPrincipal.appendChild(inputDiv), divPrincipal.appendChild(subTotalDivCompra), divPrincipal.appendChild(divEliminar), divMain.appendChild(hr);
};
function imprimirTotales(importeSubTotal) { // Imprimir SubTotal, CostoEnvio y Total
  document.getElementById("sumaSubTotal").innerHTML = `USD ${importeSubTotal.toFixed(2)}`
  let costoEnvio = importeSubTotal * (tipoEnvio / 100)
  document.getElementById("costoEnvio").innerHTML = `USD ${costoEnvio.toFixed(2)}`
  document.getElementById("total").innerHTML = `<b>USD ${(costoEnvio + importeSubTotal).toFixed(2)}</b>`
};
function imprimirTipoEnvio(importe) { // Variar porcentaje de tipo de envio
  envioGold.addEventListener("input", event => { tipoEnvio = envioGold.value, imprimirTotales(importe) })
  envioPremium.addEventListener("input", event => { tipoEnvio = envioPremium.value, imprimirTotales(importe) })
  envioStandard.addEventListener("input", event => { tipoEnvio = envioStandard.value, imprimirTotales(importe) })
  imprimirTotales(importe)
};
(function () { // Deshabilitar el envío de formularios si hay campos invalidos
  'use strict'
  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll('.needs-validation')
  // Bucle sobre ellos y evitar la presentación
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) { event.preventDefault(), event.stopPropagation() }
        form.classList.add('was-validated')
      }, false)
    })
})();