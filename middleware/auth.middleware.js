
module.exports = {
    checkAuthentication: function (req, res, next){
        if(req.isAuthenticated()){
            //req.isAuthenticated() will return true if user is logged in
            next();
        } else{
            res.redirect("user/login");
        }
    },
    checkIsAdmin: function (req, res, next){
        if(req.isAuthenticated() && req.user.isisAdmin){
            next();
        } else{
            res.send("Không có quyền truy cập ! thêm isAdmin = true trong db để test nhá @@");
        }
    }
}