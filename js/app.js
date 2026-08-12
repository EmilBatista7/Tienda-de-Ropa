// ======================================
// A&E - FUNCIONES GENERALES
// ======================================

// ======================================
// ACTUALIZAR CONTADOR DEL CARRITO
// ======================================

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contador = document.getElementById("contador-carrito");

  if (contador) {
    contador.textContent = carrito.length;
  }
}

// ======================================
// INICIAR CONTADOR
// ======================================

actualizarContador();
