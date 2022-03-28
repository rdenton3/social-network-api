const router = require('express').Router();

const {
    addThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction
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

// /api/thoughts/<thoughtId>/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)

module.exports = router;