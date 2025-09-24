/* config */
const menuConfig = document.querySelector(".menuConfig");
const configClose = menuConfig.querySelector(".close");
const iconConfig = document.querySelector(".config i");
const resetAutomatic = document.querySelector(".reset_automatic");
const btnReset = document.querySelector(".button-reset");
const resetDateWarn = document.querySelector(".reset_date_warn");
const dateReset = document.querySelector(".date-reset");
const saveTasks = document.querySelector(".save_tasks");
const unsaveTasks = document.querySelector(".unsave_tasks");

window.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("toggleReset")){
        btnReset.classList.add("active");
        resetDateWarn.style.setProperty("display", "block");

        if(!localStorage.getItem("lastDate")){
            localStorage.setItem("lastDate", new Date().getTime());
        }
        let lastDate = Number(localStorage.getItem("lastDate"));
        let date = infoLastDate(lastDate);

        if(localStorage.getItem("savedSimpleTasks") || localStorage.getItem("savedMainTasks")){
            saveTasks.classList.remove("active");
            unsaveTasks.classList.add("active");
        } else{
            saveTasks.classList.add("active");
            unsaveTasks.classList.remove("active");
        }

        dateReset.textContent = `${date.day}/${date.month}/${date.year} às ${date.hours}:${date.minutes}`;

        let currentDate = new Date().getTime();
        let dif = currentDate - lastDate;
        let oneDay = 24 * 60 * 60 * 1000;

        if(dif >= oneDay){
            localStorage.removeItem("simplesTasks");
            localStorage.removeItem("tasksCompleted");
            localStorage.removeItem("mainTasksCompleted");
            localStorage.removeItem("nameMainCurrent");
            localStorage.removeItem("subtasksCurrent");
            localStorage.removeItem("mainTasks");
            localStorage.setItem("lastDate", new Date().getTime());

            if(localStorage.getItem("savedSimpleTasks")){
                localStorage.setItem("simplesTasks", localStorage.getItem("savedSimpleTasks"));
            }
            if(localStorage.getItem("savedMainTasks")){
                localStorage.setItem("mainTasks", localStorage.getItem("savedMainTasks"));
            }
        }
    } else{
        localStorage.removeItem("lastDate");
    }

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
                progress.classList.add("completed");
                let currentManagement = taskMain.querySelector(".management");

                let btnEdit = currentManagement.querySelector("button:first-child").style.display = "none";
                // let btnDelete = currentManagement.querySelector("button:last-child").classList.add("completed");

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

// open menu config
iconConfig.addEventListener("click", () => {
    menuConfig.classList.add("active");
    document.body.classList.add("active");
    let background = createStructure('div', 'back', undefined, document.body);
    background.addEventListener("click", () => {
        menuConfig.classList.remove("active");
        document.body.classList.remove("active");
        background.remove();
    });
});

// enable or disable automatic restart
resetAutomatic.addEventListener("click", () => {
    btnReset.classList.toggle("active");

    if(btnReset.classList.contains("active")){
        localStorage.setItem("toggleReset", 'active');
        resetDateWarn.style.setProperty("display", "block");
        setTimeout(() => {location.reload();}, 500);
    } else{
        localStorage.removeItem("toggleReset");
        localStorage.removeItem("lastDate");
        localStorage.removeItem("savedSimpleTasks");
        localStorage.removeItem("savedMainTasks");
        resetDateWarn.style.removeProperty("display");
        saveTasks.classList.remove("active");
        unsaveTasks.classList.remove("active");
    }
});

configClose.addEventListener("click", () => {
    menuConfig.classList.remove("active");
    let backMenu = document.querySelector(".back").remove();
    document.body.classList.remove("active");
});

// save or unsave tasks
saveTasks.addEventListener("click", () => {
    if(tasks.simples.length > 0){
        localStorage.setItem("savedSimpleTasks", JSON.stringify(tasks.simples));
        saveTasks.classList.remove("active");
        unsaveTasks.classList.add("active");
    }
    if(tasks.mains.length > 0){
        localStorage.setItem("savedMainTasks", JSON.stringify(tasks.mains));
        saveTasks.classList.remove("active");
        unsaveTasks.classList.add("active");
    }
});
unsaveTasks.addEventListener("click", () => {
    localStorage.removeItem("savedSimpleTasks");
    localStorage.removeItem("savedMainTasks");
    saveTasks.classList.add("active");
    unsaveTasks.classList.remove("active");
});


let definedName;
let subtasksList;
let listSubtasks = [];
let porcentageSubtask = 0;