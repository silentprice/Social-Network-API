const router = require('express').Router();
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);
router.use('/thoughts', thoughtRoutes);
module.exports = router;
