import React, { Component } from 'react';
import {
    NavLink,
    HashRouter, 
  } from "react-router-dom";

class Profile extends Component {

    userid = this.props.match.params.currentuserid;
    username = this.props.match.params.currentusername;

	render() {
		return (
            <div>
                <HashRouter>
                    <NavLink to={{pathname: "/quizescreated/"+this.userid+"/"+this.username}}>Quizes Created</NavLink> 
                    <NavLink to={{pathname: "/quizestaken/"+this.userid+"/"+this.username}}>Quizes Taken</NavLink>
                </HashRouter>
            </div>
	    );
	}
}

export default Profile;