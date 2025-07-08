// Criação de tarefa simples e tarefa com subtarefas
const btnCreateTasks = document.querySelector(".btn-createTasks");
const mainContainer = document.querySelector(".main-container");
let firstColumn = document.querySelector(".column:first-child");

btnCreateTasks.addEventListener("click", () => {
    
    // create element in DOM

        // create elements
        let taskContainer = document.createElement('article');
        let labelTask = document.createElement('label');
        let inputTask = document.createElement('input');
        let checkmark = document.createElement('span');
        let taskName = document.createElement('span');

        let management = document.createElement('div');
        let btnEdit = document.createElement('button');
        let imgEdit = document.createElement('img');
        let btnDelete = document.createElement('button');
        let imgDelete = document.createElement('img');
    

        // add classlist in elements
        taskContainer.classList.add("task-container");
        labelTask.classList.add("task");
        checkmark.classList.add("checkmark");
        taskName.classList.add("taskName");
        management.classList.add("management");


        // add elements in DOM
        firstColumn.appendChild(taskContainer);

        taskContainer.appendChild(labelTask);
        labelTask.appendChild(inputTask);
        labelTask.appendChild(checkmark);
        labelTask.appendChild(taskName);

        taskContainer.appendChild(management);
        management.appendChild(btnEdit);
        btnEdit.appendChild(imgEdit);
        management.appendChild(btnDelete);
        btnDelete.appendChild(imgDelete);


        // add property in elements especific
        inputTask.type = 'checkbox';
        taskName.textContent = 'Nome da tarefa';
        imgEdit.src = "assets/edit.png";
        imgEdit.alt = "edit task image";
        imgDelete.src = "assets/delete.png";
        imgEdit.alt = "delete task image";
});