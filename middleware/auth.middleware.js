
module.exports = {
    checkAuthentication: function (req, res, next){
        console.log(req.user)
        if(req.isAuthenticated()){
            console.log(req.user)
            //req.isAuthenticated() will return true if user is logged in
            next();
        } else{
            res.redirect("user/login");
        }
    },
    checkIsAdmin: function (req, res, next){
        if(req.isAuthenticated() && req.user.isAdmin){
            next();
        } else{
            res.render("errHandle/403Err.ejs");
        }
    }
}