const listDate = document.querySelector(".list-date");
const taskAmount = document.querySelector(".task-amount");
const taskContainer = document.querySelector(".tasks");
const tasks = document.querySelectorAll(".task");
const newTaskBtn = document.querySelector(".add-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");
const newTask = document.querySelector(".new-task");
const date = new Date();


//Local storage array
const listItems =  JSON.parse(localStorage.getItem("willDo.list"))  || [];
//    listItems.push(createTask('lamba') )



// Current Date handling
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
            "monday",
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


const ceateTask = (task, isDone = false )=>{
    return { id:Date.now(), task:task, isDone:isDone }
}


// render all tasks from list items
function render() {
    listItems.forEach(el =>{

        if(el.isDone === false){
            taskContainer.innerHTML += `
        <div class="task">
        <p><i class="fas fa-minus-circle delete-btn">${el.task}</p>
        <div class="task-icon">
            <i class="fa fa-check done-icon"></i>
        </div>
    </div>`

        }else{
            taskContainer.innerHTML += `
        <div class="task done">
        <p><i class="fas fa-minus-circle delete-btn">${el.task}</p>
        <div class="task-icon">
            <i class="fa fa-check done-icon"></i>
        </div>
    </div>`
        }
        
    })
}

function save() {
    localStorage.setItem("willDo.list",  JSON.stringify(listItems))

    // localStorage.setItem("task-count", taskAmount.innerHTML);
}

function addTask(task) {
    const icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-check");
    icon.classList.add("done-icon");

    // <i class="fas fa-minus-circle del"></i>

    const inner = document.createElement("div");
    inner.classList.add("task-icon");
    inner.appendChild(icon);

    const delBtn = document.createElement("i");
    delBtn.classList.add("fa");
    delBtn.classList.add("fa-minus-circle");
    delBtn.classList.add("delete-btn");

    console.log(delBtn);

    const text = document.createElement("p");
    text.appendChild(delBtn);
    text.innerHTML += task;

    const outer = document.createElement("div");
    outer.classList.add("task");
    outer.appendChild(text);
    outer.appendChild(inner);

    taskContainer.appendChild(outer);
    taskAmount.innerHTML = Number(taskAmount.innerHTML) + 1;
}

function removeTask(task) {
    task.parentElement.parentElement.remove();
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

// fullDateRender();
// render();

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

// even listener for done icon and delete icon
taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-icon")) {
        e.target.parentElement.classList.add("done");
    }

    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.parentElement.remove();
        taskAmount.innerHTML = Number(taskAmount.innerHTML) - 1;
    }
    save();
});
