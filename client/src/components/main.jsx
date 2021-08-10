import React, { Component } from 'react';
import axios from 'axios';
import {
    Route,
    NavLink,
    HashRouter, 
  } from "react-router-dom";
import Quiz from './quiz';
import Home from './home';
import Register from './register';
import Login from './login';
import AllQuizes from './allQuizes';
import CreateQuiz from './createQuiz';
import QuizesCreated from './quizesCreated';
import QuizesTaken from './quizesTaken';
import Profile from './profile';
// import PopupMessage from './popupMessage';

class Main extends Component{
    // currentUser = "";
    state={
        currentUser: ""
    };
    async componentDidMount(){
        const res = await axios.get('http://localhost:5000/user/getcurrentuser', {withCredentials: true});
        this.setState({
            currentUser: res.data
        })
    }
    async logout(){
        const res = await axios.get('http://localhost:5000/user/logout', {withCredentials: true});
        if(res.data.message == "Logged out"){
            window.location.href = 'http://localhost:3000/';
        }
    }
    render(){
        let user = this.state.currentUser.user;
        let userid = this.state.currentUser.userid;
        if(user){
            return(
                <HashRouter>
                    <nav className="navigation">
                        <NavLink to="/" className="navigation-link">Home</NavLink>
                        <NavLink to={{pathname: "/getquiz/"+userid+"/"+user}}className="navigation-link">Quizes</NavLink>
                        <NavLink to={{pathname: "/createquiz/"+userid+"/"+user}} className="navigation-link">Create</NavLink>
                        <div className="float-right">
                            <NavLink to={{pathname: "/userprofile/"+userid+"/"+user}} className="navigation-link">{this.state.currentUser.user}</NavLink>
                            <button onClick={this.logout} className="logout-button">Logout</button>
                        </div>
                        {/* <NavLink to="/popup" className="navigation-link">Popup</NavLink> */}
                    </nav>
    
                    <div>
                        <Route default exact path="/" component={Home}></Route>
                        <Route path="/thisquiz/:quizid/:currentuserid/:currentusername" component={Quiz}></Route>
                        <Route path="/getquiz/:currentuserid/:currentusername" component={AllQuizes}></Route>
                        <Route path="/createquiz/:currentuserid/:currentusername" component={CreateQuiz}></Route>
                        <Route path="/userprofile/:currentuserid/:currentusername" component={Profile}></Route>
                        <Route path="/quizescreated/:currentuserid/:currentusername" component={QuizesCreated}></Route>
                        <Route path="/quizestaken/:currentuserid/:currentusername" component={QuizesTaken}></Route>
                        {/* <Route path="/popup" component={PopupMessage}></Route> */}
                    </div>
            </HashRouter>
            );
        }
        else{
            return(
                <HashRouter>
                    <nav className="navigation">
                        <NavLink to="/" className="navigation-link">Home</NavLink>
                        <div className="float-right">
                            <NavLink to="/register" className="navigation-link">Register</NavLink>
                            <NavLink to="/login" className="navigation-link">Login</NavLink> 
                        </div>                         
                    </nav>
    
                    <div>
                        <Route default exact path="/" component={Home}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/login" component={Login}></Route>
                    </div>
            </HashRouter>
            );
        }
        
    }
}

export default Main;