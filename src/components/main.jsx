import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import AnimeQuiz from './animeQuiz';
import KpopQuiz from './kpopQuiz';
import Home from './home';

class Main extends Component{
    render(){
        return(
            <HashRouter>
                <div className="navigation">
                    <NavLink to="/" className="navigation-link">Home</NavLink>
                    <NavLink to="/animequiz" className="navigation-link">Anime Quiz</NavLink>
                    <NavLink to="/kpopquiz" className="navigation-link">Kpop Quiz</NavLink>
                </div>

                <div>
                    <Route defult exact path="/" component={Home}></Route>
                    <Route path="/animequiz" component={AnimeQuiz}></Route>
                    <Route path="/kpopquiz" component={KpopQuiz}></Route>
                </div>
        </HashRouter>
        );
    }
}

export default Main;