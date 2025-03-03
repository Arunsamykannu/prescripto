const jwt=require('jsonwebtoken')



const authDoctor=async(req,res,next)=>{

    try{
        const {dtoken}=req.headers;
        if(!dtoken){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode=await jwt.verify(dtoken,process.env.JWT_SECRET)
        req.body.docId=token_decode.id
    
       
        next()

    }catch(err){
        res.json({success:false,message:err.message})
    }



}
module.exports=authDoctor