import React, { Component } from 'react';
import {withRouter, BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Index from './components/index';
import Quiz from './components/quiz';
import AnimeQuiz from './components/animeQuiz';
import KpopQuiz from './components/kpopQuiz';
import IndexPage from './pages/index';


class App extends Component {

	render() {
		return (
			<React.Fragment>
				
				<Switch>
					<Route path="/animeQuiz" component={withRouter(AnimeQuiz)} exact/>
					<Route path="/kpopQuiz" component={withRouter(KpopQuiz)} exact/>
					<Route path="/" component={withRouter(Index)} exact/>
				</Switch>
			</React.Fragment>
	    );
	}
}

export default App;
