/**
 * Created by krzysztof on 05.06.16.
 */

var db = require('../db');

var dataModel = db.model('dataModel', {
    
    owner: { type: String }, //zwalidować czy jest taki sam chuj przy projektowani modeul usera
    number: { type: String },
    category: { type: String },
    message:{ type: String }
    
})


module.exports = dataModel;