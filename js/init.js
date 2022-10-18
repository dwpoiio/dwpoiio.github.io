const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const LIST_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.getElementById("navegador").innerHTML += `<nav class="navbar navbar-expand-lg navbar-dark bg-dark p-1">
<div class="container">
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav w-100 justify-content-between">
      <li class="nav-item">
        <a class="nav-link" href="index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="categories.html">Categorías</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="sell.html">Vender</a>
      </li>
      <!-- Agrego el menu desplegable -->
      <li class="nav-item dropdown">
        <!-- A con id nav-usuario -->
        <a class="nav-link active dropdown-toggle" href="#" id="nav-usuario" role="button" data-bs-toggle="dropdown"
          aria-expanded="false"></a>
        <!-- Agrego las opciones del menu -->
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
          <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
          <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
          <li><a class="dropdown-item" href="login.html">Cerrar sesion</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</nav>`;

if (!JSON.parse(localStorage.getItem("productInit"))) {
  fetch(CART_INFO_URL + 25801 + EXT_TYPE)
    .then(results => results.json())
    .then(datos => {
      localStorage.setItem("productInit", JSON.stringify(datos.articles[0]))
      let array = [JSON.parse(localStorage.getItem("productInit"))]
      Object.assign(array[0], {
        subTotal: array[0].unitCost
      })
      localStorage.setItem("productInit", JSON.stringify(array))
    })
}
