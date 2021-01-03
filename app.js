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
    form.addEventListener('submit', addTask);
}

//addTask function
function addTask (e) {
    if (taskInput.value === 'Test') {
        alert('Please add a task');
    }

    e.preventDefault();
}

/*
https://www.udemy.com/course/modern-javascript-from-the-beginning/learn/lecture/8762202#questions/13346716
Time: 11:00

Status: function addTask not working - cause unknown

