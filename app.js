//Define UI Variables
const form          = document.querySelector('#task-form');
const tasksList     = document.querySelector('.collection');
const clearBtn      = document.querySelector('.clears-tasks');
const filter        = document.querySelector('#filter');
const taskInput     = document.querySelector('#task');         


//load all event listneners
loadEventListeners();

//load all event listeners function
function loadEventListeners () {
    //Add task Event
    form.addEventListener('submit', addTask)

}

//addTask function
function addTask (e) {
    if (taskInput.value === '') {
        alert('Please add a task');
    }


    e.preventDefaultEvent();
}


