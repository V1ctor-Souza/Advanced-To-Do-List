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