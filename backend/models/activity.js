var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var activitySchema = mongoose.Schema({
    name: String,
    category: ['SPORT', 'OTHERS'],
    quantity	: Number,
    user_id: Number,
    intensity: Number,
    start_time: String,
    finish_time: String,
    user_id: Number,
    time: Date
});

// userSchema.methods.generateHash = function(password) {
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
//
// userSchema.methods.validPassword = function(password) {
// 	return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('Activity', activitySchema);
