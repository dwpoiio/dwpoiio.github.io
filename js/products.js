//tomo el elemento con id products
let divListaProductos = document.getElementById("products")
let divTitulo = document.getElementById("titulo")
// tomo los elementos de orden de precios y reputacion por id
let ordenAsc = document.getElementById("sortAsc");
let ordenDesc = document.getElementById("sortDesc");
let ReputacionDesc = document.getElementById("sortByCount");
//input min y max y boton de filtrar
let inputMin = document.getElementById("rangeFilterCountMin");
let inputMax = document.getElementById("rangeFilterCountMax");
let filtrar = document.getElementById("rangeFilterCount");
let limpiarFiltro = document.getElementById("clearRangeFilter");
//creo una variable con el catID guardado en la pagina
let categoria = localStorage.getItem("catID");
// array de json
let listaPrecios = [];
let listaNueva = [];
//llamado a la pagina y lectura de json
fetch("https://japceibal.github.io/emercado-api/cats_products/" + categoria + ".json")
    .then(res => res.json())
    .then(datos => {
        listaPrecios = datos.products;

        //titulo de la pagina sacado de json
        divTitulo.innerHTML += `<h2>${datos.catName}</h2>
        <p class="lead">Verás aquí todos las autos del sitio.</p>`;

        //recorro un for para repetir los datos de la pagina
        function inner() {
            divListaProductos.innerHTML = '';
            for (let productos of listaPrecios) {
                //organizacion del div con la coleccion de productos
                divListaProductos.innerHTML += ` 
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${productos.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <p>
                        ${productos.name}<br> 
                        ${productos.currency} ${productos.cost}<br>
                        ${productos.description}<br> 
                        Unidades vendidas: ${productos.soldCount}<br> 
                        </p> 
                    </div>
                </div>
            </div>`
            };
        };
        inner();

        function paraFiltrar() {
            let maximo;
            let minimo;
            if (inputMin.value != undefined || inputMin.value != null) {
                minimo = inputMin.value
            }
            if (inputMax.value != undefined || inputMax.value != null) {
                maximo = inputMax.value
            }
            else {
                minimo = 0;
                maximo = Infinity;
            }

            listaNueva = listaPrecios.filter(producto => inputMin.value <= producto.cost && inputMax.value >= producto.cost);
            listaPrecios = listaNueva;
            inner();
        };
        //funcion para limpiar el filtro
        function paraLimpiar() {
            listaPrecios = datos.products
            inputMin.value = '';
            inputMax.value = '';
            inner();
        }

        //boton filtrar
        filtrar.addEventListener("click", paraFiltrar);

        //boton limpiar
        limpiarFiltro.addEventListener("click", paraLimpiar)

        //llamar a boton ascendente $
        ordenAsc.addEventListener("click", event => {
            for (i = 0; i < listaPrecios.length; i++) {
                listaPrecios.sort(function (a, b) {
                    if (a.cost < b.cost) return -1;
                    if (a.cost > b.cost) return 1;
                    return 0;
                });
            }
            inner();
        });

        //llamar a boton descendente $
        ordenDesc.addEventListener("click", event => {
            for (i = 0; i < listaPrecios.length; i++) {
                listaPrecios.sort(function (a, b) {
                    if (a.cost > b.cost) return -1;
                    if (a.cost < b.cost) return 1;
                    return 0;
                });
            }
            inner();
        });

        //llamar a boton unidades vendidas descendente
        ReputacionDesc.addEventListener("click", event => {
            for (i = 0; i < listaPrecios.length; i++) {
                listaPrecios.sort(function (a, b) {
                    if (a.soldCount < b.soldCount) return -1;
                    if (a.soldCount > b.soldCount) return 1;
                    return 0;
                });
            }
            inner();
        });

    });

let nombre_usuario = localStorage.getItem('usuario');
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

