// Criação de tarefa simples e tarefa com subtarefas
const btnCreateTasks = document.querySelector(".btn-createTasks");
const mainContainer = document.querySelector(".main-container");
const mainModal = document.querySelector(".main-modal");
let firstColumn = document.querySelector(".column:first-child");

btnCreateTasks.addEventListener("click", () => {
    mainModal.showModal();
    mainModal.classList.add("animation");
});

// btnCreateTasks.addEventListener("click", () => {
//     let taskContainer = createSimpleTask("article", "task-container", undefined, firstColumn);
//     let labelTask = createSimpleTask("label", "task", undefined, taskContainer);
//     let inputTask = createSimpleTask("input", undefined, {type: "checkbox"}, labelTask);
//     let checkmark = createSimpleTask("span", "checkmark", undefined, labelTask);
//     let taskName = createSimpleTask("span", "taskName", {nameTask: "Nome da tarefa"}, labelTask);
// });


// Functions


// Function to create simple task
function createSimpleTask(element, className, attributes = {}, parentElement, subtask = false){
    let el = document.createElement(element);
    if (className) el.classList.add(...className.split(" "));
    for (let attr in attributes){
        if(attr === 'nameTask') el.textContent = attributes[attr];
        else el.setAttribute(attr, attributes[attr]);
    }
    return parentElement.appendChild(el);
}