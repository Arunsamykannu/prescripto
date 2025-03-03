
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrpyt=require('bcrypt')

const {v2}=require('cloudinary');
const doctorModel = require('../models/doctorsModel');
const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/userModel');

const addDoctor=async(req,res)=>{

    try{

        const{name,email,password, speciality,degree,experience,about,available,fees,address }=req.body;
        const imageFile=req.file
       
        if(!name || !email || !password || !degree || !speciality || !experience || !fees || !address ||!about ){
            return res.json({success:false,message:"missing details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter the valid email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"please enter the strong password"})
        }
        const salt=await bcrpyt.genSalt(10)
        const hashedPassword=await bcrpyt.hash(password,salt)

        const imageuploader=await v2.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageURL=imageuploader.secure_url;

        const doctorsInfo={
            name,email,
            password:hashedPassword,
            image:imageURL,
            speciality,available,degree,experience,about,fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newDoctor=new doctorModel(doctorsInfo)
        await newDoctor.save();
        res.json({success:true,message:"doctor added"})




    }
    catch(err){
        res.json({success:false,message:err.message})

    }





}




const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token=jwt.sign(email+password,process.env.JWT_SECRET)
           
            return res.json({success:true,token:token})


        }
        else{
            return res.json({success:false,message:"invalid credentials"})
        }





    }catch(err){
        res.json({success:false,message:err.message})

    }
}


const allDoctors=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password');
        res.json({success:true,doctors})

    }catch(err){
        return res.json({success:false,message:err.message})

    }
}

const appointmentAdmin=async(req,res)=>{
    try{
        
        const appointments=await appointmentModel.find({})
        return res.json({success:true,appointments})

    }catch(err){
        return res.json({success:false,message:err.message})

    }
}
const appointmentCancel=async(req,res)=>{
    
    try{
        const {appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId)
       
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


const adminDashboard=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})
        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointment:appointments.reverse().slice(0,5)
        }
        return res.json({success:true,dashData})

    }catch(err){
        return res.json({success:false,message:err.message})


    }
}


module.exports={addDoctor,adminLogin,allDoctors,appointmentAdmin,appointmentCancel,adminDashboard}