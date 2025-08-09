let tasks = {
    simples: [],
    mains: []
}

/* Global variables */
let nameMainCurrent;
let subtasksCurrent = [];
let taskBeingEdited;
let taskBeingDeleted;
let indexCurrentMain;


const firstColumn = document.querySelector(".column:first-child");
const labelMainTask = document.querySelector(".taskSubtasks-inputs label");
const btncreateMainTask = document.querySelector(".createMainTask button");
const subtaskinModal = document.querySelector(".subtask-list-inModal");

// total pending tasks
let totalPendingTasks = firstColumn.childElementCount - 1; 

// Simples tasks creation
const btnSimpleTask = document.querySelector(".input-container button");
const inputSimpleTask = document.querySelector(".input-container input");

function createSimpleTask(nameTask, addStorage = true){
    let taskContainer = createStructure("article", "task-container", undefined, firstColumn);
    let labelTask = createStructure("label", "task", undefined, taskContainer);
    let checkmark = createStructure("span", "checkmark", undefined, labelTask);
    let iconCheck = createStructure("i", "bi bi-check2", undefined, checkmark);
    let taskName = createStructure("div", "taskName", undefined, labelTask);
    let valueTask = createStructure("span", undefined, {textContent: nameTask}, taskName);

    // Adding and storing
    if(addStorage){
        tasks.simples.push(nameTask);
        localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
    }

    // Check task
    let icon = checkmark.querySelector('i');
    valueTask.onclick = ()=> {
        icon.classList.toggle("active");
        taskName.classList.toggle("checked");
    }
    checkmark.onclick = ()=> {
        icon.classList.toggle("active");
        taskName.classList.toggle("checked");
    }

    let management = createStructure("div", "management", undefined, taskContainer);
    let btnEdit = createStructure("button", undefined, undefined, management);
    let imgEdit = createStructure("img", undefined, {src: "assets/edit.png", alt: "imagem de editar tarefa"}, btnEdit);
    let btnDelete = createStructure("button", undefined, undefined, management);
    let imgDelete = createStructure("img", undefined, {src: "assets/delete.png", alt: "imagem de excluir tarefa"}, btnDelete);

    btnEdit.addEventListener("click", () => {
        taskBeingEdited = valueTask;
        inputEditModal.placeholder = nameTask;
        editModal.showModal();
    });

    btnDelete.addEventListener("click", () => {
        currentIndex(".taskName", taskName, {type: "delete"});
        taskCount(firstColumn.childElementCount - 1);
    });

    inputSimpleTask.value = '';
    simpleTaskModal.close();
}

btnSimpleTask.addEventListener("click", () => {
    if(inputSimpleTask.value){
        createSimpleTask(inputSimpleTask.value);
        taskCount(firstColumn.childElementCount - 1);

        inputSimpleTask.style.removeProperty("border");
    } else{
        inputSimpleTask.style.setProperty("border", "1px solid red");
    }
});
inputSimpleTask.addEventListener("keydown", (e) => {
    if(e.key === 'Enter'){
        if(inputSimpleTask.value){
            createSimpleTask(inputSimpleTask.value);
            inputSimpleTask.style.removeProperty("border");
        } else{
            inputSimpleTask.style.setProperty("border", "1px solid red");
        }
    }
});



// Main tasks creation
const btnMainTask = document.querySelector(".taskSubtasks-inputs button");
const inputMainTask = document.querySelector(".taskSubtasks-inputs input");

btnMainTask.addEventListener("click", () => {
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

// Subtasks
const btnSubtask = document.querySelector(".btn-addSubtask");
const inputSubtask = document.querySelector(".nameSubtask-container input");

btnSubtask.addEventListener("click", () => {
    if(inputSubtask.value){
       subtasksCurrent.push(inputSubtask.value);
       localStorage.setItem("subtasksCurrent", JSON.stringify(subtasksCurrent));
       createVisualSubtasks(inputSubtask.value);
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
    createMainTask(nameMainCurrent, tasks.mains[indexCurrentMain].subtasks);
    taskCount(firstColumn.childElementCount - 1);

    localStorage.removeItem("nameMainCurrent");
    localStorage.removeItem("minSubtask");
    taskSubtasksModal.classList.remove("active");
    inputMainTask.value = '';
    subtaskinModal.innerHTML = '';
    taskSubtasksModal.close();
    subtasksCurrent.length = 0;
    localStorage.removeItem("subtasksCurrent");
    subtasksCurrent = [];
    btncreateMainTask.style.removeProperty("display");
});

// Function to create standard structure off the main task
function createMainTask(nameMain, subtasks){
    let taskContainer = createStructure("article", "task-container main", undefined, firstColumn);
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

    /* Edit main task */
    btnEdit.addEventListener("click", () => {
        taskBeingEdited = nameMainTask;
        inputEditModal.placeholder = nameMainTask.textContent;
        editModal.showModal();
    });

    /* Delete main task */ 
    btnDelete.addEventListener("click", () => {
        taskBeingDeleted = taskContainer;
        deleteConfirmation.showModal();
        nameMainModal.textContent = nameMainTask.textContent;
        totalSubtaskModal.textContent = localSubtasksList.childElementCount;
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

        subtask.addEventListener("click", () => {
            let total = 0;

            allSubtaks.forEach(sub => {
                if(sub.querySelector(".checked")){
                    total += Number(sub.dataset.value);
                }
            });
            let current = Number(progress.textContent.replace("%", "")) || 0;
            animatePercentage(current, Math.round(total), progress);

            if(total >= 99){
                nameMainTask.classList.add("completed");
            } else{
                nameMainTask.classList.remove("completed");
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
    let taskName = createStructure("span", "taskName", {textContent: nameSubtask}, subtask);
    let managementSubtask = createStructure("div", "management", undefined, subtaskContainer);
    let btnEditSubtask = createStructure("button", undefined, undefined, managementSubtask);
    let imgEditSubtask = createStructure("img", undefined, {src: "assets/edit.png", alt: "imagem de edição"}, btnEditSubtask);
    let btnDeleteSubtask = createStructure("button", undefined, undefined, managementSubtask);
    let imgDeleteSubtask = createStructure("img", undefined, {src: "assets/delete.png", alt: "imagem de remoção"}, btnDeleteSubtask);

    taskName.onclick = ()=> {
        iconCheck.classList.toggle("active");
        taskName.classList.toggle("checked");
    }
    checkmark.onclick = ()=> {
        iconCheck.classList.toggle("active");
        taskName.classList.toggle("checked");
    }

    btnEditSubtask.addEventListener("click", (e) => {
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
}

// Task counter
function taskCount(value){
    let element = value;

    if(element === 1) pendingTasks.textContent =
    `Tarefa pendente (${value})`;
    else pendingTasks.textContent = `Tarefas pendentes (${value})`;
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