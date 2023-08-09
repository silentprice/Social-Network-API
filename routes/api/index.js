const router = require('express').Router();

const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');
const userRoutes = require('./userRoutes'); 
const newUserRoutes = require('./newUserRoutes'); 

router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);
router.use('/users', userRoutes);
router.use('/newUser', newUserRoutes);
module.exports = router;
