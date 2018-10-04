const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
    email: { type: String, lowercase: true, unique: true },
    password: String
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export our model
module.exports = ModelClass;
