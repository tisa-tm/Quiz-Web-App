const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
        res.json(err);
    }
  };
  
exports.register = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = new User({
        "username": username,
        "password": password
    });
    const userRet = await user.save();  
    res.json(userRet);
    }catch(err) {
      if (err.code === 11000) {
      err.message = 'Username already taken';
      }
      res.json(err);
    }
};
  
exports.login = async (req, res, next) => {
  try{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.find({"username": username});
    //comparing hash of entered password and stored hash value 
    if(await bcrypt.compare(password,user[0].password)){
      res.json("Entry valid");
      next();
    }
    else{
      res.json("Enter password again");
    }
  }catch(err){
    res.json(err);
  }
};
