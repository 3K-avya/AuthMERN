import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import NavBar from './components/NavBar'


function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const checkLogin = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        {
          withCredentials: true,
        }
      );
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };
    checkLogin();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-700">
        <h1 className="text-3xl font-bold text-amber-100">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}/>

      <Routes>
        <Route path="/" element={isLoggedIn ? (<HomePage />) : (<Navigate to="/login" replace />)}/>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn}/>}/>
      </Routes>
    </>
  )
}

export default App;
