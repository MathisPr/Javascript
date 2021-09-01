//Projekt based on Udemy Course "Modern JavaScript From The Beginning" Created by Brad Traversy 12/2019
//https://www.udemy.com/course/modern-javascript-from-the-beginning/learn/lecture/8762202#overview

//define UI Vars
const form      = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks'); 
const filter    = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all EventListeners
loadEventListeners();

//Load all EventListeners function
function loadEventListeners() {
    //DOM load event for retival from local storage
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask)
    //remove all tasks
    clearBtn.addEventListener('click', removeAllTasks)
    //filters through tasks
    filter.addEventListener('keyup', filterList)

};

//Get tasks from local Storage
function getTasks() {
    let tasks;

    //check if local storage is empty
    if(localStorage.getItem('tasks') === null) {
        //set tasks to empty array
        tasks = [];
    } else {
        //local storage can only save string - parse to string
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop through the existing tasks and create a list item
    tasks.forEach(function(task) {
        //create Elemet for each Task in local Storage

        //Create li Element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create text node and append to li - the value is comming from task
        li.appendChild(document.createTextNode(task));

        //INPUT WIRD NICHT IN TASKS ÜBERTRAGEN!! 

        //create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon remove
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link to li
        li.appendChild(link);  

        //Append li to ul
        taskList.appendChild(li);

    });

};


//Add task
function addTask(e) {
    //check if Input is NULL
    if(taskInput.value === '') {
        alert('Please insert a Task');
    }
    
    //Create li Element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon remove
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);  

    //Append li to ul
    taskList.appendChild(li);

    //Store in Local Storage 
    storeTaskInLocalStorage(taskInput.value); 

    //Clear input
    taskInput.value = '';

    e.preventDefault();
};

//store Tasks in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;

    //check if local storage is empty
    if(localStorage.getItem('tasks') === null) {
        //set tasks to empty array
        tasks = [];
    } else {
        //local storage can only save string - parse to string
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //Add new item to array task
    tasks.push(task);

    //set it back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

};


//remove Task
function removeTask(e) {
    //check for the parent of the clicked icon
    if(e.target.parentElement.classList.contains('delete-item')) {
        //Asks for confirmation to delete
        if (confirm('Do you want to delete this Element?')) {
            //get the Element to remove - icon is child of a - a is child of li --> parentElement of parentElement 
            e.target.parentElement.parentElement.remove();

            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
};

//remove Task from local Storage
function removeTaskFromLocalStorage(taskItem) {
    //Check local storage for tasks - put them into a variable
    let tasks;

    //check if local storage is empty
    if(localStorage.getItem('tasks') === null) {
        //set tasks to empty array
        tasks = [];
    } else {
        //local storage can only save string - parse to string
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop through variable
    tasks.forEach(function(task, index) {
        //check if the text in the var task is identical with the task, that is the currently in the loop 
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    //set local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


//remove remove all Tasks
function removeAllTasks(e) {
    //Loops to remove as long as there is a Child in the list - calls always for the first child     
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //remove from local storage
    clearTasksFromLocalStorage();
}

//clear Tasks from local storage
function clearTasksFromLocalStorage() {
    //clear all items in the local storage
    localStorage.clear();
};


//filters through Task-List
function filterList(e) {
    //get the typed in text - set it to lowercases to make sure it matches the target
    const text = e.target.value.toLowerCase();

    //get all list items and loop through them
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        //check if child is identical to typed in text
        if(item.toLowerCase().indexOf(text) != -1) {
            //if matched show the item
            task.style.display = 'block';
        }
        else {
            //if no match, hide the item
            task.style.display = 'none';
        }

    });

    // console.log(text)

}