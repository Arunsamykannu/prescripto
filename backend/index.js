const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv').config()
const app=express();
const connectDb=require('./config/mangodb')
const cloudinaryConnect=require('./config/cloudinary')
const adminRouter=require('./routes/adminRoutes');
const doctorRouter = require('./routes/doctorsRoutes');
const userRouter = require('./routes/userRoute');
const port=process.env.PORT || 5000;



app.use(cors())
app.use(express.json())

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)



app.listen(port,()=>{
    console.log("server is running")
    connectDb();
    cloudinaryConnect();
})
