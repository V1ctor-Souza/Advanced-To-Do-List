// Criação de tarefa simples e tarefa com subtarefas

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

// Modal

/* Create task and main modal */
const btnCreateTasks = document.querySelector(".btn-createTasks");
const mainModal = document.querySelector(".main-modal");

btnCreateTasks.addEventListener("click", () => {
    btnCreateTasks.blur();
    mainModal.showModal();
    mainModal.classList.add("slideDown");
});


// Create simpleTask
const btnCreateST = mainModal.querySelector(".btn-createSimpleTask");
const simpleTaskModal = document.querySelector(".simpleTask-modal");

btnCreateST.addEventListener("click", () => {
    mainModal.close();
    mainModal.classList.remove("slideDown");
    simpleTaskModal.showModal();
});


// Create task with subtasks
const btnCreateTWS = mainModal.querySelector(".btn-createTWS");
const taskSubtasksModal = document.querySelector(".taskSubtasks-modal");

btnCreateTWS.addEventListener("click", () => {
    mainModal.close();
    mainModal.classList.remove("slideDown");
    taskSubtasksModal.showModal();
});


// button to create simple task and input
const btnSimpleTask = document.querySelector(".input-container button");
const inputSimpleTask = document.querySelector(".input-container input");

btnSimpleTask.addEventListener("click", createSimpleTask);
inputSimpleTask.addEventListener("keydown", (e) => {
    if(e.key === 'Enter') createSimpleTask();
});

// button to create main task and input
const btnMainTask = document.querySelector(".taskSubtasks-inputs button");

btnMainTask.addEventListener("click", createMainTask);


/* select all <dialog> */
let allModal = document.querySelectorAll("dialog");

allModal.forEach(modal => {
    modal.addEventListener("click", (e) => {
        let posModal = modal.getBoundingClientRect();

        let modalContainer =
        posModal.top <= e.clientY &&
        posModal.left <= e.clientX &&
        e.clientY <= posModal.top + posModal.height &&
        e.clientX <= posModal.left + posModal.width;

        if(!modalContainer){
            modal.classList.remove("slideDown");
            modal.close();  
            inputSimpleTask.value = '';
        };
    });
});

// All functions

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

// Function to create simple task
function createSimpleTask(){
    let taskContainer = createTask("article", "task-container", undefined, firstColumn);
    let labelTask = createTask("label", "task", undefined, taskContainer);
    let checkmark = createTask("span", "checkmark", undefined, labelTask);
    let iconCheck = createTask("i", "bi bi-check2", undefined, checkmark);
    let taskName = createTask("div", "taskName", undefined, labelTask);
    let valueTask = createTask("span", undefined, {nameTask: inputSimpleTask.value}, taskName);

    // Check task
    let icon = checkmark.querySelector('i');
    valueTask.onclick = ()=> {
        icon.classList.toggle("active");
        taskName.classList.toggle("checked");
    }
    checkmark.onclick = ()=> {
        icon.classList.toggle("active");
        taskName.classList.toggle("checked");
    }

    let management = createTask("div", "management", undefined, taskContainer);
    let btnEdit = createTask("button", undefined, undefined, management);
    let imgEdit = createTask("img", undefined, {src: "assets/edit.png", alt: "imagem de editar tarefa"}, btnEdit);
    let btnDelete = createTask("button", undefined, undefined, management);
    let imgDelete = createTask("img", undefined, {src: "assets/delete.png", alt: "imagem de excluir tarefa"}, btnDelete);

    inputSimpleTask.value = '';
    simpleTaskModal.close();
}


// Function to create task with subtasks
function createMainTask(){
    let taskContainer = createTask("article", "task-container main", undefined, firstColumn, true);
    // taskContainer.style.setProperty("display", "none");
    let mainTask = createTask("header", "main-task", undefined, taskContainer);
    let taskNameContainer = createTask("section", "task-name-container", undefined, mainTask);
    let nameMainTask = createTask("h3", undefined, {nameTask: inputMainTask.value}, taskNameContainer);

    definedName = createTask("div", "defined-name", {nameTask: inputMainTask.value}, labelMainTask);
    inputMainTask.value = '';
    inputMainTask.style.setProperty("display", "none");
    btnMainTask.style.setProperty("display", "none");
    taskSubtasksModal.classList.add("active");

    let triangle = createTask("div", "triangle", undefined, taskNameContainer);

    let management = createTask("div", "management", undefined, mainTask);
    let btnEdit = createTask("button", undefined, undefined, management);
    let imgEdit = createTask("img", undefined, {src: "assets/edit.png", alt: "imagem de edição"}, btnEdit);
    let btnDelete = createTask("button", undefined, undefined, management);
    let imgDelete = createTask("img", undefined, {src: "assets/delete.png", alt: "imagem de remoção"}, btnDelete);
    let progress = createTask("div", "progress", undefined, mainTask);

    subtasksList = createTask("section", "subtasks-list", undefined, taskContainer);
}


/* Event to create visual subtasks */
btnSubtask.addEventListener("click", () => {
    let paragraph = createTask("p", undefined, undefined, subtaskinModal);
    let handle = createTask("span", "handle", undefined, paragraph);
    let iconHandle = createTask("i", "bi bi-arrows-move", undefined, handle);
    let nameSubTask = createTask("span", "nameSubTask", {nameTask: inputSubtask.value}, paragraph); 
    listSubtasks.push(inputSubtask.value);
    inputSubtask.value = "";
    let deleteTask = createTask("span", "delete", undefined, paragraph);
    let iconDelete = createTask("i", "bi bi-x-circle-fill", undefined, deleteTask);

    let minSubtask = subtaskinModal.childElementCount;
        if(minSubtask >= 2){
            btncreateMainTask.style.setProperty("display", "block");
        } else return;
    });


/* Event to create default main task structure*/
btncreateMainTask.addEventListener("click", () => {
    for(let i = 0; i < listSubtasks.length; i++){
        sendingMainTask(listSubtasks[i]);
    }
    taskSubtasksModal.close();
    listSubtasks = [];
    btncreateMainTask.style.removeProperty("display");
    inputMainTask.style.removeProperty("display");
    btnMainTask.style.removeProperty("display");
    taskSubtasksModal.classList.remove("active");
    subtaskinModal.innerHTML = "";
    definedName.remove();
});


/* Function to send subtasks to the main task */
function sendingMainTask(nameSubtask){
    let subtaskContainer = createTask("article", "subtask-container", undefined, subtasksList);
    let subtask = createTask("label", "subtask", undefined, subtaskContainer);
    let checkmark = createTask("span", "checkmark", undefined, subtask);
    let iconCheck = createTask("i", "bi bi-check2", undefined, checkmark);
    let taskName = createTask("span", "taskName", {nameTask: nameSubtask}, subtask);
    let managementSubtask = createTask("div", "management", undefined, subtaskContainer);
    let btnEditSubtask = createTask("button", undefined, undefined, managementSubtask);
    let imgEditSubtask = createTask("img", undefined, {src: "assets/edit.png", alt: "imagem de edição"}, btnEditSubtask);
    let btnDeleteSubtask = createTask("button", undefined, undefined, managementSubtask);
    let imgDeleteSubtask = createTask("img", undefined, {src: "assets/delete.png", alt: "imagem de remoção"}, btnDeleteSubtask);
}