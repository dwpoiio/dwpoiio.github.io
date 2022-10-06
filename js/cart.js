// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = localStorage.getItem('usuario')
// escribo en el nav el nombre de usuario
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

let divContenedor = document.getElementById("main")

fetch(CART_INFO_URL + 25801 + EXT_TYPE)
    .then(results => results.json())
    .then(datos => {
        console.log(datos.articles[0])
        let contenido = document.createElement("div")
        contenido.innerHTML = `
        <h2>Carrito de compras</h2><br>
        <div>
        <h4>Articulos a comprar</h4>
        <div class="d-flex justify-content-around">
  <div class="p-2"><img src="${datos.articles[0].image}" width="100" alt="imgVenta"></div>
  <div class="p-2">Nombre</div>
  <div class="p-2">Costo</div>
  <div class="p-2">Cantidad</div>
  <div class="p-2">Subtotal</div>
</div>
<hr size="10">
<div class="d-flex justify-content-around">
  <div class="p-2"><img src="${datos.articles[0].image}" width="100" alt="imgVenta"></div>
  <div class="p-2">${datos.articles[0].name}</div>
  <div class="p-2">${datos.articles[0].unitCost}</div>
  <div class="p-2">1</div>
  <div class="p-2">${datos.articles[0].unitCost}</div>
</div>
<hr>   
        </div>`
        divContenedor.appendChild(contenido)
    });