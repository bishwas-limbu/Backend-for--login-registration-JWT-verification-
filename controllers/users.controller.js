
import User from '../models/users.model.js';
import jwt from 'jsonwebtoken';


// Register
export const registerUser = async(req,res) => {
    console.log(req.body);
    try{
        const {name,email,password} = req.body;

        if(name && email && password){
            const currentUser = await User.findOne({email});
           
            if(currentUser){
                res.status(400).json({
                    status: false,
                    error: "User already registered",
                });

            } else{

                // BCRYPT for encryption of password
               // req.body.password = bcrypt;

                //const user = await User.create(req.body);
                const user = await new User(req.body);
                await user.save();

                res.status(200).json({
                    status: true,
                    data:user,
                    message: "User register successfully.",
                });

            }

        }
    } catch(error){
        res.status(400).json({
            status: false,
            error: error.message,// email: ValidatorError: Please Enter a valid email
        });
    }

};

// Login
export const loginUser = async(req,res) => {
   // console.log(req.body);
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        console.log(user);// provides user all data
        if(!user){
           return res.status(401).json({
            status: false,
            message: "Invalid email or password"
            });
        }else{
            const matchPassword = await user.matchPassword(password);
           // console.log(matchPassword);

            if(matchPassword){

                // JWT TOKEN CREATION (use for authorization)

                // 1.create jwt token
                const token  = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn: '1d'});
                console.log(token);

                // 2. store jwt token on our end 
                const updatedUser = await User.findOneAndUpdate(
                   {_id:user._id},// find  user by id
                   {$set:{jwt:token}}, // to change or update field value
                   {new: true}, // displays updatedUser value in terminal without it no display
                );
                console.log(updatedUser);

                // 3. return jwt token from our end
                return res.status(200).json({
                    status: true,
                    data: updatedUser.jwt,
                    message: "Login successfully"
                    });

            }else {
                return res.status(401).json({
                    status: false,
                    message: "Invalid email or password"
                    });
            }

        }

    } catch(error){
        res.status(400).json({
            status: false,
            error: error.message,// email: ValidatorError: Please Enter a valid email
        });
    }

};


// const {name} = req.body;
// users.push(name);

// res.status(200).json({
//     status: true,
//     data: users,
//     message: "User created successfully"
// });



//const users = ["HARI", "SHAYAM", "RAM"];
// export const updateUser = (req,res) => { //:id where id is dynamic can be 1,2,3,4 or any
//     console.log(req.params.id);
//     console.log(req.body.name);

//     const {id} = req.params;
//     const {name} = req.body;
    
//     users[id] = name;

//     res.status(200).json({
//         status: true,
//         users,
//         message: "User created successfully"
//     });
// };

// export const deleteUser = (req,res) => { //:id where id is dynamic can be 1,2,3,4 or any
//     console.log(req.params.userId);

//     const {userId} = req.params;
    
//     delete users[userId];// deleting username of certain number
    
//     res.status(200).json({
//         status: true,
//         users,
//         message: "User deleted successfully"
//     });
// };