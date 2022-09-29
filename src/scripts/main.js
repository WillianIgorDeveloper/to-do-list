// Main
const Main = {
    start: function () {
        this.casheSelectors()
        this.addEvents()
    },



    casheSelectors: function () {
        const tasksAdd = document.querySelector('#tasksAdd')
        const tasksContent = document.querySelector('#tasksContent')
        // const tasksRemove = document.querySelectorAll('#tasksRemove')
    },
    
    addEvents: function () {
        tasksAdd.addEventListener('keydown', (event) => {
                if (event.key === 'Enter'){this.myEvents.addTask()}
            })
    },



    myEvents: {
        addTask: function () {
            const task = document.querySelector('#tasksAdd')
            const taskSlug = (task.value
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '')
            )
            if (task.value !== "") {
                tasksContent.innerHTML += `
                    <div id="${taskSlug}" class="task"><div><i title="Marcar como concluída" class="ph-circle"></i><p>${task.value}</p></div><i id="tasksRemove" onclick="Main.myEvents.removeTask('${taskSlug}')" class="ph-trash"></i></div>
                `
                task.value = ''
            }
        },
        removeTask: function (id) {
            
        }
    },

}

// DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    Main.start()
})