const { findOneAndUpdate } = require('../models/quiz');
let Quiz = require('../models/quiz');
let Score = require('../models/score');
let User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.createQuiz = async (req, res) => {
  try{
    const creatoruserid = req.body.creatoruserid;
    const questions = req.body.questions;
    const title = req.body.title;
    const quiz = new Quiz({
      "title": title,
      "creatoruserid": creatoruserid,
      //this not correct method
      // "questions": questions.map({})
      "questions": questions
    });
    const createdquiz = await quiz.save();
    const user = await User.findById(creatoruserid);
    // add to array quizesCreated in User schema the quiz id of the quiz just created
    await User.findOneAndUpdate(
        {_id: creatoruserid},
        {
          $addToSet:{
            quizesCreated:createdquiz.id
          }
        }
        );
    res.json(createdquiz);
  }catch(err){
    res.json(err);
  }
}

exports.displayAllQuizes = async (req, res) => {
  try{
    const quiz = await Quiz.find();
    return res.json(quiz);
  }catch(err){
    return res.json(err);
  }
};

exports.getQuiz = async (req, res) => {
  try{
    const quiz = await Quiz.findById(req.params.quizid);
    const user = await User.findById(quiz.creatoruserid);
    return res.json({"quiz": quiz, "user": user});
  }catch(err){
    return res.json("Error is:"+err);
  }
}

exports.setScore = async (req, res) => {
  try{
  const quizid = req.body.quizid;
  const userid = req.body.userid;
  const score = req.body.score;
  const scoreObj = new Score({
    "quizid": quizid,
    "userid": userid,
    "score": score,
  });
  const scoreObjRet = await scoreObj.save();
  //after saving quiz, method to add the quiz id to user's quiz taken array
  await User.findOneAndUpdate(
    {_id: userid},
    {
      $addToSet:{
        quizesTaken: quizid
      }
    }
    );
  res.json(scoreObj);
  }
  catch(err){
    console.log("Error:"+err);
  }
}

exports.getAllQuizesTakenByUser = async(req, res) => {
  try{
    // const quiz = await Quiz.find({username: req.params.username}).populate("quizesTaken");
    const quiz = await User.findById(req.params.userid);
    res.json(quiz);
  }catch(err){
    res.json(err);
  }
}

exports.getAllQuizesCreatedByUser = async (req, res, next) => {
  try{
    // const quiz = await User.find({username: req.params.userid}).populate("quizesCreated");
    const quiz = await User.findById(req.params.userid).populate("quizzesCreated");
    console.log(req.username);
    res.json(quiz);
  }catch(err){
    res.json(err);
  }
}

exports.deleteAllQuizes = async(req,res) => {
  await Quiz.deleteMany({});
  res.send("ahahha");
}

exports.send = async (req, res, next) => {
  console.log("cookie set")
  return res.cookie("loggedin", "true");
  ;
}

exports.read = async (req, res) => {
  res.send(req.cookies);
}
