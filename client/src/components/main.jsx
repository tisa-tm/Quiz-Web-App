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
        console.log("The data is "+this.state.currentUser.user);
        console.log(res.data.user);
    }
    async logout(){
        const res = await axios.get('http://localhost:5000/user/logout', {withCredentials: true});
        if(res.data.message == "Logged out"){
            window.location.href = 'http://localhost:3000/';
        }
    }
    render(){
        let user = this.state.currentUser.user;
        if(user){
            return(
                <HashRouter>
                    <nav className="navigation">
                        <NavLink to="/" className="navigation-link">Home</NavLink>
                        <NavLink to="/getquiz" className="navigation-link">Get Quiz</NavLink>
                        <NavLink to="/createquiz" className="navigation-link">Create Quiz</NavLink>
                        <span className="navigation-link">{this.state.currentUser.user}</span>
                        <button onClick={this.logout}>Logout</button>
                    </nav>
    
                    <div>
                        <Route default exact path="/" component={Home}></Route>
                        <Route path="/thisquiz/:quizid" component={Quiz}></Route>
                        <Route path="/getquiz" component={AllQuizes}></Route>
                        <Route path="/createquiz" component={CreateQuiz}></Route>
                    </div>
            </HashRouter>
            );
        }
        else{
            return(
                <HashRouter>
                    <nav className="navigation">
                        <NavLink to="/" className="navigation-link">Home</NavLink>
                        <NavLink to="/register" className="navigation-link">Register</NavLink>
                        <NavLink to="/login" className="navigation-link">Login</NavLink>                       
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