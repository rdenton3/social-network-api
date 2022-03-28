const router = require('express').Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    addFriend
  } = require('../../controllers/user-controller');

  // /api/users
router
.route('/')
.post(createUser)
.get(getAllUsers)

  // /api/users/:id
  router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

  // /api/users/:userId/friends/friendId
  router
  .route('/:userId/friends/:friendId')
  .post(addFriend)

module.exports = router;