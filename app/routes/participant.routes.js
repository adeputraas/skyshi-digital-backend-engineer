module.exports = app => {
  const participants = require("../controllers/participant.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", participants.create);

  // Retrieve all Tutorials
  router.get("/", participants.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", participants.findOne);

  // // Update a Tutorial with id
  router.put("/:id", participants.update);

  // // Delete a Tutorial with id
  router.delete("/:id", participants.deleteOne);

  app.use('/api/participants', router);
};
