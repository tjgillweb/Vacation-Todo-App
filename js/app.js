const submitForm = document.querySelector('.add');
const addButton = document.querySelector('.add-todo');
const todoList = document.querySelector('.todos');
const list = document.querySelectorAll('.todos li');
let defaultItems = [{
        text: "Buy Tickets",
        done: false
    },
    {
        text: "Find AirBnB",
        done: true
    },
    {
        text: "Look up things to do",
        done: false
    },
    {
        text: "Passport",
        done: false
    }
];
const items = JSON.parse(localStorage.getItem('items')) || defaultItems;

function addTodos(e) {
    e.preventDefault();
    const text = submitForm.add.value.trim();
    const item = {
        text,
        done: false
    };
    if (item.text.length) { //to check whether the input is empty
        items.push(item);
    }

    populateList(items, todoList);
    localStorage.setItem('items', JSON.stringify(items));
    submitForm.reset();
}

function populateList(todos = [], todoList) {
    todoList.innerHTML = todos.map((todo, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="todo_${i}" ${todo.done ? 'checked' : ''} />
            <label for="todo_${i}">
                <span class="check"></span>${todo.text}
            </label>
            <i data-index=${i} class="far fa-trash-alt delete"></i>
        </li>
         `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, todoList);
}

function deleteTodos(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        const index = e.target.dataset.index;
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, todoList);
    }
}

//add todos on form submit (enter) or clicking on add button
submitForm.addEventListener('submit', addTodos);
addButton.addEventListener('click', addTodos);

todoList.addEventListener('click', toggleDone);

//delete todos
todoList.addEventListener('click', deleteTodos);

//call the populateList method as soon as the document loads so that we can generate the menu items if there is something in the localStorage
populateList(items, todoList); //