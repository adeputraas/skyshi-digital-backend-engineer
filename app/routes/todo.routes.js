module.exports = app => {
  const todo = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Todo's
  router.post("/todo-items", todo.create);

  // Retrieve all Todo's
  router.get("/todo-items", todo.findAll);

  // Retrieve One Todo's with id
  router.get("/todo-items/:id", todo.findOne);

  // // Update a Todo's with id
  router.patch("/todo-items/:id", todo.update);

  // // Delete a Todo's with id
  router.delete("/todo-items/:id", todo.deleteOne);

  app.use('/', router);
};
