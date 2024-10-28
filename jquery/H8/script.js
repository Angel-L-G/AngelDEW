$(document).ready(function () {
    let productosJSON = {};
    let productosSeleccionados = [];

    $.getJSON("productos.json", function (data) {
        productosJSON = data;
    });

    // Función para cargar las subcategorías
    function cargarSubCategorias(categoria) {
        const subMenu = $(".sub-menu");
        const productList = $(".product-list");

        subMenu.empty();
        productList.empty();

        const subcategorias = getSubcategoriasPorCategoria(categoria);

        subcategorias.forEach(subcategoria => {
            subMenu.append(`
                <button class="sub-menu-btn" data-subcategoria="${subcategoria}">
                    ${subcategoria}
                </button>
            `);
        });
    }

    // Función para cargar los productos de una subcategoría
    function cargarProductos(subcategoria) {
        const productList = $(".product-list");
        productList.empty();

        if (productosJSON[subcategoria]) {
            productosJSON[subcategoria].forEach(producto => {
                productList.append(`
                    <div class="product-item" data-id="${producto.id}">
                        <span class="product-name" data-id="${producto.id}">${producto.nombre}</span>
                        <div class="quantity-controls">
                            <button class="decrease-btn">-</button>
                            <span class="quantity" data-id="${producto.id}">0</span>
                            <button class="increase-btn">+</button>
                        </div>
                    </div>
                `);
            });
        }
    }

    // Función auxiliar para obtener las subcategorías según la categoría
    function getSubcategoriasPorCategoria(categoria) {
        switch (categoria) {
            case "bebidas":
                return ["Calientes", "Refrescos", "Alcohólicas"];
            case "primer-plato":
                return ["Sopa", "Ensalada"];
            case "segundo-plato":
                return ["Carne", "Pescado", "Vegetariano"];
            case "postres":
                return ["Dulces", "Frutas"];
            default:
                return [];
        }
    }

    // Actualiza el array productosSeleccionados con el id y cantidad del producto
    function actualizarSeleccion(id, cantidad, nombre) {
        const index = productosSeleccionados.findIndex(item => item.id === id);

        if (index !== -1) {
            if (cantidad > 0) {
                productosSeleccionados[index].cantidad = cantidad;
            } else {
                productosSeleccionados.splice(index, 1);
            }
        } else {
            if (cantidad > 0) {
                productosSeleccionados.push({ id: id, cantidad: cantidad, nombre: nombre });
            }
        }

        console.log(productosSeleccionados);
        setHtml();
    }

    // Agrega los productos seleccionados a la lista de la derecha
    function setHtml() {
        let list = $("#productos-seleccionados");

        list.empty();

        productosSeleccionados.forEach(e => {
            list.append(
                `
                <li class="product-item" data-id="${e.id}">
                    <span>${e.nombre}</span>
                    <div class="quantity-controls">
                        <span class="quantity" data-id="${e.id}">${e.cantidad}</span>
                    </div>
                </li>
                `
            );
        });
    }

    $(".menu-btn").on("click", function () {
        const categoria = $(this).data("category");
        cargarSubCategorias(categoria);
    });

    $(".sub-menu").on("click", ".sub-menu-btn", function () {
        const subcategoria = $(this).data("subcategoria");
        cargarProductos(subcategoria);
    });

    $("#enviarComanda").on("click", function () {
        $("#mensaje-confirmacion").fadeIn();
        $("#mensaje-confirmacion").fadeOut();
        $("#productos-seleccionados").empty();
    });

    $(".product-list").on("click", ".increase-btn, .decrease-btn", function () {
        const quantitySpan = $(this).siblings(".quantity");
        const productId = parseInt(quantitySpan.data("id"));
        let cantidad = parseInt(quantitySpan.text());

        const nameSpan = $(this).parent().siblings(".product-name");
        let name = nameSpan.text();
        

        if ($(this).hasClass("increase-btn")) {
            cantidad += 1;
        } else if ($(this).hasClass("decrease-btn") && cantidad > 0) {
            cantidad -= 1;
        }

        quantitySpan.text(cantidad);
        actualizarSeleccion(productId, cantidad, name);
    });

});
