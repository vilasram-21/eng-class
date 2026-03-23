import User from '../models/UserSchema.js';
import bcrypt from 'bcrypt';
import sendEmail from '../services/emailSet.js';

export const RegisterUser=async(req,res)=>{
    try {
        const {name,email,phone,password}=req.body

        const userexist=await User.findOne({email:email})
        if(userexist)
        {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10)                 

        const createData=await User.create({
            name:name,
            email:email,
            phone:phone,
            password:hashedPassword
        })
        await sendEmail(email,"Welcome to Our Website",
            `<div>Welcometo social connect ${name}</div>`
        )

        res.status(201).json({
            success:true,
            message:"User created successfully",
            data:createData
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to create user"

        })
        
    }
}