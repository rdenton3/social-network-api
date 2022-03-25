const { User } = require('../models');

const userController = {
    // create new user
    createUser({body}, res) {
        User.create(body)
        .then(userData => res.json(userData))
    }
}
module.exports = userController;