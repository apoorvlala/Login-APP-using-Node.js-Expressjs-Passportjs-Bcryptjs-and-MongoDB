// const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/demo');
// module.exports.CON=mongoose;


var mongo=require('mongodb');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/loginapp',{ useNewUrlParser: true } );
//var con=mongoose.connection;
module.exports.CON=mongoose;
