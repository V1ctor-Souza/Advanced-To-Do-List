// Function responsible to create main DOM structure
function createStructure(element, className, attributes = {}, parentElement){

    let el = document.createElement(element);
    if (className) el.classList.add(...className.split(" "));
    for (let attr in attributes){
        if(attr === 'textContent') el.textContent = attributes[attr];
        else el.setAttribute(attr, attributes[attr]);
    }
    return parentElement.appendChild(el);
}


// Function to find the current index of the task being edited and store it with a new value
function currentIndex(allElement, localElement, action = {}){
    let allElements = document.querySelectorAll(allElement);
    let arrayAllElement = Array.from(allElements);
    let index = arrayAllElement.indexOf(localElement);

    let currentEl = localElement;


    if(action.type === 'edit'){
        if(currentEl.tagName === 'SPAN'){
            currentEl.textContent = inputEditModal.value;
            tasks.simples[index].nameTask = inputEditModal.value;
            localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
        } else if(currentEl.tagName === "H3"){
            currentEl.textContent = inputEditModal.value;
            tasks.mains[index].nameMain = inputEditModal.value;
            localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
        } else if(currentEl.tagName === "LABEL"){
            currentEl.querySelector('.taskName').textContent = inputEditModal.value;
            findSubtask(document.querySelectorAll(".main"), indexCurrentMain, indexCurrentMain.querySelectorAll(".subtask"), taskBeingEdited, {type: 'edit'});
        }
    } else if(action.type === 'delete'){
        if(currentEl.tagName === 'DIV'){
            let parentElement =  currentEl.closest('article');
            parentElement.remove();
            tasks.simples.splice(index, 1);
            localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
        } else if(currentEl.tagName ==='ARTICLE'){
            console.log("deletando");

            // !!
            if(completedTaskColumn.contains(currentEl)){
                console.log(index);
                currentEl.remove();
                console.log(mainTasksCompleted[index]);
                mainTasksCompleted.splice(index, 1);
                localStorage.setItem("mainTasksCompleted", JSON.stringify(mainTasksCompleted));
            } else{
                currentEl.remove();
                tasks.mains.splice(index, 1);
                localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
            }

            
        }
    }

    return index;
}


// Function to apply animation in the modal when creating a task
function CloseToTaskAnimation(currentTask, currentModal){
    document.body.offsetHeight;

    let taskRect = currentTask.getBoundingClientRect();
    let modalRect = currentModal.getBoundingClientRect();

    let taskCenterX = taskRect.left + taskRect.width / 2;
    let taskCenterY = taskRect.top + taskRect.height / 2;
    let modalCenterX = modalRect.left + modalRect.width / 2;
    let modalCenterY = modalRect.top + modalRect.height / 2;

    let deltaX = taskCenterX - modalCenterX;
    let deltaY = taskCenterY - modalCenterY;

    currentModal.style.setProperty("--dx", `${deltaX}px`);
    currentModal.style.setProperty("--dy", `${deltaY}px`);

    currentModal.classList.add("closeToTask");
    currentModal.addEventListener("animationend", function handleClose(e){
        if(e.animationName === "closeToTask"){
            currentModal.close();
            currentModal.classList.remove("closeToTask");
            currentModal.removeEventListener("animationend", handleClose);
            currentTask = undefined;
        }
    });
}


// Function for dates
function infoLastDate(lastDate){
    let date = new Date(lastDate);
    date.setDate(date.getDate() + 1);

    return {
        day: String(date.getDate()).padStart(2, "0"),
        month: String(date.getMonth() + 1).padStart(2, "0"),
        year: date.getFullYear(),
        hours: String(date.getHours()).padStart(2, "0"),
        minutes: String(date.getMinutes()).padStart(2, "0"),
        seconds: String(date.getSeconds()).padStart(2, "0")
    };
}