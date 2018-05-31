var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  user_id:Number,
  first_name: String,
  last_name: String,
  name: String,
  age: Number,
  health_level: String,
  city: String,
  state: String,
  country: String,
  address: String,
  client_id: String,
  token: String,
  profile_image: {type: String}
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
