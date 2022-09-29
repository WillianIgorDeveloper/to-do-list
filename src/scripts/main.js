// Main
const Main = {
    start: function () {
        this.casheSelectors()
        this.taskListDefault = this.getLocalStorage()
        if (!this.taskListDefault) {
            this.taskListDefault = this.createDefaltTasks()
        }
        this.showTasks()
        this.addEvents()
        this.salveTaskList()
    },



    casheSelectors: function () {
        this.$tasksContent = document.querySelector('#tasksContent')
        this.$deleteAll = document.querySelector('#deleteAll')
    },
    
    getLocalStorage: function () {
        const taskListSaved = localStorage.getItem('tasksList')
        return JSON.parse(taskListSaved)
    },

    salveTaskList: function () {
        const taskListJson = JSON.stringify(this.taskListDefault)
        localStorage.setItem('tasksList', taskListJson)
    },

    createDefaltTasks: function () {
        return [
            {
                id: 'defaultTask',
                content: `
                    <li id="defaultTask" class="task">
                        <div  class="check-task">
                            <div>
                                <i class="ph-circle" title="Marcar como concluída"></i>
                            </div>
                            <p>Descrição da tarefa</p>
                        </div>
                        <i class="ph-trash tasksRemove" title="Excuir"></i>
                    </li>
                `
            },
        ]
    },


    showTasks: function () {
        let tasksList = ''
        this.taskListDefault.map((tasks) => {
            tasksList += tasks.content
        })
       this.$tasksContent.innerHTML = tasksList
    },


    addEvents: function () {
        const $tasksAdd = document.querySelector('#tasksAdd')
        $tasksAdd.onkeydown = (e) => { this.addTask(e) }

        const $tasksRemove = document.querySelectorAll('.tasksRemove')
        $tasksRemove.forEach(task => {
            task.onclick = (e) => { this.removeTask(e) }
        })

        const $checkTask = document.querySelectorAll('.check-task')
        $checkTask.forEach(task => {
            task.onclick = (e) => {
                this.doneTask(e, task)
            }
        })

        this.$deleteAll.onclick = () => {this.deleteAllTasks()}
    },



    addTask: function (e) {
        if (e.key === 'Enter'){
            const $task = document.querySelector('#tasksAdd')
            if ($task.value !== "") {
                const dateSlug = new Date().getMilliseconds()
                const taskSlug = (
                    $task.value
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                )
                this.taskListDefault.push({
                    id: `${taskSlug}${dateSlug}`,
                    content: `
                        <li id="${taskSlug}${dateSlug}" class="task">
                            <div class="check-task">
                                <div>
                                    <i class="ph-circle" title="Marcar como concluída"></i>
                                </div>
                                <p>${$task.value}</p>
                            </div>
                            <i class="ph-trash tasksRemove" title="Excuir"></i>
                        </li>
                    `
                })
                $task.value = ''
                this.showTasks()
                this.addEvents()
                this.salveTaskList()

            }
        }
    },

    
    removeTask: function (e) {

        console.log(e.target.parentElement.id)


        this.taskListDefault.map((i, index) => {
            if(i.id === e.target.parentElement.id) {
                this.taskListDefault.splice(index, 1)
            }
        })
        this.showTasks()
        this.addEvents()
        this.salveTaskList()
    },


    doneTask: function (e, task) {
        task.classList.toggle('task-done')

        this.taskListDefault.map((i) => {
            if(i.id === e.target.parentElement.parentElement.parentElement.id) {
                i.content = e.target.parentElement.parentElement.parentElement.outerHTML
            }
        })
        this.salveTaskList()
    },


    deleteAllTasks: function () {
        this.taskListDefault = []
        this.showTasks()
        this.addEvents()
        this.salveTaskList()
    },
}



// DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    Main.start()
})