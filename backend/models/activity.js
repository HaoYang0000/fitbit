var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var activitySchema = mongoose.Schema({
    name		: String,
    level	: Number,
    time: {type: Date, default:Date.now}
});

// userSchema.methods.generateHash = function(password) {
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
//
// userSchema.methods.validPassword = function(password) {
// 	return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('Activity', activitySchema);
