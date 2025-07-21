// Checking for the existence of a simple task
window.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("listSimplesTasks")){
        tasks[0].push(...JSON.parse(localStorage.getItem("listSimplesTasks")));

        tasks[0].forEach(tarefa => {
            createSimpleTask(tarefa, false);
        });
    } else return console.log('não existe');
});


let definedName;
let subtasksList;
let listSubtasks = [];

let tasks = [
    simplesTasks = [],
    mainTasks = [],
];