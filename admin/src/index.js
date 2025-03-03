import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import AdminContextProvider from './context/AdminContext';
import DoctorsContextProvider from './context/DoctorsContext';
import AppContextProvider from './context/AppContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
  <AdminContextProvider>
    <DoctorsContextProvider>
      <AppContextProvider>
      <App />
      </AppContextProvider>
    </DoctorsContextProvider>

  </AdminContextProvider>
       
 </BrowserRouter>
    
  
);

