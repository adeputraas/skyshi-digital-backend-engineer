const Activity = require("../models/activity.model.js");
const validateRequest = require('../validator/activity.validator');

// Create and Save a new Activity
exports.create = async (req, res) => {
  try {
    const retrieveValidRequest = await validateRequest.create(req.body);

    // Create a Participant
    const participant = new Activity(retrieveValidRequest);

    // Insert Database
    const response = await Activity.create(participant);

    // Retrieve Data
    const retrieveActivity = await Activity.findOne({id: response.insertId});
    
    res.status(200).send({status: "Success", message: "Success", data: retrieveActivity.length ? retrieveActivity[0] : {}})

  } catch (error) {
    res.status(200).send({status: "Bad Request",  message: error.message, data: {}})
  }
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = async (req, res) => {
    try {
      const retrieveListParticipants = await Activity.getAll();
      res.status(200).send({status: "Success", message: "Success", data : retrieveListParticipants});
  
    } catch (error) {
      res.status(200).send({status: "Bad Request",  message: error.message})
    }
  };

  // Retrieve all Tutorials from the database (with condition).
exports.findOne = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.readById(req.params);

        // Create a Participant
        const participant = new Activity(retrieveValidRequest);
        const retrieveActivity = await Activity.findOne(participant);
        
        if(retrieveActivity.length === 0) {
          throw { message: `Activity with ID ${participant.id} Not Found` }
        }

        res.status(200).send({status: "Success", message: "Success", data : retrieveActivity});
  
    } catch (error) {
      res.status(200).send({status: "Bad Request",  message: error.message, data: {}})
    }
  };

// Retrieve all Tutorials from the database (with condition).
exports.update = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.updateById({...req.params, ...req.body});

        // Create a Participant
        const participant = new Activity(retrieveValidRequest);
        await Activity.updateOne(participant);

        // Retrieve Data
        const retrieveActivity = await Activity.findOne({id: participant.id});

        res.status(200).send({status: "Success", message: "Success", data: retrieveActivity.length ? retrieveActivity[0] : {}})
  
    } catch (error) {
      res.status(200).send({status: "Bad Request",  message: error.message, data: {}})
    }
  };

  exports.deleteOne = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.readById(req.params);

        // Create a Participant
        const participant = new Activity(retrieveValidRequest);
        const response = await Activity.deleteOne(participant);
        
        if(!response.affectedRows) {
          throw { message: `Activity with ID ${participant.id} Not Found` }
        }

        res.status(200).send({status: "Success", message: "Success", data: {}});
  
    } catch (error) {
      res.status(200).send({status: "Bad Request",  message: error.message, data: {}})
    }
  };
