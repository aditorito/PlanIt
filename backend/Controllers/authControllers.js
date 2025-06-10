const { JWT_SECRET } = require('../config');
const { User } = require('../db');
const jwt = require("jsonwebtoken");
const { signupBody, signinBody } = require('../types')

exports.signup = async (req, res) => {
    try {
        const payload = req.body;
        const { success } = signupBody.safeParse(payload);
        if (!success) {
            return res.status(411).json({
                msg:"Wrong Input"
            })
        }

        const existingUser = await User.findOne({
            username:payload.username
        });

        if (existingUser) {
            return res.status(411).json({
                msg:"User already exist"
            })            
        }

        const user = await User.create({
            username:payload.username,
            email:payload.email,
            password:payload.password
        })
        const userId = user._id;

        const token = jwt.sign({userId}, JWT_SECRET);
        
        res.json({
            message:"User is created successfully",
            token: token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(411).json({
            msg:"Somthing wrong haved with server"
        })
        
        
    }

}