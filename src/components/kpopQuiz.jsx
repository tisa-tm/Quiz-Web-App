import React, { Component } from 'react';
import Quiz from './quiz';
import quizData from './data/kpopQuizData';
import {withRouter} from "react-router-dom";

class KpopQuiz extends Component {

	render() {
		return (
			<Quiz data = {quizData}/>
	    );
	}
}

export default KpopQuiz;
