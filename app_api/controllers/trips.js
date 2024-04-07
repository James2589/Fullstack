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

module.exports = {
    tripsList,
    tripsFindByCode
};