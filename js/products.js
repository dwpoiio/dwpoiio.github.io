const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
//array donde se cargarán los datos recibidos:

fetch(URL)
    .then(res => res.json())
    .then(datos => {

        let divListaProductos = document.getElementById("products")
        for (let productos of datos.products) {
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
                        ${productos.soldCount}<br> 
                        </p> 
                    </div>
                </div>
            </div>`
        }
    });
