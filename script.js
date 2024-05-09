import DailyPlan from "./DailyPlan.js";
import { Task } from "./Task.js";
import { getDate } from "./Date.js";

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
let displayDate = document.getElementById('date-display');


displayDate.innerHTML = getDate(calendar.value);

//JS Variables
// add present day to list
let dailyPlanList = [new DailyPlan(calendar.value)];


function handleCalendarChange() {
    //create a new daily plan
    //add that daily plan to the list of plans
    try {
        let presentDay = new Date();
        let userSelectedDay = new Date(calendar.value);

        if (presentDay.toLocaleDateString() > userSelectedDay.toLocaleDateString()) {
            throw new Error('You cannot make a plan for a past day!');
        }

        displayDate.innerHTML = getDate(calendar.value);
        let plan = new DailyPlan(calendar.value);
        dailyPlanList.push(plan);
        plan.displayTask(taskContainer);
        plan.displayCompletedTask(completedTaskContainer);
    } catch (error) {
        window.alert(error.message);
    }
}


function handleCheckbox(index) {
    try {

        let presentDay = new Date();
        let userSelectedDay = new Date(calendar.value);

        if (userSelectedDay.toLocaleDateString() > presentDay.toLocaleDateString()) {
            throw new Error('You cannot complete a task for a future day!');
        }

        let dayPlan = getDailyPlan(calendar.value);
        let completedTask = dayPlan.removeTask(index);
        //console.log(completedTask);
        dayPlan.completedTodoList.push(completedTask);
        dayPlan.displayTask(taskContainer);
        dayPlan.displayCompletedTask(completedTaskContainer);
    } catch (error) {
        window.alert(error.message);
        dayPlan.displayTask(taskContainer);
    }
}

function handleDelete(index) {
    let dayPlan = getDailyPlan(calendar.value);
    dayPlan.removeTask(index);
    dayPlan.displayTask(taskContainer);
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

// window.handleAddBtnClick = handleAddBtnClick;

function getDailyPlan(date) {
    return dailyPlanList.find((value, index) => value.date === date)
}

function checkTimeMatch(todolist, time) {
    let todo = todolist.find((value => time && value.time === time))
    if (todo)
        return true
    return false
}

function handleSubmitTask() {
    let task = new Task(addTaskInput.value, dueTime.value);
    let dayPlan = getDailyPlan(calendar.value);

    try {
        if (task.event.trim() && ![',', '.', '!', '?', '%', '(', ')'].includes(task.event.trim())) {
            if (checkTimeMatch(dayPlan.todoList, task.time)) {
                throw new Error('Set Unique time for events');
            }
            else {
                dayPlan.addTask(task);
                dayPlan.displayTask(taskContainer);
            }
        }
        else {
            throw new Error('Enter a valid task!');
        }
    } catch (error) {
        window.alert(error.message);
    }


    addTaskInput.value = '';
    closeTaskForm();
}

//Add Event Listener
addBtn.addEventListener('click', handleAddBtnClick);
submitBtn.addEventListener('click', handleSubmitTask);
calendar.addEventListener('change', handleCalendarChange);

window.handleDelete = handleDelete
window.handleCheckbox = handleCheckbox






