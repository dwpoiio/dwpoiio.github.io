//tomo el elemento con id products
let divListaProductos = document.getElementById("products-info");
let divListaComentarios = document.getElementById("products-info-comentarios");
let divHacerComentario = document.getElementById("hacer-comentario");
//creo una variable con el catID guardado en la pagina
let categoria = localStorage.getItem("productID");

let nombre_usuario = localStorage.getItem('usuario');
document.getElementById("nav-usuario").innerHTML = nombre_usuario;

//llamado a la pagina y lectura de json
fetch(PRODUCT_INFO_URL + categoria + ".json")
    .then(res => res.json())
    .then(datos => {

        divListaProductos.innerHTML += ` 
        <div class="m-5">
            <h2>${datos.name}</h2><hr>
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
//llamo a la api de los comentarios
fetch(PRODUCT_INFO_COMMENTS_URL + categoria + ".json")
    .then(res => res.json())
    .then(datosComent => {
        console.log(datosComent)

        for (let comentarios of datosComent) {
            let div = document.createElement('div');
            div.innerHTML += `<b>${comentarios.user}</b> - ${comentarios.dateTime} - `
            divListaComentarios.appendChild(div);
            //agrego las estrellas naranjas
            for (let i = 0; i < comentarios.score; i++) {
                let estrella = document.createElement('span');
                estrella.classList.add("fa");
                estrella.classList.add("fa-star");
                estrella.classList.add("checked");
                div.appendChild(estrella);
            }
            //completo las 5 estrellas negras
            if (comentarios.score < 5) {
                let repetir = 5 - comentarios.score;
                for (i = 0; i < repetir; i++) {
                    let estrella1 = document.createElement('span');
                    estrella1.classList.add("fa");
                    estrella1.classList.add("fa-star");
                    div.appendChild(estrella1);
                }
            }
            div.innerHTML += `<br>${comentarios.description}<br></br>`
        };
        divHacerComentario.innerHTML = `
        <h4>Comentar</h4>
        Tu opinion:<br>
        <textarea name="textComentario" id="" cols="50" rows="3"></textarea><br>
        Tu puntuacion:<br>
        <select name="transporte">
        <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
        </select><br>
        <input type="submit" class="btn btn-primary">
        `
    });




