// UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add Task Event
    form.addEventListener("submit", addTask);
    // Remove Task Event
    taskList.addEventListener("click", removeTask);
    // Clear All Tasks Event
    clearBtn.addEventListener("click", clearTasks);
    // Filter Tasks Event
    filter.addEventListener("keyup", filterTasks);
}


// ***************
// TASK FUNCTIONS
// ***************

// Add new task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task!");
    }else{
        const li = document.createElement("li");
        li.className = "collection-item";

        const content = `${taskInput.value}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;

        li.innerHTML = content;

        taskList.insertBefore(li ,taskList.firstElementChild);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = "";
    }
    e.preventDefault();
}

// Remove clicked task
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        e.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Clear all tasks
function clearTasks(e) {
    if (confirm("Clear all tasks?")) {
        // taskList.innerHTML = "";
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    // Clear all tasks from local storage
    clearAllTasksFromLocalStorage();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

// ***********************
// LOCAL STORAGE FUNCTIONS
// ***********************

// Store new task
function storeTaskInLocalStorage(task){
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get all tasks
function getTasks(){
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    // Generate task from storage
    tasks.forEach(function(task){
        const li = document.createElement("li");
        li.className = "collection-item";

        const content = `${task}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;

        li.innerHTML = content;

        taskList.insertBefore(li, taskList.firstElementChild);
    });

}

// Remove task 
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if(task === taskItem.textContent){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearAllTasksFromLocalStorage(){
    // if(localStorage.getItem("tasks") !== null){
    //     localStorage.removeItem("tasks");
    // }

    localStorage.clear();
}



