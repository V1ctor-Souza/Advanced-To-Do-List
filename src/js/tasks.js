/* Global variables */
let taskBeingEdited;
const firstColumn = document.querySelector(".column:first-child");
const labelMainTask = document.querySelector(".taskSubtasks-inputs label");
const inputMainTask = document.querySelector(".taskSubtasks-inputs input");
const inputSubtask = document.querySelector(".nameSubtask-container input");
const btnSubtask = document.querySelector(".btn-addSubtask");
const btncreateMainTask = document.querySelector(".createMainTask button");
const subtaskinModal = document.querySelector(".subtask-list-inModal");


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
        tasks[0].push(nameTask);
        localStorage.setItem("listSimplesTasks", JSON.stringify(tasks[0]));
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

    btnEdit.addEventListener("click", (e) => {
        taskBeingEdited = taskName;
        inputEditModal.placeholder = nameTask;
        // valueTask.style.setProperty("background", 'red');
        editModal.showModal();
    }); 

    btnEditTask.addEventListener("click", () => {
        if(inputEditModal.value){
            if(taskBeingEdited){
                let allTaskName = document.querySelectorAll(".taskName");
                let arrayTaskName = Array.from(allTaskName);
                let indexTask = arrayTaskName.indexOf(taskBeingEdited);

                taskBeingEdited.textContent = inputEditModal.value;
                tasks[0][indexTask] = inputEditModal.value;
                localStorage.setItem("listSimplesTasks", JSON.stringify(tasks[0]));
                taskBeingEdited = null;
                editModal.close();
                inputEditModal.value = '';
            }
        } else{
            editModal.close();
        }
    });

    btnDelete.addEventListener("click", () => {
        let allTaskName = document.querySelectorAll(".taskName");
        let arrayTaskName = Array.from(allTaskName);
        let indexTask = arrayTaskName.indexOf(taskName);

        taskContainer.remove();
        tasks[0].splice(indexTask, 1);
        localStorage.setItem("listSimplesTasks", JSON.stringify(tasks[0]));

        let totalPendingTasks = firstColumn.childElementCount - 1;
        taskCount(totalPendingTasks);
        
    });
    
    inputSimpleTask.value = '';
    simpleTaskModal.close();
}

btnSimpleTask.addEventListener("click", () => {
    if(inputSimpleTask.value){
        createSimpleTask(inputSimpleTask.value);

        let totalPendingTasks = firstColumn.childElementCount - 1;
        taskCount(totalPendingTasks);
    
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

// Function to create standard structure off the main task
function createMainTask(){
    let taskContainer = createStructure("article", "task-container main", undefined, firstColumn, true);
    // taskContainer.style.setProperty("display", "none");
    let mainTask = createStructure("header", "main-task", undefined, taskContainer);
    let taskNameContainer = createStructure("section", "task-name-container", undefined, mainTask);
    let nameMainTask = createStructure("h3", undefined, {textContent: inputMainTask.value}, taskNameContainer);

    definedName = createStructure("div", "defined-name", {textContent: inputMainTask.value}, labelMainTask);
    inputMainTask.value = '';
    inputMainTask.style.setProperty("display", "none");
    btnMainTask.style.setProperty("display", "none");
    taskSubtasksModal.classList.add("active");

    let triangle = createStructure("div", "triangle", undefined, taskNameContainer);

    let management = createStructure("div", "management", undefined, mainTask);
    let btnEdit = createStructure("button", undefined, undefined, management);
    let imgEdit = createStructure("img", undefined, {src: "assets/edit.png", alt: "imagem de edição"}, btnEdit);
    let btnDelete = createStructure("button", undefined, undefined, management);
    let imgDelete = createStructure("img", undefined, {src: "assets/delete.png", alt: "imagem de remoção"}, btnDelete);
    let progress = createStructure("div", "progress", undefined, mainTask);

    subtasksList = createStructure("section", "subtasks-list", undefined, taskContainer);
}

// Event to create visual subtasks in modal
btnSubtask.addEventListener("click", () => {
    let paragraph = createStructure("p", undefined, undefined, subtaskinModal);
    let handle = createStructure("span", "handle", undefined, paragraph);
    let iconHandle = createStructure("i", "bi bi-arrows-move", undefined, handle);
    let nameSubTask = createStructure("span", "nameSubTask", {textContent: inputSubtask.value}, paragraph); 
    listSubtasks.push(inputSubtask.value);
    inputSubtask.value = "";
    let deleteTask = createStructure("span", "delete", undefined, paragraph);
    let iconDelete = createStructure("i", "bi bi-x-circle-fill", undefined, deleteTask);

    let minSubtask = subtaskinModal.childElementCount;
        if(minSubtask >= 2){
            btncreateMainTask.style.setProperty("display", "block");
        } else return;
});

/* Function to send subtasks to the main task */
function sendingMainTask(nameSubtask){
    let subtaskContainer = createStructure("article", "subtask-container", undefined, subtasksList);
    let subtask = createStructure("label", "subtask", undefined, subtaskContainer);
    let checkmark = createStructure("span", "checkmark", undefined, subtask);
    let iconCheck = createStructure("i", "bi bi-check2", undefined, checkmark);
    let taskName = createStructure("span", "taskName", {textContent: nameSubtask}, subtask);
    let managementSubtask = createStructure("div", "management", undefined, subtaskContainer);
    let btnEditSubtask = createStructure("button", undefined, undefined, managementSubtask);
    let imgEditSubtask = createStructure("img", undefined, {src: "assets/edit.png", alt: "imagem de edição"}, btnEditSubtask);
    let btnDeleteSubtask = createStructure("button", undefined, undefined, managementSubtask);
    let imgDeleteSubtask = createStructure("img", undefined, {src: "assets/delete.png", alt: "imagem de remoção"}, btnDeleteSubtask);
}

/* Event for creating a task with subtasks*/
btncreateMainTask.addEventListener("click", () => {
    for(let i = 0; i < listSubtasks.length; i++){
        sendingMainTask(listSubtasks[i]);
    }
    taskSubtasksModal.close();
    listSubtasks = [];
    btncreateMainTask.style.removeProperty("display");
    inputMainTask.style.removeProperty("display");
    btnMainTask.style.removeProperty("display");
    taskSubtasksModal.classList.remove("active");
    subtaskinModal.innerHTML = "";
    definedName.remove();
});

btnMainTask.addEventListener("click", createMainTask);

function taskCount(value){
    let element = value;

    if(element === 1) pendingTasks.textContent = 
    `Tarefa pendente (${value})`;
    else pendingTasks.textContent = `Tarefas pendentes (${value})`;
}