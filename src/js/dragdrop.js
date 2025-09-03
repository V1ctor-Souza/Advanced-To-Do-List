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
});