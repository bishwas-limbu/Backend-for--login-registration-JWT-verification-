import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';

const authMiddleware = async (req,res,next) => {
    //console.log(req.headers)
    //console.log(req.headers.authorization)
    try{
 
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            
            const token = req.headers.authorization.split(' ')[1];
            const tokenValidate = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const user = await User.findById({_id:tokenValidate.id});
            //console.log(user);
            req.user = user; // this line modifies 'request' to create a object "user" in request where user data in present to access in next function after middleware(authMiddleware)
            next();

        }else{
            return res.status(401).json({
                status:false,
                message: "Unauthorization user",
            });
        }
    } catch (error){
        return res.status(401).json({
            status:false,
            message: error.message,
        });
    }
}
export default authMiddleware;