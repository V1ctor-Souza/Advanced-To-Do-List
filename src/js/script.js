// Checking for the existence of a simple task
window.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("simplesTasks")){
        tasks.simples.push(...JSON.parse(localStorage.getItem("simplesTasks")));

        tasks.simples.forEach(task => {
            createSimpleTask(columns[task.column], task.nameTask, false);
        });
    }

    /* checking if simple task completed */
    if(localStorage.getItem("tasksCompleted")){
        tasksCompleted.push(...JSON.parse(localStorage.getItem("tasksCompleted")));

         tasksCompleted.forEach(task => {
            createSimpleTask(columns[task.column], task.nameTask, false);

            let allTaskCompleted = columns[1].querySelectorAll(".task-container");

            allTaskCompleted.forEach(task => {
                let checkIcon = task.querySelector("i").classList.add("active");
                let taskNameChecked = task.querySelector(".taskName").classList.add("checked");
                let visualConclusion = task.querySelector(".visual-conclusion").style.setProperty("width", "100%");
                let editManagement = task.querySelector(".management button:first-child").style.display = "none";
            });
         });
    }

    /* checking if main task completed */
    if(localStorage.getItem("mainTasksCompleted")){
        mainTasksCompleted.push(...JSON.parse(localStorage.getItem("mainTasksCompleted")));

        mainTasksCompleted.forEach(task => {
            createMainTask(columns[1], task.nameMain, task.subtasks);

            let allMains = document.querySelectorAll(".main");
            allMains.forEach(taskMain => {
                let titleTask = taskMain.querySelector("h3").classList.add("completed");

                taskMain.querySelector(".visual-conclusion").style.width = "100%";
                let progress = taskMain.querySelector(".progress");
                progress.textContent = "100%";
                progress.style.display = "block";
                progress.classList.add("completed");
                let mainTask = taskMain.querySelector(".main-task");
                let currentManagement = taskMain.querySelector(".management");

                let btnEdit = currentManagement.querySelector("button:first-child").style.display = "none";
                let btnDelete = currentManagement.querySelector("button:last-child").classList.add("completed");

                let subtasks = taskMain.querySelector(".subtasks-list").querySelectorAll(".subtask-container");
                subtasks.forEach(sub => {
                    let subIcon = sub.querySelector("i").classList.add("active");
                    let subTaskName = sub.querySelector(".taskName").classList.add("checked");
                    let subManagement = sub.querySelector(".management").style.display = "none";
                    sub.style.pointerEvents = "none";
                });
            });
        });
    }
    
    /* checking if there is a main task waiting for subtasks*/
    if(localStorage.getItem("nameMainCurrent")){
        
        modalContinued.showModal();

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
            createMainTask(columns[0], task.nameMain, task.subtasks);
        });
        // taskCount(firstColumn.childElementCount - 1);
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
            currentProgress.classList.add("completed");
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