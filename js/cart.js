// Tomo la informaciond e inicio de sesion
// Y las guardo en variables
let nombre_usuario = localStorage.getItem('usuario')
// escribo en el nav el nombre de usuario
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

let divContenedor = document.getElementById("main")

fetch(CART_INFO_URL + 25801 + EXT_TYPE)
  .then(results => results.json())
  .then(datos => {
    let contenido = document.createElement("div")
    contenido.innerHTML = `
    <div>
    <h2>Carrito de compras</h2><br>
    <h4>Articulos a comprar</h4>
    <div class="row">
      <div class="col"></div>
      <div class="col fw-bold">Nombre</div>
      <div class="col fw-bold">Costo</div>
      <div class="col fw-bold">Cantidad</div>
      <div class="col fw-bold">Subtotal</div>
      <hr size="5" style="opacity:1;">
      <div class="col"><img src="${datos.articles[0].image}" width="100" alt="imgVenta"></div>
      <div class="col">${datos.articles[0].name}</div>
      <div class="col">USD${datos.articles[0].unitCost}</div>
      <div class="col"><input type="number" id="cantidad" value="1"></input></div>
      <div class="col fw-bold" id="subTotal"></div>
      <hr class="mt-2">
    </div>
    <div class="row">
      <hr class="mb-4 mt-2">
      <h4 class="mb-3">Tipo de envio</h4>
      <div class="mb-3">
        <div class="custom-control custom-radio">
          <input id="goldradio" name="publicationType" type="radio" class="custom-control-input" checked="" required="">
          <label class="custom-control-label" for="goldradio">Premium 2 a 5 dias (15%)</label>
        </div>
        <div class="custom-control custom-radio">
          <input id="premiumradio" name="publicationType" type="radio" class="custom-control-input" required="">
          <label class="custom-control-label" for="premiumradio">Express 5 a 8 dias (7%)</label>
        </div>
        <div class="custom-control custom-radio">
          <input id="standardradio" name="publicationType" type="radio" class="custom-control-input" required="">
          <label class="custom-control-label" for="standardradio">stándard 12 a 15 dias (5%)</label>
        </div>
      </div>
      <h4 class="mb-3">Direccion de envio</h4>
      <div class="row">
      <div class="col-md-6 mb-3">
        <label for="productName">Calle</label>
        <input type="text" class="form-control" id="productName" value="" name="productName">
      </div>
      <div class="col-md-4 mb-3">
        <label for="productName">Numero</label>
        <input type="text" class="form-control" id="productName" value="" name="productName">
      </div>
      <div class="col-md-6 mb-3">
        <label for="productName">Esquina</label>
        <input type="text" class="form-control" id="productName" value="" name="productName">
      </div>
      </div>
      <hr>
    </div>
  </div>
    `
    divContenedor.appendChild(contenido)
    document.getElementById("subTotal").innerHTML = `USD ${((document.getElementById("cantidad").value) * (datos.articles[0].unitCost))}`
    console.log(document.getElementById("cantidad").value)

  });

