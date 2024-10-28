$(document).ready(function() {
    // Función para agregar una nueva tarea
    $("#agregar-tarea").click(function() {
        let nuevaTarea = $("#nueva-tarea").val().trim();
        if (nuevaTarea !== "") {
            let tareaHtml = `
                <li>
                    <span class="nombre-tarea">${nuevaTarea}</span>
                    <button class="editar-tarea">Editar</button>
                    <button class="eliminar-tarea">Eliminar</button>
                </li>`;
            $("#lista-tareas").append(tareaHtml);
            $("#nueva-tarea").val(''); // Limpiar input
        } else {
            alert("Por favor, escribe una misión para agregar.");
        }
    });

    // Función para eliminar una tarea
    $(document).on("click", ".eliminar-tarea", function() {
        $(this).parent().remove();
    });

    // Función para editar una tarea
    $(document).on("click", ".editar-tarea", function() {
        let tareaActual = $(this).siblings(".nombre-tarea").text();
        let nuevaTarea = prompt("Editar misión:", tareaActual);
        if (nuevaTarea !== null && nuevaTarea.trim() !== "") {
            $(this).siblings(".nombre-tarea").text(nuevaTarea.trim());
        }
    });

    // Función para limpiar todas las tareas
    $("#limpiar-tareas").click(function() {
        $("#lista-tareas").empty();
    });
});
