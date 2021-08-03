import React, { Component } from 'react';
import axios from 'axios';
import '../component-styles/createQuiz.css';

class CreateQuiz extends Component {

  currentuserid = this.props.match.params.currentuserid;
  currentusername = this.props.match.params.currentusername;

  constructor(props) {
    super(props);
    this.onChangeTitle=this.onChangeTitle.bind(this);
    this.onChangeQuestion=this.onChangeQuestion.bind(this);
    this.onChangeAnswers=this.onChangeAnswers.bind(this);
    this.onChangeCorrectAnswer=this.onChangeCorrectAnswer.bind(this);
    this.onSubmitFinal=this.onSubmitFinal.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.saveTitle=this.saveTitle.bind(this);
    //states
    this.state={
      title: "",
      question: "",
      answers: [],
      correctAnswer: "",
    }
    //varaible
    this.questions = [];
  }

  //set states on change of target values in form
  onChangeTitle(e){
    this.setState({
      title: e.target.value
    })
  }
  onChangeQuestion(e){
    this.setState({
      question: e.target.value
    })
  }
  onChangeAnswers(e){
    const val = e.target.value;
    let answers1 = val.split(",");
    this.setState({
     answers: answers1
    })
  }
  onChangeCorrectAnswer(e){
    this.setState({
      correctAnswer: e.target.value
    })
  }
  //on saving a question
  async onSubmit(e){
    e.preventDefault();
    const question = {
      "question": this.state.question,
      "answers": this.state.answers,
      "correctAnswer": this.state.correctAnswer
    };
    this.questions.push(question);
    alert("added!");
    //reset to original
    this.setState({
      question: "",
      answers: [],
      correctAnswer: ""
    })
  }
  //on submiting the enitre quiz
  async onSubmitFinal(e) {
    e.preventDefault();
    //if user has not saved the final question
    if(!(this.state.question=="" || this.state.answers=="" || this.state.correctAnswer=="")){
      alert("save the question first");
      return;
    }
    //create a quiz object to send to db/server
    const quiz = {
      "creatoruserid": this.currentuserid,//get the current logged in user
      "creatorusername": this.currentusername,
      "title": this.state.title,
      "questions": this.questions
    }
    try{
      //http request to the server 
      const res = await axios.post('http://localhost:5000/quiz/createquiz', quiz, { withCredentials: true });
      console.log(res.data);
    }catch(error){
        console.log(error);
    }
  }
  saveTitle(){
    document.getElementById("title").style.display = "none";
    document.getElementById("question-form").style.display = "flex";
  }

  render(){
    return (
      <div id="display">
        <div id="title">
          <input type="text" value={this.state.title} onChange={this.onChangeTitle} placeholder="Title of Quiz" required/>
          <button onClick={this.saveTitle}>Next</button>
        </div>
        <div id="question-form">
        <form onSubmit={this.onSubmit}>
          {/* <h1>{this.state.title}</h1> */}
          <label htmlFor="question">Question:</label>
          <input type="text" name="question" value={this.state.question} onChange={this.onChangeQuestion} placeholder="What is the capital of France" required/>
          <label htmlFor="answers">Answers:</label>
          <input type="text" name="answers" value={this.state.answers} onChange={this.onChangeAnswers} placeholder="Paris, London, Wales, Sydney" required/>
          <label htmlFor="correct-answer">Correct Answer:</label>
          <input type="text" name="correct-answer" value={this.state.correctAnswer} onChange={this.onChangeCorrectAnswer} placeholder="Paris" required/>
          <button type="submit">Add Question</button>
        </form>
        <button id="submit-quiz-button" onClick={this.onSubmitFinal}>Create Quiz</button>
        </div>
      </div>
    );
  }
}

export default CreateQuiz;