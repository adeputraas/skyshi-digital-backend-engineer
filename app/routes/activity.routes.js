module.exports = app => {
    const activity = require("../controllers/activity.controller.js");
  
    var router = require("express").Router();
  
    // Create a new activity's
    router.post("/activity-groups", activity.create);
  
    // Retrieve all activity's
    router.get("/activity-groups", activity.findAll);
  
    // Retrieve One activity's with id
    router.get("/activity-groups/:id", activity.findOne);
  
    // // Update a activity's with id
    router.patch("/activity-groups/:id", activity.update);
  
    // // Delete a activity's with id
    router.delete("/activity-groups/:id", activity.deleteOne);
  
    app.use('/', router);
  };
  