import { useEffect, useState } from "react";
import axios from "axios";
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import NavBar from './components/NavBar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const checkLogin = async () => {
    try {
      await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          withCredentials: true,
        }
      );

      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };
  checkLogin();
}, []);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}/>

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn}/>}/>
      </Routes>
    </>
  )
}

export default App;
