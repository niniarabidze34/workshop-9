//დაწერეთ TO-DO List , input ველით  და ღილაკით ,რომელზე დაჭერის შემთვევაში სიაში დაემატება todo-list item

const input = document.getElementById('todo-input');
const addBtn = document.querySelector('button');
const clearBtn = document.querySelector('#clear');
const clearDoneBtn = document.getElementById('clear-done');
const save = document.getElementById('save');
const ul = document.getElementById('todo-container');

const doneContainer = document.querySelector('.class-container')

const todoItems = JSON.parse(localStorage.getItem('todos')) || [];

window.onload = () => {
    todoItems.forEach((el) => addToDoItem(el));
}

function ToDOItem(description, isComplete,id){
    this.description = description; 
    this.isComplete = isComplete;
    this.id = id;
}

function addToDoItem(listItem = ''){
    const li = document.createElement('li');
    li.innerText = input.value;
    ul.appendChild(li)
    let description = listItem ? listItem.description : input.value;
    let id = listItem ? listItem.id : Date.now()
    li.addEventListener('click', handleMarkAsDone)
    li.setAttribute('id', Date.now())
    if(!listItem){
        const todoItem = new ToDOItem(description,false, ''+ id);
        todoItems.push(todoItem);
    }
}

function handleMarkAsDone(e){
    const clickedItem = e.target;
    clickedItem.classList.add('completed');
    const foundItem = todoItems.find((el) => el.id === clickedItem.id);
    foundItem.isComplete = true;
}

function handleClick(){
    addBtn.addEventListener('click', ()=> {
        if(input.value){
            addToDoItem(); 
        }
        console.log(todoItems)
    })
    
}

function handleClearAll(){
    clearBtn.addEventListener('click', () => {
        ul.innerHTML='';
        todoItems.splice(0,todoItems.length)
        localStorage.removeItem('todos')
    })
}

handleClick();
handleClearAll();

save.addEventListener('click', () => {
    localStorage.setItem('todos', JSON.stringify(todoItems))
})

function handleClearDone(){
    clearDoneBtn.addEventListener('click',() => {
        const undoneItems = todoItems.filter((el) => el.isComplete == false);
        console.log(undoneItems)
        //----
        
        const doneItems = document.querySelectorAll('.completed');
        doneItems.forEach((el) => el.outerHTML='')
        console.log(doneItems)

        //----
        localStorage.removeItem('todos')
        localStorage.setItem('todos', JSON.stringify(undoneItems))
        
    })
}

handleClearDone()