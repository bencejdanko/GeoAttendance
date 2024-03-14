import './App.css';
import React from "react";
import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import AboutUs from './components/aboutus/AboutUs';
import ContactUs from './components/contactus/ContactUs';
import Dashboard from './components/dashboard/Dashboard';
import EventDetails from './components/eventdetails/EventDetails';
import { AuthProvider } from './components/auth/AuthProvider';
import Checkin from './components/checkin/Checkin';

function App() {
  const dateTimeCoverter = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
  }

  return (
    <AuthProvider>

      <div className="flex flex-col h-screen">
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/contactus' element={<ContactUs />} />
            <Route exact path='/aboutus'
              element={<AboutUs />} />
            <Route exact path='/profile' Component={Profile}
              element={<Profile />} />
            <Route
              exact path='/dashboard'
              element={<Dashboard formattedDate={dateTimeCoverter()} />}
            />
            <Route
              exact path='/checkin'
              element={<Checkin />}
            />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>

  );
}

export default App;
