

document.getElementById('switchCategoria').addEventListener('change', function () {
    const inputCategoria = document.getElementById('inputCategoria');
    inputCategoria.style.display = this.checked ? 'block' : 'none';
});


//CREACIÓN NUEVA TAREA
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const nombreTarea = document.getElementById('nombreTarea').value;
    const descripcionTarea = document.getElementById('descripcionTarea').value;
    const categoriaSelect = document.getElementById('categoriaSelect');
    const categoria = categoriaSelect.value;
    const colorCategoria = categoriaSelect.options[categoriaSelect.selectedIndex].dataset.color;

    // Crear la nueva tarjeta de tarea
    let nuevaTarea = '';
    if (document.getElementById('switchCategoria').checked) {
        // Con categoría
        nuevaTarea = `
        <div class="card mt-4 m-2" >
            <div class="card-header d-flex justify-content-between"style="background-color: ${colorCategoria};">
                <span>${categoria}</span>
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-10">
                        <h5 class="card-title">${nombreTarea}</h5>
                    </div>
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

    // Borrar el contenido de los campos del formulario
    document.getElementById('nombreTarea').value = '';
    document.getElementById('descripcionTarea').value = '';

});


