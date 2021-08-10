import React, { useState } from 'react';
import axios from 'axios';
import '../component-styles/createQuiz.css';
import PopupMessage from './popupMessage';

const CreateQuiz = (props) => {

  let currentuserid = props.match.params.currentuserid;
  let currentusername = props.match.params.currentusername;
  let questions = [];
  let popup = null;
  
  const [title,settitle] = useState("");
  const [question,setquestion] = useState("");
  const [answers,setanswers] = useState([]);
  const [correctanswer,setcorrectanswer] = useState("");
  const [popupstateaddanswer,setpopupstateaddanswer] = useState(false);
  const [popupstateaddquiz,setpopupstateaddquiz] = useState(false);

  const showanswerpopup = () => {
    setpopupstateaddanswer(true);
  }
  const showquizpopup = () => {
    setpopupstateaddquiz(true);
  }
  //set states on change of target values in form
  const onChangeTitle = (e) => {
      settitle(e.target.value)
  }
  const onChangeQuestion = (e) => {
      setquestion(e.target.value)
  }
  const onChangeAnswers = (e) => {
    const val = e.target.value;
    let answers1 = val.split(",");
    setanswers(answers1)
  }
  const onChangeCorrectAnswer = (e) => {
    setcorrectanswer(e.target.value);
  }

  //on saving a question
  const onSubmit = (e) => {
    e.preventDefault();
    const question = {
      "question": question,
      "answers": answers,
      "correctAnswer": correctanswer
    };
    questions.push(question);
    //reset to original
    setquestion("");
    setanswers([]);
    setcorrectanswer("");
  }
  //on submiting the enitre quiz
  const onSubmitFinal = async (e) => {
    e.preventDefault();
    //if user has not saved the final question
    if(!(question=="" || answers=="" || correctanswer=="")){
      alert("save the question first");
      return;
    }
    //create a quiz object to send to db/server
    const quiz = {
      "creatoruserid": currentuserid,//get the current logged in user
      "creatorusername": currentusername,
      "title": title,
      "questions": questions
    }
    try{
      //http request to the server 
      const res = await axios.post('http://localhost:5000/quiz/createquiz', quiz, { withCredentials: true });
      console.log(res.data);
    }catch(error){
        console.log(error);
    }
  }
  const saveTitle = () => {
    document.getElementById("title").style.display = "none";
    document.getElementById("question-form").style.display = "flex";
  }

  if(popupstateaddanswer){
    popup = <PopupMessage message="The question has been added" popupstate={popupstateaddanswer}/> 
    setTimeout(() => setpopupstateaddanswer(false), 5000);
  }
  else if(popupstateaddquiz){
    popup = <PopupMessage message="The quiz has been created" popupstate={popupstateaddquiz}/>
    setTimeout(() => setpopupstateaddquiz(false), 5000);
  }

  return (
    <div id="display">
      <div id="title">
        <input type="text" value={title} onChange={onChangeTitle} placeholder="Title of Quiz" required/>
        <button onClick={saveTitle}>Next</button>
      </div>
      <div id="question-form">
      <form onSubmit={onSubmit}>
        <label htmlFor="question">Question:</label>
        <input type="text" name="question" value={question} onChange={onChangeQuestion} placeholder="What is the capital of France" required/>
        <label htmlFor="answers">Answers:</label>
        <input type="text" name="answers" value={answers} onChange={onChangeAnswers} placeholder="Paris, London, Wales, Sydney" required/>
        <label htmlFor="correct-answer">Correct Answer:</label>
        <input type="text" name="correct-answer" value={correctanswer} onChange={onChangeCorrectAnswer} placeholder="Paris" required/>
        <button type="submit" onClick={showanswerpopup}>Add Question</button>
      </form>
      {popup}
      <button id="submit-quiz-button" onClick={onSubmitFinal} onClick={showquizpopup}>Create Quiz</button>
      </div>
    </div>
  );
}


export default CreateQuiz;