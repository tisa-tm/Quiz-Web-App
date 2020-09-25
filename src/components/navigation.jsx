import React, { Component } from 'react';
import {withRouter, Link,BrowserRouter as Router} from "react-router-dom";

class Navigation extends Component {

	render() {
		return (
			<React.Fragment>
				<nav className="navigation"><Link to="/">Home</Link></nav>
			</React.Fragment>
	    );
	}
}

export default withRouter(Navigation);
