var moment = require('moment');
var mongoose = require('mongoose');
var Entry = require('../model/visitor');
var mail = require('../api/mail');
var SMS = require('../api/sms');

exports.checkin = function(req,res){
	const time = moment().format('h:mm a');
	var entry = new Entry({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.gname,
        email: req.body.gemail,
        phone: req.body.gnum,
        checkin: time,
        host_name: req.body.hname,
        hostemail: req.body.hemail,
        hostphone: req.body.hnum,
        created_at : Date.now(),
        status : "CHECKEDIN"
    });
    entry.save(function (err,result) {
        if(err){
        	    res.status(500).json({
                success:false,
                message: 'Sorry! something happened, please try again'
            });
        }
        else
        {
            // function to send mail to host about visitor details
    		mail.send(entry.hostemail,entry.guestname,entry.guestemail,
    			entry.guestphone,entry.Checkin_time);

            //// function to send sms to host about visitor details
    		// SMS.send(entry.hostphone,entry.guestname,entry.guestemail,
    		// 	entry.guestphone,entry.Checkin_time);

        	res.status(200).json({
            success: true,
            message: 'Guest Checked In'
        });
		}
    });
};