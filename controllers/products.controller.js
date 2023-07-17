import Products from '../models/products.model.js'
// import authMiddleware from '../middlewares/auth.middleware.js';
// import { ObjectId } from 'mongoose';
// import User from '../models/users.model.js';


// READ
export const getProducts = async(req,res) => {
    try{
        //res.send('Get Products');

        //const products = await Products.find().populate('userId');
        const products = await Products.find().populate({
            path: 'userId',
            select: 'email  -_id', // if no need - must be given
        });

        if(products.length > 0 ){
            res.status(200).json({
                status: true,
                data: products,
                message: "Products fetched successfully",
            })
        } else {
            res.status(400).json({
                status: false,
                message: "No products found",
            })

        }

    } catch(err){
        console.log(err);
    }
};

export const getProductById = async(req,res) => {
    try{
        console.log("getProductById",req.params);
        const {prodid} = req.params;
        //const prodId = ObjectId(id);

        const product = await Products.findOne({_id: prodid});
        //const product = await Products.findByID(id);

        if(product){
            res.status(200).json({
                status:true,
                data: product,
                message: 'Product fetch successfully' 
            });
        }else{
            res.status(400).json({
                status:false,
                message: 'Product not found'
            });
        }
       // const product = await Products.findyId(id);

    }catch(err){
        console.log(err);
    }
}

// DELETE
export const deleteProductById = async(req,res) => {
    try{
        const {prodid} = req.params;
        //const prodId = ObjectId(id);

        const product = await Products.findOneAndDelete({_id: prodid});
        //const product = await Products.deleteOne(id);

        if(product){
            res.status(200).json({
                status:true,
                data: product,
                message: 'Product deleted successfully' 
            });
        }else{
            res.status(400).json({
                status:false,
                data: product,
                message: 'Product not found'
            });
        }
       // const product = await Products.findyId(id);

    }catch(err){
        console.log(err);
    }
}

// CREATE
export const postProducts = async(req,res) => {
    //console.log('from auth middleware',req.user);
   // console.log(req.body);
    try{
        // const prods =  await new Products(req.body);
        // await prods.save();
        req.body.userId = req.user._id; // inserting user id in when product created
        
       // const prods = await Products.create(req.body);
        const prods =  await new Products(req.body);
        await prods.save();
        res.status(200).json({
            status: true,
            data: prods,
            message: "Product created successfully",
        });
    }catch(err){
        console.log(err);
    }
};

// UPDATE
