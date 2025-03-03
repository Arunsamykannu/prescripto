const doctorModel = require("../models/doctorsModel")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const appointmentModel = require("../models/appointmentModel")

const changeAvailability=async(req,res)=>{
    try{

        const {docId}=req.body
        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
       return  res.json({success:true,message:"availability changed"})

    }catch(err){
        res.json({success:false,message:err.message})
    }
}

const doctorList=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})

    }catch(err){
        res.json({success:false,message:err.message})

    }
}

const loginDoctor=async(req,res)=>{
    try{
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:"invalid Crendentials"})
        }
        const isMatch =await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
           return res.json({success:true,token})
        }else{
            return res.json({success:false,message:"invalid Crendentials"})

        }
       
    }catch(err){
        res.json({success:false,message:err.message})

    }

}

const appointmentsDoctor=async(req,res)=>{
    try{
        const {docId}=req.body;
        const appointment=await appointmentModel.find({docId});
       return res.json({success:true,appointment})
    }catch(err){
        res.json({success:false,message:err.message})


    }
}


const  appointmentComplete=async(req,res)=>{
    try{
        const{docId,appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:"appointment completed"})

        }else{
            return res.json({success:false,message:"mark failed"})
        }


    }catch(err){
        res.json({success:false,message:err.message})


    }
}


const  appointmentCancel=async(req,res)=>{
    try{
        const{docId,appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:"appointment cancelled"})

        }else{
            return res.json({success:false,message:"cancellation failed"})
        }


    }catch(err){
        res.json({success:false,message:err.message})


    }
}


const doctorDashboard=async(req,res)=>{

    try{
        const {docId}=req.body;
        const appointment=await appointmentModel.find({docId})
        let earnings=0;
        appointment.map((val,index)=>{
            if(val.isCompleted || val.payment){
                earnings+=val.amount;
            }
        })
        let patients=[]
        appointment.map((val)=>{
            if(patients.includes(val.userId)){
                patients.push(val.userId)
            }
        })
        const dashData={
            earnings,
            appointments:appointment.length,
            patients:patients.length,
            latestappointment:appointment.reverse().slice(0,5)
        }
        return res.json({success:true,dashData})

    }catch(err){
        res.json({success:false,message:err.message})


    }
}


const doctorProfile=async(req,res)=>{
    try{
        const {docId}=req.body
        const profiledata=await doctorModel.findById(docId).select('-password')
        
        return res.json({success:true,profiledata})

    }catch(err){
        res.json({success:false,message:err.message})

    }
}

const updateDoctorProfile=async(req,res)=>{
    try{
        const {docId,fees,address,available}=req.body;
        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        return res.json({success:true,message:"profile updated"})

    }catch(err){
        res.json({success:false,message:err.message})

    }
}


module.exports={changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard,doctorProfile,updateDoctorProfile}