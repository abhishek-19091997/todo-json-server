const fs = require("fs/promises");

async function readTaskData() {
  const result = await fs.readFile("./posts.json", {
    encoding: "utf8",
  });

  const task = JSON.parse(result);

  return task;
}

async function writeTaskData(book) {
  const data = JSON.stringify(book, null, 2);

  await fs.writeFile("./posts.json", data);
}

async function getAllTask() {
  const task = await readTaskData();

  return task;
}

async function addTask(taskData) {
  let task = await readTaskData();
  let max = 0;

  task.forEach((task) => {
    if (max < task.id) {
      max = task.id;
    }
  });
  let newId = max + 1;
  const newTask = {
    ...taskData,
    id: newId,
  };
  books.push(newTask);
  writeTaskData(task);
  return newTask;
}
async function updateTaskDataById(id, taskData) {
  let task = await readTaskData();

  let index = -1;

  task.forEach((employee, i) => {
    if (id == employee.id) {
      index = i;
    }
  });

  if (index !== -1) {
    task[index] = {
      ...task[index],
      ...taskData,
    };

    await writeTaskData(task);

    return task[index];
  }
}

async function deleteTaskById(id) {
  let task = await readTaskData();

  let index = -1;

  task.forEach((task, i) => {
    if (id == task.id) {
      index = i;
    }
  });

  let deletedTaskDetails;
  if (index !== -1) {
    let result = books.splice(index, 1);

    await writeTaskData(books);

    if (result.length) {
      deletedTaskDetails = result[0];
    }
  }

  return deletedTaskDetails;
}

module.exports = {
  addTask,
  updateTaskDataById,
  getAllTask,
  deleteTaskById,
};
