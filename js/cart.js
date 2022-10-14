// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = localStorage.getItem('usuario')
// escribo en el nav el nombre de usuario
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

let divMain = document.getElementById("main")
let subTotalDiv = document.getElementById("subTotal")
let cantidadDiv = document.getElementById("cantidad")

let datos = JSON.parse(localStorage.getItem("productInit"))
let listaid = []

for (recorrer of datos) {
  // Coloco en pantalla los elementos
  crearCompra(recorrer)
  // Eliminar productos de la lista
  listaid.push(recorrer.id)
  let hola = document.getElementById(recorrer.id)
  hola.addEventListener("click", event => {
    for (let i = 0; i < datos.length; i++) {
      if (datos[i].id != 50924) {
        if (datos[i].id == hola.id) {
          datos.splice(i, 1)
          localStorage.setItem("productInit", JSON.stringify(datos))
          location.reload()
        }
      }
    }
  })
}
console.log(datos)
// Funcion para agregar elementos al dom
function crearCompra(variable) {
  // Excepciones para el Peugot
  if (variable.id == 50924) {
    variable.cost = variable.unitCost
    variable.image = variable.images
    varImg = "img/prod50924_1.jpg"
  } else {
    varImg = variable.images[0]
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
  nameDiv.innerHTML = variable.name
  nameDiv.className += "col-4 col-md-2 mb-1"
  // Agrego el div del costo por unidad
  let costDiv = document.createElement("div")
  costDiv.innerHTML = `USD ${variable.cost}`
  costDiv.className += "col-4 col-md-2 mb-1"
  // Agrego el input
  let inputDiv = document.createElement("div")
  let inputInterior = document.createElement("input")
  inputInterior.setAttribute('type', 'number');
  inputInterior.setAttribute('min', '0');
  inputInterior.setAttribute('value', '1');
  inputInterior.className += "form-control"
  // Subtotal actualizado en tiempo real
  inputInterior.addEventListener("input", event => {
    subTotalDivCompra.innerHTML = `USD ${variable.cost * inputInterior.value}<br>`
  })
  inputDiv.appendChild(inputInterior)
  inputDiv.className += "col-4 col-md-2 mb-1"
  // Agrego el subTotalCompra
  let subTotalDivCompra = document.createElement("div")
  subTotalDivCompra.className += "col-4 col-md-2 mb-1 fw-bold"
  subTotalDivCompra.innerHTML = `USD ${variable.cost * inputInterior.value}<br>`
  // Boton para eliminar producto
  let divEliminar = document.createElement("div")
  let btnEliminar = document.createElement("button")
  btnEliminar.className += "btn btn-danger btn-small"
  btnEliminar.setAttribute('type', 'submit');
  btnEliminar.setAttribute('id', variable.id);
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