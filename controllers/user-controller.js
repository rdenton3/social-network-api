const { User } = require('../models');

const userController = {
    // create new user
    createUser({body}, res) {
        User.create(body)
        .then(userData => res.json(userData))
    },
    // get all users
    getAllUsers(req,res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    // get user by id
    getUserById({params},res) {
        User.findOne({_id:params.id})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    // update user by ID
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id:params.id},body, {new: true, runValidators:true})
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: "No user found with this ID!"})
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err))
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id:params.id})
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: "No user found with this ID!"})
                return
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err))
    }
}
module.exports = userController;