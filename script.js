document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from Local Storage on page load
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const task = {
            id: Date.now(), // Unique ID for each task
            text: taskText,
            dueDate: dueDate,
            completed: false
        };

        renderTask(task);
        saveTask(task);

        taskInput.value = '';
        dueDateInput.value = '';
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <div class="task-details">
                <span class="task-text">${task.text}</span>
                ${task.dueDate ? `<span class="task-due-date">Due: ${task.dueDate}</span>` : ''}
            </div>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? 'Incomplete' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    function handleTaskActions(e) {
        const target = e.target;
        const li = target.closest('li');
        if (!li) return;

        const taskId = parseInt(li.dataset.id);

        if (target.classList.contains('complete-btn')) {
            toggleTaskCompletion(taskId);
        } else if (target.classList.contains('delete-btn')) {
            deleteTask(taskId);
        }
    }

    function toggleTaskCompletion(id) {
        let tasks = getTasksFromStorage();
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        saveTasksToStorage(tasks);
        refreshTaskList();
    }

    function deleteTask(id) {
        let tasks = getTasksFromStorage();
        tasks = tasks.filter(task => task.id !== id);
        saveTasksToStorage(tasks);
        refreshTaskList();
    }

    function saveTask(task) {
        const tasks = getTasksFromStorage();
        tasks.push(task);
        saveTasksToStorage(tasks);
    }

    function getTasksFromStorage() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function saveTasksToStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = getTasksFromStorage();
        tasks.forEach(task => renderTask(task));
    }

    function refreshTaskList() {
        taskList.innerHTML = ''; // Clear current list
        loadTasks(); // Reload from storage
    }
});
