// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = localStorage.getItem('usuario');
// Escribo en el nav el nombre de usuario
document.getElementById("nav-usuario").innerHTML = nombre_usuario;
// Tomo todos los elementos necesarios por el ID
let divMain = document.getElementById("main");
let subTotalDiv = document.getElementById("subTotal");
let cantidadDiv = document.getElementById("cantidad");
let envioGold = document.getElementById("goldradio");
let envioPremium = document.getElementById("premiumradio");
let envioStandard = document.getElementById("standardradio");
let tarjetaCredito = document.getElementById("tarjetaCredito")
let transferencia = document.getElementById("transferencia")
let numeroSeg = document.getElementById("numeroSeg");
let numeroTarjeta = document.getElementById("numeroTarjeta");
let numeroCuenta = document.getElementById("numeroCuenta");
let vencimientoMonth = document.getElementById("vencimientoMonth");
let vencimientoYear = document.getElementById("vencimientoYear");
let metodoDePago = document.getElementById("metodoDePago");
let btnAlerta = document.getElementById("btnAlerta");
// creo una variable para almacenar y usar el array de productInit
let datos = JSON.parse(localStorage.getItem("productInit"));
let sumaSubTotal = 0;
let tipoEnvio = 15;

// Recorro mediante un for el array datos
for (let i = 0; i < datos.length; i++) {
  // Coloco en pantalla los elementos
  crearCompra(datos[i])
  // Btn para borrar los elementos y quitarlos del array
  let btnDelete = document.getElementById(datos[i].id)
  btnDelete.addEventListener("click", event => {
    if (datos[i].id == btnDelete.id) {
      datos.splice(i, 1)
      localStorage.setItem("productInit", JSON.stringify(datos))
      location.reload()
    }
  })
  // ############ Subtotal ############
  // Pasar datos a Dolares si es necesario
  if (datos[i].currency === "UYU") {
    sumaSubTotal += (datos[i].subTotal / 40)
  } else {
    sumaSubTotal += datos[i].subTotal
  }
  //Imprimir costos
  imprimirTipoEnvio(sumaSubTotal)
  // Actualizar cada vez que ocurre un cambio en el input
  document.getElementsByClassName("inputInterior")[i].addEventListener("input", event => {
    let sumaTotal = 0
    for (let i = 0; i < JSON.parse(localStorage.getItem("productInit")).length; i++) {
      let datos1 = JSON.parse(localStorage.getItem("productInit"));
      if (datos1[i].currency === "UYU") {
        sumaTotal += (datos1[i].subTotal / 40)
      } else {
        sumaTotal += datos1[i].subTotal
      }
    }
    //Imprimir costos
    imprimirTipoEnvio(sumaTotal)
  })
};
// Comprobaciones en timepo real para el pago con tarjeta
numeroTarjeta.addEventListener("input", event => {
  if (numeroTarjeta.value.length > 11 && numeroSeg.value.length > 2 && tarjetaCredito.checked) {
    metodoDePago.classList.remove("is-invalid")
    metodoDePago.classList.add("is-valid")
  } else if (!(numeroTarjeta.value.length > 11 && numeroSeg.value.length > 2 && tarjetaCredito.checked)) {
    metodoDePago.classList.add("is-invalid")
    metodoDePago.classList.remove("is-valid")
  }
})
numeroSeg.addEventListener("input", event => {
  if (numeroTarjeta.value.length > 11 && numeroSeg.value.length > 2 && tarjetaCredito.checked) {
    metodoDePago.classList.remove("is-invalid")
    metodoDePago.classList.add("is-valid")
  } else if (!(numeroTarjeta.value.length > 11 && numeroSeg.value.length > 2 && tarjetaCredito.checked)) {
    metodoDePago.classList.add("is-invalid")
    metodoDePago.classList.remove("is-valid")
  }
})
// Comprobaciones en timepo real para el pago con transferencia
numeroCuenta.addEventListener("input", event => {
  if (numeroCuenta.value.length > 10 && transferencia.checked) {
    metodoDePago.classList.remove("is-invalid")
    metodoDePago.classList.add("is-valid")
  } else if (!(numeroCuenta.value.length > 10 && transferencia.checked)) {
    metodoDePago.classList.add("is-invalid")
    metodoDePago.classList.remove("is-valid")
  }
})
// Btn finalizar compra
btnAlerta.addEventListener("click", event => {
  // If para imprimir aviso sobre "debe ingresar forma de pago"
  if (((numeroTarjeta.value.length <= 11) && (numeroSeg.value.length <= 2) && (numeroCuenta.value.length <= 10)) || !(!tarjetaCredito.checked || !transferencia.checked)) {
    metodoDePago.classList.add("is-invalid")
    metodoDePago.classList.remove("is-valid")
  } else {
    metodoDePago.classList.remove("is-invalid")
    metodoDePago.classList.add("is-valid")
  };
  // If para agregar alerta sobre carrito vacio
  if (datos.length == 0) {
    let divPrincipal1 = document.createElement("div")
    divPrincipal1.innerHTML = `<div class="form-control is-invalid text-center">Carrito vacio</div>
    <div class="invalid-feedback">Es necesario poner al menos un articulo en el carrito</div>
    <hr>`
    divMain.appendChild(divPrincipal1)
  };
  // Si el form esta completo agrego alerta exitosa y evito el envio del formulario
  if (document.getElementById("formulario").checkValidity() == true) {
    event.preventDefault()
    document.getElementById("alertaEnvio").innerHTML = `
        <div class="alert alert-success p-4 row" id="alertaCompra" style="top: 30%; z-index: 1;">
          <div class="col-6">¡Has comprado con exito!</div>
          <button type="button" class="btn-close col-6 ms-auto" data-bs-dismiss="alert" aria-label="Close" onclick="redirigir()"></button>
        </div>`
  };
});
// Opcion pago con tarjeta de credito
document.getElementById("tarjetaCredito").addEventListener("input", event => {
  numeroCuenta.disabled = true
  vencimientoMonth.disabled = false
  vencimientoYear.disabled = false
  numeroSeg.disabled = false
  numeroTarjeta.disabled = false
  metodoDePago.innerHTML = `Tarjeta de credito`
});
// Opcion pago con transferencia bancaria
document.getElementById("transferencia").addEventListener("input", event => {
  numeroCuenta.disabled = false
  vencimientoMonth.disabled = true
  vencimientoYear.disabled = true
  numeroSeg.disabled = true
  numeroTarjeta.disabled = true
  metodoDePago.innerHTML = `Transferencia bancaria`
});
// Funcion redirige y limpia localStorage
function redirigir() {
  localStorage.removeItem('productInit');
  location.href = "index.html"
};
// Funcion para agregar elementos al dom
function crearCompra(elementoArray) {
  let divPrincipal = document.createElement("div")
  divPrincipal.className += "row"
  // Creo un hr
  let hr = document.createElement("hr")
  hr.className += "mt-2"
  // Agrego la imagen
  let imgDiv = document.createElement("div")
  imgDiv.innerHTML = `<img src="${elementoArray.images[0]}" width="100" alt="imgVenta" class="img-fluid mx-auto d-block">`
  imgDiv.className += "col-4 col-md-2 mb-1"
  // Agrego div del nombre
  let nameDiv = document.createElement("div")
  nameDiv.innerHTML = elementoArray.name
  nameDiv.className += "col-4 col-md-2 mb-1 text-center"
  // Agrego el div del Costo
  let costDiv = document.createElement("div")
  costDiv.innerHTML = `${elementoArray.currency} ${elementoArray.cost}`
  costDiv.className += "col-4 col-md-2 mb-1 text-center"
  // Agrego el input cantidad
  let inputDiv = document.createElement("div")
  var inputInterior = document.createElement("input")
  inputInterior.setAttribute('type', 'number');
  inputInterior.setAttribute('min', '1');
  inputInterior.setAttribute('value', elementoArray.count);
  inputInterior.className += "form-control inputInterior"
  // Subtotal actualizado en tiempo real
  inputInterior.addEventListener("input", event => {
    elementoArray.count = inputInterior.value
    let elSubTotal = elementoArray.cost * elementoArray.count
    subTotalDivCompra.innerHTML = `${elementoArray.currency} ${elSubTotal}<br>`
    elementoArray.subTotal = elSubTotal
    localStorage.setItem("productInit", JSON.stringify(datos))
  });
  // Agrego div con feedback valido e invalido
  let divInvalid = document.createElement("div")
  divInvalid.className += "invalid-feedback"
  divInvalid.innerHTML = `Numero invalido de objetos`
  let diValid = document.createElement("div")
  diValid.className += "valid-feedback"
  diValid.innerHTML = `Campo correcto`
  inputDiv.appendChild(inputInterior)
  inputDiv.appendChild(diValid)
  inputDiv.appendChild(divInvalid)
  inputDiv.className += "col-4 col-md-2 mb-1"
  // Agrego el subTotalCompra
  let subTotalDivCompra = document.createElement("div")
  subTotalDivCompra.className += "col-4 col-md-2 mb-1 fw-bold text-center"
  subTotalDivCompra.innerHTML = `${elementoArray.currency} ${elementoArray.cost * elementoArray.count}<br>`
  // Boton para eliminar producto
  let divEliminar = document.createElement("div")
  let btnEliminar = document.createElement("button")
  btnEliminar.className += "btn btn-danger btn-small mx-auto d-block"
  btnEliminar.setAttribute('type', 'submit');
  btnEliminar.setAttribute('id', elementoArray.id);
  btnEliminar.innerHTML = `<i class="fas fa-trash mr-1"></i>`
  divEliminar.appendChild(btnEliminar)
  divEliminar.className += "col-4 col-md-2 mb-1"
  // Appendicheo todos los elementos
  divMain.appendChild(divPrincipal)
  divPrincipal.appendChild(imgDiv)
  divPrincipal.appendChild(nameDiv)
  divPrincipal.appendChild(costDiv)
  divPrincipal.appendChild(inputDiv)
  divPrincipal.appendChild(subTotalDivCompra)
  divPrincipal.appendChild(divEliminar)
  divMain.appendChild(hr)
};
// Funcion para imprimir SubTotal CostoEnvio y Total
function imprimirTotales(importeSubTotal) {
  // Imprimo en el elemento los valores de la sumaSubTotal
  document.getElementById("sumaSubTotal").innerHTML = `USD ${importeSubTotal.toFixed(2)}`
  // Creo variable costo de envio
  let costoEnvio = importeSubTotal * (tipoEnvio / 100)
  document.getElementById("costoEnvio").innerHTML = `USD ${costoEnvio.toFixed(2)}`
  // Sumo costo de envio mas subTotal
  document.getElementById("total").innerHTML = `<b>USD ${(costoEnvio + importeSubTotal).toFixed(2)}</b>`
  // Actualizar cada vez que ocurre un cambio en el input
};
// Funcion para variar porcentaje de tipo de envio
function imprimirTipoEnvio(importe) {
  envioGold.addEventListener("input", event => {
    tipoEnvio = envioGold.value
    imprimirTotales(importe)
  })
  envioPremium.addEventListener("input", event => {
    tipoEnvio = envioPremium.value
    imprimirTotales(importe)
  })
  envioStandard.addEventListener("input", event => {
    tipoEnvio = envioStandard.value
    imprimirTotales(importe)
  })
  imprimirTotales(importe)
};
// Funcion para deshabilitar el envío de formularios si hay campos invalidos
(function () {
  'use strict'

  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll('.needs-validation')

  // Bucle sobre ellos y evitar la presentación
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})();
