const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
    email: { type: String, lowercase: true, unique: true },
    password: String
});

// On save hook, encrypt password
userSchema.pre('save', function(next) {
    // Generate a salt then run callback
    const user = this;
    // Generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // Encrypt our password using salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            // Overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export our model
module.exports = ModelClass;
