const router = require('express').Router();

const userRoutes = require('./api/userRoutes');
const userDetailRoutes = require('./api/userDetailRoutes');
const workoutRoutes = require('./api/workoutRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api/users', userRoutes);
router.use('/api/userdetails', userDetailRoutes);
router.use('/api/workouts', workoutRoutes);

module.exports = router;