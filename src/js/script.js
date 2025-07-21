const mainContainer = document.querySelector(".main-container");
const firstColumn = document.querySelector(".column:first-child");
const taskSubtasksContainer = document.querySelector(".taskSubtasks-inputs");
const labelMainTask = document.querySelector(".taskSubtasks-inputs label");
const inputMainTask = document.querySelector(".taskSubtasks-inputs input");
const inputSubtask = document.querySelector(".nameSubtask-container input");
const btnSubtask = document.querySelector(".btn-addSubtask");
const btncreateMainTask = document.querySelector(".createMainTask button");

/*modal*/
const subtaskinModal = document.querySelector(".subtask-list-inModal");

let definedName;
let subtasksList;
let listSubtasks = [];

let task = [
    simplesTasks = [],
    mainTasks = [],
];

// Function to create task (main function to create tasks)
function createTask(element, className, attributes = {}, parentElement, subtask = false){

    let el = document.createElement(element);
    if (className) el.classList.add(...className.split(" "));
    for (let attr in attributes){
        if(attr === 'nameTask') el.textContent = attributes[attr];
        else el.setAttribute(attr, attributes[attr]);
    }

    if(subtask){
        console.log("contém subtarefa");
    }
    return parentElement.appendChild(el);
}