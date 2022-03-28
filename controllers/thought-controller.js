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
    // get thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
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
    },
    // update thought by id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            // ask why this doesn't work??
            // {$push: {thoughtText: body}},
            body,
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(thoughtData);
          })
          .catch(err => res.json(err));
    },
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id:params.thoughtId})
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: "No thought found with this ID!"})
                return
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err))
    }


}
module.exports = thoughtController;