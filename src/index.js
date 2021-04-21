import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Quiz from './components/quiz';
import Navigation from './components/navigation';
import Index from './components/index';
import {BrowserRouter as Router} from 'react-router-dom';


// ReactDOM.render(
//   <Navigation/>,
//   document.getElementById('root')
// );


// function Display(){
// 	return (
// 		<React.Fragment>
// 		<Navigation/>
// 		<Index/>
// 		</React.Fragment>
// 		);
// }

ReactDOM.render(
	<Router>
  		<App/>
  	</Router>,
  document.getElementById('root')
);
