let form = document.querySelector("#form");
let newTask = document.querySelector("#new-task");
let items = document.querySelector(".items");
let completedTask = document.querySelector(".completed-items");

// Get all tasks from the local Storage or return an empty array

const getTasksFromLocalStorage = () => {
  const localStorageItem = localStorage.getItem("tasks");
  return localStorageItem ? JSON.parse(localStorageItem) : [];
};

// Sasve task to local Storage

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add New Task

const addTask = (event) => {
  event.preventDefault();

  const id = new Date().getTime();
  const title = newTask.value;
  const status = "incomplete";

  const tasks = getTasksFromLocalStorage();

  tasks.push({ id, title, status });

  saveTasksToLocalStorage(tasks);

  renderTasksUI();
  newTask.value = "";
};

// Create HTML for a task
const createTaskHTML = (task) => {
  const { id, title, status } = task;

  return `
    <li class="list-group-item">
        <!-- Your HTML structure here -->
    </li>
  `;
};

// Create HTML for incomplete tasks
const createIncompleteTaskHTML = (task) => {
  const { id, title } = task;

  return `
    <li class="list-group-item">
      <div class="group d-flex align-items-center justify-content-between">
        <div class="form-check">
          <input class="form-check-input" onChange="changeStatus(${id}, this.checked)" type="checkbox" value="" id=${id}>
          <label class="form-check-label" for=${id}>
            ${title}
          </label>
        </div>
        <div class="icons">
          <i class="bi bi-pencil" onClick="editTitle(this, ${id})"></i>
        </div>
      </div>
      <div class="d-none input-group"> 
        <input type="text" class="form-control" value="${title}">
        <button class="btn btn-primary" onClick="editTask(${id}, this.previousElementSibling.value)">Save</button>
      </div>
    </li>
  `;
};

// Create HTML for completed tasks
const createCompletedTaskHTML = (task) => {
  const { id, title } = task;

  return `
    <li class="list-group-item d-flex align-items-center justify-content-between">
      <div class="form-check">
        <input class="form-check-input" checked type="checkbox" value="" id=${id} disabled="disabled">
        <label class="form-check-label" for=${id}>
          ${title}
        </label>
      </div>
      <div class="icons">
        <i class="bi bi-trash text-danger" onClick="deleteItem(${id})"></i>
      </div>
    </li>
  `;
};

const renderTasksUI = () => {
  const tasks = getTasksFromLocalStorage();
  const incompleteTasksHTML = tasks
    .filter((task) => task.status === "incomplete")
    .map(createIncompleteTaskHTML)
    .join("");

  const completedTasksHTML = tasks
    .filter((task) => task.status === "completed")
    .map(createCompletedTaskHTML)
    .join("");

  items.innerHTML = incompleteTasksHTML;
  completedTask.innerHTML = completedTasksHTML;
};

// Change task status (completed or incomplete)
const changeStatus = (id, checked) => {
  const tasks = getTasksFromLocalStorage();

  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, status: checked ? "completed" : "incomplete" }
      : task
  );

  saveTasksToLocalStorage(updatedTasks);
  renderTasksUI();
};

// Delete a task
const deleteItem = (id) => {
  const tasks = getTasksFromLocalStorage();

  const updatedTasks = tasks.filter((task) => task.id !== id);

  saveTasksToLocalStorage(updatedTasks);
  renderTasksUI();
};
const editTitle = (element, id) => {
  const divParent = element.closest(".group");
  divParent.style.setProperty("display", "none", "important");
  divParent.nextElementSibling.style.setProperty(
    "display",
    "flex",
    "important"
  );
};

// Edit task title
const editTask = (id, title) => {
  const tasks = getTasksFromLocalStorage();

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, title } : task
  );

  saveTasksToLocalStorage(updatedTasks);
  renderTasksUI();
};

form.addEventListener("submit", addTask);
renderTasksUI();
