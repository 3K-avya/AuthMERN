import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const SignupPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [laoding, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username:"", email:"", password:"", confirmpassword:""
  });
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup",
      formData,{
        withCredentials: true,
      }
    );
    setFormData({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
    });
    setIsLoggedIn(true);
    toast.success("Account created successfully!");
    navigate("/");
  } catch (error) {
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
        <div className='font-semibold tracking-wide mt-15 bg-amber-100 p-8 rounded-2xl shadow-2xl max-w-md w-full'>
          <h1 className='text-2xl font-bold text-center mb-6 text-gray-700'>Create your account</h1>
            <form className='flex flex-col gap-4 text-gray-700' onSubmit={handleSubmit} >
              <div className='flex flex-col'><label htmlFor="username">Username</label>
              <input name='username' id='username' type='text' value={formData.username} onChange={handleChange} className={inputStyle}/></div>
              <div className='flex flex-col'><label htmlFor="email">Email</label>
              <input name='email' id='email' type='email' value={formData.email} onChange={handleChange} className={inputStyle}/></div>
              <div className='flex flex-col'><label htmlFor="password">Password</label>
              <input name='password' id='password' type='password' value={formData.password} onChange={handleChange} className={inputStyle}/></div>
              <div className='flex flex-col'><label htmlFor="confirmpassword">Confirm Password</label>
              <input name='confirmpassword' id='confirmpassword' onChange={handleChange} value={formData.confirmpassword} type='password' className={inputStyle}/></div>
              
              <button className={buttonStyle}
              disabled={laoding}>{laoding? (<div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating account...
              </div>): "Signup"}</button>
            </form>
            
          </div>
        </div>
    </>
  )
};

export default SignupPage;