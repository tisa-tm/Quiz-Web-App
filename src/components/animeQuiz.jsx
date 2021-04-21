import React, { Component } from 'react';
import Quiz from './quiz';
import quizData from './data/animeQuizData';
import {withRouter} from "react-router-dom";

class AnimeQuiz extends Component {

	render() {
		return (
			<Quiz data = {quizData}/>
	    );
	}
}

export default AnimeQuiz;
