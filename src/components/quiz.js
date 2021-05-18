import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import Navigation from './navigation';

class Quiz extends Component {

	state = {
		quizData: this.props.data,
		score: 0
	};

	constructor(props) {
		super(props);
		this.scorecontainer = React.createRef();
	  }

	//score is calculated here
	check = () => {
    let quizData = this.state.quizData;
    let scoreTemp = 0;
	console.log(quizData);
	quizData.map((quizdata,key) =>{ 
		//here the score is increased if individual answers is correct	
		if(quizdata.correctAnswer == document.querySelector('input[name=group'+quizdata.id+']:checked').className){
			scoreTemp += 1;
		}
		else{
			//show correct answer in case the answer is not correct
			document.getElementById("answer"+quizdata.id).style.display = "block";
		}
		});
	//showing the score
	this.setState({score: scoreTemp});
	this.scorecontainer.current.style.display = "block"; 		
	};

	render() {
		return (
			<React.Fragment>
			{/* <Navigation/> */}
			<div id="quiz">
			<div id = "a">
				{this.state.quizData.map((quizdata,key) => 
				//each quiz section
					<div key={key} className="quiz-section" id={quizdata.id}>
						{/* question */}
						<p>{quizdata.question}</p>
						{/* answer */}
						<ul className="custom-radio">
							{quizdata.answers.map(answer =>
								<li key={answer+quizdata.id} className="radio-list"><input type="radio" name={"group"+quizdata.id} className={answer} id={answer+quizdata.id}/><label htmlFor={answer+quizdata.id}>{answer}</label></li>
							)}
						</ul>
						{/* here answer is displayed */}
						<div className="display-answer" style={{display: "none"}} id={"answer"+quizdata.id}>{quizdata.correctAnswer}</div>
					</div>
				)}

				<div ref={this.scorecontainer} className="score-container">
					<p className="score-text" id="score">The score is {this.state.score}</p>
				</div>
				
				<button id="check" onClick={this.check}>Check</button>
			</div>
			</div>
			</React.Fragment>
	    );
	}
}

export default Quiz;
