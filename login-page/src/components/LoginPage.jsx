import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [laoding, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/auth/login`,
      formData,{
        withCredentials: true,
      }
    );
    setIsLoggedIn(true);
    toast.success("Logged in successfully!");
    navigate("/");
  } catch (error) {
  console.log(error);
  if (error.response) {
    toast.error(error.response.data.message);
  } else {
    toast.error(error.message);
  }
}finally{ setLoading(false); }
};

const inputStyle =
  "border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent";

const buttonStyle =
  "bg-amber-800 text-white p-3 rounded-lg hover:bg-amber-800 hover:scale-[1.02] transition-all duration-200 font-semibold";

  return (
    <>
    <div className='min-h-screen flex items-center justify-center bg-slate-600'>
        <div className='font-semibold tracking-wide bg-amber-100 p-8 rounded-2xl shadow-2xl max-w-md w-full '>
          <h1 className='text-2xl font-bold text-center mb-6 text-gray-700'>Welcome Back</h1>
          <div>
            <form className='flex flex-col gap-4 text-gray-800' onSubmit={handleSubmit} >
              <div className='flex flex-col'><label htmlFor="email">Email</label>
              <input name='email' id='email' type='email' value={formData.email} onChange={handleChange} className={inputStyle}/></div>
              <div className='flex flex-col'><label htmlFor="password">Password</label>
              <input name='password' id='password' type='password' value={formData.password} onChange={handleChange} className={inputStyle}/></div>
              
              <button className={buttonStyle}
              disabled={laoding}>{laoding? (<div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </div>): "Login"}</button>
            </form>
            <p className='pt-5 text-gray-800'>Don't have an account? <Link to="/signup" className="text-gray-700 hover:text-gray-400 font-semibold hover:underline">Signup</Link></p>
          </div>
        </div>
      </div>
    </>
  )
};

export default LoginPage;