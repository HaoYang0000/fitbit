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

    return router;
}

function isLoggedIn(req, res, next) {
    // if (req.isAuthenticated()) {
    //     return next();
    // }
    // return res.status(401).json({ message: "unable to auth" });
}
