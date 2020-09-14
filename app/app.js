const listDate = document.querySelector(".list-date");
const taskAmount = document.querySelector(".task-amount");
const tasks = document.querySelectorAll(".task");
const taskIcons = document.querySelectorAll(".task-icon");

taskIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        icon.parentElement.classList.add("done");
    });
});
