// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = localStorage.getItem('usuario')
// escribo en el nav el nombre de usuario
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

let cartID = localStorage.getItem("cartID");

let divMain = document.getElementById("main")
let subTotalDiv = document.getElementById("subTotal")
let cantidadDiv = document.getElementById("cantidad")

// Creo una condicion que ejecute el codigo solo si compre algo
if (JSON.parse(localStorage.getItem("datosLista"))) {

  // Recojo los datos de la compra guardados en el local storage
  // Parseados para poder utilizarlos
  listaCompra = JSON.parse(localStorage.getItem("datosLista"))
  let listaId = []
  let valorLocal = JSON.parse(localStorage.getItem("lista"))

  // Creo una variable en localStorage para guardar un array
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

function crearCompra(variable) {
  let divPrincipal = document.createElement("div")
  divPrincipal.className += "row"
  // creo un hr
  let hr = document.createElement("hr")
  hr.className += "mt-2"
  //Agrego la imagen
  let imgDiv = document.createElement("div")
  imgDiv.innerHTML = `<img src="${variable.images[0]}" width="100" alt="imgVenta">`
  imgDiv.className += "col"
  //Agrego div del name
  let nameDiv = document.createElement("div")
  nameDiv.innerHTML = variable.name
  nameDiv.className += "col"
  //Agrego el div del costo por unidad
  let costDiv = document.createElement("div")
  costDiv.innerHTML = `USD ${variable.cost}`
  costDiv.className += "col"
  //Agrego el input
  let inputDiv = document.createElement("div")
  let inputInterior = document.createElement("input")
  inputInterior.setAttribute('type', 'number');
  inputInterior.setAttribute('min', '0');
  inputInterior.setAttribute('value', '1');
  inputDiv.appendChild(inputInterior)
  inputDiv.className += "col"
  //Agrego el subTotalCompra
  let subTotalDivCompra = document.createElement("div")
  subTotalDivCompra.className += "col fw-bold"
  // boton para eliminar producto
  let divEliminar = document.createElement("div")
  let btnEliminar = document.createElement("button")
  btnEliminar.className += "btn btn-danger btn-small"
  btnEliminar.setAttribute('type', 'submit');
  btnEliminar.setAttribute('id', variable.id);
  btnEliminar.innerHTML = `Eliminar`
  divEliminar.appendChild(btnEliminar)
  divEliminar.className += "col"

  function subTotalC() {
    // El temporizador realiza el subtotalDivCompra.innerHTML cada 0.1 segundos
    setInterval(function () {
      subTotalDivCompra.innerHTML = `USD ${variable.cost * inputInterior.value}<br>`
    }, 100);
  }
  subTotalC()

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
    document.getElementById("image").innerHTML = `<img src="${datos.articles[0].image}" width="100" alt="imgVenta">`

    function subTotalF() {
      // El temporizador realiza el subtotalDiv.innerHTML cada 0.1 segundos
      setInterval(function () {
        subTotalDiv.innerHTML = `USD ${datos.articles[0].unitCost * cantidadDiv.value}`
      }, 100);
    }
    subTotalF()

    divMain.appendChild(contenido)
  });











