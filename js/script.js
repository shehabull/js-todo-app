let form = document.querySelector("#form");
let newTask = document.querySelector("#new-task");
let items = document.querySelector(".items");
let completedTask = document.querySelector(".completed-items");

// functions

const addTask = (event) => {
  event.preventDefault();
  const d = new Date();
  const id = d.getTime();
  const title = newTask.value;
  const items = [];
  const item = { id: id, title: title, status: "incomplete" };

  if (localStorage.getItem("tasks") == null) {
    items.push(item);
    localStorage.setItem("tasks", JSON.stringify(items));
  } else {
    const localStorageItem = localStorage.getItem("tasks");
    const newTasks = JSON.parse(localStorageItem);
    newTasks.push(item);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
  createTask();
  newTask.value = "";
};

const createTask = (event) => {
  const localStorageItem = JSON.parse(localStorage.getItem("tasks")) || [];
  let lists = "";
  localStorageItem.map((item) => {
    if (item.status == "incomplete") {
      lists += ` <li class="list-group-item">
      <div class="group d-flex align-items-center justify-content-between">
                    <div class="form-check">
                        <input class="form-check-input" onChange="changeStatus(this)" type="checkbox" value="" id=${item.id}>
                        <label class="form-check-label" for=${item.id}>
                            ${item.title}
                        </label>
                    </div>

                    <div class="icons">
                        <i class="bi bi-pencil" onClick="editTitle(this, ${item.id})"></i>
                    </div>
                    </div>

                    <div class="d-none input-group"> 
                        <input type="text" class="form-control" value="${item.title}">
                        <button class="btn btn-primary" onClick="editTask(this, ${item.id})">Save</button>
                    </div>
                </li>
        `;
    } else {
      inCompletedTask();
    }
  });
  items.innerHTML = lists;
  newTask.value = "";
};

const changeStatus = (e) => {
  const id = e.id;
  const status = e.checked ? "completed" : "incomplete";
  const localStorageItem = JSON.parse(localStorage.getItem("tasks")) || [];

  let selectedItem = localStorageItem.filter((item) => {
    return item.id == id;
  });

  let updatedItem = { ...selectedItem[0] };

  updatedItem.status = status;

  console.log(updatedItem);

  let findIndex = localStorageItem.findIndex((item) => item.id == id);
  localStorageItem.splice(findIndex, 1, updatedItem);

  localStorage.setItem("tasks", JSON.stringify(localStorageItem));

  createTask();
};

const inCompletedTask = () => {
  const localStorageItem = JSON.parse(localStorage.getItem("tasks")) || [];
  let lists = "";
  localStorageItem.map((item) => {
    if (item.status == "completed") {
      lists += ` <li class="list-group-item d-flex align-items-center justify-content-between">
   
                    <div class="form-check">
                        <input class="form-check-input" checked type="checkbox" value="" id=${item.id} disabled="disabled">
                        <label class="form-check-label" for=${item.id}>
                            ${item.title}
                        </label>
                    </div>

                    <div class="icons">
                        <i class="bi bi-trash text-danger"  onClick="deleteItem(${item.id})"></i>
                    </div>

                </li>
        `;
    }
  });
  completedTask.innerHTML = lists;
};

const deleteItem = (id) => {
  const localStorageItem = JSON.parse(localStorage.getItem("tasks")) || [];

  let selectedItem = localStorageItem.filter((item) => {
    return item.id == id;
  });

  let updatedItem = { ...selectedItem[0] };

  let findIndex = localStorageItem.findIndex((item) => item.id == id);
  localStorageItem.splice(findIndex, 1);

  localStorage.setItem("tasks", JSON.stringify(localStorageItem));

  inCompletedTask();
};

//

const editTitle = (element, id) => {
  const divParent = element.closest(".group");
  divParent.style.setProperty("display", "none", "important");
  divParent.nextElementSibling.style.setProperty(
    "display",
    "flex",
    "important"
  );
};

const editTask = (element, id) => {
  const title = element.previousElementSibling.value;

  const localStorageItem = JSON.parse(localStorage.getItem("tasks")) || [];

  let selectedItem = localStorageItem.filter((item) => {
    return item.id == id;
  });

  let updatedItem = { ...selectedItem[0] };

  updatedItem.title = title;

  let findIndex = localStorageItem.findIndex((item) => item.id == id);
  localStorageItem.splice(findIndex, 1, updatedItem);

  localStorage.setItem("tasks", JSON.stringify(localStorageItem));

  element.previousElementSibling.value = "";
  createTask();
};

form.addEventListener("submit", addTask);
createTask();
