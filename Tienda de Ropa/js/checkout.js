// ======================================
// OBTENER CARRITO
// ======================================

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ======================================
// MOSTRAR RESUMEN
// ======================================

function mostrarResumen() {
  const contenedor = document.getElementById("resumen-productos");

  const subtotalElemento = document.getElementById("subtotal-checkout");

  const totalElemento = document.getElementById("total-checkout");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  let subtotal = 0;

  // ----------------------------------
  // CARRITO VACÍO
  // ----------------------------------

  if (carrito.length === 0) {
    contenedor.innerHTML = `

            <p class="text-gray-500 text-center">

                No hay productos en el carrito.

            </p>

        `;

    subtotalElemento.textContent = "$0.00";

    totalElemento.textContent = "$0.00";

    return;
  }

  // ----------------------------------
  // PRODUCTOS
  // ----------------------------------

  carrito.forEach((producto) => {
    subtotal += Number(producto.price);

    contenedor.innerHTML += `

            <div class="flex gap-3 items-center">


                <div
                    class="w-16 h-16 bg-gray-50 rounded-lg
                    flex items-center justify-center">

                    <img
                        src="${producto.image}"
                        class="w-full h-full object-contain p-2">

                </div>


                <div class="flex-1">

                    <p class="font-semibold text-sm">

                        ${producto.title}

                    </p>

                    <p class="text-amber-700 font-bold">

                        $${Number(producto.price).toFixed(2)}

                    </p>

                </div>

            </div>

        `;
  });

  subtotalElemento.textContent = `$${subtotal.toFixed(2)}`;

  totalElemento.textContent = `$${subtotal.toFixed(2)}`;
}

// ======================================
// FORMULARIO
// ======================================

const formulario = document.getElementById("form-compra");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // ----------------------------------
    // COMPROBAR CARRITO
    // ----------------------------------

    if (carrito.length === 0) {
      alert("No puedes realizar una compra con el carrito vacío.");

      window.location.href = "carrito.html";

      return;
    }

    // ----------------------------------
    // DATOS
    // ----------------------------------

    const nombre = document.getElementById("nombre").value;

    const telefono = document.getElementById("telefono").value;

    const correo = document.getElementById("correo").value;

    const direccion = document.getElementById("direccion").value;

    const ciudad = document.getElementById("ciudad").value;

    const pago = document.getElementById("pago").value;

    // ----------------------------------
    // GUARDAR PEDIDO
    // ----------------------------------

    const pedido = {
      nombre: nombre,

      telefono: telefono,

      correo: correo,

      direccion: direccion,

      ciudad: ciudad,

      pago: pago,

      productos: carrito,

      fecha: new Date().toLocaleString(),
    };

    localStorage.setItem("ultimoPedido", JSON.stringify(pedido));

    // ----------------------------------
    // LIMPIAR CARRITO
    // ----------------------------------

    localStorage.removeItem("carrito");

    // ----------------------------------
    // IR A CONFIRMACIÓN
    // ----------------------------------

    window.location.href = "confirmacion.html";
  });
}

// ======================================
// INICIAR
// ======================================

mostrarResumen();
