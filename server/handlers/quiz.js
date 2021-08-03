const { findOneAndUpdate } = require('../models/quiz');
let Quiz = require('../models/quiz');
let Score = require('../models/score');
let User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.createQuiz = async (req, res) => {
  try{
    const {creatoruserid, creatorusername, questions, title} = req.body
    const quiz = new Quiz({
      "title": title,
      "creatoruserid": creatoruserid,
      "creatorusername": creatorusername,
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
  const {quizid, userid, score, username} = req.body;
  const oldScore = await Score.findOne({quizid, userid});
  const scoreObj = new Score({
    "quizid": quizid,
    "userid": userid,
    "username": username,
    "score": score,
  });
  //should keep highest score if already exists
  if(oldScore){
    //don't update if the old score is higher
    if(score<oldScore.score){
      return
    }
    else{
      //update if current scire is higher
      await Score.findOneAndUpdate(
        {userid,quizid},
        {
          score: score
        }
        );
    }
  }
  else{
    //create new record if quiz not taken before thus old score not present
    const scoreObjRet = await scoreObj.save();
  }
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

exports.showAllScores = async(req,res) => {
  try{
    const score = await Score.find();
    return res.json(score);
  }catch(err){
    return res.json(err);
  }
}

exports.deleteAllScores = async(req,res) => {
  try{
    const score = await Score.deleteMany({});
    return res.send("Deleted");
  }catch(err){
    return res.json(err);
  }
}

exports.getAllQuizesTakenByUser = async(req, res) => {
  try{
    let userid = req.params.userid;
    const quizes = await User.findById(userid);
    const quizesTaken = await Quiz.find( { _id : { $in : quizes.quizesTaken}});
    quizesTakenArray = [];
    for(const quiz of quizesTaken){
      let quizid = quiz._id;
      const score = await Score.findOne({quizid, userid});
      const q = {
        "_id": quizid,
        "title": quiz.title,
        "creatorusername": quiz.creatorusername,
        "score": score.score
      };
      quizesTakenArray.push(q);
    }
    return res.json(quizesTakenArray); 
  }catch(err){
    return res.json(err);
  }
}

exports.getScore = async (req,res) => {
  const {quizid,userid} = body.req;
  try {
    const score = await Score.findOne({quizid, userid});
    return res.json(score.score);
  } catch (err) {
    console.log(err);
  }
}

exports.getAllQuizesCreatedByUser = async (req, res) => {
  try{
    const quizes = await User.findById(req.params.userid);
    const quizesCreated = await Quiz.find( { _id : { $in : quizes.quizesCreated}});
    return res.json(quizesCreated);
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
