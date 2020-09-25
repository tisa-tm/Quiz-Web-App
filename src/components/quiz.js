import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import quizData from './data/animeQuizData';
import Navigation from './navigation';

class Quiz extends Component {

	state = {
		quizData: this.props.data,
		score: 0

	};

	check = () => {
    let quizData = this.state.quizData;
    let scoreTemp = 0;
	quizData.map((quizdata,key) =>{ 	
		if(quizdata.correctAnswer == document.querySelector('input[name=group'+(key+1)+']:checked').className){
			scoreTemp += 1
		}
		});
	this.setState({score: scoreTemp});
	ReactDOM.findDOMNode(this.refs.scorecontainer).style.display = "block"; 		
	};

	render() {
		return (
			<React.Fragment>
			<Navigation/>
			<div id="quiz">
			<div id = "a">
				{this.state.quizData.map((quizdata,key) => 
					<div key={key} className="quiz-section" id={quizdata.id}>
					<p>{quizdata.question}</p>
					<ul className="custom-radio">
						{quizdata.answers.map(answer =>
							<li key={answer+quizdata.id} className="radio-list"><input type="radio" name={"group"+quizdata.id} className={answer} id={answer+quizdata.id}/><label htmlFor={answer+quizdata.id}>{answer}</label></li>
						)}
					</ul>
					</div>
				)}
				<div ref={'scorecontainer'} className="score-container">
					<p ref={'score'} className="score-text" id="score">The score is {this.state.score}</p>
				</div>
				<button id="check" onClick={this.check}>Check</button>
			</div>
			</div>
			</React.Fragment>
	    );
	}
}

export default Quiz;
