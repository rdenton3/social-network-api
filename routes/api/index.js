const router = require('express').Router();

const userRoutes = require('./user-routes');
// const pizzaRoutes = require('./pizza-routes');

router.use('/users', userRoutes);
// router.use('/pizzas', pizzaRoutes);

module.exports = router;