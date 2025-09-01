let from;
let to;
let movedItem; 

let sortable = new Sortable(firstColumn, {
    group: {
        name: "pending",
        pull: true
    },
    draggable: ".task-container",
    animation: 200,
    delay: 50,
    direction: 'vertical',
    forceFallback: true,
    filter: ".task-status",
    onStart: function (el){
        let currentEl = el.item;
        console.log(currentEl);

        if(currentEl.classList.contains("simples")){
            let index = currentIndex(".simples", currentEl);
            from = index;
            movedItem = tasks.simples.splice(from, 1)[0];
            console.log(tasks.simples);
        }

        if(currentEl.classList.contains("main")){
            let index = currentIndex(".main", currentEl);
            from = index;
            movedItem = tasks.mains.splice(from, 1)[0];
            console.log(tasks.mains);
        }

        // if(currentEl.classList.contains("main")){
        //     let index = currentIndex(".main", currentEl);
        //     from = index; 
        //     movedItem = tasks.mains.splice(from, 1)[0];
        //     console.log(tasks.mains);
        // }
    },
    onEnd: function (el){
        let currentEl = el.item;

        if(currentEl.classList.contains("simples")){
            let index = currentIndex(".simples", currentEl);
            to = index; 
            tasks.simples.splice(to, 0, movedItem);
            console.log(tasks.simples);
            localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));

            from = undefined;
            to = undefined;
            movedItem = undefined;
        }

        if(currentEl.classList.contains("main")){
            let index = currentIndex(".main", currentEl);
            to = index;
            tasks.mains.splice(to, 0, movedItem);
            console.log(tasks.mains);
            localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));

            from = undefined;
            to = undefined;
            movedItem = undefined;
        }
    }
});