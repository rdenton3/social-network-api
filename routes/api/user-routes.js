const router = require('express').Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
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

module.exports = router;