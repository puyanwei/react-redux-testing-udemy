const User = require('../models/user');

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // Does email exist?
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) {
            return next(err);
        }
        // Yes => Return an Error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' }); // 422 is 'unprocessable entity'
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
};
