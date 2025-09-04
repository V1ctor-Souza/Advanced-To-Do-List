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
});

let from;
let to;
let movedItem;

new Sortable(subtaskinModal, {
    handle: '.handle',
    animation: 150,

    onStart: function(el){
        from = el.oldIndex;

        console.log(subtasksCurrent);
    },
    onEnd: function(el){
        to = el.newIndex

        movedItem = subtasksCurrent.splice(from, 1)[0];
        subtasksCurrent.splice(to, 0, movedItem);
        console.log(subtasksCurrent);
        localStorage.setItem("subtasksCurrent", JSON.stringify(subtasksCurrent));
    }
});