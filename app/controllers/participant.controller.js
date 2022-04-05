const Participant = require("../models/participant.model.js");
const validateRequest = require('../validator/participant.validator');

// Create and Save a new Participant
exports.create = async (req, res) => {
  try {
    const retrieveValidRequest = await validateRequest.create(req.body);

    // Create a Participant
    const participant = new Participant(retrieveValidRequest);

    // Insert Database
    await Participant.create(participant);
    res.status(200).send({error: false,  response: 'Success Create Participants!'})

  } catch (error) {
      res.status(200).send({error: true,  response: error.message})
  }
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = async (req, res) => {
    try {
  
      // Insert Database
      const retrieveListParticipants = await Participant.getAll();
      res.status(200).send({error: false,  response: retrieveListParticipants})
  
    } catch (error) {
        res.status(200).send({error: true,  response: error.message})
    }
  };

  // Retrieve all Tutorials from the database (with condition).
exports.findOne = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.readById(req.params);

        // Create a Participant
        const participant = new Participant(retrieveValidRequest);
        let retrieveListParticipants = await Participant.findOne(participant);
        if(retrieveListParticipants.length){
            retrieveListParticipants = retrieveListParticipants.map((dataparticipant => {
              const intelegensi = ((((40/100) * dataparticipant.x) +  ((60/100) * dataparticipant.y)) / 2);
              const numerical = ((((30/100) * dataparticipant.z) +  ((70/100) * dataparticipant.w)) / 2);

              const rowIntel = intelegensi >= 0 && intelegensi <= 10 ? 1 : intelegensi >= 11 && intelegensi <= 20 ? 2 : intelegensi >= 21 && intelegensi <= 30 ? 3 : intelegensi >= 31 && intelegensi <= 40 ? 4 : 5;
              const rowNum = numerical >= 0 && numerical <= 10 ? 1 : numerical >= 11 && numerical <= 20 ? 2 : numerical >= 21 && numerical <= 30 ? 3 : numerical >= 31 && numerical <= 40 ? 4 : 5;
                return {
                    ...dataparticipant,
                    aspect: [{name: "Aspek Intelegensi", row: rowIntel}, {name: "Aspek Numerical Ability", row: rowNum}]
                    
                }
            }))
        }

        res.status(200).send({error: false,  response: retrieveListParticipants})
  
    } catch (error) {
        res.status(200).send({error: true,  response: error.message})
    }
  };

// Retrieve all Tutorials from the database (with condition).
exports.update = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.updateById({...req.params, ...req.body});

        // Create a Participant
        const participant = new Participant(retrieveValidRequest);
        await Participant.updateOne(participant);

        res.status(200).send({error: false,  response: 'Success Update Participants'})
  
    } catch (error) {
        res.status(200).send({error: true,  response: error.message})
    }
  };

  exports.deleteOne = async (req, res) => {
    try {
  
        const retrieveValidRequest = await validateRequest.readById(req.params);

        // Create a Participant
        const participant = new Participant(retrieveValidRequest);
        await Participant.deleteOne(participant);

        res.status(200).send({error: false,  response: 'Success Delete Participants!'})
  
    } catch (error) {
        res.status(200).send({error: true,  response: error.message})
    }
  };
