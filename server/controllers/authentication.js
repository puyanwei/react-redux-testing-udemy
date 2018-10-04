const User = require('../models/user');

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // Both fields must have an entry to be valid
    if (!email || !password) {
        return errorStatus('You must provide email and password');
    }

    // Does email exist?
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) {
            return next(err);
        }
        // Yes => Return an Error
        if (existingUser) {
            return errorStatus('Email is in use');
        }
        // No => Create and save user record
        const user = new User({
            email: email,
            password: password
        });
        user.save(function(err) {
            if (err) {
                return next(err);
            }
        });
        // Respond with success message
        res.json({ success: true });
    });

    function errorStatus(message) {
        res.status(422).send({ error: message }); // 422 is 'unprocessable entity'
    }
};
