const Todos = require("../models/todo.model.js");
const validateRequest = require('../validator/todo.validator');

// Create and Save a new Todos
exports.create = async (req, res) => {
  try {
    const retrieveValidRequest = await validateRequest.create(req.body);

    // Create a Participant
    const participant = new Todos(retrieveValidRequest);

    // Insert Database
    await Todos.create(participant);
    res.status(200).send({status: "Success", message: "Success"})

  } catch (error) {
    res.status(200).send({status: "Bad Request",  message: error.message})
  }
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = async (req, res) => {
    try {
  
      // Insert Database
      if(req.query.activity_group_id) {
        const retrieveValidRequest = await validateRequest.updateByActivityGroupId(req.query);

        const retrieveListParticipants = await Todos.getTodoByIdActivity(retrieveValidRequest);
        res.status(200).send({status: "Success", message: "Success", data : retrieveListParticipants});

      }else {

        const retrieveListParticipants = await Todos.getAll();
        res.status(200).send({status: "Success", message: "Success", data : retrieveListParticipants});

      }
  
    } catch (error) {
      res.status(200).send({status: "Bad Request",  message: error.message})
    }
  };

  // Retrieve all Tutorials from the database (with condition).
exports.findOne = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.readById(req.params);

        // Create a Participant
        const participant = new Todos(retrieveValidRequest);
        let retrieveListParticipants = await Todos.findOne(participant);

        res.status(200).send({status: "Success", message: "Success", data : retrieveListParticipants});
  
    } catch (error) {
      res.status(200).send({status: "Bad Request",  message: error.message})
    }
  };

// Retrieve all Tutorials from the database (with condition).
exports.update = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.updateById({...req.params, ...req.body});

        // Create a Participant
        const participant = new Todos(retrieveValidRequest);
        await Todos.updateOne(participant);

        res.status(200).send({status: "Success", message: "Success"});
  
    } catch (error) {
      res.status(200).send({status: "Bad Request",  message: error.message})
    }
  };

  exports.deleteOne = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.readById(req.params);

        // Create a Participant
        const participant = new Todos(retrieveValidRequest);
        await Todos.deleteOne(participant);

        res.status(200).send({status: "Success", message: "Success"});
  
    } catch (error) {
      res.status(200).send({status: "Bad Request",  message: error.message})
    }
  };
