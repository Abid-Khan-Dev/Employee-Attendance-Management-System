const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isAdmin, isNotAdmin} =  require('../../middlewares/index');


// for admin signup
router.get('/signup', isNotAdmin, (req, res) => {
    res.render('./admin/signup');
});
router.post('/signup', isNotAdmin, passport.authenticate('admin.signup', {
    successRedirect: '/admin',
    failureRedirect: '/admin/signup',
    successFlash: true,                 // Enable success messages
    failureFlash: true,                 // Enable failure messages
}));


// for admin login
router.get('/login', isNotAdmin, (req, res) => {
    res.render('./admin/login');
});

router.post('/login', isNotAdmin, passport.authenticate('admin.login', {
    successRedirect: '/admin',
    failureRedirect: '/admin/auth/login',
    successFlash: 'Login Successful',   // Success message
    failureFlash: 'Invalid email or password' // Failure message
}));

// for logout
router.post('/logout', isAdmin, (req, res)=>{
       req.logout((error)=>{
        if(error){
            console.log("error during logout:", error);
            req.flash('error', 'Error during logout');
            return res.redirect('/admin/auth');
        }
       });  
       req.flash('success', 'Logged out Successfully')
       return res.redirect('/admin/auth');
})



module.exports = router;