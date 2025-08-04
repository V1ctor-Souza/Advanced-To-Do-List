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

    /* checking if there is a main task waiting for subtasks*/
    if(localStorage.getItem("nameMainCurrent")){
        nameMainCurrent = localStorage.getItem("nameMainCurrent");
        inputMainTask.value = localStorage.getItem("nameMainCurrent");
        taskSubtasksModal.classList.add("active");
    }
    
    /* checking if there are subtasks created*/
    if(localStorage.getItem("subtasksCurrent")){
        subtasksCurrent.push(...JSON.parse(localStorage.getItem("subtasksCurrent")));

        subtasksCurrent.forEach(subtask => {
            createVisualSubtasks(subtask);
        });

        let minSubtask = localStorage.getItem("minSubtask");
        minSubtask >= 2 ? btncreateMainTask.style.setProperty("display", "block") : btncreateMainTask.style.removeProperty("display");
    }

    /* creating all main tasks */
    if(localStorage.getItem("mainTasks")){
        tasks.mains.push(...JSON.parse(localStorage.getItem("mainTasks")));

        tasks.mains.forEach(task => {
            createMainTask(task.nameMain, task.subtasks);
        });
    }

    /*
    
    tasks = {
    
        simples = [],
        mains = [
        
        0    {nameMain: "Tarefa principal", subtaks: ["S1", "S2"]};
        1    {nameMain: "Tarefa principal", subtaks: ["S1", "S2"]};
        2    {nameMain: "Tarefa principal", subtaks: ["S1", "S2"]};

        ]
    
    }
    
    */

    // indexCurrentMain = JSON.parse(localStorage.getItem("indexCurrentMain"));
    
    // if(localStorage.getItem("mainTasks")){
    //     tasks.mains.push(...JSON.parse(localStorage.getItem("mainTasks")));

    //     mainTaskInModal(tasks.mains[indexCurrentMain].nameMain, tasks.mains[indexCurrentMain].subtasks);
    // };
});


let definedName;
let subtasksList;
let listSubtasks = [];
let porcentageSubtask = 0;


