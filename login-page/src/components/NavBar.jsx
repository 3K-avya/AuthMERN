import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";

const NavBar = ({isLoggedIn, setIsLoggedIn}) => {
  const navigate = useNavigate();
  const handleLogout = async()=>{
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},{
          withCredentials: true,
        }
      );
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      if(error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  }
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-gray-800 text-white">
      <Link to="/" className="text-2xl font-bold">
        AuthApp
      </Link>
      <div className="flex gap-6">
        

        {isLoggedIn ? (<>
          <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="hover:text-amber-400 transition"
        >Logout </button> </>
        ) : ( <>
          <Link to="/login" className="hover:text-amber-400 transition">
            Login</Link>
          <Link to="/signup" className="hover:text-amber-400 transition">
            Signup</Link>
        </>
      )}
      </div>
    </nav>
  );
};

export default NavBar;