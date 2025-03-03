const jwt=require('jsonwebtoken')



const authUser=async(req,res,next)=>{

    try{
        const {token}=req.headers;
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode=await jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id
    
       
        next()

    }catch(err){
        res.json({success:false,message:err.message})
    }



}
module.exports=authUser