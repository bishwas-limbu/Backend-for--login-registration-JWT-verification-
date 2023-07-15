import mongoose from 'mongoose';
import pkg from 'validator'; 
import bcrypt from 'bcrypt'; // for encryption of password

const {isEmail} = pkg; //email validator

const addressSchema = {
    street: String,
    city: String,
    postalCode: Number,
}
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true,"Name is a required field"],
        minLength: [3,"Minimum length should be 3 characters"],
        maxLength: [30,"Maximum length should be 3 characters"],
    },
    email:{
        type: String,
        required: [true,"Email is a required field"],
        unique: [true,"Email should be unique"],
        lowercase: true,
        validate: [isEmail,'Please Enter a valid email'],
    },
    password: {
        type: String,
        required: [true,"Password is a required field"],
        minLength: [8,"Maximum length should be 8 characters"],
        maxLength: [15,"Maximum length should be 15 characters"],      
    },
    jwt:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },

    address: addressSchema,
},{
    timestamps: true,
})

// for encryption of password
// pre is mongoose middleware
userSchema.pre('save', async function(next){
    console.log(this);
    /* output
        {
            name: 'tree',
            email: 'bisarv@gmail.com',
            password: 'home12345',
            _id: new ObjectId("64b1b6a26ed4abeaabfe3db0"),
            createdAt: 2023-07-14T20:57:06.634Z,
            updatedAt: 2023-07-14T20:57:06.634Z
        }

    */
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
// userSchema.post('save', function(next){
    
// })

// matching entered password with database password
userSchema.methods.matchPassword = async function(pass){
    return bcrypt.compare(pass,this.password);
}

const User = mongoose.model("Users",userSchema); // creates "Users" collection with userSchema

export default User;
