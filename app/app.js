const listDate = document.querySelector(".list-date");
const taskAmount = document.querySelector(".task-amount");
const taskContainer = document.querySelector(".tasks");
const tasks = document.querySelectorAll(".task");
const newTaskBtn = document.querySelector(".add-btn");
const newTask = document.querySelector(".new-task");
const date = new Date();

const fullDateRender = () => {
    // getting the name of the present month
    const getMonthName = () => {
        let months = [
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december",
        ];
        const currentMonth = months[date.getMonth()];
        return currentMonth.toString();
    };

    // getting the name of the present day
    const getDayName = () => {
        const days = [
            "sunday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ];
        const currentDay = days[date.getDay()];
        return currentDay.split("").slice(0, 3).join("");
    };

    // full date to display on webpage
    const fullDate =
        getDayName() +
        ", " +
        getMonthName() +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear();

    // rendering date on web page
    listDate.innerHTML = fullDate;
};
function render() {
    if (localStorage.getItem("list")) {
        taskContainer.innerHTML = localStorage.getItem("list");
    }
}

function save() {
    localStorage.setItem("list", taskContainer.innerHTML);
}

function taskCounter() {
    taskCount++;
}

function addTask(task) {
    const icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-check");
    icon.classList.add("done-icon");

    const inner = document.createElement("div");
    inner.classList.add("task-icon");
    inner.appendChild(icon);

    const text = document.createElement("p");
    text.innerHTML = task;

    const outer = document.createElement("div");
    outer.classList.add("task");
    outer.appendChild(text);
    outer.appendChild(inner);

    taskContainer.appendChild(outer);
}

fullDateRender();
render();

// click button to add task
newTaskBtn.addEventListener("click", () => {
    if (newTaskBtn.classList.contains("add-btn-clicked")) {
        newTaskBtn.classList.remove("add-btn-clicked");
        newTask.classList.remove("new-task-show");
        addTask(newTask.value);
        newTask.value = "";
        save();
    } else {
        newTaskBtn.classList.add("add-btn-clicked");
        newTask.classList.add("new-task-show");
    }
});

taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-icon")) {
        e.target.parentElement.classList.add("done");
        save();
    }
});
