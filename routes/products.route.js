import express from 'express';
import {getProducts,postProducts,getProductById,deleteProductById} from '../controllers/products.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
//import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();// express method for router

router.get('/',authMiddleware,getProducts);

router.get('/:prodid',getProductById);

router.delete('/:prodid',deleteProductById);

router.post('/',authMiddleware,postProducts);



export default router;