const express = require('express');
const router = express.Router();
const { isAdmin } = require('../../middlewares/index');

// Importing individual route files
const auth = require('./auth');
const dashboard = require('./dashboard');
const employees = require('./employee');
const shifts = require('./shift');
const report = require('./report');
const location = require('./location');
const departments = require('./department');

// Associating base paths with route files
router.use('/auth', auth);
router.use('/', isAdmin, dashboard);
router.use('/employees', isAdmin, employees);
router.use('/shifts', isAdmin, shifts);   
router.use('/reports', isAdmin, report);
router.use('/locations', isAdmin, location);
router.use('/departments', isAdmin, departments);

// Exporting the router to be used in the routes/index file
module.exports = router;
