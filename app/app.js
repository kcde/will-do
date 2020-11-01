const listDate = document.querySelector(".list-date");
const taskAmount = document.querySelector(".task-amount");
const taskContainer = document.querySelector(".tasks");
const tasks = document.querySelectorAll(".task");
const newTaskBtn = document.querySelector(".add-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");
const editBtn =  document.querySelector(".edit-btn")
const newTask = document.querySelector(".new-task");
const submitBtn = document.querySelector(".submit-btn")
const date = new Date();


//Local storage array
let listItems =  JSON.parse(localStorage.getItem("willDo.list"))  || [];

let listCounter = listItems.length
console.log(listCounter);
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
fullDateRender();


const createTask = (task, isDone = false )=>{
    return { id:Date.now(), task:task, isDone:isDone }
}

function save() {
    localStorage.setItem("willDo.list",  JSON.stringify(listItems))
    // localStorage.setItem("task-count", taskAmount.innerHTML);
}

function removeTask(task) {
    task.parentElement.parentElement.remove();
}



// render all tasks from list items
function render() {
    listItems.forEach(el =>{

        if(el.isDone === false){
            taskContainer.innerHTML += `
            <div class="task" data-id = "${el.id}">
            <div class="task-check">
                <div class="task-icon">
                    <i class="fa fa-check done-icon"></i>
                </div>
                <p>${el.task}</p>
            </div>

            <div class="util">
                <i class="far fa-edit edit-icon"></i>
                <i class="fas fa-minus-circle delete-btn"></i>
            </div>
        </div>`

        }else{
            taskContainer.innerHTML += `
            <div class="task done " data-id = "${el.id}">
            <div class="task-check">
                <div class="task-icon">
                    <i class="fa fa-check done-icon"></i>
                </div>
                <p>${el.task}</p>
            </div>

            <div class="util">
                <i class="far fa-edit edit-icon"></i>
                <i class="fas fa-minus-circle delete-btn"></i>
            </div>
        </div>`
        }
        
    })

    taskAmount.textContent = listCounter;
}

render();



function addTask(task,id) {
    taskContainer.innerHTML += `
    <div class="task" data-id = "${id}" >
                    <div class="task-check">
                        <div class="task-icon">
                            <i class="fa fa-check done-icon"></i>
                        </div>
                        <p>${task}</p>
                    </div>

                    <div class="util">
                        <i class="far fa-edit edit-icon"></i>
                        <i class="fas fa-minus-circle delete-btn"></i>
                    </div>
                </div>
    `

   
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


submitBtn.style.display = "none"
editBtn.style.display = "none"

//click button to add task
newTaskBtn.addEventListener("click", () => {
    newTaskBtn.style.display = "none"
    submitBtn.style.display = "grid"
    showInput();
    newTask.value = "";
});

submitBtn.addEventListener("click", ()=>{
    newTaskBtn.style.display = "grid"
    submitBtn.style.display = "none"
    hideInput();

    if (nullInput()) {
        return
     }else{
        

        const createdTask = createTask(newTask.value)
        addTask(newTask.value,createdTask.id);
        listItems.push(createdTask )
        taskAmount.textContent++
        
        save()

     }

     newTask.value = "";

})

// newTask.addEventListener("keydown", (e) => {
//     if (e.which === 13) {
//         if (newTaskBtn.classList.contains("add-btn-clicked")) {
//             if (nullInput()) {
//                 newTask.value = "";
//                 return;
//             }
//             hideInput();
//             addTask(newTask.value);
//             newTask.value = "";
//             save();
//         }
//     }
// });

// even listener for done icon and delete icon
taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-icon")) {
        const dataId = parseInt( e.target.parentElement.parentElement.dataset.id);
        let index = listItems.findIndex(tl => tl.id == dataId);
        listItems[index].isDone = true;
        save();
        e.target.parentElement.parentElement.classList.add("done");
    }

    if (e.target.classList.contains("delete-btn")) {
        const dataId = parseInt( e.target.parentElement.parentElement.dataset.id);
        let index = listItems.findIndex(tl => tl.id == dataId);
        listItems.splice(index,1)
        save(); 
        e.target.parentElement.parentElement.remove();
        taskAmount.textContent--;
        // taskAmount.innerHTML = Number(taskAmount.innerHTML) - 1;
    }

    if(e.target.classList.contains("edit-icon")){
        // e.target.parentElement.parentElement.remove()

        editBtn.style.display = "grid";
        submitBtn.style.display="none";
        newTaskBtn.style.display = "none"
        showInput();
        const dataId = parseInt( e.target.parentElement.parentElement.dataset.id);
        let listClone = listItems.slice();
        let index = listClone.findIndex(tl => tl.id == dataId)
        console.log(listClone[0].id);
        newTask.value = listClone[index].task;
       
        editBtn.addEventListener("click",()=>{
        listClone[index].task = newTask.value
        listClone[index].task = newTask.value;
        e.target.parentElement.previousElementSibling.children[1].textContent = newTask.value 
        listItems=listClone;
        save();
        newTask.value =  "";     
            })
           

    }
        
        
});


console.log(listItems.length)
