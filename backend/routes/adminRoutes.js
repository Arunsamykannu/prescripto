const express=require('express')
const {addDoctor,adminLogin, allDoctors, appointmentAdmin, appointmentCancel, adminDashboard}=require('../controllers/adminController')
const upload=require('../middlewares/multer');
const authAdmin = require('../middlewares/authAdmin');
const { changeAvailability } = require('../controllers/doctorController');


const adminRouter=express.Router();


adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)


adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)



module.exports=adminRouter