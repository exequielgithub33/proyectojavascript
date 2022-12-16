
fetch("./productos.json")
    .then(respuesta=> respuesta.json())
    .then(productos =>{
        arrayCarrito=JSON.parse(localStorage.getItem("carrito"))  || []
        let contenedorProductos = document.getElementById("contenedorProductos")
        const verCarrito = document.getElementById("verCarrito")
        const modalContainer = document.getElementById("modalCotainer")
        
        renderizarProductos(productos)
        
        function renderizarProductos(arrayProductos) {
            contenedorProductos.innerHTML=``
            for (const producto of arrayProductos) {
                //div para mostrar los  prodcutos content
                let tarjetaProducto = document.createElement("div")
                //chequear stock
                if (producto.stock < 3) {
                    tarjetaProducto.classList = "cardProductoSinstock"
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
                 
                contenedorProductos.append(tarjetaProducto)
            }
            let botones = document.getElementsByClassName("botonProducto")
            for (const boton of botones) {
                boton.addEventListener("click", AgregarAlCarrito)
            }
        }
        
        function AgregarAlCarrito(e){
            let productoBuscado = productos.find(producto =>producto.id ==e.target.id)
            let posicionProducto = arrayCarrito.findIndex(producto =>producto.id ==e.target.id)
                    
            //EXPLORARAL OPEREITON esto despues se puedereeplazar id img nomb todas las propiedades q se repiten
            if (posicionProducto != -1) {
                //si encontro el  producto en el carrito
                arrayCarrito[posicionProducto] = {
                    id:arrayCarrito[posicionProducto].id,
                    img:arrayCarrito[posicionProducto].img,
                    nombre:arrayCarrito[posicionProducto].nombre,
                    precio:arrayCarrito[posicionProducto].precio,
                    unidades:arrayCarrito[posicionProducto].unidades + 1,
                    subtotal: arrayCarrito[posicionProducto].precio * (arrayCarrito[posicionProducto].unidades + 1)
                }
        
               
              
            }else {
                arrayCarrito.push({
                    id:productoBuscado.id,
                    img:productoBuscado.img,
                    nombre:productoBuscado.nombre,
                    precio:productoBuscado.precio,
                    unidades: 1,
                    subtotal: productoBuscado.precio
                })
            }
        
            carritoJSON = JSON.stringify(arrayCarrito)
            localStorage.setItem("carrito",carritoJSON)
              
        }
        
        const pintarCarrito = () => {
            modalContainer.innerHTML=""
            modalContainer.style.display="flex";
            const modalHeader = document.createElement("div");
            modalHeader.className="modal-header";
            modalHeader.innerHTML = `
                <h1 class="modal-header-title">Carrito</h1>
            `
            modalContainer.append(modalHeader)
            const modalButton = document.createElement("div");
            modalButton.className = "modal-header-button"
            modalButton.innerHTML= `<img src="img/salir.png">`
            modalHeader.append(modalButton)
            modalButton.addEventListener("click", ()=>{
                modalContainer.style.display="none"
            })
           
            
            for (const itemCarrito of arrayCarrito) {
                let carritoContent = document.createElement("div");
                carritoContent.className="carrito-content";
                carritoContent.innerHTML = `
                <img src="${itemCarrito.img}">
                <h3>${itemCarrito.nombre}</h3>
                <p>${itemCarrito.unidades}</p>      
                <p>$ ${itemCarrito.subtotal}</p>     
               
                `
                let eliminar = document.createElement("span")
                eliminar.innerText ="❌"
                eliminar.className="delete-product"
                carritoContent.append(eliminar)
                
                eliminar.addEventListener("click", ()=>{
                    elimarProducto(itemCarrito.id)
                })
                 modalContainer.append(carritoContent)
               
        
             
            }
            
            const total = arrayCarrito.reduce((acumulador, elProducto)=>acumulador + elProducto.subtotal,0)
            const totalBuying = document.createElement("div");
            totalBuying.className="total-content";
            totalBuying.innerHTML = `TOTAL A PAGAR: $ ${total} `
            modalContainer.append(totalBuying)
        
            const botonComprar = document.createElement("div");
            botonComprar.className="boton-comprar";
            botonComprar.innerHTML = `<button class="comprar-product" id="comprarProducto"><span>comprar</span></button>
            <button class="comprar-product" id="cancelarProduct"><span>Cancelar</span></button>`
            let btncomprar  = botonComprar.querySelector("#comprarProducto")
            btncomprar.addEventListener("click", ()=>{
                comprarProducto()
            })
        
            let btncabcelar = botonComprar.querySelector("#cancelarProduct")
            btncabcelar.addEventListener("click", ()=>{
                cancelarProducto()
            })
            modalContainer.append(botonComprar)
        }
        
        let input = document.getElementById("inputFiltrar")
        input.addEventListener("input",fnInput)
        
        function fnInput(){
            let cajita = input.value;
            cajita  = String(cajita).toUpperCase()
            let productoFiltrados = productos.filter(producto => producto.nombre.includes(cajita))    
            renderizarProductos(productoFiltrados)
        }
        
        
        const comprarProducto = () => {
             if (arrayCarrito.length > 0 ) {
                arrayCarrito = []
                carritoJSON = JSON.stringify(arrayCarrito)
                localStorage.setItem("carrito",carritoJSON)
                modalContainer.style.display="none"
                Swal.fire(
                    'Taekwon-do Parana',
                    'Gracias por realizar su compra',
                
                  )
                } else {
                     modalContainer.style.display="none"
                     Swal.fire(
                    'Taekwon-do Parana',
                    'No selecciono nigun producto para esta compra',
                
                  )
                }
        
         }
        
        
        const cancelarProducto = () => {
          arrayCarrito = []
          carritoJSON = JSON.stringify(arrayCarrito)
          localStorage.setItem("carrito",carritoJSON)
                modalContainer.style.display="none"
              
        }
        
        
        verCarrito.addEventListener("click",pintarCarrito);
        
        const elimarProducto = (id) => {
            let buscarProductoEliminado = arrayCarrito.find(elemento =>elemento.id ===id)
            console.log(buscarProductoEliminado)
            arrayCarrito = arrayCarrito.filter((prodId) =>{
                return prodId !==buscarProductoEliminado
            })
            
            carritoJSON = JSON.stringify(arrayCarrito)
            localStorage.setItem("carrito",carritoJSON)
            pintarCarrito()
         }
        
    })


