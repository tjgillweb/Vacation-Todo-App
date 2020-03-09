const submitForm = document.querySelector('.add');
const addButton = document.querySelector('.add-todo');
const todoList = document.querySelector('.todos');
const list = document.querySelectorAll('.todos li'); //gives a NodeList of all li's
let listLength = list.length;

const generateTemplate = (todo) => {

    const html = `<li>
                    <input type="checkbox" id="todo_${listLength}" />
                    <label for="todo_${listLength}">
                        <span class="check"></span>${todo}
                    </label>
                    <i class="far fa-trash-alt delete"></i>
                  </li>`
    todoList.innerHTML += html;
};

function addTodos(e) {
    e.preventDefault();
    const todo = submitForm.add.value.trim(); //trim extra space in input
    if (todo.length) { // to check whether the input is empty
        listLength = listLength + 1; // to update the checkbox id when we add a new list item
        generateTemplate(todo);
        submitForm.reset();
    }

}
//add todos
submitForm.addEventListener('submit', addTodos);
addButton.addEventListener('click', addTodos);

function deleteTodos(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
}
//delete todos
todoList.addEventListener('click', deleteTodos);