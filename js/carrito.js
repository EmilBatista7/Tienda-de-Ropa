// ======================================
// OBTENER CARRITO
// ======================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ======================================
// NORMALIZAR CARRITO
// ======================================

// Convierte los productos antiguos en productos
// que tengan cantidad.

carrito = carrito.map(producto => ({
    ...producto,
    cantidad: producto.cantidad || 1
}));


// ======================================
// MOSTRAR CARRITO
// ======================================

function mostrarCarrito() {

    const lista = document.getElementById("lista-carrito");
    const carritoVacio = document.getElementById("carrito-vacio");

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    // ----------------------------------
    // CARRITO VACÍO
    // ----------------------------------

    if (carrito.length === 0) {

        lista.classList.add("hidden");
        carritoVacio.classList.remove("hidden");

        actualizarResumen();
        actualizarContador();

        return;
    }

    lista.classList.remove("hidden");
    carritoVacio.classList.add("hidden");


    // ----------------------------------
    // MOSTRAR PRODUCTOS
    // ----------------------------------

    carrito.forEach((producto, index) => {

        const cantidad = producto.cantidad || 1;

        const subtotalProducto =
            Number(producto.price) * cantidad;


        lista.innerHTML += `

            <div
                class="flex flex-col sm:flex-row gap-5
                border-b border-gray-200 pb-5">


                <!-- IMAGEN -->

                <div
                    class="w-full sm:w-32 h-32
                    bg-gray-50 rounded-xl
                    flex items-center justify-center">

                    <img
                        src="${producto.image}"
                        alt="${producto.title}"
                        class="w-full h-full object-contain p-3">

                </div>


                <!-- INFORMACIÓN -->

                <div class="flex-1">


                    <div
                        class="flex justify-between gap-4">


                        <div>

                            <h3 class="font-bold text-lg">

                                ${producto.title}

                            </h3>


                            <p
                                class="text-gray-500 text-sm mt-1">

                                ${producto.description
                                    ? producto.description.substring(0, 80) + "..."
                                    : ""}

                            </p>

                        </div>


                        <!-- ELIMINAR -->

                        <button
                            onclick="eliminarProducto(${index})"
                            class="text-gray-400 hover:text-red-600">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>


                    <!-- PRECIO UNITARIO -->

                    <p
                        class="text-sm text-gray-500 mt-3">

                        Precio: $${Number(producto.price).toFixed(2)}

                    </p>


                    <!-- CANTIDAD -->

                    <div
                        class="flex items-center gap-3 mt-4">


                        <button
                            onclick="disminuirCantidad(${index})"
                            class="w-9 h-9 rounded-lg
                            bg-gray-200 hover:bg-gray-300">

                            -

                        </button>


                        <span
                            class="font-bold w-8 text-center">

                            ${cantidad}

                        </span>


                        <button
                            onclick="aumentarCantidad(${index})"
                            class="w-9 h-9 rounded-lg
                            bg-gray-900 text-white
                            hover:bg-amber-700">

                            +

                        </button>

                    </div>


                    <!-- SUBTOTAL DEL PRODUCTO -->

                    <p
                        class="text-xl font-bold
                        text-amber-700 mt-4">

                        Subtotal:
                        $${subtotalProducto.toFixed(2)}

                    </p>

                </div>

            </div>

        `;

    });


    actualizarResumen();
    actualizarContador();
}


// ======================================
// ELIMINAR PRODUCTO
// ======================================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    guardarCarrito();
}


// ======================================
// AUMENTAR CANTIDAD
// ======================================

function aumentarCantidad(index) {

    carrito[index].cantidad++;

    guardarCarrito();
}


// ======================================
// DISMINUIR CANTIDAD
// ======================================

function disminuirCantidad(index) {

    if (carrito[index].cantidad > 1) {

        carrito[index].cantidad--;

    } else {

        carrito.splice(index, 1);

    }

    guardarCarrito();
}


// ======================================
// GUARDAR CARRITO
// ======================================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}


// ======================================
// RESUMEN
// ======================================

function actualizarResumen() {

    let subtotal = 0;


    carrito.forEach(producto => {

        const cantidad = producto.cantidad || 1;

        subtotal +=
            Number(producto.price) * cantidad;

    });


    // Envío gratis

    const envio = 0;

    const total = subtotal + envio;


    const subtotalElemento =
        document.getElementById("subtotal");

    const envioElemento =
        document.getElementById("envio");

    const totalElemento =
        document.getElementById("total");


    if (subtotalElemento) {

        subtotalElemento.textContent =
            `$${subtotal.toFixed(2)}`;

    }


    if (envioElemento) {

        envioElemento.textContent =
            envio === 0
                ? "Gratis"
                : `$${envio.toFixed(2)}`;

    }


    if (totalElemento) {

        totalElemento.textContent =
            `$${total.toFixed(2)}`;

    }
}


// ======================================
// CONTADOR DEL CARRITO
// ======================================

function actualizarContador() {

    const contador =
        document.getElementById("contador-carrito");


    if (contador) {

        const totalProductos =
            carrito.reduce(
                (total, producto) =>
                    total + (producto.cantidad || 1),
                0
            );

        contador.textContent =
            totalProductos;

    }
}


// ======================================
// VACIAR CARRITO
// ======================================

const botonVaciar =
    document.getElementById("vaciar-carrito");


if (botonVaciar) {

    botonVaciar.addEventListener("click", function () {

        if (carrito.length === 0) {
            return;
        }


        const confirmar =
            confirm(
                "¿Seguro que deseas vaciar el carrito?"
            );


        if (confirmar) {

            carrito = [];

            guardarCarrito();

        }

    });

}


// ======================================
// FINALIZAR COMPRA
// ======================================

const botonComprar =
    document.getElementById("btn-comprar");


if (botonComprar) {

    botonComprar.addEventListener("click", function () {

        if (carrito.length === 0) {

            alert("Tu carrito está vacío.");

            return;

        }


        window.location.href =
            "checkout.html";

    });

}


// ======================================
// INICIAR
// ======================================

mostrarCarrito();