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
        console.log(datos);
        listaPrecios = datos;

            divListaProductos.innerHTML += ` 
            <h2>${datos.name}</h2>
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${datos.images[0]}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <p>
                        ${datos.name}<br> 
                        ${datos.currency} ${datos.cost}<br>
                        ${datos.description}<br> 
                        Unidades vendidas: ${datos.soldCount}<br> 
                        </p> 
                    </div>
                </div>
            </div>`
    });

let nombre_usuario = localStorage.getItem('usuario');
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

