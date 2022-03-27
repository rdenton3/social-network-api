const { Thought, User } = require('../models');

const thoughtController = {
    // create new thought
    addThought({params, body}, res) {
        console.log(body)
        Thought.create(body)
        .then(({_id})=> {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
        })
        .then(userData => {
            if (!userData){
                res.status(404).json({message: "No user found with this ID!"})
                return;
            }
            res.json(userData)
        })
        .catch(err => res.json(err))
    },
    // get all thoughts
    getAllThoughts(req,res) {
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

}
module.exports = thoughtController;