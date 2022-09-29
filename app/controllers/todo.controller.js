const Todos = require("../models/todo.model.js");
const validateRequest = require('../validator/todo.validator');

// Create and Save a new Todos
exports.create = async (req, res) => {
  try {
    const retrieveValidRequest = await validateRequest.create(req.body);

    // Create a Participant
    const participant = new Todos(retrieveValidRequest);

    // Insert Database
    const response = await Todos.create(participant);
    const retrieveListParticipants = await Todos.findOne({id: response.insertId});

    if(retrieveListParticipants.length > 0) {
      retrieveListParticipants[0].is_active = retrieveListParticipants[0].is_active ? true : false; 
    }

    res.status(201).send({status: "Success", message: "Success", data: retrieveListParticipants.length ? retrieveListParticipants[0] : {}});

  } catch (error) {
    res.status(400).send({status: "Bad Request",  message: error.message})
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

        if(retrieveListParticipants.length === 0) {
          throw { message: `Todo with ID ${participant.id} Not Found` }
        }else{
          retrieveListParticipants[0].is_active = retrieveListParticipants[0].is_active ? true : false; 
        }

        res.status(200).send({status: "Success", message: "Success", data : retrieveListParticipants.length ? retrieveListParticipants[0] : {}});
  
    } catch (error) {
      res.status(404).send({status: "Not Found",  message: error.message})
    }
  };

// Retrieve all Tutorials from the database (with condition).
exports.update = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.updateById({...req.params, ...req.body});

        // Create a Participant
        const participant = new Todos(retrieveValidRequest);
        const response = await Todos.updateOne(participant);
        if(!response.affectedRows) {
          throw { message: `Todo with ID ${participant.id} Not Found` }
        }

        const retrieveListParticipants = await Todos.findOne({id: retrieveValidRequest.id});

        if(retrieveListParticipants.length > 0) {
          retrieveListParticipants[0].is_active = retrieveListParticipants[0].is_active ? true : false; 
        }

        res.status(200).send({status: "Success", message: "Success", data: retrieveListParticipants.length ? retrieveListParticipants[0] : {}});
  
    } catch (error) {
      res.status(404).send({status: "Not Found",  message: error.message})
    }
  };

  exports.deleteOne = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.readById(req.params);

        // Create a Participant
        const participant = new Todos(retrieveValidRequest);
        const response = await Todos.deleteOne(participant);
        if(!response.affectedRows) {
          throw { message: `Todo with ID ${participant.id} Not Found` }
        }

        res.status(200).send({status: "Success", message: "Success", data: {}});
  
    } catch (error) {
      res.status(404).send({status: "Not Found",  message: error.message})
    }
  };
