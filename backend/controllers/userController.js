const validator=require('validator')
const bcrypt=require('bcrypt');
const userModel = require('../models/userModel');
const jwt=require('jsonwebtoken');
const doctorModel = require('../models/doctorsModel');
const appointmentModel = require('../models/appointmentModel');
const cloudinary=require('cloudinary').v2
const razorPay=require('razorpay')

const registerUser=async(req,res)=>{

    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"missing details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"invalid email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"enter a strong password"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)


        const userData={
            name,email,password:hashedPassword
        }
        const newUser=new userModel(userData)
       const user=await newUser.save()
       const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

       return res.json({success:true,token})

    }catch(err){
        return res.json({success:false,message:err.message})

    }

}

const loginUser=async(req,res)=>{
    try{


        const {email,password}=req.body;

        const user=await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"user does'nt exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=await jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
        }
        else{
            return res.json({success:false,message:"invalid credentials"})
        }
       

    }catch(err){
        return res.json({success:false,message:err.message})

    }
}

const getProfile=async(req,res)=>{
    try{

        const {userId}=req.body
        
        const userData=await userModel.findById(userId).select('-password')
       
        return res.json({success:true,userData})

    }catch(err){
        return res.json({success:true,message:err.message})


    }
}

const updateProfile=async(req,res)=>{
    try{
        const {userId,name,phone, address,dob,gender}=req.body
    
        const imageFile=req.file;
        if(!name ||!phone  || !dob || !gender){
            return res.json({success:false,message:"data missing"})
        }
        const userData=await userModel.findByIdAndUpdate(userId,{name,phone ,dob,gender,address:JSON.parse(address)})
    
        if(imageFile){
            const uploadImage=cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl=(await uploadImage).secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
            
        }
        return res.json({success:true,message:"profile updated"})

    }catch(err){
        return res.json({success:false,message:err.message})

    }
}


const bookAppointment=async(req,res)=>{
    try{
        const {userId,docId,slotDate,slotTime}=req.body
        const docData=await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success:false,message:"doctor not available"})
        }
        let slots_booked=docData.slots_booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"slot not Available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }
        const userData=await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData={
            userId,docId,userData,docData,amount:docData.fees,slotDate,slotTime,date:Date.now()
        }
        const appointment=new appointmentModel(appointmentData)
        await appointment.save()
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        return res.json({success:true,message:"appointment booked"})

    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const listAppointment=async(req,res)=>{
    try{
        const {userId}=req.body;
       
        const appointment=await appointmentModel.find({userId})
       
        res.json({success:true,appointment})

    }catch(err){
        return res.json({success:false,message:err.message})

    }
}


const cancelAppointment=async(req,res)=>{
    
    try{
        const {userId,appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(userId!==appointmentData.userId){
            return res.json({success:false,message:"unauthorized action"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        const {docId,slotDate,slotTime}=appointmentData;
        const doctorData=await doctorModel.findById(docId);
        const slots_booked=doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>{return e!==slotTime})
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        return res.json({success:true,message:"appointment Cancelled"})

    }catch(err){
        return res.json({success:false,message:err.message})

    }
}

module.exports={registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment};