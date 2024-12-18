const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

// serialize and deserialize
passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    .populate('department')
    .populate('shift');
    done(null, user)
})


// Strategy for user signup
passport.use('user.signup', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            // check if user already
            const existUser = await User.findOne({ email });
            if (existUser) return done(null, false, { message: 'Email already in use' });
            const hashPassword = await bcrypt.hash(password, 10);

            // create a new user and save to database
            const user = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email,
                password: hashPassword
            });

            // Successful signup
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
));

// Strategy for user login
passport.use('user.login', new LocalStrategy({
    usernameField: 'email'
},
    async (email, password, done) => {
        try {

            // check if user dosn't exist
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'User not found' });

            // check if user is employee
            if (user.role !== 'employee') return done(null, false, { message: 'Access denied. Not an employee' });

            // check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Incorrect password' });

            // Successful login
            done(null, user);
            
        } catch (error) {
            done(error, false);
        };


    }));



 // Strategy for admin Signup
    passport.use('admin.signup', new LocalStrategy ({
        usernameField: 'email',
        passReqToCallback: true
    },
    async (req, email, password,done)=>{
        try {
            const existAdmin = await User.findOne({email});
            if(existAdmin) return done(null, false, {message:'email already in use'})

            const hashPassword = await bcrypt.hash(password, 10)
            const admin = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email,
                password: hashPassword,
                role: 'admin'
            })

            // Successful Signup
            done(null, admin);

        } catch (error) {
            done(error, false);
        }

    }))


    // Strategy for admin login
    passport.use('admin.login', new LocalStrategy ({
        usernameField: 'email'
    },
    async (email, password,done)=>{
        try {

            const admin = await User.findOne({email});
            if(!admin) return done(null, false, {message:'Admin not Found'})

            const isMath = await bcrypt.compare(password, admin.password)
            if(!isMath) return done(null, false, {message: 'Invalid password'})

            // Successful Login
            done(null, admin, {message: 'Login Successful'});

        } catch (error) {
            done(error, false)
        }

    }))
module.exports = passport;