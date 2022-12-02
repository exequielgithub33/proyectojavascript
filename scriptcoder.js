let arrayCarrito = []
//storage
if (sessionStorage.getItem("carrito")) {
    arrayCarrito = JSON.parse(sessionStorage.getItem("carrito"))
}

//renderizarCarrito()  
let contenedorProductos = document.getElementById("contenedorProductos")


const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalCotainer")


renderizarProductos(productos)

function renderizarProductos(arrayProductos) {
    contenedorProductos.innerHTML=``

    //recorrer 
    for (const producto of arrayProductos) {
        //div para mostrar los  prodcutos content
        let tarjetaProducto = document.createElement("div")
        //chequear stock
        if (producto.stock < 3) {
            tarjetaProducto.className = "productoSinStock"
        }else {
            tarjetaProducto.className = "cardProducto"
        }
      
        //le asignamos al div tarjetaProducto contenido
        tarjetaProducto.innerHTML = `
            <img src="${producto.img}">
            <h3 class="nombreProducto">${producto.nombre}</h3>
            <h4>Quedan ${producto.stock} U.</h4>
            <p class="precio">$ ${producto.precio}</p>           
            <button class="botonProducto" id=${producto.id}>Agregar al Carrito</button>
        
            `
         
        //agregar el DIV tarjetaProducto a un contenido padre     
        contenedorProductos.append(tarjetaProducto)
    }
    
    let botones = document.getElementsByClassName("botonProducto")
    for (const boton of botones) {
        boton.addEventListener("click", AgregarAlCarrito)
    }

}



// cargo arraycarrito al presionar boton AGREGAR
function AgregarAlCarrito(e){
    //elemento productos orignial
    let productoBuscado = productos.find(producto =>producto.id ==e.target.id)
    // devuelve -1 SI no encuentra el indice en arraycarito es decir sino no esta cargado el prod en el array
    let posicionProducto = arrayCarrito.findIndex(producto =>producto.id ==e.target.id)
    
    if (posicionProducto != -1) {
        //si encontro el  producto en el carrito
        arrayCarrito[posicionProducto] = {
            id:arrayCarrito[posicionProducto].id,
            nombre:arrayCarrito[posicionProducto].nombre,
            precio:arrayCarrito[posicionProducto].precio,
            unidades:arrayCarrito[posicionProducto].unidades + 1,
            subtotal: arrayCarrito[posicionProducto].precio * (arrayCarrito[posicionProducto].unidades + 1)
        }
    }else {
        //pushiar un carrito con nuevo formato + subtotal q tenga id prodcuto buscado
        arrayCarrito.push({
            id:productoBuscado.id,
            nombre:productoBuscado.nombre,
            precio:productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }

    //sessionStorage para el  final lo cambio por localStorage
    let carritoJSON = JSON.stringify(arrayCarrito)
    sessionStorage.setItem("carrito",carritoJSON)
    // rendarizarCarrito()

}


//se llama en verCarrito.addEventlistener: crea div ,recorer arraycarrito y lo vuelca en carritocontent
function rendarizarCarrito(){
    for (const itemCarrito of arrayCarrito) {
        let carritoContent = document.createElement("div");
        // ver q en ejempl modal-content
        carritoContent.className="carrito-content";
        carritoContent.innerHTML = `
        
        <h4>${itemCarrito.nombre}</h4>
        <h4>${itemCarrito.unidades}</h4>
        <h4>${itemCarrito.subtotal}</h4>
        </div>
        
        `
        modalContainer.append(carritoContent)
    }
}

//al presionar boton 🛒
verCarrito.addEventListener("click", ()=>{
    modalContainer.innerHTML=""
    modalContainer.style.display="flex";
    //creo etiqueta div y agrego h1
    const modalHeader = document.createElement("div");
    modalHeader.className="modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>    

    `
    modalContainer.append(modalHeader)
    //creo boton para cerrar ventana modal
    const modalButton = document.createElement("h1");
    modalButton.innerText= "❌"
    modalButton.className = "modal-header-button"

    modalButton.addEventListener("click", ()=>{
        modalContainer.style.display="none"
    })

    modalContainer.append(modalButton)

    rendarizarCarrito()

    const total = arrayCarrito.reduce((acumulador, elProducto)=>acumulador + elProducto.subtotal,0)
    const totalBuying = document.createElement("div");
    totalBuying.className="total-content";
    totalBuying.innerHTML = `total a pagar:$ ${total} `
    modalContainer.append(totalBuying)
})