
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    workoutPreferences: { type: [String], default: [] },
    // fitnessGoals: [{type: mongoose.Schema.Types.ObjectId,ref: "Goal"}],
    // buddies: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
    profileImage: {type: String,default: ""},
    // socialLogins: {google: { type: String },facebook: { type: String }},
    accessToken: {type: String},
    refreshToken: {type: String},
    blacklistedTokens: [{token: { type: String },blacklistedAt: { type: Date, default: Date.now }}]
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);

module.exports = {userModel}