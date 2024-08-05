const inputField = document.getElementById('input-task');
const taskList = document.getElementById('tasklist');
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


const addBtn = document.getElementById('add');

inputField.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
    }
})

//add new tasks
addBtn.addEventListener('click', addTask);
function addTask() {
    const taskText = inputField.value.trim()
    if(taskText === "") return;

    const task = {"text" : taskText};
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    inputField.value = "";

    displayTasks();
}


//display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${task.text}</span>
                    <button class="task-comp-btn"><span class="material-symbols-outlined">check_circle</span></button>
                    <button class="del-btn"><span class="material-symbols-outlined">delete</span></button>`

        taskList.appendChild(li);
    });


    const taskComptBtns = document.querySelectorAll(".task-comp-btn");
    const delBtn = document.querySelectorAll(".del-btn");

    //delete button (delete task from local storage)
for(let i= 0; i < delBtn.length; i++){
    delBtn[i].addEventListener('click', (e) => {
        const taskNode = e.currentTarget.parentNode;
        const taskText = taskNode.querySelector('span').textContent;

        //remove form local storage
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const index = tasks.findIndex((task) => task.text === taskText);
        if(index != -1){
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        taskNode.remove();
    })
}


//task complete buttons
for(let i= 0; i<taskComptBtns.length; i++){
    taskComptBtns[i].addEventListener('click', (e) => {
        const spanNode = e.currentTarget.previousElementSibling;
        spanNode.classList.toggle('task-completed');
    })
}
}




