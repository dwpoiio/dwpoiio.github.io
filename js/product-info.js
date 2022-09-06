//tomo el elemento con id products
let divListaProductos = document.getElementById("products-info")
let divTitulo = document.getElementById("titulo")
// tomo los elementos de orden de precios y reputacion por id
let ordenAsc = document.getElementById("sortAsc");
let ordenDesc = document.getElementById("sortDesc");
let ReputacionDesc = document.getElementById("sortByCount");
//input min y max y boton de filtrar
let inputMin = document.getElementById("rangeFilterCountMin");
let inputMax = document.getElementById("rangeFilterCountMax");
//filtro y limpiar filtro
let filtrar = document.getElementById("rangeFilterCount");
let limpiarFiltro = document.getElementById("clearRangeFilter");
//input de buscar
let inputBuscar = document.getElementById("buscar")
//creo una variable con el catID guardado en la pagina
let categoria = localStorage.getItem("productID");
// array de json
let listaPrecios = [];
let listaNueva = [];

// function setProductID(id) {
//     localStorage.setItem("productID", id);
//     window.location = "product-info.html"
// }
// onclick="setProductID(${productos.id})"

//llamado a la pagina y lectura de json
fetch("https://japceibal.github.io/emercado-api/products/" + categoria + ".json")
    .then(res => res.json())
    .then(datos => {
        listaPrecios = datos;

        divListaProductos.innerHTML += ` 
            
            <div class="m-5">
            <h2>${datos.name}</h2>
            <hr>
                <div class="row">
                    <div class="col">
                        <p>
                        <b>Precio</b><br>
                        ${datos.currency} ${datos.cost}<br><br>
                        <b>Descripcion</b><br>
                        ${datos.description}<br><br>
                        <b>Categoria</b><br>
                        ${datos.category}<br><br>
                        <b>Unidades vendidas</b><br> 
                        ${datos.soldCount}<br><br>
                        </p> 
                    </div>
                </div>
                <div class="row">
                <b>Imagenes ilustrativas</b>
                    <div class="col">
                        <img src="${datos.images[0]}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <img src="${datos.images[1]}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <img src="${datos.images[2]}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <img src="${datos.images[3]}" class="img-thumbnail">
                    </div>
                </div>
            </div>`
    });

let nombre_usuario = localStorage.getItem('usuario');
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

