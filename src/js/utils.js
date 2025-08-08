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
function currentIndex(allElement, localElement){
    let allElements = document.querySelectorAll(allElement);
    console.log(allElements);
    let arrayAllElement = Array.from(allElements);
    console.log(arrayAllElement);
    let index = arrayAllElement.indexOf(localElement);
    console.log(index);

    let currentEl = localElement;
    currentEl.textContent = inputEditModal.value;
    if(currentEl.tagName === 'SPAN'){
        tasks.simples[index] = inputEditModal.value;
        localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));
    } else if(currentEl.tagName === 'H3'){
         tasks.mains[index].nameMain = inputEditModal.value;
         localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));
    }
}