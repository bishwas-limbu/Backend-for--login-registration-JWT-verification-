import express from 'express';
//import {createUser, updateUser, deleteUser} from '../controllers/users.controller.js';
import {registerUser,loginUser} from '../controllers/users.controller.js';

const router = express.Router();// express method for router



// router.get('/new',(req,res) => {
//     const users = ["HARI", "SHAYAM", "RAM"];
    
//     users.push("BISHWAS");

//     res.status(200).json({
//         status: true,
//         data: users,
//         message : "User fetched successfully.",

//     });
// });

// READ
// router.get('/',(req,res) => {
    
//     res.status(200).json({
//         status: true,
//         message : "User fetched successfully.",

//     });
// });


//CREATE
router.post('/register',registerUser); 

router.post('/login',loginUser);

//UPDATE
//router.patch('/:id',updateUser);

//DELETE
//router.delete('/:userId',deleteUser);

export default router;
