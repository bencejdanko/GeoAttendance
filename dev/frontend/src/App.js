import './App.css';
import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import Signup from './components/signup/Signup';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import AboutUs from './components/aboutus/AboutUs';
import ContactUs from './components/contactus/ContactUs';
import Dashboard from './components/dashboard/Dashboard';

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
    <div class="flex flex-col h-screen">
      <Header />
      <Router>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/login' Component={Login} />
          <Route exact path='/signup' Component={Signup} />
          <Route exact path='/contactUs' Component={ContactUs} />
          <Route exact path='/aboutus' Component={AboutUs} />
          <Route exact path='/profile' Component={Profile} />
          {/* <Route exact path='/dashboard' Component={Dashboard} /> */}
          <Route
            exact path='/dashboard'
            element={<Dashboard formattedDate={dateTimeCoverter()} />}
          />
          {/* <Route exact path='/roommates' Component={RoommatesPage} /> */}
          {/* <Route path="/users/:id" Component={RoommateProfile} /> */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
