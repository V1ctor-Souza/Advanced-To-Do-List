let from;
let to;
let movedItem;

new Sortable(firstColumn, {
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
    onStart: function(el){
        let currentEl = el.item;

        if(currentEl.classList.contains("simples")){
            let index = currentIndex(".simples", currentEl);
            from = index;
            movedItem = tasks.simples.splice(from, 1)[0];
        }

        if(currentEl.classList.contains("main")){
            let index = currentIndex(".main", currentEl);
            from = index;
            movedItem = tasks.mains.splice(from, 1)[0];
        }
    },
    onEnd: function(el){
        let currentEl = el.item;

       if(currentEl.classList.contains("simples")){
            let index = currentIndex(".simples", currentEl);
            to = index; 
            tasks.simples.splice(to, 0, movedItem);

            localStorage.setItem("simplesTasks", JSON.stringify(tasks.simples));

            from = undefined;
            to = undefined;
            movedItem = undefined;
        }

        if(currentEl.classList.contains("main")){
            let index = currentIndex(".main", currentEl);
            to = index;
            tasks.mains.splice(to, 0, movedItem);
            localStorage.setItem("mainTasks", JSON.stringify(tasks.mains));

            from = undefined;
            to = undefined;
            movedItem = undefined;
        }
    },
    onAdd: function(el){
        let currentEl = el.item;
        el.from.insertBefore(currentEl, el.from.children[el.oldIndex]);
    }
});

new Sortable(subtaskinModal, {
    handle: '.handle',
    animation: 150,

    onStart: function(el){
        from = el.oldIndex;
    },
    onEnd: function(el){
        to = el.newIndex

        movedItem = subtasksCurrent.splice(from, 1)[0];
        subtasksCurrent.splice(to, 0, movedItem);
        localStorage.setItem("subtasksCurrent", JSON.stringify(subtasksCurrent));
    }
});

new Sortable(columns[1], {
    group: "pending",
    draggable: ".task-container",

    onAdd: function (evt){
        currentTask = evt.item;
        evt.from.insertBefore(currentTask, evt.from.children[evt.oldIndex]);
        confirmComplete.showModal();
    }
});