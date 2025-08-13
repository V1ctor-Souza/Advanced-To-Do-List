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

    /* checking if simple task completed */
    if(localStorage.getItem("tasksCompleted")){
        let completedColumn =  completedTaskColumn.querySelectorAll(".task-container");
        let pendingColumn = firstColumn.querySelectorAll(".task-container");
        let allTasks = [...completedColumn, ...pendingColumn];

        taskCompleted.push(...JSON.parse(localStorage.getItem("tasksCompleted")));

        taskCompleted.forEach(i => {
            let icon = allTasks[i].querySelector("i").classList.add("active");
            let taskName = allTasks[i].querySelector(".taskName").classList.add("checked");
            let visualConclusion = allTasks[i].querySelector(".visual-conclusion").style.width = "100%";
            completedTaskColumn.appendChild(allTasks[i]);
        });
    }

    /* checking if subtasks completed */
    let allMains = document.querySelectorAll(".main");
    tasks.mains.forEach((task, mainIndex) => {
        let allSubtasks = allMains[mainIndex].querySelectorAll(".subtask");
        let currentProgress = allMains[mainIndex].querySelector(".progress");
        let currentVisualConclusion = allMains[mainIndex].querySelector(".visual-conclusion");


        // checking if main task is completed
        if(tasks.mains[mainIndex].progress === 100){
            let currentH3 = allMains[mainIndex].querySelector("h3");
            let management = allMains[mainIndex].querySelector(".management");
            management.style.display = "none";
            currentProgress.style.display = "block";
            currentProgress.style.color = "blue";
            currentH3.classList.add("completed");
        }
        task.subtasks.forEach((subtask, subIndex) => {
            let completedSubtask = tasks.mains[mainIndex].subtasks[subIndex].completed;
        
            if(completedSubtask){
                let managementSubtask = allSubtasks[subIndex].parentElement.querySelector(".management");
                managementSubtask.style.display = "none";
                let currentIcon = allSubtasks[subIndex].querySelector("i");
                let currentTaskName = allSubtasks[subIndex].querySelector(".taskName");

                currentIcon.classList.add("active");
                currentTaskName.classList.add("checked");

                currentVisualConclusion.style.width = tasks.mains[mainIndex].progress + "%";
                currentProgress.textContent = tasks.mains[mainIndex].progress + "%";
            } else{
                let managementSubtask = allSubtasks[subIndex].parentElement.querySelector(".management");
                managementSubtask.style.removeProperty = "display";
            }
        });
    });
});


let definedName;
let subtasksList;
let listSubtasks = [];
let porcentageSubtask = 0;


