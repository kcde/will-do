const listDate = document.querySelector(".list-date");
const taskAmount = document.querySelector(".task-amount");
const taskContainer = document.querySelector(".tasks");
const tasks = document.querySelectorAll(".task");

const newTaskBtn = document.querySelector(".add-btn");
const newTask = document.querySelector(".new-task");
const date = new Date();

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

// list of tasks
const taskList = [{ name: "blessing" }, { name: "kels" }];

//function to add task to task list array
const addTask = (task) => {
    id = taskList.length + 1;
    taskList.push({ id: id, name: task, done: false });
};

const taskIcons = document.querySelectorAll(".task-icon");
taskIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        icon.parentElement.classList.add("done");
    });
});

// click button to add task
newTaskBtn.addEventListener("click", () => {
    if (newTaskBtn.classList.contains("add-btn-clicked")) {
        newTaskBtn.classList.remove("add-btn-clicked");
        newTask.classList.remove("new-task-show");
        console.log(newTask.value);
        console.log(taskList);

        newTask.value = "";
    } else {
        newTaskBtn.classList.add("add-btn-clicked");
        newTask.classList.add("new-task-show");
    }
});

//enter button to add task
window.addEventListener("keyup", (e) => {
    if (newTaskBtn.classList.contains("add-btn-clicked")) {
        if (e.keyCode === 13) {
            newTask.classList.remove("new-task-show");
            newTaskBtn.classList.remove("add-btn-clicked");
            newTask.classList.remove("new-task-show");
            console.log(newTask.value);
            console.log(taskList);
            newTask.value = "";
        }
    } else {
        return;
    }
});

// localStorage.setItem("name", JSON.stringify({ loud: "gim" }));
