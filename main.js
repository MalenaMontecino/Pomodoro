document.getElementById('btnNuevaTarea').addEventListener('click', function () {
    // Limpiar el formulario del modal antes de mostrarlo
    document.getElementById('nombreTarea').value = '';
});

document.getElementById('switchCategoria').addEventListener('change', function () {
    const inputCategoria = document.getElementById('inputCategoria');
    inputCategoria.style.display = this.checked ? 'block' : 'none';
});

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const nombreTarea = document.getElementById('nombreTarea').value;
    const descripcionTarea = document.getElementById('descripcionTarea').value;
    const categoria = document.getElementById('nombreCategoria').value;
    const colorCategoria = document.getElementById('colorCategoria').value;

    // Crear la nueva tarjeta de tarea
    let nuevaTarea = '';
    if (document.getElementById('switchCategoria').checked) {
        // Con categoría
        nuevaTarea = `
            <div class="card mt-4 m-2">
                <div class="card-header" style="background-color: ${colorCategoria};">
                    ${categoria}
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <h5 class="card-title">${nombreTarea}</h5>
                        </div>
                        <button type="button" class="btn-close d-flex justify-content-end" aria-label="Close"></button>
                    </div>
                    <p class="card-text">${descripcionTarea}</p>
                    <p style="opacity:70%;" class="card-text d-flex justify-content-end">${new Date().toLocaleString()}</p>
                </div>
            </div>
        `;
    } else {
        // Sin categoria
        nuevaTarea = `
            <div class="card mt-4 m-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <h5 class="card-title">${nombreTarea}</h5>
                        </div>
                        <button type="button" class="btn-close d-flex justify-content-end" aria-label="Close"></button>
                    </div>
                    <p class="card-text">${descripcionTarea}</p>
                    <p style="opacity:70%;" class="card-text d-flex justify-content-end">${new Date().toLocaleString()}</p>
                </div>
            </div>
        `;
    }

    // Agregar la nueva tarjeta de tarea a la columna "To Do"
    document.querySelector('#toDo .columna-Tareas-To-Do').innerHTML += nuevaTarea;

    // Cerrar el modal
    const modal = new bootstrap.Modal(document.getElementById('nuevaTareaModal'));
    modal.hide();

    // Limpiar los campos del formulario
    document.getElementById('nombreTarea').value = '';
    document.getElementById('descripcionTarea').value = '';
    document.getElementById('nombreCategoria').value = '';
    document.getElementById('colorCategoria').value = '';
    document.getElementById('switchCategoria').checked = false;
    document.getElementById('inputCategoria').style.display = 'none';
});

// Agregar evento click al botón de cierre del modal
document.querySelector('.modal .btn-close').addEventListener('click', function () {
    // Limpiar los campos del formulario
    document.getElementById('nombreTarea').value = '';
    document.getElementById('descripcionTarea').value = '';
    document.getElementById('nombreCategoria').value = '';
    document.getElementById('colorCategoria').value = '';
    document.getElementById('switchCategoria').checked = false;
    document.getElementById('inputCategoria').style.display = 'none';
});