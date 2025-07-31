const pendingTasks = firstColumn.querySelector(".task-status");
// Checking for the existence of a simple task
window.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("listSimplesTasks")){
        tasks[0].push(...JSON.parse(localStorage.getItem("listSimplesTasks")));

        tasks[0].forEach(tarefa => {
            createSimpleTask(tarefa, false);
        });
        let totalPendingTasks = firstColumn.childElementCount - 1;
        taskCount(totalPendingTasks);
    }

    if(localStorage.getItem("listMainTasks")){
        tasks[1].push(...JSON.parse(localStorage.getItem("listMainTasks")));

        tasks[1].forEach(tarefa => {
            createMainTask(tarefa, false);
        });
    }
});


let definedName;
let subtasksList;
let listSubtasks = [];
let porcentageSubtask = 0;


let tasks = {
    simples: [],
    mains: []
}


