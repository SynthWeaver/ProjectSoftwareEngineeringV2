const userController = require('../controllers/userController.js');

//middleware to check if user is an admin.
const checkLogin = function (req, res, next) {
    //check if an user was logged in
    const userId = req.session.user;
    if(userId != null){
        next();
    }else{
        res.redirect('/login');
    }  
}

//middleware to check if user is an admin.
const checkAdmin = async function (req, res, next) {
    //check if an user was logged in
    const userId = req.session.user;
    if(userId != null){
        const user = await userController.findUserById(userId);
        if(user.admin){
            next();
        }else{
            res.redirect('back');
        }
    }else{
        res.redirect('/login');
    }  
}
// req.session.user 
// get current user route

module.exports = {
    checkLogin,
    checkAdmin,
};