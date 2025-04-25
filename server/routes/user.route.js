const express = require("express")
const userRouter = express.Router()

const bcrypt = require('bcrypt');
const { userModel } = require("../models/user.model");
var jwt = require('jsonwebtoken');
require("dotenv").config()

userRouter.post("/signup",async (req,res)=>{
    const {firstName,lastName,email,password,dateOfBirth,city,state} = req.body
    try {
        bcrypt.hash(password, 13, async function(err, hash) {
            if(err){
                return res.status(400).json({msg:"Cannot register now"})
            }
            const newUser = await userModel.create({...req.body,password:hash})
            return res.status(200).json({msg:"user created successfully",newUser})
        }); 
    } catch (error) {
        return res.status(500).json({msg:"Something went wrong"})
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const findUser = await userModel.findOne({ email });
        console.log(findUser);
  
        if (!findUser) {
          return res.status(404).json({ msg: "User not found" });
        }
  
        bcrypt.compare(password, findUser.password, async function (err, result) {
          if (err) {
            return res.status(401).json({ msg: "Wrong Password", err });
          }
          if (result) {
           
            const payload = {
              userId: findUser._id,
              firstName: findUser.firstName,
              lastName: findUser.lastName,
              email: findUser.email,
            };
            
            const refreshToken = jwt.sign(payload, process.env.JWT_TOKEN, {
              expiresIn: "7d",
            });
  
        
            findUser.refreshToken = refreshToken;
            await findUser.save();
  
            
            return res.status(200).json({
              msg: "User Logged In successfully",
              refreshToken,
              user: payload,  
            });
          }
          return res.status(401).json({ msg: "Wrong password" });
        });
      } else {
        return res.status(401).json({ msg: "Both email and password are required for login" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Something went wrong", error });
    }
  });
  

module.exports = {userRouter}