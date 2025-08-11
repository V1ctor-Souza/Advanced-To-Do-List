const pendingTasks = firstColumn.querySelector(".task-status");
// Checking for the existence of a simple task
window.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("simplesTasks")){
        tasks.simples.push(...JSON.parse(localStorage.getItem("simplesTasks")));

        tasks.simples.forEach(tarefa => {
            createSimpleTask(tarefa, false);
        });
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
        taskCount(firstColumn.childElementCount - 1);
    }

    /* checking if subtasks completed */
    let allMains = document.querySelectorAll(".main");
    tasks.mains.forEach((task, mainIndex) => {
        task.subtasks.forEach((subtask, subIndex) => {
            let completedSubtask = tasks.mains[mainIndex].subtasks[subIndex].completed;

            if(completedSubtask){
                let currentSubtask = allMains[mainIndex].querySelectorAll(".subtask")
                let currentIcon = currentSubtask[subIndex].querySelector("i");
                let currentTaskName = currentSubtask[subIndex].querySelector(".taskName");

                currentIcon.classList.add("active");
                currentTaskName.classList.add("checked");
            } else{
                console.log("não existe");
            }
        });
    });
});


let definedName;
let subtasksList;
let listSubtasks = [];
let porcentageSubtask = 0;


