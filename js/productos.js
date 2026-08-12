const URL = "https://fakestoreapi.com/products";

let productos = [];

const categoriaPagina = document.body.dataset.categoria;

let filtroActual = "todos";
let textoBusqueda = "";

// ======================================
// PRODUCTOS PARA NIÑO
// ======================================

const productosNino = [
  {
    id: 101,
    title: "Camiseta Infantil",
    price: 50000,
    image:
      "https://thumbs.dreamstime.com/b/camiseta-sin-mangas-hermosa-de-childs-104360994.jpg",
    description: "Camiseta cómoda y moderna para niño.",
  },

  {
    id: 102,
    title: "Jean Infantil",
    price: 70000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJV-OzbwVr6u-qw1MpGKUaTnzyQSvvsLWP9CtWlVtIYdsMWPOKYmcDsXU&s=10",
    description: "Jean resistente y cómodo para niños.",
  },

  {
    id: 103,
    title: "Chaqueta Infantil",
    price: 65000,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_618258-CBT108613562961_032026-O.webp",
    description: "Chaqueta moderna para los días fríos.",
  },

  {
    id: 104,
    title: "Sudadera Infantil",
    price: 40000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNp9LEDqfCF-xWQKA2QshBxNKKGfodrG_KcN7qR4c9QA&s",
    description: "Sudadera cómoda para actividades deportivas.",
  },
];

// ======================================
// CARGAR PRODUCTOS
// ======================================

async function cargarProductos() {
  // Si estamos en Niño,
  // usamos nuestro catálogo propio.

  if (categoriaPagina === "nino") {
    productos = productosNino;

    aplicarFiltros();

    return;
  }

  // Hombre y Mujer siguen usando la API.

  try {
    const respuesta = await fetch(URL);

    productos = await respuesta.json();

    aplicarFiltros();
  } catch (error) {
    console.error("Error al cargar la API:", error);
  }
}

// ======================================
// OBTENER PRODUCTOS DE LA PÁGINA

function obtenerProductosPagina() {
  if (categoriaPagina === "hombre") {
    return productos.filter(
      (producto) => producto.category === "men's clothing",
    );
  }

  if (categoriaPagina === "mujer") {
    return productos.filter(
      (producto) => producto.category === "women's clothing",
    );
  }

  if (categoriaPagina === "nino") {
    return productosNino;
  }

  return [];
}

// ======================================
// APLICAR FILTROS
// ======================================

function aplicarFiltros() {
  let lista = obtenerProductosPagina();

  // ----------------------------------
  // FILTRO POR TIPO
  // ----------------------------------

  if (filtroActual !== "todos") {
    lista = lista.filter((producto) => {
      const nombre = producto.title.toLowerCase();

      return nombre.includes(filtroActual.toLowerCase());
    });
  }

  // ----------------------------------
  // BUSCADOR
  // ----------------------------------

  if (textoBusqueda !== "") {
    lista = lista.filter((producto) => {
      const nombre = producto.title.toLowerCase();

      return nombre.includes(textoBusqueda);
    });
  }

  mostrarProductos(lista);
}

// ======================================
// MOSTRAR PRODUCTOS
// ======================================

function mostrarProductos(lista) {
  const catalogo = document.getElementById("catalogo");

  if (!catalogo) {
    return;
  }

  catalogo.innerHTML = "";

  if (lista.length === 0) {
    catalogo.innerHTML = `

            <p class="col-span-full
                text-center text-gray-500
                text-lg">

                No se encontraron productos.

            </p>

        `;

    return;
  }

  lista.forEach((producto) => {
    catalogo.innerHTML += `

            <div
                class="bg-white rounded-2xl shadow-md
                overflow-hidden
                hover:shadow-xl
                hover:-translate-y-1
                transition-all duration-300
                border border-gray-100">


                <!-- IMAGEN -->

                <div class="bg-gray-50">

                    <img
                        src="${producto.image}"
                        alt="${producto.title}"
                        class="w-full h-72
                        object-contain p-5">

                </div>


                <!-- INFORMACIÓN -->

                <div class="p-5">


                    <h3 class="text-xl font-bold">

                        ${producto.title}

                    </h3>


                    <p class="text-gray-500 mt-2">

                        ${
                          producto.description
                            ? producto.description.substring(0, 70) + "..."
                            : ""
                        }

                    </p>


                    <p
                        class="text-2xl font-bold
                        text-amber-700 mt-4">

                        $${Number(producto.price).toLocaleString("es-CO")}

                    </p>


                    <button
                        onclick="agregarCarrito(${producto.id})"
                        class="w-full mt-5
                        bg-gray-900 text-white
                        py-3 rounded-xl
                        font-semibold
                        hover:bg-amber-700
                        transition">

                        Agregar al carrito

                    </button>


                </div>

            </div>

        `;
  });
}

// ======================================
// BUSCADOR
// ======================================

const buscador = document.getElementById("buscador");

if (buscador) {
  buscador.addEventListener("input", function () {
    textoBusqueda = this.value.toLowerCase();

    aplicarFiltros();
  });
}

// ======================================
// BOTONES DE FILTRO
// ======================================

const botones = document.querySelectorAll(".filtro");

botones.forEach((boton) => {
  boton.addEventListener("click", function () {
    // Cambiar botón activo

    botones.forEach((b) => {
      b.classList.remove("bg-blue-600", "text-white");

      b.classList.add("bg-gray-200");
    });

    this.classList.remove("bg-gray-200");

    this.classList.add("bg-blue-600", "text-white");

    // Guardar filtro

    filtroActual = this.dataset.filtro;

    aplicarFiltros();
  });
});

// ======================================
// CARRITO
// ======================================

function agregarCarrito(id) {
  let producto = productos.find((p) => p.id === id);

  // Buscar productos de Niño

  if (!producto) {
    producto = productosNino.find((p) => p.id === id);
  }

  if (!producto) {
    alert("Producto no encontrado");

    return;
  }

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // ----------------------------------
  // BUSCAR SI YA EXISTE
  // ----------------------------------

  const productoExistente = carrito.find((p) => p.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContador();

  alert("Producto agregado al carrito");
}

// ======================================
// CONTADOR
// ======================================

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contador = document.getElementById("contador-carrito");

  if (contador) {
    const cantidad = carrito.reduce(
      (total, producto) => total + (producto.cantidad || 1),
      0,
    );

    contador.textContent = cantidad;
  }
}

// ======================================
// INICIAR
// ======================================

actualizarContador();

cargarProductos();
