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
  // generador id
  const taskId = 'task-' + Math.random().toString(36).substr(2, 9); 

    const nuevaTarea = document.createElement('div');
    nuevaTarea.id = taskId; 
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
    cardTimestamp.id = 'rowTime';
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

    document.querySelector('#toDo .columna-Tareas-To-Do').appendChild(nuevaTarea);

    document.getElementById('nombreTarea').value = '';
    document.getElementById('descripcionTarea').value = '';
});
//
function showModal(card) {
    document.getElementById("confirmationModal").style.display = "block";
   
    document.getElementById("confirmDelete").addEventListener("click", function () {
        hideModal();
        card.remove();
    });

    document.getElementById("cancelDelete").addEventListener("click", function () {
        hideModal();
    });
}


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
    let data = ev.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);

    ev.target.appendChild(draggedElement);
    console.log("id:",ev.target.id)
   
    if (ev.target.id === 'cardDone') {
    
        let rowTime = draggedElement.querySelector('#rowTime');
        draggedElement.setAttribute('draggable', 'false');

        let googleIcon = document.createElement('span');
        googleIcon.classList.add('material-symbols-outlined');
        googleIcon.textContent = "task_alt";
        googleIcon.style.marginLeft = '12%';
        googleIcon.style.color = 'green';

        rowTime.appendChild(googleIcon);
    }
}

//TIMER

let timer; 
let isTimerRunning = false; 
let minutes = 25;
let seconds = 0;
let lastTimerDuration = 25;

function startTimer() {
    isTimerRunning = true;
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    isTimerRunning = false;
    clearInterval(timer);
}

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            stopTimer();
            let sound = new Audio('/img/alarma.mp3');
            sound.play();

            lastTimerDuration = 25;
            setTimerDuration(25);
           
            document.getElementById('playButton').querySelector('span').innerText = 'play_arrow';
          
            return;
        } else {
            
            minutes--;
            seconds = 59;
        }
    } else {
       
        seconds--;
    }
 
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
}

document.getElementById('restartButton').addEventListener('click', function () {
    restartTimer(); 
    const playButton = document.querySelector('#playButton');
    if (playButton.querySelector('span').innerText === 'pause') {
        playButton.querySelector('span').innerText = 'play_arrow';
    }
});


function restartTimer() {
    stopTimer(); 
    minutes = lastTimerDuration;
    seconds = 1;
    updateTimer(); 
    if (isTimerRunning) {
        startTimer(); 
    }
}

document.querySelector('#playButton').addEventListener('click', function () {
    if (!isTimerRunning) {
        startTimer();
        this.querySelector('span').innerText = 'pause'; 
    } else {
        stopTimer();
        this.querySelector('span').innerText = 'play_arrow'; 
    }
});

setTimerDuration(1); //PARA PRUEBA DE SONIDO

document.querySelector('#btn5min').addEventListener('click', function () {
    lastTimerDuration = 5; 
    setTimerDuration(5); 
});


document.querySelector('#btn15min').addEventListener('click', function () {
    lastTimerDuration = 15; 
    setTimerDuration(15); 
});

function setTimerDuration(duration) {
    minutes = duration;
    seconds = 1;
    updateTimer();
}

