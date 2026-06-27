import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {generateToken} from '../lib/generateToken.js';

export const signupUser = async(req,res)=>{
  const { username, email, password, confirmpassword} = req.body;
  try {
    if(!username || !email || !password || !confirmpassword)
      return res.status(400).json({ message: "ALL Fields are Required."});
    if(password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters"});
    if(password !== confirmpassword)
      return res.status(400).json({ message: "Confirm Password should match the password."});

    const user = await User.findOne({email});
    if(user) return res.status(400).json({ message: "Email already exists"});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);    

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    
    if(newUser){
      await newUser.save();
      const token = generateToken(newUser._id, res);

    res.status(201).json({ 
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email
    });
  }else res.status(400).json({ message: "Invalid user data"});

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Interna; Server error"});
  }
};

export const loginUser = async(req,res)=>{
  const { email, password } = req.body;

  if(!email || !password) 
    return res.status(400).json({ message: "ALL Fields are Required."});

  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: "Invalid Credentials"});

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials"});

    const token = generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email
  })
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error"});
  }
};

export const getProfile = (req,res) => {
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
};

export const logoutUser = (req,res) => {
  res.cookie("jwt", "",{
    maxAge: 0,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged Out Successfully" });
}