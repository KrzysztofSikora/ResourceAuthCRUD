/**
 * Created by krzysztof on 05.06.16.
 */

var db = require('../db');

var dataModel = db.model('dataModel', {

    fieldname: {type: String},
    originalname: {type: String},
    encoding: {type: String},
    mimetype: {type: String},
    destination: {type: String},
    filename: {type: String},
    path: {type: String},
    size: {type: String},



    owner: {type: String}, //zwalidować czy jest taki sam chuj przy projektowani modeul usera
    number: {type: String},
    category: {type: String},
    description: {type: String}

})


module.exports = dataModel;