import './App.css';
import Signup from './components/signup/Signup';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';

function App() {
  return (
    <div class="flex flex-col h-screen">
      <Header />
      {/* <Signup /> */}
      <Login/>
      <Footer/>
    </div>
  );
}

export default App;
