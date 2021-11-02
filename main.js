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
  };

  listItem.innerHTML = `
    <input type="checkbox" name="mark-as-done"></input>
    <p>${task}</p>
    <button class="btn btn-danger" name="delete">Delete</button>
    <button class="btn btn-warning" name="edit">Edit</button>
    `;

  taskList.append(listItem);
  todos.push(todo);
  addToLocalStorage(todo);
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

const deleteFromLocalStorage = (todos, task) => {
  console.log(todos);
  const findTaskIndex = todos.findIndex(
    (todo) => todo.name == task.childNodes[3].innerHTML
  );
  todos.splice(findTaskIndex, 1);
  addToLocalStorage();
};

//Edit to do in DOM
const editTask = (event) => {
  const input = event.target.parentNode.childNodes[2].nextSibling;
  input.contentEditable = true;
  input.focus();
};

//Mark to do as done in DOM
const markAsDone = (event) => {
  const task = event.target.nextSibling.nextSibling;
  if (task.style.textDecoration === "line-through red") {
    task.style.textDecoration = "none";
  } else {
    task.style.textDecoration = "line-through red";
  }
};

//Event listeners
form.addEventListener("submit", handleSumbit);
taskList.addEventListener("click", handleClick);
