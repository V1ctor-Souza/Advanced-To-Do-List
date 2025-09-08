/* select all <dialog> for backdrop*/
let allModal = document.querySelectorAll("dialog");
allModal.forEach(modal => {
    modal.addEventListener("click", (e) => {
        
        if(modal.classList.contains("continued")) return;

        let posModal = modal.getBoundingClientRect();
        let modalContainer =
        posModal.top <= e.clientY &&
        posModal.left <= e.clientX &&
        e.clientY <= posModal.top + posModal.height &&
        e.clientX <= posModal.left + posModal.width;

        if(!modalContainer){
            modal.classList.remove("slideDown");
            modal.close();  
            inputSimpleTask.value = '';
        };
    });
});

/* Modal to create tasks */
const btnCreateTasks = document.querySelector(".btn-createTasks");
const mainModal = document.querySelector(".main-modal");

btnCreateTasks.addEventListener("click", () => {
    btnCreateTasks.blur();
    mainModal.showModal();
    mainModal.classList.add("slideDown");
});


/* Modal to create simples tasks */
const simpleTaskModal = document.querySelector(".simpleTask-modal");
const btnCreateST = mainModal.querySelector(".btn-createSimpleTask");

btnCreateST.addEventListener("click", () => {
    mainModal.close();
    mainModal.classList.remove("slideDown");
    simpleTaskModal.showModal();
});

function handleClose(e){
    if (e.animationName === "closeToTask"){
        simpleTaskModal.close();
        simpleTaskModal.classList.remove("closeToTask");
        simpleTaskModal.removeEventListener("animationend", handleClose);
        currentTask = undefined;
    }
}


/* Modal to create main tasks */
const taskSubtasksModal = document.querySelector(".taskSubtasks-modal");
const btnCreateTWS = mainModal.querySelector(".btn-createTWS");

btnCreateTWS.addEventListener("click", () => {
    mainModal.close();
    mainModal.classList.remove("slideDown");
    taskSubtasksModal.showModal();
});

/* Modal to edit task */
const editModal = document.querySelector(".editModal");
const inputEditModal = editModal.querySelector("input");
const btnEditTask = editModal.querySelector(".btnEdit");

btnEditTask.addEventListener("click", () => {
    if(inputEditModal.value){
        if(taskBeingEdited.tagName === 'SPAN'){
            currentIndex(".taskName span", taskBeingEdited, {type: 'edit'});
        } else if(taskBeingEdited.tagName === "H3"){
            currentIndex(".main h3", taskBeingEdited, {type: 'edit'});
        } else if(taskBeingEdited.tagName === "LABEL"){
            currentIndex(".subtask", taskBeingEdited, {type: 'edit'});
        }
    }
    taskBeingEdited = null;
    editModal.close();
    inputEditModal.value = '';
});


/* Modal to confirmation delete */
const deleteConfirmation = document.querySelector(".delete-confirmation");
const btnCancelModal = document.querySelector(".container-buttons .btn-cancel");
const btnConfirmModal = document.querySelector(".container-buttons .btn-confirm")
const nameMainModal = deleteConfirmation.querySelector(".name-main");
const totalSubtaskModal = deleteConfirmation.querySelector(".total-subtasks");


btnCancelModal.addEventListener("click", () => deleteConfirmation.close());

btnConfirmModal.addEventListener("click", () => {
    console.log(taskBeingDeleted);
    if(completedTaskColumn.contains(taskBeingDeleted)){
        // find current task index
        let allTaskInCompleted = Array.from(completedTaskColumn.querySelectorAll(".main"));
        let index = allTaskInCompleted.indexOf(taskBeingDeleted);

        // delete current task
        taskBeingDeleted.remove();
        mainTasksCompleted.splice(index, 1);
        localStorage.setItem("mainTasksCompleted", JSON.stringify(mainTasksCompleted));
    } else{
        // find current task index
        let allTaskInPending = Array.from(firstColumn.querySelectorAll(".main"));
        let index = allTaskInPending.indexOf(taskBeingDeleted);

        // delete current task
        taskBeingDeleted.remove();
        tasks.mains.splice(index, 1);
        localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
    }
    deleteConfirmation.close();
    taskBeingDeleted = null;
    taskCount(firstColumn.childElementCount - 1, pendingTasks, "Tarefa", "pendente");
    taskCount(completedTaskColumn.childElementCount - 1, completedTasks, "Tarefa", "concluída");
});


// Modal to continue task creation
const modalContinued = document.querySelector(".continued");
const cancelContinuation = modalContinued.querySelector(".btn-cancel");
const btnContinue = modalContinued.querySelector(".btn-confirm");
const continueNameMainModal = modalContinued.querySelector(".name-main").textContent = localStorage.getItem("nameMainCurrent");
const continueTotalSubtaskModal = modalContinued.querySelector(".total-subtasks");

let minSubtask = subtaskinModal.childElementCount;

setTimeout(() => {
    if(subtasksCurrent.length === 0){
        continueTotalSubtaskModal.textContent = "nenhuma subtarefa";
    } else if(subtasksCurrent.length === 1){
        continueTotalSubtaskModal.textContent = subtasksCurrent.length + " subtarefa";
    } else{
        continueTotalSubtaskModal.textContent = subtasksCurrent.length + " subtarefas";
    }
}, 300);


cancelContinuation.addEventListener("click", () => {
    localStorage.removeItem("nameMainCurrent");
    localStorage.removeItem("subtasksCurrent");
    taskSubtasksModal.classList.remove("active");
    inputMainTask.value = '';
    modalContinued.close();
});

btnContinue.addEventListener("click", () => {
    modalContinued.close();
    taskSubtasksModal.showModal();
});


// Modal to confirm task completed
const confirmComplete = document.querySelector(".confirm-complete");
const cancelConfirmation = confirmComplete.querySelector(".btn-cancel");
const confirmConfirmation = confirmComplete.querySelector(".btn-confirm");

cancelConfirmation.addEventListener("click", () => confirmComplete.close())
confirmConfirmation.addEventListener("click", () => {
    if(currentTask.classList.contains("simples")){
        let allSimplesTasks = [...firstColumn.querySelectorAll(".simples")];
        let index = allSimplesTasks.indexOf(currentTask);

        tasks.simples[index].column = 1;
        tasksCompleted.push(tasks.simples[index]);
        tasks.simples.splice(index, 1);

        localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
        localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));

        confirmComplete.close();
        location.reload();

        currentTask = undefined;
    }

    if(currentTask.classList.contains("main")){
        let allMainTasks = [...firstColumn.querySelectorAll(".main")];
        let index = allMainTasks.indexOf(currentTask);

        tasks.mains[index].progress = 100;
        
        mainTasksCompleted.push(tasks.mains[index]);
        tasks.mains.splice(index, 1);

        localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
        localStorage.setItem("mainTasksCompleted", JSON.stringify(mainTasksCompleted));

        confirmComplete.close();
        location.reload();
        currentTask = undefined;
    }
});