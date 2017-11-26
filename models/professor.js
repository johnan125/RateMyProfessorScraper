var mongoose = require('mongoose');

var professorSchema = mongoose.Schema({

    name : {
        type: String,
        required: true
    },

    school: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    }

});


var Professor = module.exports = mongoose.model('Professor', professorSchema);