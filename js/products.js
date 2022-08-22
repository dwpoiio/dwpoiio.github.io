//pagina a ser cargada
const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

//llamado a la pagina y lectura de json
fetch(URL)
    .then(res => res.json())
    .then(datos => {

        let divListaProductos = document.getElementById("products")
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
        }
    });
