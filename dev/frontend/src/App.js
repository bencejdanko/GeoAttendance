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

function App() {
  return (
    <div class="flex flex-col h-screen">
      <Header />
      <Router>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/login' Component={Login} />
          <Route exact path='/signup' Component={Signup} />
          {/* <Route exact path='/contactUs' Component={ContactUsPage} /> */}
          {/* <Route exact path='/about' Component={AboutPage} /> */}
          <Route exact path='/profile' Component={Profile} />
          {/* <Route exact path='/message' Component={Chat} /> */}
          {/* <Route exact path='/roommates' Component={RoommatesPage} /> */}
          {/* <Route path="/users/:id" Component={RoommateProfile} /> */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
