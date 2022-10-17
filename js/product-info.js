//tomo los elementos con id products
let divListaProductos = document.getElementById("products-info");
let divListaComentarios = document.getElementById("products-info-comentarios");
let divHacerComentario = document.getElementById("hacer-comentario");
let divProductosRelacionados = document.getElementById("related-products");
// nombre de usuario en nav
let nombre_usuario = localStorage.getItem('usuario');
document.getElementById("nav-usuario").innerHTML = nombre_usuario;
//creo una variable con el catID guardado en la pagina
let categoria = localStorage.getItem("productID");
let div = document.createElement('div');


// Funcion para guardar el productId
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}

//llamado a la pagina y lectura de json 
//variando en el productID entre pagina y pagina
fetch(PRODUCT_INFO_URL + categoria + EXT_TYPE)
  .then(res => res.json())
  .then(datos => {

    divListaProductos.innerHTML += ` 
        <div class="">
            <div class="row my-2">
            <h2 class="col-6">${datos.name}</h2>
            <div class="col-4"></div>
            <button class="btn btn-success col-2 text-center" type="submit" id="compra">Comprar</button>
            <hr class="mt-2">
            </div>
            
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

                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="${datos.images[0]}" class="d-block w-100" alt="img[0]">
                  </div>
                  <div class="carousel-item">
                    <img src="${datos.images[1]}" class="d-block w-100" alt="img[1]">
                  </div>
                  <div class="carousel-item">
                    <img src="${datos.images[2]}" class="d-block w-100" alt="img[2]">
                  </div>
                  <div class="carousel-item">
                    <img src="${datos.images[3]}" class="d-block w-100" alt="img[3]">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
        </div>`

    for (recorrer of datos.relatedProducts) {
      divProductosRelacionados.innerHTML += `
            <div class="col-3 img-thumbnail m-3">
            <div onclick="setProductID(${recorrer.id})" class="list-group-item-action cursor-active">
            <img src="${recorrer.image}" alt="img" class="img-fluid">
            ${recorrer.name}
            <div/></div>
            `
    }

    document.getElementById("compra").addEventListener("click", event => {
      let listaId = []
      let array = JSON.parse(localStorage.getItem("productInit"))
      for (recorrer of array) {
        listaId.push(recorrer.id)
      }
      Object.assign(datos, {
        count: 1,
        subTotal: datos.cost
      })
      array.push(datos)
      if (!listaId.includes(datos.id)) {
        localStorage.setItem("productInit", JSON.stringify(array))
        location.href = "cart.html"
      } else {
        location.href = "cart.html"
      }
    })
  });

//llamo a la api de los comentarios
fetch(PRODUCT_INFO_COMMENTS_URL + categoria + EXT_TYPE)
  .then(res => res.json())
  .then(datosComent => {

    function innerComentarios() {

      div.innerHTML = "";

      for (let comentarios of datosComent) {

        div.innerHTML += `<b>${comentarios.user}</b> - ${comentarios.dateTime} - `
        divListaComentarios.appendChild(div);
        // Agrego las estrellas naranjas
        for (let i = 0; i < comentarios.score; i++) {
          let estrella = document.createElement('span');
          estrella.classList.add("fa");
          estrella.classList.add("fa-star");
          estrella.classList.add("checked");
          div.appendChild(estrella);
        }
        // Completo las 5 estrellas negras
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
    };

    innerComentarios();
    // Completo el formulario para enviar un comentario
    divHacerComentario.innerHTML = `
        <h4>Comentar</h4>
        Tu opinion:<br>
        <textarea name="textComentario" id="textComentario" cols="50" rows="3"></textarea><br>
        Tu puntuacion:<br>
        <select name="transporte" id="transporte">
        <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
        </select><br>
        <input type="button" class="btn btn-primary" id="inputComentario" value="Enviar">
        `

    // Creo la funcion para sumar el comentario pusheando datosComent
    // 
    let botonComentario = document.getElementById("inputComentario");
    function pushear() {
      let fecha = new Date()
      let y = fecha.getFullYear()
      let m = fecha.getMonth()
      let d = fecha.getDate()
      let h = fecha.getHours()
      let min = fecha.getMinutes()
      let s = fecha.getSeconds()
      let array = {
        product: parseInt(categoria),
        score: parseInt(transporte.value),
        description: textComentario.value,
        user: nombre_usuario,
        dateTime: y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s
      }
      datosComent.push(array);
      divListaComentarios.removeChild(div);
      innerComentarios();
    }

    botonComentario.addEventListener("click", pushear);

  });





