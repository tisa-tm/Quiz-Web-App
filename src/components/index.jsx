import React, { Component } from 'react';
import {withRouter, Link, BrowserRouter as Router,Switch} from 'react-router-dom';

class Index extends Component {

	render() {
		return (
			<React.Fragment>
				<div className='cardNavigation'>
					<div className="card"><Link className="card-text" to = "/kpopQuiz">Music Quiz</Link></div>
					<div className="card"><Link className="card-text" to = "/kpopQuiz">K-pop Quiz</Link></div>
					<div className="card"><Link className="card-text" to = "/animeQuiz">Anime Quiz</Link></div>
					<div className="card"><Link className="card-text" to = "/kpopQuiz">Landmark Quiz</Link></div>
				</div>	
			</React.Fragment>
	    )
	}
}

export default withRouter(Index);
