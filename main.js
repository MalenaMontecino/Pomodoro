
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
  // Crear un ID único para la nueva tarea
  const taskId = 'task-' + Math.random().toString(36).substr(2, 9); 
    // Crear la nueva tarjeta de tarea
    const nuevaTarea = document.createElement('div');
    nuevaTarea.id = taskId; // Establecer el ID único
    nuevaTarea.classList.add('card', 'mt-4', 'm-2');
    nuevaTarea.setAttribute('draggable', 'true');
    nuevaTarea.addEventListener('dragstart', drag);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = nombreTarea;

    const cardDescription = document.createElement('p');
    cardDescription.classList.add('card-text');
    cardDescription.textContent = descripcionTarea;

    const cardTimestamp = document.createElement('p');
    cardTimestamp.classList.add('card-text', 'd-flex', 'justify-content-end');
    cardTimestamp.textContent = new Date().toLocaleString();
    cardTimestamp.style.opacity = '70%';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardTimestamp);

 const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.classList.add('btn-close');
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.id = 'deleteCard';
        closeButton.addEventListener('click', function () {
            showModal(nuevaTarea);
        });

    if (document.getElementById('switchCategoria').checked) {
        // Con categoría
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header', 'd-flex', 'justify-content-between');
        cardHeader.style.backgroundColor = colorCategoria;

        const spanCategoria = document.createElement('span');
        spanCategoria.textContent = categoria;

        cardHeader.appendChild(spanCategoria);
        cardHeader.appendChild(closeButton);

        nuevaTarea.appendChild(cardHeader);
    } else {
        // Sin categoría
        cardTitle.classList.add('d-flex', 'justify-content-between');
        cardTitle.appendChild(closeButton);
        nuevaTarea.classList.add('sin-categoria');
        nuevaTarea.addEventListener('click', function () {
            showModal(nuevaTarea);
        });
    }

    nuevaTarea.appendChild(cardBody);

    // Agregar la nueva tarjeta de tarea a la columna "To Do"
    document.querySelector('#toDo .columna-Tareas-To-Do').appendChild(nuevaTarea);

    // Borrar el contenido de los campos del formulario
    document.getElementById('nombreTarea').value = '';
    document.getElementById('descripcionTarea').value = '';
});
// Evento para eliminar tarjetas
function showModal(card) {
    document.getElementById("confirmationModal").style.display = "block";

    // Evento para el botón de confirmar eliminación
    document.getElementById("confirmDelete").addEventListener("click", function () {
        // Ocultar el modal
        hideModal();
        // Eliminar la tarjeta
        card.remove();
    });

    // Evento para el botón de cancelar eliminación
    document.getElementById("cancelDelete").addEventListener("click", function () {
        // Ocultar el modal
        hideModal();
    });
}

// Función para ocultar el modal de confirmación
function hideModal() {
    document.getElementById("confirmationModal").style.display = "none";
}


//DRAG AND DROP
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    
    // Verificar si el elemento se está soltando en la columna deseada
    if (ev.target.id === "cardDone") {
        // Obtener todas las tareas con la clase 'done-task'
        const doneTasks = document.querySelectorAll('.done-task');
        // Desactivar el evento ondragstart para todas las tareas en la columna "DONE"
        doneTasks.forEach(task => {
            task.setAttribute("draggable", "false");
            task.removeEventListener("dragstart", drag);
        });
        // Agregar la clase 'done-task' a la tarea arrastrada
        draggedElement.classList.add('done-task');
    }
    
    ev.target.appendChild(draggedElement);
}




//TIMER



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
            // Crear un nuevo objeto Audio
            var sound = new Audio('/img/alarma.mp3');

            // Reproducir el sonido una vez
            sound.play();

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

setTimerDuration(1); //PARA PRUEBAS

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

