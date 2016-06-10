/**
 * Created by krzysztof on 10.06.16.
 */
var db = require('../db');

var imageModel = db.model('imageModel', {

    imgName: { type: String },
    imgNumber: { type: String },
    description:{ type: String }

})


module.exports = imageModel;