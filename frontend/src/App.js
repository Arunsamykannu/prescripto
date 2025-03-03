
import { Routes ,Route} from 'react-router-dom';

import Home from './pages/Home'
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointment from './pages/MyAppointment';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <Navbar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/doctors"  >
      <Route index element={<Doctors />} />
       <Route path=":speciality" element={<Doctors />} />
    </Route>
   
    <Route path="/Login" element={<Login />} />
    <Route path="/About" element={<About />} />
    <Route path="/Contact" element={<Contact />} />
    <Route path="/my-profile" element={<MyProfile />} />
    <Route path="/my-appointment" element={<MyAppointment />} />
    <Route path="/appointment/:docId" element={<Appointment />} />
   </Routes>
    
    </div>
  );
}

export default App;
