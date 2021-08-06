import React, { Component } from 'react';
import {
    NavLink,
    HashRouter, 
  } from "react-router-dom";
import "../component-styles/profile.css";

class Profile extends Component {

    userid = this.props.match.params.currentuserid;
    username = this.props.match.params.currentusername;

	render() {
		return (
            <HashRouter>
                <div className="profile-holder">  
                    <div className="profile-quiz-card">
                        <NavLink className="links" to={{pathname: "/quizescreated/"+this.userid+"/"+this.username}}>Quizes Created</NavLink> 
                    </div>
                    <div className="profile-quiz-card">
                        <NavLink className="links" to={{pathname: "/quizestaken/"+this.userid+"/"+this.username}}>Quizes Taken</NavLink>     
                    </div>
                </div>
            </HashRouter>
	    );
	}
}

export default Profile;