//tomo el elemento con id products
let divListaProductos = document.getElementById("products")
let divTitulo = document.getElementById("titulo")
// tomo los elementos de orden de precios y reputacion por id
let ordenAsc = document.getElementById("sortAsc");
let ordenDesc = document.getElementById("sortDesc");
let ReputacionDesc = document.getElementById("sortByCount");

let categoria = localStorage.getItem("catID", "hola");

//llamado a la pagina y lectura de json
fetch("https://japceibal.github.io/emercado-api/cats_products/" + categoria.toString() + ".json")
    .then(res => res.json())
    .then(datos => {

        divTitulo.innerHTML += `<h2>${datos.catName}</h2>
        <p class="lead">Verás aquí todos las autos del sitio.</p>`;


        //recorro un for para repetir los datos de la pagina
        for (let productos of datos.products) {
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

        //llamar a boton ascendente $
        ordenAsc.addEventListener("click", event => {
            listaProductos.sort(function (a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });

        });

        //llamar a boton descendente $
        ordenDesc.addEventListener("click", event => {
            datos.products.sort(function (a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
        });

        //llamar a boton reputacion descendente
        ReputacionDesc.addEventListener("click", event => {
            datos.products.sort(function (a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
        });
    });


