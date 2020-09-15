const listDate = document.querySelector(".list-date");
const taskAmount = document.querySelector(".task-amount");
const tasks = document.querySelectorAll(".task");
const taskIcons = document.querySelectorAll(".task-icon");
const newTaskBtn = document.querySelector(".add-btn");
const newTask = document.querySelector(".new-task");

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
