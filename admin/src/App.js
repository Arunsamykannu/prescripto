import { useContext } from "react";
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Allappointments from "./pages/admin/Allappointments";
import Adddoctor from "./pages/admin/Adddoctor";
import Doctorslist from "./pages/admin/Doctorslist";
import { DoctorsContext } from "./context/DoctorsContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import DoctorProfile from "./pages/doctor/DoctorProfile";

export default function App() {
  const {atoken}=useContext(AdminContext)
  const {dtoken}=useContext(DoctorsContext)
  return atoken || dtoken ? (
    <div className="bg-[#F8F9FD]">
       <ToastContainer />
    <Navbar />
    <div className="flex items-start">
      <Sidebar />
      <Routes >
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={<Dashboard></Dashboard>} />
        <Route path='/all-appointments' element={<Allappointments />} />
        <Route path='/add-doctor' element={<Adddoctor/>} />
        <Route path='/doctors-list' element={<Doctorslist/>} />



        <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
        <Route path='/doctor-appointment' element={<DoctorAppointment/>} />
        <Route path='/doctor-profile' element={<DoctorProfile/>} />
      </Routes>
      
    </div>

   
    
    </div>
  ):(<>
  <Login/>
  <ToastContainer />
  </>)
}