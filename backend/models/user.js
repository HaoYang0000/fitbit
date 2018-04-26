var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  id: Number,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  first_name: String,
  last_name: String,
  age: Number,
  city: String,
  state: String,
  country: String,
  address: String,
  profile_image: {type: String}

});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
