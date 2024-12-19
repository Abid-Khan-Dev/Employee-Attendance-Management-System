const express = require('express');
const router = express.Router();
const middleware = require('../../middlewares/index');


// This will help us to redirect to dashboard or redirect or login page if user visits '/'
router.get('/', (req, res, next) => {
    if(middleware.isLoggedIn){
        return res.redirect('/dashboard');
    }else{
        return res.redirect('/auth/login');
    }
});

// it run when any route is hit
router.use(middleware.addEmployeeToLocals);


// importing individual route files
const auth = require('./auth')
const dashboard = require('./dashboard')
const attendance = require('./attendance')
const report = require('./report')
const leave = require('./leave')


// Associating base paths with route files and setting middlewares
router.use('/auth', auth);
router.use('/dashboard', middleware.isLoggedIn, dashboard);
router.use('/dashboard/attendance', middleware.isLoggedIn, attendance);
router.use('/dashboard/report', middleware.isLoggedIn, report);
router.use('/dashboard/leave', middleware.isLoggedIn, leave);

module.exports = router;