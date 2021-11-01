const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

const handleSumbit = (event) => {
  event.preventDefault();
  const input = document.getElementById("input-field");
  addNewTask(input.value);
  input.value = "";
};

const handleClick = (event) => {
  console.log(event.target);
  if (event.target.name === "delete") {
    deleteTask(event);
  } else if (event.target.name === "edit") {
    editTask(event);
  } else if (event.target.name === "mark-as-done") {
    markAsDone(event);
  }
};

const addNewTask = (task) => {
  const list = document.getElementById("task-list");
  const listItem = document.createElement("li");

  listItem.innerHTML = `
    <input type="checkbox" name="mark-as-done"></input>
    <p>${task}</p>
    <button class="btn btn-danger" name="delete">Löschen</button>
    <button class="btn btn-warning" name="edit">Bearbeiten</button>
    `;

  list.append(listItem);
};

const deleteTask = (event) => {
  console.log(event.target.parentNode);
  const task = event.target.parentNode;
  task.remove();
};

const editTask = (event) => {
  console.log(event.target.parentNode.childNodes[2].nextSibling);
  const input = event.target.parentNode.childNodes[2].nextSibling;
  input.contentEditable = true;
  input.focus();
};

const markAsDone = (event) => {
  const task = event.target.nextSibling.nextSibling;
  task.style.textDecoration = "line-through red";
};

form.addEventListener("submit", handleSumbit);
taskList.addEventListener("click", handleClick);
