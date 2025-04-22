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

userRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try {
        if(email && password){
            const findUser = await userModel.findOne({email})
            if(!findUser){
                return res.status(404).json({msg:"User not found"})
            }
            bcrypt.compare(password, findUser.password, async function(err, result) {
                if(err){
                    return res.status(401).json({msg:"Wrong Password",err})
                }
                if(result){
                    const refreshToken = jwt.sign({ userId:findUser._id }, process.env.JWT_TOKEN);
                    findUser.refreshToken = refreshToken
                    findUser.save()
                    return res.status(200).json({msg:"user Logged In successfully",refreshToken})
                }
                return res.status(401).json({ msg: "Wrong password" });
            });
        }else{
            return res.status(401).json({msg:"both email and password is required for login"})
        } 
    } catch (error) {
        return res.status(500).json({msg:"Something went wrong"})
    }
})

module.exports = {userRouter}