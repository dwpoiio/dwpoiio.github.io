// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = localStorage.getItem('usuario')
// escribo en el nav el nombre de usuario
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

let divMain = document.getElementById("main")
let subTotalDiv = document.getElementById("subTotal")
let cantidadDiv = document.getElementById("cantidad")
let EnvioGold = document.getElementById("goldradio")
let EnvioPremium = document.getElementById("premiumradio")
let EnvioStandard = document.getElementById("standardradio")

let datos = JSON.parse(localStorage.getItem("productInit"))
// let listaid = []
let sumaSubTotal = 0
let tipoEnvio = 15

for (let i = 0; i < datos.length; i++) {
  // Coloco en pantalla los elementos
  crearCompra(datos[i])
  // Borro los elementos a excepcion del Peugot
  let hola = document.getElementById(datos[i].id)
  hola.addEventListener("click", event => {
    if (datos[i].id != 50924) {
      if (datos[i].id == hola.id) {
        datos.splice(i, 1)
        localStorage.setItem("productInit", JSON.stringify(datos))
        location.reload()
      }
    }
  })
  // Subtotal
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
      let datos1 = JSON.parse(localStorage.getItem("productInit"))
      if (datos[i].currency === "UYU") {
        sumaTotal += (datos1[i].subTotal / 40)
      } else {
        sumaTotal += datos1[i].subTotal
      }
    }
    //Imprimir costos
    imprimirTipoEnvio(sumaTotal)
  })
}
// Funcion para agregar elementos al dom
function crearCompra(elementoArray) {
  // Excepciones para el Peugot
  if (elementoArray.id == 50924) {
    elementoArray.cost = elementoArray.unitCost
    elementoArray.image = elementoArray.images
    varImg = "img/prod50924_1.jpg"
  } else {
    varImg = elementoArray.images[0]
  }
  let divPrincipal = document.createElement("div")
  divPrincipal.className += "row"
  // Creo un hr
  let hr = document.createElement("hr")
  hr.className += "mt-2"
  // Agrego la imagen
  let imgDiv = document.createElement("div")
  imgDiv.innerHTML = `<img src="${varImg}" width="100" alt="imgVenta" class="img-fluid">`
  imgDiv.className += "col-4 col-md-2 mb-1"
  // Agrego div del name
  let nameDiv = document.createElement("div")
  nameDiv.innerHTML = elementoArray.name
  nameDiv.className += "col-4 col-md-2 mb-1"
  // Agrego el div del costo por unidad
  let costDiv = document.createElement("div")
  costDiv.innerHTML = `${elementoArray.currency} ${elementoArray.cost}`
  costDiv.className += "col-4 col-md-2 mb-1"
  // Agrego el input
  let inputDiv = document.createElement("div")
  var inputInterior = document.createElement("input")
  inputInterior.setAttribute('type', 'number');
  inputInterior.setAttribute('min', '0');
  inputInterior.setAttribute('value', elementoArray.count);
  inputInterior.className += "form-control inputInterior"
  // Subtotal actualizado en tiempo real
  inputInterior.addEventListener("input", event => {
    elementoArray.count = inputInterior.value
    let elSubTotal = elementoArray.cost * elementoArray.count
    subTotalDivCompra.innerHTML = `${elementoArray.currency} ${elSubTotal}<br>`
    elementoArray.subTotal = elSubTotal
    localStorage.setItem("productInit", JSON.stringify(datos))
  })
  inputDiv.appendChild(inputInterior)
  inputDiv.className += "col-4 col-md-2 mb-1"
  // Agrego el subTotalCompra
  let subTotalDivCompra = document.createElement("div")
  subTotalDivCompra.className += "col-4 col-md-2 mb-1 fw-bold"
  subTotalDivCompra.innerHTML = `${elementoArray.currency} ${elementoArray.cost * elementoArray.count}<br>`
  // Boton para eliminar producto
  let divEliminar = document.createElement("div")
  let btnEliminar = document.createElement("button")
  btnEliminar.className += "btn btn-danger btn-small"
  btnEliminar.setAttribute('type', 'submit');
  btnEliminar.setAttribute('id', elementoArray.id);
  btnEliminar.innerHTML = `Eliminar`
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
}

function imprimirTotales(importeSubTotal) {
  // Imprimo en el elemento los valores de la sumaSubTotal
  document.getElementById("sumaSubTotal").innerHTML = `USD ${importeSubTotal.toFixed(2)}`
  // Creo variable costo de envio
  let costoEnvio = importeSubTotal * (tipoEnvio / 100)
  document.getElementById("costoEnvio").innerHTML = `USD ${costoEnvio.toFixed(2)}`
  // Sumo costo de envio mas subTotal
  document.getElementById("total").innerHTML = `<b>USD ${(costoEnvio + importeSubTotal).toFixed(2)}</b>`
  // Actualizar cada vez que ocurre un cambio en el input
}

function imprimirTipoEnvio(importe) {
  EnvioGold.addEventListener("input", event => {
    tipoEnvio = EnvioGold.value
    imprimirTotales(importe)
  })
  EnvioPremium.addEventListener("input", event => {
    tipoEnvio = EnvioPremium.value
    imprimirTotales(importe)
  })
  EnvioStandard.addEventListener("input", event => {
    tipoEnvio = EnvioStandard.value
    imprimirTotales(importe)
  })
  imprimirTotales(importe)
}
