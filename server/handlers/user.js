const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res,) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
        res.json(err);
    }
  };

exports.deleteAll = async (req, res,) => {
  try {
    await User.deleteMany({});
    return res.json("ahahaha");
  }catch(err){
    res.status(500).json(err);
  }
}
  
exports.register = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const olduser = await User.findOne({username});
    if(olduser) {return res.status(500).json({message: "Already Exists"})}
    const user = new User({
        "username": username,
        "password": password
    });
    const userRet = await user.save();  
    const token = jwt.sign( {username: username}, process.env.SECRET, { expiresIn: "1d" } );
    res.status(201).json(userRet)
        .cookie("token",token, { httpOnly: true, maxAge: 86400000, secure: true, sameSite: true})
    }catch(err) {
      res.status(500).json(err);
    }
};
  
exports.login = async (req, res, next) => {
  try{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username});
    if(!user) return res.status(500).json({message: "user doesn't exist"});
    //comparing hash of entered password and stored hash value 
    if(await bcrypt.compare(password,user.password)){
      const token = await jwt.sign( {username: username}, process.env.SECRET, { expiresIn: '1d' } );
      console.log("user logged in "+token);
      return res.status(200)
                .cookie("token",token,{maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: true})//,{httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: none})//maxAge: 24 * 60 * 60 * 1000, 
                .json({message: "user valid"});
                // .json(user);
                // .redirect("http://localhost:3000/");

    }
    else{
      return res.status(500).json({message:"Enter password again"});
    }
  }catch(err){
    return res.json(err);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({message: "Logged out"}).redirect("http://localhost:3000/");
};

exports.getCurrentUser = async (req, res) => {
  try{
    const token = req.cookies.token;
    if (!token)
      return res.json({message: "User logged out"});
    const decoded = await jwt.verify(token, process.env.SECRET);
    loggedInUser = await decoded?.username;
    return res.json({user: loggedInUser});
  }catch(err){
    console.log(err);
  }
};