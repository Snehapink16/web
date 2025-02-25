document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskTime = document.getElementById("taskTime");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    loadTasks();

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const taskTimeValue = taskTime.value;

        if (taskText === "" || taskTimeValue === "") return;

        const task = {
            text: taskText,
            time: taskTimeValue
        };

        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = "";
        taskTime.value = "";
    });

    function addTaskToDOM(task) {
        const listItem = document.createElement("li");

        // Create task text with time
        const taskSpan = document.createElement("span");
        taskSpan.textContent = ${task.text} - ${task.time};

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            listItem.remove();
            deleteTask(task);
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function deleteTask(taskToDelete) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== taskToDelete.text || task.time !== taskToDelete.time);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});