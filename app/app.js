const listDate = document.querySelector(".list-date");
const taskAmount = document.querySelector(".task-amount");
const tasks = document.querySelectorAll(".task");
const taskIcons = document.querySelectorAll(".task-icon");
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

taskIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        icon.parentElement.classList.add("done");
    });
});

newTaskBtn.addEventListener("click", () => {
    if (newTaskBtn.classList.contains("add-btn-clicked")) {
        newTaskBtn.classList.remove("add-btn-clicked");
        newTask.classList.remove("new-task-show");
        console.log(newTask.value);
        newTask.value = "";
    } else {
        newTaskBtn.classList.add("add-btn-clicked");
        newTask.classList.add("new-task-show");
    }
});
