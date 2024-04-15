const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

//Get list of all trips
//No matter the outcome, must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) //No filter, return all records
        .exec();

    if(!q){ //Database returned no data
        return res
                .status(404)
                .json(err);
    } else { //Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) //No filter, return all records
        .exec();
 
    if(!q){ //Database returned no data
        return res
                .status(404)
                .json(err);
    } else { //Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

//POST: /trips -ADDS a new Trip
    //Regardless of outcome, response must inlcude HTML status code
    //and JSON message to teh requesting client
    const tripsAddTrip = async(req, res) => {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const q = await newTrip.save();

           if(!q){
            //database returned no data
            return res
               .status(400)
               .json(err);
           }else{
            return res
               .status(201)
               .json(q);
           }
    };

    // PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
      // Uncomment for debugging
      console.log(req.params);
      console.log(req.body);
      const q = await Model
        .findOneAndUpdate(
    {'code': req.params.tripCode },
          {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
          }
        )
    .exec();
       
    if(!q)
    { // Database returned no data
          return res
    .status(400)
            .json(err);
    } else { // Return resulting updated trip
          return res
    .status(201)
            .json(q);
        }  
           
        // Uncomment the following line to show results of operation
        // on the console
        // console.log(q);
    };

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};