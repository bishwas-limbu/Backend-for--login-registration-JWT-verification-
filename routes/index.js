import express from 'express';
import userRouter from './users.route.js'; // for users
import homeRouter from './home.route.js'; // for "/"
import productsRouter from './products.route.js'; // for products

const router = express.Router();// express method for router

// Routing
router.use(homeRouter);// route for "/"

router.use('/users',userRouter); // route for user

router.use('/products',productsRouter);// route for products




// router.get('/htmlRender',(req,res) => {
//     const users = ["HARI", "SHAYAM", "RAM"];

//     res.render('index',{users});// to render html file in response 
// });



export default router;