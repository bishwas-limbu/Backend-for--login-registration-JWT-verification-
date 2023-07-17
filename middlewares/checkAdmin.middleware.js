


import User from '../models/users.model.js';

const checkAdmin = async (req,res,next) => {
 console.log('checkAdmin ',req.user);
 if(!req.user.isAdmin){ // not false
    return res.status(401).json({
        status: false,
        message: "Unauthroized user",
    })
 }
 next();
}
export default checkAdmin;