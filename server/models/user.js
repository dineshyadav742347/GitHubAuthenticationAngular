var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
      gitId: String,
      gitProfile: String
});

module.exports = mongoose.model('User',userSchema);
