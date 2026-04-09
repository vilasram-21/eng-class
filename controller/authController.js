import User from '../models/UserSchema.js';
import bcrypt from 'bcrypt';
import sendEmail from '../services/emailSet.js';
import jwt from 'jsonwebtoken';

const SECRETKEY=process.env.SECRETKEY

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
export const LoginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const userExist=await User.findOne({email:email})
        if(!userExist)
        {
            return res.status(400).json({
                success:false,
                message:"User not found with this email"
            })
        }
        const  ispasswordmatch=await bcrypt.compare(password,userExist.password)
        if(!ispasswordmatch){
        return res.status(400).json({
            success:false,
            message:"Invalid password"
        })}
        const token=jwt.sign({id:userExist._id,name:userExist.name},SECRETKEY,{expiresIn:'7d'})

        //response.cookie(name,value,{options})
          res.cookie("mycookie",token,{
            httpOnly:true,  
            secure:false,
            sameSite:'lax',
            maxAge:7*24*60*60*1000 
          })



            res.status(200).json({
                success:true,
                message:"Login successful",
                token:token
            })

           
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"Failed to login"
        })
        
    }
}