import jwt from "jsonwebtoken"


const SECRETKEY=process.env.SECRETKEY


  const authUser=(req,res,next)=>{
    try {
        const token=req.cookies.mycookie
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token required"
            })
        }
        const decoded=jwt.verify(token,SECRETKEY)
        req.user=decoded
        next()
    } catch (error) {
        
        res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }
}
export default authUser
