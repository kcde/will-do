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

    if (localStorage.getItem("task-count")) {
        taskAmount.innerHTML = Number(localStorage.getItem("task-count"));
    } else {
        taskAmount.innerHTML = 0;
    }
}

function save() {
    localStorage.setItem("list", taskContainer.innerHTML);

    localStorage.setItem("task-count", taskAmount.innerHTML);
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
    taskAmount.innerHTML = Number(taskAmount.innerHTML) + 1;
}

function nullInput() {
    if (newTask.value.trim().length === 0) {
        return true;
    }
}

function showInput() {
    newTaskBtn.classList.add("add-btn-clicked");
    newTask.classList.add("new-task-show");
}

function hideInput() {
    newTaskBtn.classList.remove("add-btn-clicked");
    newTask.classList.remove("new-task-show");
}

fullDateRender();
render();

//click button to add task
newTaskBtn.addEventListener("click", () => {
    if (newTaskBtn.classList.contains("add-btn-clicked")) {
        if (nullInput()) {
            newTask.value = "";
            return;
        }

        hideInput();
        addTask(newTask.value);
        newTask.value = "";
        save();
    } else {
        showInput();
    }
});

newTask.addEventListener("keydown", (e) => {
    if (e.which === 13) {
        if (newTaskBtn.classList.contains("add-btn-clicked")) {
            if (nullInput()) {
                newTask.value = "";
                return;
            }
            hideInput();
            addTask(newTask.value);
            newTask.value = "";
            save();
        }
    }
});

taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-icon")) {
        e.target.parentElement.classList.add("done");
    }
    save();
});
