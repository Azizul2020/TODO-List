//variables from HTML
const taskInput = document.getElementById('taskInput');
const notes = document.getElementById('notes');
const addNote = document.getElementById('addNote');
const clear = document.getElementById('clear');
//common variables
let taskObj;

// get Data from localStorage and set into taskObj;

tasks = localStorage.getItem('tasks');
if (tasks) {
    taskObj = JSON.parse(tasks);
} else {
    taskObj = [];
}

// set value into localStorage

addNote.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        if (taskInput.value) {
            task = taskInput.value;
            taskObj.push(task);
            localStorage.setItem('tasks', JSON.stringify(taskObj));
            showData();
            taskInput.value = null;
        };
    }
});

// Show data in display

function showData() {
    let html = '';
    taskObj.forEach(function(item, index) {
        html += `<div class="card">
                <div class="card-body ">
                    <div class="card-title">Note ${index+1}</div>
                    <div class="card-text">${item}</div>
                    <button class="btn btn-primary my-2" onclick=editItem(${index},this);>Edit</button>
                    <button class="btn btn-danger my-2" onclick=deleteItem(${index});>Delete</button>
                </div>
            </div>`;

    })
    notes.innerHTML = html;

};
showData();

function editItem(index, edit) {
    let currentText = edit.parentElement.querySelector('.card-text');
    currentText.parentElement.parentElement.style.position = 'relative';
    let textArea = document.createElement('textarea');
    textArea.setAttribute('style', 'position:absolute;top:0px;left:0px;outline:none;');
    textArea.style.width = currentText.parentElement.parentElement.offsetWidth + 'px';
    textArea.style.height = currentText.parentElement.parentElement.offsetHeight + 'px';
    textArea.value = currentText.innerText;
    currentText.appendChild(textArea);
    textArea.addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            taskObj[index] = textArea.value;
            localStorage.setItem('tasks', JSON.stringify(taskObj));
            currentText.removeChild(textArea);
            showData();
        }
    })
}

function deleteItem(index) {
    taskObj.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskObj));
    showData();
}

clear.addEventListener('click', function() {
    localStorage.clear();
    tasks = localStorage.getItem('tasks');
    if (tasks) {
        taskObj = JSON.parse(tasks);
    } else {
        taskObj = [];
    }
    showData();
})


let cardText = document.querySelectorAll('.card-text');
let searchInput = document.querySelector('#searchInput');

function searchItem() {
    searchInput.addEventListener('input', function() {
        searchValue = searchInput.value.toUpperCase();
        cardText.forEach(elem => {
            if (elem.innerText.toUpperCase().includes(searchValue)) {
                elem.parentElement.parentElement.style.display = '';
            } else {
                elem.parentElement.parentElement.style.display = 'none';
            }
        })
    })
};
searchItem();