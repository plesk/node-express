const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String },
}, { collection: 'users' });

// create a model
const UserModel = mongoose.model('user', UserSchema);

// Export the model 
module.exports = UserModel;