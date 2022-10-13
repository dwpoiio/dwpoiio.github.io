// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = localStorage.getItem('usuario')
// escribo en el nav el nombre de usuario
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

let cartID = localStorage.getItem("cartID");

let divMain = document.getElementById("main")
let subTotalDiv = document.getElementById("subTotal")
let cantidadDiv = document.getElementById("cantidad")

// Creo una condicion que ejecute el codigo solo si compra algo
if (JSON.parse(localStorage.getItem("datosLista"))) {

  // Recojo los datos de la compra guardados en el local storage
  // Parseados para poder utilizarlos
  listaCompra = JSON.parse(localStorage.getItem("datosLista"))
  let listaId = []
  let valorLocal = JSON.parse(localStorage.getItem("lista"))

  // Creo una variable en localStorage para guardar un array
  // En caso de que no exista aun la lista
  if (!localStorage.getItem("lista")) {
    localStorage.setItem("lista", JSON.stringify(listaCompra))
    let valorLocal = JSON.parse(localStorage.getItem("lista"))
    var array = [valorLocal]
    localStorage.setItem("lista", JSON.stringify(array))
    location.reload()
  }
  // Coloco en pantalla los elementos
  for (recorrer of valorLocal) {
    listaId.push(recorrer.id)
    crearCompra(recorrer)
  }
  // Eliminar productos
  for (var i = 0; i < valorLocal.length; i++) {
    let hola = document.getElementById(valorLocal[i].id)
    hola.addEventListener("click", event => {
      for (var i = 0; i < valorLocal.length; i++) {
        if (valorLocal[i].id == hola.id) {
          valorLocal.splice(i, 1);
          var array = valorLocal
          localStorage.setItem("lista", JSON.stringify(array))
          if (valorLocal.length == 0) {
            localStorage.removeItem("datosLista");
          }
          location.reload()
        }
      }
    })
  }

  // Agrego elementos al array si no coinciden los ID
  if (!listaId.includes(listaCompra.id)) {
    var array = valorLocal
    array.push(listaCompra)
    localStorage.setItem("lista", JSON.stringify(array))
    location.reload()
  }
}

// Funcion para agregar elementos al dom
function crearCompra(variable) {
  let divPrincipal = document.createElement("div")
  divPrincipal.className += "row"
  // creo un hr
  let hr = document.createElement("hr")
  hr.className += "mt-2"
  //Agrego la imagen
  let imgDiv = document.createElement("div")
  imgDiv.innerHTML = `<img src="${variable.images[0]}" width="100" alt="imgVenta" class="img-fluid">`
  imgDiv.className += "col-4 col-md-2 mb-1"
  //Agrego div del name
  let nameDiv = document.createElement("div")
  nameDiv.innerHTML = variable.name
  nameDiv.className += "col-4 col-md-2 mb-1"
  //Agrego el div del costo por unidad
  let costDiv = document.createElement("div")
  costDiv.innerHTML = `USD ${variable.cost}`
  costDiv.className += "col-4 col-md-2 mb-1"
  //Agrego el input
  let inputDiv = document.createElement("div")
  let inputInterior = document.createElement("input")
  inputInterior.setAttribute('type', 'number');
  inputInterior.setAttribute('min', '0');
  inputInterior.setAttribute('value', '1');
  inputInterior.className += "form-control"
  inputInterior.addEventListener("input", event => {
    subTotalDivCompra.innerHTML = `USD ${variable.cost * inputInterior.value}<br>`
  })
  inputDiv.appendChild(inputInterior)
  inputDiv.className += "col-4 col-md-2 mb-1"
  //Agrego el subTotalCompra
  let subTotalDivCompra = document.createElement("div")
  subTotalDivCompra.className += "col-4 col-md-2 mb-1 fw-bold"
  subTotalDivCompra.innerHTML = `USD ${variable.cost * inputInterior.value}<br>`
  // boton para eliminar producto
  let divEliminar = document.createElement("div")
  let btnEliminar = document.createElement("button")
  btnEliminar.className += "btn btn-danger btn-small"
  btnEliminar.setAttribute('type', 'submit');
  btnEliminar.setAttribute('id', variable.id);
  btnEliminar.innerHTML = `Eliminar`
  divEliminar.appendChild(btnEliminar)
  divEliminar.className += "col-4 col-md-2 mb-1"

  divMain.appendChild(divPrincipal)
  divPrincipal.appendChild(imgDiv)
  divPrincipal.appendChild(nameDiv)
  divPrincipal.appendChild(costDiv)
  divPrincipal.appendChild(inputDiv)
  divPrincipal.appendChild(subTotalDivCompra)
  divPrincipal.appendChild(divEliminar)
  divMain.appendChild(hr)
}

fetch(CART_INFO_URL + 25801 + EXT_TYPE)
  .then(results => results.json())
  .then(datos => {

    let contenido = document.createElement("div")
    document.getElementById("name").innerHTML = datos.articles[0].name
    document.getElementById("unitCost").innerHTML = `USD ${datos.articles[0].unitCost}`
    document.getElementById("image").innerHTML = `<img src="${datos.articles[0].image}" width="100" alt="imgVenta" class="img-fluid">`

    subTotalDiv.innerHTML = `USD ${datos.articles[0].unitCost * cantidadDiv.value}`

    document.getElementById("cantidad").addEventListener("input", event => {
      subTotalDiv.innerHTML = `USD ${datos.articles[0].unitCost * cantidadDiv.value}`
    })

    divMain.appendChild(contenido)
  });











