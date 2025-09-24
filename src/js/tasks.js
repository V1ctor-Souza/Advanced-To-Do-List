let tasks = {
    simples: [],
    mains: []
}

/* Global variables */
let nameMainCurrent;
let subtasksCurrent = [];
let tasksCompleted = [];
let mainTasksCompleted = [];
let taskBeingEdited;
let taskBeingDeleted;
let indexCurrentMain;
let currentTask;


const columns = document.querySelectorAll(".column");
const firstColumn = document.querySelector(".column:first-child");
const labelMainTask = document.querySelector(".taskSubtasks-inputs label");
const btncreateMainTask = document.querySelector(".createMainTask button");
const subtaskinModal = document.querySelector(".subtask-list-inModal");
const completedTaskColumn = document.querySelector(".column:last-child");

// title status
const pendingTasks = firstColumn.querySelector(".task-status");
const completedTasks = completedTaskColumn.querySelector(".task-status");

// Simples tasks creation
const btnSimpleTask = document.querySelector(".input-container button");
const inputSimpleTask = document.querySelector(".input-container input");

function createSimpleTask(columnTask, nameTask, addStorage = true){
    let taskContainer = createStructure("article", "task-container simples", undefined, columnTask);
    let labelTask = createStructure("label", "task", undefined, taskContainer);
    let checkmark = createStructure("span", "checkmark", undefined, labelTask);
    let iconCheck = createStructure("i", "bi bi-check2", undefined, checkmark);
    let taskName = createStructure("div", "taskName", undefined, labelTask);
    let valueTask = createStructure("span", undefined, {textContent: nameTask}, taskName);

    let visualConclusion = createStructure("div", "visual-conclusion", undefined, taskContainer);

    let indexColumn = currentIndex(".column", taskContainer.parentElement);

    // Adding and storing
    if(addStorage){
        tasks.simples.push({column: indexColumn, nameTask: nameTask});
        localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
    }

    let management = createStructure("div", "management", undefined, taskContainer);
    let btnEdit = createStructure("button", undefined, undefined, management);
    let imgEdit = createStructure("img", undefined, {src: "assets/edit.png", alt: "imagem de editar tarefa"}, btnEdit);
    let btnDelete = createStructure("button", undefined, undefined, management);
    let imgDelete = createStructure("img", undefined, {src: "assets/delete.png", alt: "imagem de excluir tarefa"}, btnDelete);

    labelTask.addEventListener("click", () => {
        iconCheck.classList.toggle("active");
        taskName.classList.toggle("checked");

        let index = currentIndex(".simples", taskContainer);

        if(taskName.classList.contains("checked")){
            visualConclusion.style.setProperty("width", "100%");
            btnEdit.style.display = "none";
            tasks.simples[index].column = 1;
            tasksCompleted.push(tasks.simples[index]);
            tasks.simples.splice(index, 1); 

            localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
            localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));

            // security
            let disablingTasks = document.querySelectorAll(".task-container");

            disablingTasks.forEach(task => {
                task.style.setProperty("pointer-events", "none");
            });

            setTimeout(() => {
                columns[1].appendChild(taskContainer);

                taskCount(firstColumn.childElementCount - 1, pendingTasks, "Tarefa", "pendente");

                taskCount(completedTaskColumn.childElementCount - 1, completedTasks, "Tarefa", "concluída");

                disablingTasks.forEach(task => {
                    task.style.removeProperty("pointer-events");
                });
            }, 800);
        } else{
            visualConclusion.style.removeProperty("width");
            btnEdit.style.removeProperty("display");
            let EltasksCompleted = Array.from(completedTaskColumn.querySelectorAll(".simples"));
            let indexTask = EltasksCompleted.indexOf(taskContainer);
            tasksCompleted[indexTask].column = 0;
            tasks.simples.push(tasksCompleted[indexTask]);
            tasksCompleted.splice(indexTask, 1); 

            // security
            let disablingTasks = document.querySelectorAll(".task-container");

            disablingTasks.forEach(task => {
                task.style.setProperty("pointer-events", "none");
            });

            setTimeout(() => {
                columns[0].appendChild(taskContainer);

                taskCount(firstColumn.childElementCount - 1, pendingTasks, "Tarefa", "pendente");

                taskCount(completedTaskColumn.childElementCount - 1, completedTasks, "Tarefa", "concluída");

                disablingTasks.forEach(task => {
                    task.style.removeProperty("pointer-events");
                });
            }, 800);

            localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
            localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));
        }
    });

    btnEdit.addEventListener("click", () => {
        taskBeingEdited = valueTask;
        inputEditModal.placeholder = nameTask;
        editModal.showModal();
        document.body.classList.add("active");
    });

    btnDelete.addEventListener("click", (e) => {
        let currentColumn = e.target.parentElement.parentElement.parentElement.parentElement;
        let allTasks = Array.from(currentColumn.querySelectorAll(".task-container"));
        let index = allTasks.indexOf(taskContainer);

        if(currentColumn === firstColumn){
            tasks.simples.splice(index, 1);
            localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
            taskContainer.remove();
            taskCount(firstColumn.childElementCount - 1, pendingTasks, "Tarefa", "pendente");
        } else{
            tasksCompleted.splice(index, 1);
            localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));
            taskContainer.remove();
            taskCount(completedTaskColumn.childElementCount - 1, completedTasks, "Tarefa", "concluída");
        }
        
    });

    inputSimpleTask.value = '';
    currentTask = taskContainer;

    taskCount(firstColumn.childElementCount - 1, pendingTasks, "Tarefa", "pendente");
}

btnSimpleTask.addEventListener("click", () => {
    if(inputSimpleTask.value){
        createSimpleTask(columns[0], inputSimpleTask.value);
        CloseToTaskAnimation(currentTask, simpleTaskModal);
        inputSimpleTask.style.removeProperty("border");
    } else{
        inputSimpleTask.style.setProperty("border", "1px solid red");
    }
});

// Main tasks creation
const btnsMainTask = document.querySelectorAll(".taskSubtasks-inputs button");
const inputMainTask = document.querySelector(".taskSubtasks-inputs input");

btnsMainTask.forEach(btn => {
    btn.addEventListener("click", () => {
        if(inputMainTask.value){
            nameMainCurrent = inputMainTask.value;

            /* storing name of current main task  */
            localStorage.setItem("nameMainCurrent", nameMainCurrent);

            inputMainTask.style.removeProperty("border");
            taskSubtasksModal.classList.add("active");
        } else{
            inputMainTask.style.setProperty("border", "1px solid red");
        }
    });
});

// Subtasks
const btnSubtask = document.querySelector(".btn-addSubtask");
const inputSubtask = document.querySelector(".nameSubtask-container input");

btnSubtask.addEventListener("click", () => {
    if(inputSubtask.value){
       subtasksCurrent.push(inputSubtask.value);
       localStorage.setItem("subtasksCurrent", JSON.stringify(subtasksCurrent));
       createVisualSubtasks(inputSubtask.value);
        inputSubtask.style.removeProperty("border");
    } else{
        inputSubtask.style.setProperty("border", "1px solid red");
    }

    let minSubtask = subtaskinModal.childElementCount;
    localStorage.setItem("minSubtask", minSubtask);
    if(minSubtask >= 2){
        btncreateMainTask.style.setProperty("display", "block");
    }
});

// Function to create visual subtasks in modal
function createVisualSubtasks(nameSubtask){
    let paragraph = createStructure("p", undefined, undefined, subtaskinModal);
    let handle = createStructure("span", "handle", undefined, paragraph);
    let iconHandle = createStructure("i", "bi bi-arrows-move", undefined, handle);
    let nameSubTask = createStructure("span", "nameSubTask", {textContent: nameSubtask}, paragraph);
    inputSubtask.value = "";
    let deleteTask = createStructure("span", "delete", undefined, paragraph);
    let iconDelete = createStructure("i", "bi bi-x-circle-fill", undefined, deleteTask);

    iconDelete.onclick = ()=> {
        let allVisualSubtasks = [...subtaskinModal.querySelectorAll("p")];
        let index = allVisualSubtasks.indexOf(paragraph);

        paragraph.remove();
        allVisualSubtasks.splice(index, 1);
        subtasksCurrent.splice(index, 1);
        localStorage.setItem("subtasksCurrent", JSON.stringify(subtasksCurrent));

        let minSubtask = subtaskinModal.childElementCount;
        localStorage.setItem("minSubtask", minSubtask);

        if(allVisualSubtasks.length < 2){
            btncreateMainTask.style.removeProperty("display");
        }
    };
}

// Event to create main task with subtasks
btncreateMainTask.addEventListener("click", () => {
    subtasksCurrent = JSON.parse(localStorage.getItem("subtasksCurrent"));

    tasks.mains.push({
        nameMain: nameMainCurrent,
        subtasks: [],
        progress: ""
    });
    indexCurrentMain = tasks.mains.length - 1;

    for (let i = 0; i < subtasksCurrent.length; i++){
        tasks.mains[indexCurrentMain].subtasks.push({nameSubtask: subtasksCurrent[i], completed: false});
    }
    localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
    createMainTask(columns[0], nameMainCurrent, tasks.mains[indexCurrentMain].subtasks);

    CloseToTaskAnimation(currentTask, taskSubtasksModal);
    localStorage.removeItem("nameMainCurrent");
    localStorage.removeItem("minSubtask");
    taskSubtasksModal.classList.remove("active");
    inputMainTask.value = '';
    subtaskinModal.innerHTML = '';
    subtasksCurrent.length = 0;
    localStorage.removeItem("subtasksCurrent");
    subtasksCurrent = [];
    btncreateMainTask.style.removeProperty("display");
});

// Function to create standard structure off the main task
function createMainTask(column, nameMain, subtasks){
    let taskContainer = createStructure("article", "task-container main", undefined, column);
    let mainTask = createStructure("header", "main-task", undefined, taskContainer);
    let taskNameContainer = createStructure("section", "task-name-container", undefined, mainTask);
    let nameMainTask = createStructure("h3", undefined, {textContent: nameMain}, taskNameContainer);
    let triangle = createStructure("div", "triangle", undefined, taskNameContainer);

    let management = createStructure("div", "management", undefined, mainTask);
    let btnEdit = createStructure("button", undefined, undefined, management);
    let imgEdit = createStructure("img", undefined, {src: "assets/edit.png", alt: "imagem de edição"}, btnEdit);
    let btnDelete = createStructure("button", undefined, undefined, management);
    let imgDelete = createStructure("img", undefined, {src: "assets/delete.png", alt: "imagem de remoção"}, btnDelete);
    let progress = createStructure("div", "progress", {textContent: "0%"}, mainTask);
    let localSubtasksList = createStructure("section", "subtasks-list", undefined, taskContainer);

    let visualConclusion = createStructure("div", "visual-conclusion", undefined, taskContainer);

    currentTask = taskContainer;

    /* Edit main task */
    btnEdit.addEventListener("click", () => {
        taskBeingEdited = nameMainTask;
        inputEditModal.placeholder = nameMainTask.textContent;
        editModal.showModal();
        document.body.classList.add("active");
    });

    /* Delete main task */ 
    btnDelete.addEventListener("click", () => {
        taskBeingDeleted = taskContainer;
        deleteConfirmation.showModal();
        nameMainModal.textContent = nameMainTask.textContent;
        totalSubtaskModal.textContent = localSubtasksList.childElementCount;
        document.body.classList.add("active");
    });

    taskNameContainer.addEventListener("click", () => {
        if(localSubtasksList.style.height){
            localSubtasksList.style.removeProperty("height");
            triangle.classList.remove("expand");
            management.style.removeProperty("display");
            progress.style.removeProperty("display");
        } else{
            localSubtasksList.style.setProperty("height", localSubtasksList.scrollHeight + "px");
            triangle.classList.add("expand");
            management.style.setProperty("display", "none");
            progress.style.setProperty("display", "block");
        } 
    });

     taskCount(firstColumn.childElementCount - 1, pendingTasks, "Tarefa", "pendente");

     taskCount(completedTaskColumn.childElementCount - 1, completedTasks, "Tarefa", "concluída");
    // --------------------------------------------------------

    subtasks.forEach(subtask => {
        sendingSubtasks(subtask.nameSubtask, localSubtasksList);
    });

    // Percentage system 
    let allSubtaks = localSubtasksList.querySelectorAll(".subtask");
    let porcentageSubtask = 100 / allSubtaks.length;

    for (let i = 0; i < allSubtaks.length; i++){
        allSubtaks[i].setAttribute("data-value", porcentageSubtask);
    }

    allSubtaks.forEach(subtask => {
        let nameMainTask = subtask.closest(".task-container").querySelector(".main-task h3");
        let progressTask = subtask.closest(".task-container").querySelector(".progress"); 

        subtask.addEventListener("click", () => {
            let total = 0;

            allSubtaks.forEach(sub => {
                if(sub.querySelector(".checked")){
                    total += Number(sub.dataset.value);
                    let index = currentIndex(".main", taskContainer);
                    tasks.mains[index].progress = Math.round(total);
                    localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
                }
            });
            let current = Number(progress.textContent.replace("%", "")) || 0;
            animatePercentage(current, Math.round(total), progress);

            let index = currentIndex(".main", taskContainer);
            
            if(total >= 99){                
                nameMainTask.classList.add("completed");
                progressTask.classList.add("completed");
                localSubtasksList.style.removeProperty("height");
                triangle.classList.remove("expand");

                mainTasksCompleted.push(tasks.mains[index]);
                tasks.mains.splice(index, 1);

                localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
                localStorage.setItem("mainTasksCompleted", JSON.stringify(mainTasksCompleted));

                setTimeout(() => {
                    columns[1].appendChild(taskContainer);

                    taskCount(firstColumn.childElementCount - 1, pendingTasks, "Tarefa", "pendente");
                    taskCount(completedTaskColumn.childElementCount - 1, completedTasks, "Tarefa", "concluída");
                }, 800);

                allSubtaks.forEach(subtask => {
                    subtask.style.pointerEvents = "none";
                });
            }
            visualConclusion.style.setProperty("width", total + "%");
        });
    });
}

function sendingSubtasks(nameSubtask, targetSubtaskList){
    let subtaskContainer = createStructure("article", "subtask-container", undefined, targetSubtaskList);
    let subtask = createStructure("label", "subtask", undefined, subtaskContainer);
    let checkmark = createStructure("span", "checkmark", undefined, subtask);
    let iconCheck = createStructure("i", "bi bi-check2", undefined, checkmark);
    let taskName = createStructure("div", "taskName", undefined, subtask);
    let nameTask = createStructure("span", undefined, {textContent: nameSubtask}, taskName);
    let managementSubtask = createStructure("div", "management", undefined, subtaskContainer);
    let btnEditSubtask = createStructure("button", undefined, undefined, managementSubtask);
    let imgEditSubtask = createStructure("img", undefined, {src: "assets/edit.png", alt: "imagem de edição"}, btnEditSubtask);
    let btnDeleteSubtask = createStructure("button", undefined, undefined, managementSubtask);
    let imgDeleteSubtask = createStructure("img", undefined, {src: "assets/delete.png", alt: "imagem de remoção"}, btnDeleteSubtask);

    subtask.onclick = (e) => {
        iconCheck.classList.toggle("active");
        taskName.classList.toggle("checked");

        // find main task
        let currentMain = e.target.closest(".main");
        
        // find subtask
        let currentSubtask = e.target.closest(".subtask");

        // capturing the current index of the main task and the index of the subtask
        let { parentIndex, subtaskIndex } = findSubtask(
            document.querySelectorAll(".main"),
            currentMain,
            currentMain.querySelectorAll('.subtask'),
            currentSubtask
        );

        // current management
        let allSubtaks = currentMain.querySelectorAll('.subtask');
        let managementSubtask = allSubtaks[subtaskIndex].parentElement.querySelector(".management");

        if(taskName.classList.contains("checked")){
            tasks.mains[parentIndex].subtasks[subtaskIndex].completed = true;
            managementSubtask.style.display = "none";
            localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
        } else{
            tasks.mains[parentIndex].subtasks[subtaskIndex].completed = false;
            managementSubtask.style.display = "flex";
            localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
        }
    }

    btnEditSubtask.addEventListener("click", (e) => {
        document.body.classList.add("active");
        taskBeingEdited = e.target.closest("article").querySelector(".subtask");
        indexCurrentMain = subtaskContainer.closest("article.task-container.main");
        editModal.showModal();
        inputEditModal.placeholder = taskBeingEdited.textContent;
    });

    btnDeleteSubtask.addEventListener("click", (e) => {
        taskBeingDeleted = e.target.closest("article");
        let currentSubtaskList = taskBeingDeleted.closest("section");
        let currentMain = currentSubtaskList.closest("article");
        let allSubtasksContainer = currentSubtaskList.querySelectorAll(".subtask-container");

        findSubtask(document.querySelectorAll(".main"), currentMain, allSubtasksContainer, taskBeingDeleted, {type: 'delete'});

        let currentTriangle = currentSubtaskList.closest("article").querySelector(".triangle");
        targetSubtaskList.style.removeProperty("height");
        currentTriangle.classList.remove("expand");

        let totalSubtasks = currentSubtaskList.childElementCount;
        if(totalSubtasks < 2){
            createSimpleTask(columns[0], currentMain.querySelector("h3").textContent, true);
            let arrayMain = Array.from(document.querySelectorAll(".main"));
            let index = arrayMain.indexOf(currentMain);
            tasks.mains.splice(index, 1);
            localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
            currentMain.remove();
        }
        taskBeingDeleted = null;

        let warning = createStructure("div", "warning", undefined, document.body);
        let iconWarning = createStructure("i", "bi bi-exclamation-triangle-fill", undefined, warning);
        let textWarning = createStructure("p", undefined, {textContent: "É necessário reiniciar a página após a exclusão de quaisquer subtarefas."}, warning);

        setTimeout(() => {
            warning.classList.add("end");

            setTimeout(() => {
                warning.remove();
            }, 300)
        }, 3000);
    });
}


// Function to find subtask position
function findSubtask(element, currentElement, subtaskElement, currentSubtask, type = {}){
    let allElement = Array.from(element);
    let i = allElement.indexOf(currentElement);

    let allSubtasks = Array.from(subtaskElement);
    let indexSubtask = allSubtasks.indexOf(currentSubtask);

    if(type.type === 'edit'){
        tasks.mains[i].subtasks[indexSubtask].nameSubtask = inputEditModal.value;
        localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
    } else if(type.type === 'delete'){
        currentSubtask.remove();
        tasks.mains[i].subtasks.splice(indexSubtask, 1);
        localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
    }

    return { parentIndex: i, subtaskIndex: indexSubtask };
}

// Task counter
function taskCount(value, type, firstTxt, secondTxt){
    let element = value;

    if(element === 1) type.textContent = `${firstTxt} ${secondTxt} (${value})`;
    else type.textContent = `${firstTxt}s ${secondTxt}s (${value})`;
}

// Functions responsible for progress animation
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function animatePercentage(from, to, progress) {
    if (from === to) return;

    const step = from < to ? 1 : -1;

    for (let i = from; i !== to + step; i += step) {
        progress.textContent = i + "%";
        await delay(20);
    }
}