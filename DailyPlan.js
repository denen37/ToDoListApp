class DailyPlan {
    constructor(_date, _todoList = []) {
        this.date = _date;
        this.todoList = _todoList;
        this.completedTodoList = [];
    }

    addTask(task) {
        this.todoList.push(task);
    }

    removeTask(myIndex) {
        let tempTask = this.todoList[myIndex];
        //remove task
        this.todoList = this.todoList.filter((value, index) => index !== myIndex)

        //return task
        return tempTask;
    }

    displayTask(taskContainer) {
        taskContainer.innerHTML = '';
        this.todoList.map((value, index) => {
            taskContainer.innerHTML += `<div class="task-item">
                                        <input type="checkbox" value="${index}" onClick="handleCheckbox(${index})">
                                        <div style="display: flex; justify-content: space-between; flex: 1">
                                            <p>${value.event}</p>
                                            <div style="display: flex; gap: 10px">
                                                <p>${value.time}</p>
                                                <i class="fa-regular fa-trash-can" style="cursor: pointer; color: red" onClick="handleDelete(${index})"></i>
                                            </div>
                                        </div>
                                    </div>`
        })
    }

    displayCompletedTask(completedTaskContainer) {
        completedTaskContainer.innerHTML = '';
        this.completedTodoList.map((value, index) => {
            completedTaskContainer.innerHTML += `<div class="task-item">
                                        <input type="checkbox" value="${index}" checked>
                                        <p style="text-decoration: line-through;">${value.event}</p>
                                        </div>`
        })
    }


}

export default DailyPlan