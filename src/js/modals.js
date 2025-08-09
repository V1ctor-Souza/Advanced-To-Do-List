/* select all <dialog> for backdrop*/
let allModal = document.querySelectorAll("dialog");
allModal.forEach(modal => {
    modal.addEventListener("click", (e) => {
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
    console.log("chegou até aqui");
});


/* Modal to confirmation delete */
const deleteConfirmation = document.querySelector(".delete-confirmation");
const btnCancelModal = document.querySelector(".container-buttons .btn-cancel");
const btnConfirmModal = document.querySelector(".container-buttons .btn-confirm")
const nameMainModal = deleteConfirmation.querySelector(".name-main");
const totalSubtaskModal = deleteConfirmation.querySelector(".total-subtasks");


btnCancelModal.addEventListener("click", () => deleteConfirmation.close());

btnConfirmModal.addEventListener("click", () => {
    currentIndex(".main", taskBeingDeleted, {type: 'delete'});
    deleteConfirmation.close();
    taskBeingDeleted = null;
    taskCount(firstColumn.childElementCount - 1);
});