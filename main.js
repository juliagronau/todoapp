//Get elements we want to manipulate / listen to
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
//Get to dos from localStorage or set to empty array if there are none; JSON.parse() converts to array
const todos = JSON.parse(localStorage.getItem("todos")) || [];

const getFromLocalStorage = () => {
  todos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <input type="checkbox" name="mark-as-done"></input>
    <p>${todo.name}</p>
    <button class="btn btn-danger" name="delete">Delete</button>
    <button class="btn btn-warning" name="edit">Edit</button>
    `;
    if (todo.done === true) {
      listItem.children[1].style.textDecoration = "line-through red";
      listItem.children[0].setAttribute("checked", "true");
    }
    taskList.append(listItem);
  });
};
getFromLocalStorage();

//Event handler for sumbit event
const handleSumbit = (event) => {
  event.preventDefault();
  const input = document.getElementById("input-field");
  if (input.value === "") {
    alert("Please enter a to do");
  } else {
    addNewTask(input.value);
  }
  input.value = "";
};

//Event handler for click events
const handleClick = (event) => {
  if (event.target.name === "delete") {
    deleteTask(event);
  } else if (event.target.name === "edit") {
    editTask(event);
  } else if (event.target.name === "mark-as-done") {
    markAsDone(event);
  }
};

//Add a new to do to DOM
const addNewTask = (task) => {
  const listItem = document.createElement("li");
  const todo = {
    id: Date.now(),
    name: task,
    done: false,
  };

  listItem.innerHTML = `
    <input type="checkbox" name="mark-as-done"></input>
    <p>${task}</p>
    <button class="btn btn-danger" name="delete">Delete</button>
    <button class="btn btn-warning" name="edit">Edit</button>
    `;

  taskList.append(listItem);
  todos.push(todo);
  addToLocalStorage();
};
//Add new to do to localStorage
const addToLocalStorage = () => {
  //setItems with the key "todos", assigning it the value of the todos array after turning it into a string (can't store array in localStorage)
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Delete to do from DOM
const deleteTask = (event) => {
  const task = event.target.parentNode;
  deleteFromLocalStorage(todos, task);
  task.remove();
};

//Delete to do from localStorage
const deleteFromLocalStorage = (todos, task) => {
  const findTaskIndex = todos.findIndex(
    (todo) => todo.name == task.childNodes[3].innerHTML
  );
  todos.splice(findTaskIndex, 1);
  addToLocalStorage();
};

//Edit to do in DOM
const editTask = (event) => {
  const paragraph = event.target.parentNode.childNodes[2].nextSibling;
  const newInputField = document.createElement("input");
  newInputField.setAttribute("type", "text");
  newInputField.setAttribute("id", "edit-input");
  const doneButton = document.createElement("i");
  doneButton.setAttribute("class", "bi bi-check-square");
  doneButton.setAttribute("style", "font-size: 1.5rem");
  paragraph.appendChild(newInputField);
  paragraph.appendChild(doneButton);
  const replaceP = (event) => {
    const findTaskIndex = todos.findIndex(
      (todo) => todo.name == paragraph.innerText
    );
    paragraph.innerHTML = event.target.previousSibling.value;
    editTaskLocalStorage(todos, findTaskIndex, paragraph);
  };
  doneButton.addEventListener("click", replaceP);
};

//Edit to do in localStorage
const editTaskLocalStorage = (todos, findTaskIndex, paragraph) => {
  todos[findTaskIndex].name = paragraph.innerHTML;
  addToLocalStorage();
};

//Mark to do as done in DOM
const markAsDone = (event) => {
  const task = event.target.nextSibling.nextSibling;
  if (task.style.textDecoration === "line-through red") {
    task.style.textDecoration = "none";
  } else {
    task.style.textDecoration = "line-through red";
  }
  markAsDoneLocalStorage(todos, task);
};

//Mark to do as done in localStorage
const markAsDoneLocalStorage = (todos, task) => {
  const findTaskIndex = todos.findIndex(
    (todo) => todo.name == task.innerHTML
  );
  if (todos[findTaskIndex].done == false) {
    todos[findTaskIndex].done = true;
  } else {
    todos[findTaskIndex].done = false;
  }
  addToLocalStorage();
};

//Event listeners
form.addEventListener("submit", handleSumbit);
taskList.addEventListener("click", handleClick);
