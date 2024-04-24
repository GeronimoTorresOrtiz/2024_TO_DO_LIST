const taskInput = document.getElementById('taskInput');
const agregarTareaBoton = document.getElementById('agregarTareaBoton');
const taskList = document.getElementById('taskList');
const mostrarTareas = document.getElementById('mostrarTareas');
const mostrarCompletadas = document.getElementById('mostrarCompletadas');
const mostrarPendientes = document.getElementById('mostrarPendientes');

// si no tiene tareas arranca con la lista vacia
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// guarda las tareas en el LocalStorage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// renderiza la lista de tareas
function renderTasks() {
  taskList.innerHTML = ''; 
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'items-center', 'justify-between', 'border-b', 'border-gray-200', 'py-2');

    const taskText = document.createElement('span');
    taskText.innerText = task.text;
    if (task.completed) {
      taskText.classList.add('line-through');
    }

    const botonBorrar = document.createElement('button');
    botonBorrar.innerText = 'Eliminar';
    botonBorrar.classList.add('text-red-500', 'hover:text-red-700');
    botonBorrar.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
      saveTasksToLocalStorage();
    });

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.checked = task.completed;
    completeCheckbox.addEventListener('change', () => {
      task.completed = !task.completed;
      renderTasks();
      saveTasksToLocalStorage(); 
    });

    listItem.appendChild(completeCheckbox);
    listItem.appendChild(taskText);
    listItem.appendChild(botonBorrar);
    taskList.appendChild(listItem);
  });
}

// agrega una nueva tarea
const agregarTarea = () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = ''; 
    renderTasks();
    saveTasksToLocalStorage(); 
  }
};

// filtra las tareas completadas
const mostrarTareasCompletadas = () => {
  const completedTasks = tasks.filter(task => task.completed);
  renderFilteredTasks(completedTasks);
};

// filtra las tareas pendientes
const mostrarTareasPendientes = () => {
  const pendingTasks = tasks.filter(task => !task.completed);
  renderFilteredTasks(pendingTasks);
};

// muestra todas las tareas
const mostrarTodasTareas = () => {
  renderTasks();
};

// renderiza las tareas filtradas
const renderFilteredTasks = (filteredTasks) => {
  taskList.innerHTML = ''; 
  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'items-center', 'justify-between', 'border-b', 'border-gray-200', 'py-2');

    const taskText = document.createElement('span');
    taskText.innerText = task.text;
    if (task.completed) {
      taskText.classList.add('line-through');
    }

    const botonBorrar = document.createElement('button');
    botonBorrar.innerText = 'Eliminar';
    botonBorrar.classList.add('text-red-500', 'hover:text-red-700');
    botonBorrar.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderFilteredTasks(filteredTasks);
      saveTasksToLocalStorage(); 
    });

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.checked = task.completed;
    completeCheckbox.addEventListener('change', () => {
      task.completed = !task.completed;
      renderFilteredTasks(filteredTasks);
      saveTasksToLocalStorage(); 
    });

    listItem.appendChild(completeCheckbox);
    listItem.appendChild(taskText);
    listItem.appendChild(botonBorrar);
    taskList.appendChild(listItem);
  });
};

agregarTareaBoton.addEventListener('click', agregarTarea);
mostrarTareas.addEventListener('click', mostrarTodasTareas);
mostrarCompletadas.addEventListener('click', mostrarTareasCompletadas);
mostrarPendientes.addEventListener('click', mostrarTareasPendientes);
renderTasks();