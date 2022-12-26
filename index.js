const express = require("express");
const fs = require("fs");

const app = express();
const {
  addTask,
  updateTaskDataById,
  getAllTask,
  deleteTaskById,
} = require("./task");

app.use(express.json());



//read
app.get("/", async (req, res) => {
  const task = await getAllTask();

  res.send({
    data: task,
  });

  console.log("Reponse has been sent");
});

//create
app.post("/create", async (req, res) => {
  const taskData = req.body;
  console.log(taskData);
  const task = await addTask(taskData);
  return res.send({
    data: task,
  });
});

//update
app.patch("/:postId", async (req, res) => {
  const postId = req.params.postId;

  const taskData = req.body;

  const task = await updateTaskDataById(Number(postId), taskData);

  return res.send({
    data: task,
  });
});

//delete
app.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);

  const task = await deleteTaskById(Number(postId));

  if (task) {
    return res.send({
      data: task,
    });
  } else {
    return res.status(404).send({
      message: "books with given id does not exist",
    });
  }
});

const port = Number(process.argv[2]) || 3005;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
