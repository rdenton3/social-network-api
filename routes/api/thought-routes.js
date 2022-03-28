const router = require('express').Router();

const {
    addThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller')

// /api/thoughts/<userId>
router.route('/:userId').post(addThought)

// /api/thoughts/
router.route('/').get(getAllThoughts)

// /api/thoughts/<thoughtId>
router.route('/:thoughtId')
.get(getThoughtById)
.delete(deleteThought)
.put(updateThought)
module.exports = router;