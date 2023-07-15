import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title:{
        type: String,
        minLength: 5,
        maLength: 10,
    },
    price:{
        type: Number,
        min: 500,
        max: 10000,
    },
    description:{
        type: String,
    },
    category:{
        type:String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users', //Users collection
    },
},{
    timestamps: true,
})

const product = mongoose.model('Products',productSchema);

export default product;