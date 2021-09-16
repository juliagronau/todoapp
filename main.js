// create variables for all elements we need 
const input = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const tasks = document.getElementById("task-container");

addButton.addEventListener("click", function() {
    //on click, create element, set text to value of input, append child to task container, clear input field
    const newTask = document.createElement("p");
    newTask.innerText = input.value;
    tasks.appendChild(newTask);
    input.value = "";
})