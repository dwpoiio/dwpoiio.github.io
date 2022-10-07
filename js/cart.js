// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = localStorage.getItem('usuario')
// escribo en el nav el nombre de usuario
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

let divContenedor = document.getElementById("main")
let subTotalDiv = document.getElementById("subTotal")
let cantidadDiv = document.getElementById("cantidad")

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

    divContenedor.appendChild(contenido)
  });










