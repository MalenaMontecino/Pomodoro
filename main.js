

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
                <button type="button" class="btn-close" id="deleteCard" aria-label="Close"></button>
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
                        <button type="button" id="deleteCard" class="btn-close d-flex justify-content-end" aria-label="Close"></button>
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

    // Event listener para eliminar tarjetas
    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'deleteCard') {
            event.target.closest('.card').remove();
        }
    });
});


//timer


let timer; // Variable para el temporizador
let isTimerRunning = false; // Variable para controlar si el temporizador está en funcionamiento o no
let minutes = 25; // Duración predeterminada del temporizador en minutos
let seconds = 0; // Inicializamos los segundos en 0
function startTimer() {
    isTimerRunning = true;
    timer = setInterval(updateTimer, 1000);
}
function stopTimer() {
    isTimerRunning = false;
    clearInterval(timer);
}
function updateTimer() {
    // Verificar si los segundos han llegado a cero
    if (seconds === 0) {
        // Si los segundos son cero, verificar si los minutos también son cero
        if (minutes === 0) {
            // Si ambos son cero, detener el temporizador
            stopTimer();
            return;
        } else {
            // Si solo los segundos son cero, restar un minuto y establecer los segundos en 59
            minutes--;
            seconds = 59;
        }
    } else {
        // Si los segundos no son cero, restar un segundo
        seconds--;
    }

    // Formatear los minutos y segundos en formato de temporizador (mm:ss)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Actualizar el texto del temporizador en el HTML
    document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
}
document.getElementById('restartButton').addEventListener('click', function () {
    restartTimer();
});

function restartTimer() {
    stopTimer(); // Detener el temporizador si está en funcionamiento
    // Restablecer los valores del temporizador a su estado inicial
    minutes = 25;
    seconds = 1;
    // Actualizar el temporizador en el HTML
    updateTimer();
    // Si se está reproduciendo el temporizador cuando se reinicia, iniciar nuevamente
    if (isTimerRunning) {
        startTimer();
    }
}

document.querySelector('#playButton').addEventListener('click', function () {
    if (!isTimerRunning) {
        startTimer();
        this.querySelector('span').innerText = 'pause'; // Cambiar el texto del botón a "Pause"
    } else {
        stopTimer();
        this.querySelector('span').innerText = 'play_arrow'; // Cambiar el texto del botón a "Play"
    }
});
