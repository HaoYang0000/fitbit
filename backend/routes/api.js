var User = require('../models/user');
var Activity = require('../models/activity');

module.exports = function(router) {

    router.post('/register',
        function(req, res) {
            res.status(200).json({ user: req.user.email
        });
    });

    router.post('/login',
       function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user.email
        });
    });

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            res.status(200).json({ user: req.user, message: "Welcome!"
        });
    });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });

    //Create new activity
    router.post('/create_new_activity',
        function(req, res) {
          for (var i = 0; i < 100; i++) {
            var newActivity = new Activity();
                newActivity.name = req.body.name;
                newActivity.category = req.body.category;
                newActivity.quantity = req.body.quantity - Math.floor(Math.random() * 20);
                newActivity.user_id = req.body.user_id;
                var date = new Date();
                date.setDate(date.getDate() - i);
                newActivity.time = date;
                newActivity.save();
          }
            // var newActivity = new Activity();
            //     newActivity.name = req.body.name;
            //     newActivity.category = req.body.category;
            //     newActivity.quantity = req.body.quantity;
            //     newActivity.user_id = req.body.user_id;
            //     newActivity.time = new Date();
            //     newActivity.save();
                res.status(200).json({ name:newActivity.name,category:newActivity.category, quantity: newActivity.quantity, user_id: newActivity.user_id,_id: newActivity._id, message: "Welcome!"
            });
    });

    //Get Stories of certain user
    router.get('/get_activities/:id', function(req, res){
        Activity.find({"user_id":req.params.id}, function(err, activities) {
            if(err) {
                res.status(500).send({
                message: err,
                activities: []
            });
            } else {
                res.status(200).send({
                    message: 'OK',
                    activities: activities
                });
            }
        }).sort({name:1,time: 1});

    });

    router.post('/delete_activity',function(req, res){
        Activity.findOne({"_id":req.body.id}, function(err, activity) {
            if(err) {
                res.status(500).send({
                message: err,
                data: []
            });
            } else {
                activity.remove();
                 res.status(200).json({  message: "Welcome!"
                });
            }
        });
    });


    return router;
}

function isLoggedIn(req, res, next) {
    // if (req.isAuthenticated()) {
    //     return next();
    // }
    // return res.status(401).json({ message: "unable to auth" });
}
