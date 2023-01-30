// (function(){

// all necessary variable
    let tasks = [];
    let checkObject;
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    const All=document.getElementById('all');
    const Completed=document.getElementById('completed');
    const Uncompleted=document.getElementById('uncompleted');
    
    console.log('Working');
    
    
// create li element and append in ul
    
    function addTaskToDOM(task){
    checkObject=task;
    console.log(checkObject)
    const li=document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}  class="custom-checkbox">
              <label for="${task.id}">${task.title}</label>
              <img src="https://icons-for-free.com/download-icon-remove+icon-1320184982863027796_512.png" class="delete" data-id="${task.id}" />
    
    `
    taskList.append(li);
    
    }
  
// this function render li element (task render::: task show)
    function renderList (got) {
        taskList.innerHTML="";
        for(let i=0;i<got.length;i++){
            addTaskToDOM(got[i]);
        }
        tasksCounter.innerHTML=got.length;
    }
 // this function is responsible for task is completed or not if completed then its true otherwise its false
    function markTaskAsComplete (taskId) {
        const task=tasks.filter(function(task){
            return task.id == taskId;
                })
           
                if(task.length>0){
                    const currentTask=task[0];
                    currentTask.completed = !currentTask.completed;
                    renderList(tasks);
                    showNotification('task toggled successfully');
                    return;
                }
                showNotification('could not toggle the task');
    
    }
    
 // delete task from array
    function deleteTask (taskId) {
        const newTask=tasks.filter(function(task){
    return task.id !== Number(taskId);
        })
        tasks=newTask;
        renderList(tasks);
        showNotification('tasks deleted successfully');
    }
 //add task in array 
    function addTask (task) {
        if(task){
            tasks.push(task);
            renderList(tasks);
            showNotification('task added successfully');
            return;
        }
        showNotification('task  text can not be added');
    }
 // show notification
    function showNotification(text) {
        alert(text);
    }
// task will add when user click on the enter button
    function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
        // console.log('text'+text);
    
        if(!text){
            showNotification('task  text can not be empty');
            return;
        }
        const task={
           title:text,
            id:Date.now(),
            completed:false
        }
        e.target.value='';
        addTask(task);
    }
    }
// this function is responsible for delete and check :::: when user will click 
    function handleClickListener(e){
        const target=e.target;
        console.log(target)
        if(target.className == 'delete'){
            const taskId=target.dataset.id;
            deleteTask(taskId);
        }else if(target.className=='custom-checkbox'){
            const taskId=target.id;
            markTaskAsComplete(taskId);
        }
    }
// this function will call : when user will click on the all button :::: this function show all task    
    function ShowAllTask(){

       if(tasks.length>0){
        showNotification('total task :'+" "+tasks.length);
        renderList(tasks);

       }else{
        showNotification('tasks is empty');
       }
    }
// this function will call : when user will click on the uncompleted button :::: this function show only uncompleted task
    function ShowCompletedTask(e){
        e.preventDefault();
        var count=0;
        if(tasks.length >0){
            const newTask=tasks.filter(function(task){
                if(task.completed==true){
                    count++;
                }
                return task.completed==true;
                    })
                   
                    renderList(newTask);
                    showNotification(count+": " +'completed task');
        }else{
            showNotification('tasks is empty');
        }

                
    }
// this function will call : when user will click on the completed button :::: this function show only completed task
    function ShowUncompletedTask(e){
        e.preventDefault();
        var count=0;
       if(tasks.length>0){
        const newTask=tasks.filter(function(task){
            if(task.completed==false){
                count++;
            }
            return task.completed==false;
                })
             
                renderList(newTask);
                showNotification(count+": "+ 'uncompleted task');
       }else{
        showNotification('tasks is empty');
       }
    }

// this function will call :when mouseover on the input field
function handleInputOnmouseover(){
document.getElementById('add_icon').style.display='block';
}
// this function will call :when mouseout on the input field
function handleInputOnmouseout(){
    document.getElementById('add_icon').style.display='none';
    }
//  main function: where all function will called  
    function initializeApp(){
       
        addTaskInput.addEventListener('keyup',handleInputKeypress);
        document.addEventListener('click',handleClickListener);
        All.addEventListener('click',ShowAllTask);
        Completed.addEventListener('click',ShowCompletedTask);
        Uncompleted.addEventListener('click',ShowUncompletedTask);
        addTaskInput.addEventListener('mouseover',handleInputOnmouseover);
        addTaskInput.addEventListener('mouseout',handleInputOnmouseout);
    }
    initializeApp();
// })();