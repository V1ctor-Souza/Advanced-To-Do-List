// Criação de tarefa simples e tarefa com subtarefas
const btnCreateTasks = document.querySelector(".btn-createTasks");
const mainContainer = document.querySelector(".main-container");
let allModal = document.querySelectorAll("dialog");
const mainModal = document.querySelector(".main-modal");
const btnCreateST = mainModal.querySelector(".btn-createSimpleTask");
let firstColumn = document.querySelector(".column:first-child");
const simpleTaskModal = document.querySelector(".simpleTask-modal");
const inputSimpleTask = document.querySelector(".input-container input");
const btnSimpleTask = document.querySelector(".input-container button");

// const checkmark = document.querySelector('.checkmark');
// let icon = checkmark.querySelector('i');
// let taskName = document.querySelector(".taskName");

// checkmark.onclick = ()=> {
//     icon.classList.toggle("active");
//     taskName.classList.toggle("checked");
// }

// Modal

// show main Modal
btnCreateTasks.addEventListener("click", () => {
    btnCreateTasks.blur();
    mainModal.showModal();
    mainModal.classList.add("slideDown");
});


// show simple task modal
btnCreateST.addEventListener("click", () => {
    mainModal.close();
    mainModal.classList.remove("slideDown");
    simpleTaskModal.showModal();
});

// button to create simple task
btnSimpleTask.addEventListener("click", createSimpleTask);
inputSimpleTask.addEventListener("keydown", (e) => {
    if(e.key === 'Enter') createSimpleTask();
});

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

// Functions


// Function to create task
function createTask(element, className, attributes = {}, parentElement, subtask = false){
    let el = document.createElement(element);
    if (className) el.classList.add(...className.split(" "));
    for (let attr in attributes){
        if(attr === 'nameTask') el.textContent = attributes[attr];
        else el.setAttribute(attr, attributes[attr]);
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

    let management = createTask("div", "management", undefined, taskContainer);
    let btnEdit = createTask("button", undefined, undefined, management);
    let imgEdit = createTask("img", undefined, {src: "assets/edit.png", alt: "imagem de editar tarefa"}, btnEdit);
    let btnDelete = createTask("button", undefined, undefined, management);
    let imgDelete = createTask("img", undefined, {src: "assets/delete.png", alt: "imagem de excluir tarefa"}, btnDelete);

    inputSimpleTask.value = '';
    simpleTaskModal.close();
}