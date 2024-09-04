let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
console.log(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach((producto, i )=> {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.title}">
                <div class="carrito-producto-titulo">
                    <small>${producto.id} </small>
                    <h3>${producto.title}</h3>
                    <h3> color:  ${producto.colorele} </h3>
                    <h3> talla:  ${producto.talla} </h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <div id="lista">

                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
                <button id="carrito-acciones-comprar" class="carrito-acciones-comprar" data-id = "${i}" data-preciototal="${producto.precio * producto.cantidad}">Comprar ahora</button
            `;


    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
    actualizarCompra()
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

    



function actualizarCompra (){
    let comprar = document.querySelectorAll(".carrito-acciones-comprar")
    comprar.forEach((com) => {
        com.addEventListener("click", paypago)
    })


}

localStorage.setItem("pagos", "")

async function paypago (e) {
    let id = e.currentTarget.dataset.id;
    let pro = productosEnCarrito[id];

    function precio() {
        let preciototal = pro.precio * pro.cantidad;
        return preciototal;
    }
    const prexio = precio()
    pro.precio = prexio

  
    let json = JSON.stringify(pro)
    localStorage.setItem("pagos", json)

    if (imagentttttt === "" || colors === "" || datosC[0].imagenelegida === "" || select.value === "") {
        document.querySelector(".mensaje1").textContent = "TIENES QUE LLENAR TODOS LOS REQUISITOS";
        setTimeout(() => {
            document.querySelector(".mensaje1").textContent = "";
        }, 3000);
    } else {
        // Realizar una solicitud POST con los datos necesarios
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                id: pro.id === pro.id ? id++ : id,
                id2: pro.id,
                titulo : pro.titulo,
                categoria: pro.categoria.nombre,
                tallas: select.value,
                cantidad: mas,
                colores: colors,
                disenos: imagentttttt,
                elegido: img
            })
        };
        
        try {
            const res = await fetch("http://localhost:200/tallasydemas", options);
            if (res.status === 200) {
                window.location.href = "../pagos.html"


            } else {
                console.log("Algo falló en el post");
            }
            // Redirigir a la página de pagos

        } catch(err) {
            console.log(err);
        }
    }
  

    


}
