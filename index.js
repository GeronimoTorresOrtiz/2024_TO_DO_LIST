const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const showAllBtn = document.getElementById('showAllBtn');
const showCompletedBtn = document.getElementById('showCompletedBtn');
const showPendingBtn = document.getElementById('showPendingBtn');

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

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Eliminar';
    deleteBtn.classList.add('text-red-500', 'hover:text-red-700');
    deleteBtn.addEventListener('click', () => {
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
    listItem.appendChild(deleteBtn);

    taskList.appendChild(listItem);
  });
}

// agrega una nueva tarea
const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = ''; 
    renderTasks();
    saveTasksToLocalStorage(); 
  }
};

// filtra las tareas completadas
const showCompletedTasks = () => {
  const completedTasks = tasks.filter(task => task.completed);
  renderFilteredTasks(completedTasks);
};

// filtra las tareas pendientes
const showPendingTasks = () => {
  const pendingTasks = tasks.filter(task => !task.completed);
  renderFilteredTasks(pendingTasks);
};

// muestra todas las tareas
const showAllTasks = () => {
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

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Eliminar';
    deleteBtn.classList.add('text-red-500', 'hover:text-red-700');
    deleteBtn.addEventListener('click', () => {
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
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
  });
};

addTaskBtn.addEventListener('click', addTask);
showAllBtn.addEventListener('click', showAllTasks);
showCompletedBtn.addEventListener('click', showCompletedTasks);
showPendingBtn.addEventListener('click', showPendingTasks);
renderTasks();