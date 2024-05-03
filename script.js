
//DOM Elements - Document Object Model 
let addBtn = document.getElementById('add-btn');
let addTaskContainer = document.getElementById('add-task-container');
let submitBtn = document.getElementById('submit-btn');
let addTaskInput = document.getElementById('add-task-input')
let taskContainer = document.getElementById('task-container');
let completedTaskContainer = document.getElementById('task-completed-container');
let calendar = document.getElementById('calendar');
calendar.valueAsDate = new Date();
let dueTime = document.getElementById("due-time");

//Task class
class Task {
    constructor(_event, _time) {
        this.event = _event;
        this.time = _time;
    }
}

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

}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//JS Variables
let dailyPlan = new DailyPlan(calendar.value) //present day
let dailyPlanList = [dailyPlan];

function handleCalendarChange() {
    //create a new daily plan
    //add that daily plan to the list of plans
    let plan = new DailyPlan(calendar.value);
    dailyPlanList.push(plan);
    displayTask();
    displayCompletedTask();
}


function handleCheckbox(index) {
    let dayPlan = getDailyPlan(calendar.value);
    let completedTask = dayPlan.removeTask(index);
    console.log(completedTask);
    dayPlan.completedTodoList.push(completedTask);
    displayTask();
    displayCompletedTask();
}
function displayTask() {
    let dayPlan = getDailyPlan(calendar.value);
    taskContainer.innerHTML = '';
    dayPlan.todoList.map((value, index) => {
        taskContainer.innerHTML += `<div class="task-item">
                                        <input type="checkbox" value="${index}" onClick="handleCheckbox(${index})">
                                        <div style="display: flex; justify-content: space-between; flex: 1">
                                            <p>${value.event}</p>
                                            <p>${value.time}</p>
                                        </div>
                                    </div>`
    })
}
function displayCompletedTask() {
    let dayPlan = getDailyPlan(calendar.value);
    console.log(dayPlan);
    completedTaskContainer.innerHTML = '';
    dayPlan.completedTodoList.map((value, index) => {
        completedTaskContainer.innerHTML += `<div class="task-item">
                                        <input type="checkbox" value="${index}" checked>
                                        <p style="text-decoration: line-through;">${value.event}</p>
                                        </div>`
    })
}

function openTaskForm() {
    addBtn.style.display = 'none'
    addTaskContainer.style.display = "flex"
}

function closeTaskForm() {
    addTaskContainer.style.display = "none"
    addBtn.style.display = 'block'
}


const handleAddBtnClick = function () {
    openTaskForm();
}

function getDailyPlan(date) {
    return dailyPlanList.find((value, index) => value.date === date)
}

function handleSubmitTask() {
    let task = new Task(addTaskInput.value, dueTime.value);
    let dayPlan = getDailyPlan(calendar.value);

    if (task.event.trim() && ![',', '.', '!', '?', '%', '(', ')'].includes(task.event.trim())) {
        dayPlan.addTask(task);
        displayTask(task)
    }

    addTaskInput.value = '';
    closeTaskForm();
}






