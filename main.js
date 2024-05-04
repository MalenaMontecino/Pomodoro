
//CREACIÓN NUEVA TAREA
document.getElementById('switchCategoria').addEventListener('change', function () {
    const inputCategoria = document.getElementById('inputCategoria');
    inputCategoria.style.display = this.checked ? 'block' : 'none';
});


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
        <div class="card mt-4 m-2">
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
        // Obtener la tarjeta
        const card = event.target.closest('.card');
        // Mostrar un mensaje de confirmación y pasar la tarjeta como argumento
        showModal(card);
    }
});

// Función para mostrar el modal de confirmación
function showModal(card) {
    document.getElementById("confirmationModal").style.display = "block";

    // Evento para el botón de confirmar eliminación
    document.getElementById("confirmDelete").addEventListener("click", function() {
        // Ocultar el modal
        hideModal();
        // Eliminar la tarjeta
        card.remove();
    });

    // Evento para el botón de cancelar eliminación
    document.getElementById("cancelDelete").addEventListener("click", function() {
        // Ocultar el modal
        hideModal();
    });
}

// Función para ocultar el modal de confirmación
function hideModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

});

//TIMER

// function showVideo() {
//     // Oculta el temporizador
//     document.getElementById('timer').classList.add('hidden');
//     // Muestra el video
//     document.getElementById('greenScreenVideo').classList.remove('hidden');
// }
// function hideVideo() {
//     // Muestra el temporizador
//     document.getElementById('timer').classList.remove('hidden');
//     // Oculta el video
//     document.getElementById('greenScreenVideo').classList.add('hidden');
// }

let timer; // Variable para el temporizador
let isTimerRunning = false; // Variable para controlar si el temporizador está en funcionamiento o no
let minutes = 25; // Duración predeterminada del temporizador en minutos
let seconds = 0; // Inicializamos los segundos en 0
let lastTimerDuration = 25; // Duración predeterminada del temporizador

function startTimer() {
    isTimerRunning = true;
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    isTimerRunning = false;
    clearInterval(timer);
}

// Actualizar la duración del temporizador a 25 minutos cuando el temporizador de 5 o 15 minutos se complete
function updateTimer() {
    // Verificar si los segundos han llegado a cero
    if (seconds === 0) {
        // Si los segundos son cero, verificar si los minutos también son cero
        if (minutes === 0) {
            // Si ambos son cero, detener el temporizador
            stopTimer();
            // Cambiar la duración del temporizador a 25 minutos
            lastTimerDuration = 25;
            setTimerDuration(25);
            // Cambiar el botón a "play"
            document.getElementById('playButton').querySelector('span').innerText = 'play_arrow';
            //showVideo();
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
    restartTimer(); // Pasamos la duración actual como argumento
    const playButton = document.querySelector('#playButton');
    if (playButton.querySelector('span').innerText === 'pause') {
        playButton.querySelector('span').innerText = 'play_arrow'; // Cambiar el texto del botón a "Play"
    }
});

// Restablecer el temporizador con la última duración seleccionada
function restartTimer() {
    stopTimer(); // Detener el temporizador si está en funcionamiento
    minutes = lastTimerDuration;
    seconds = 1;
    updateTimer(); // Actualizar el temporizador en el HTML
    if (isTimerRunning) {
        startTimer(); // Si se está reproduciendo el temporizador cuando se reinicia, iniciar nuevamente
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

setTimerDuration(0); //PARA PRUEBAS

// Controlador de eventos para el botón de 5 minutos
document.querySelector('#btn5min').addEventListener('click', function () {
    lastTimerDuration = 5; // Guardar la última duración seleccionada
    setTimerDuration(5); // Establecer la duración del temporizador a 5 minutos
});

// Controlador de eventos para el botón de 15 minutos
document.querySelector('#btn15min').addEventListener('click', function () {
    lastTimerDuration = 15; // Guardar la última duración seleccionada
    setTimerDuration(15); // Establecer la duración del temporizador a 15 minutos
});

function setTimerDuration(duration) {
    minutes = duration;
    seconds = 1;
    updateTimer();
}



//DRAG AND DROP
