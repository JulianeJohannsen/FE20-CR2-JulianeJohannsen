let weeklyTasks = JSON.parse(tasks);

// sort the tasks by priority level
document.getElementById("sortBtn").addEventListener("click", function(){
    weeklyTasks.sort((a, b) => b.importance - a.importance);
    document.getElementById("result").innerHTML = "";
    fill(); 
    buttonClick();    
    doneTask();
});

// display tasks
function fill(){
    weeklyTasks.forEach(task => {
    document.getElementById("result").innerHTML += `
    <div class="mb-1 mb-sm-0">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <button class="btn btn-sm btn-info text-white" id="taskBtn">Task</button>
                    <div>
                        <button class="btn" id="bookmark"><i class="bi bi-bookmark"></i></button>
                        <button class="btn" id="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                    </div>
                </div>                        
            </div>
            <img src="${task.image}" class="img-fluid" alt="image for task">
            <div class="card-body">
                <h5 class="card-title">${task.taskName}</h5>
                <p class="card-text">${task.description}</p>
                <hr>
                <p><i class="bi bi-exclamation-triangle-fill"></i> Priority level: <button class="btn btn-success btn-sm priorityBtn priority">${task.importance}</button></p>
                <p><i class="bi bi-calendar3"></i> Deadline: ${task.deadline}</p>
                <hr>
                <div class="d-flex justify-content-end gap-1">
                    <button class="btn btn-danger btn-sm"><i class="bi bi-trash deleteBtn"></i> Delete</button>
                    <button class="btn btn-success btn-sm doneBtn"><i class="bi bi-check-circle"></i> Done</button>
                </div>
            </div>
        </div> 
    </div>
    `   
});
}

fill();
buttonClick();
doneTask();

// add event listener to priority level button
function buttonClick(){
let priorityBtns = document.querySelectorAll(".priorityBtn");

priorityBtns.forEach((button, i) => {
    button.addEventListener("click", function (){
       increase(i);
       countPrior(i); 
    })
    countPrior(i);
})};


// increase priority level
function increase(i){
    if (weeklyTasks[i].importance < 5) 
    weeklyTasks[i].importance++;
    document.querySelectorAll(".priority")[i].innerHTML = weeklyTasks[i].importance;
}

// change background color due to priority level
function countPrior(i){        
    if (weeklyTasks[i].importance > 1) {
        document.querySelectorAll(".priority")[i].classList.remove("btn-success");
        document.querySelectorAll(".priority")[i].classList.add("btn-warning");      
    }
    if (weeklyTasks[i].importance > 3){
        document.querySelectorAll(".priority")[i].classList.remove("btn-warning");
        document.querySelectorAll(".priority")[i].classList.add("btn-danger");
    }
}

// add event listener to done button
function doneTask(){
    let doneBtns = document.querySelectorAll(".doneBtn");
    doneBtns.forEach((button, i) => {
        button.addEventListener("click", function (){
           resetPrior(i);
           changeColor(i);
        })
        changeColor(i);
    })};

// reset priority level of task (done button)
function resetPrior(i){
    if (weeklyTasks[i].status == false) {
        weeklyTasks[i].importance = 0;
        document.querySelectorAll(".priority")[i].innerHTML = 0; 
        weeklyTasks[i].status = true;
    }
}

// change background color of task (done button)
function changeColor(i){
    if (weeklyTasks[i].status == true){
        weeklyTasks[i].importance = 0;
        document.querySelectorAll(".priority")[i].innerHTML = 0; 
        document.querySelectorAll(".card")[i].classList.add("bg-success-subtle");
        document.querySelectorAll(".priority")[i].classList.remove("btn-warning");
        document.querySelectorAll(".priority")[i].classList.remove("btn-danger");
        document.querySelectorAll(".priority")[i].classList.add("btn-success");  
    }
}