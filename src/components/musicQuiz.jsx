import React, { Component } from 'react';
import Quiz from './quiz';
import quizData from './data/musicQuizData';

class MusicQuiz extends Component {

	render() {
		return (
			<Quiz data = {quizData}/>
	    );
	}
}

export default MusicQuiz;
