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
        .populate({
            path: 'thoughts',
            select: '__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    // get user by id
    getUserById({params},res) {
        User.findOne({_id:params.id})
        .populate({
            path: 'thoughts',
            select: '__v'
        })
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
    },
    // add friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id:params.userId},
            {$push:{friends: params.friendId}},
            { new: true, runValidators: true }
        )
        .then(friendData => {
            if (!friendData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(friendData);
          })
          .catch(err => res.json(err));
    },
    // delete friend
    deleteFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            { new: true }
        )
        .then(userData => res.json(userData))
        .catch(err => res.json(err));
    }
}
module.exports = userController;