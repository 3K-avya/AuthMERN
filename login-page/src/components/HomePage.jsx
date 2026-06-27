import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getProfile = async() => {
    try {
      const response = await axios.get(
         `${import.meta.env.VITE_API_URL}/auth/profile`,{
          withCredentials: true,
        }
      );

      setUser(response.data);
    }catch(error){
      if(error.response && error.response.status === 401) navigate("/login");
      else if(error.response) console.log(error.response.data.message);
      else console.log(error.message);
      }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="text-center font-semibold tracking-wide">
        <h2 className='text-5xl mb-4 text-amber-100'>What's up?? {user ? user.username : "Loading..."}</h2>
      </div>
    </div>
  )
}

export default HomePage;