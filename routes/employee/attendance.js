const express = require('express');
const router = express.Router();
const Attendance = require('../../models/Attendance');
const Location = require('../../models/Location');

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        const d = new Date();
        d.setHours(0,0,0,0);
        // console.log(d);
        
        // This query will search logged-in user with current date for check-in and check-out when user clicks on the check-in and check-out, this will help us to disabled btns after submitted the forms
        const attendance = await Attendance.findOne({
            $and:
                [{ employeeId: req.user.id }, { date: d  }]
        });

        res.render('./employee/attendance', {
            locations,
            attendance
        });
    } catch (error) {
        req.flash('error', 'Failed to load Mark Attendance!, Please try later.')
        return res.redirect('/dashboard');
    }
});

router.post('/checkin', async (req, res) => {
    try {
        // console.log(req.body);
        const { employeeId, message, location } = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // console.log(today)

        const attendance = await Attendance.findOne({ employeeId, date: today });
        if (attendance) {
            req.flash('error', 'Already checked in today.');
            return res.redirect('/dashboard/attendance');
        }
        // console.log(attendance)
        await Attendance.create({
            employeeId,
            message,
            location,
            date: today,
            checkIn: new Date(),
        })

        // console.log(attendance);

        req.flash('success', 'Check-in Successful!')
        return res.redirect('/dashboard/attendance');

    } catch (error) {
        req.flash('error', 'Failed to Mark Attendance!, Please try later.')
        return res.redirect('/dashboard/attendance');
    }
});


router.post('/checkout', async (req, res) => {
    try {
        // console.log(req.body);
        const { employeeId } = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // console.log(today)

        const attendance = await Attendance.findOne({ employeeId, date: today });

        if (!attendance || !attendance.checkIn) {
            req.flash('error', 'Check-in first before checking out.');
            return res.redirect('/dashboard/attendance');
        }
        if (attendance.checkOut) {
            req.flash('error', 'Already checked out today.');
            return res.redirect('/dashboard/attendance');
        }
        attendance.checkOut = new Date();

        // it stores in hours like 8
        const totalHours = (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);
        // console.log(totalHours);

        attendance.totalHours = totalHours;
        await attendance.save();

        req.flash('success', 'Check-out Successful!')
        return res.redirect('/dashboard/attendance');

    } catch (error) {
        req.flash('error', 'Failed to check-out!, Please try later.')
        return res.redirect('/dashboard');
    }
});
module.exports = router;