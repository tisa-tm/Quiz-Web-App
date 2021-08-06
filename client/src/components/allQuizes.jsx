import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import '../component-styles/allQuizes.css';
import {
    NavLink,
    HashRouter,
  } from "react-router-dom";

const AllQuizes = (props) =>{
    // const [quizid,setquizid] = useState('');
    let currentuserid = props.match.params.currentuserid;
    let currentusername = props.match.params.currentusername;
    const [quizes,setquizes] = useState([{}]);

    useEffect(() => {
		async function getQuizes() {
			try{
				const res = await axios.get('http://localhost:5000/quiz',{withCredentials: true});
                await setquizes(res.data);
			}
			catch(err){
				console.log(err);
			}
		};
		getQuizes();
	},[]);

    return( 
        <div>
        <HashRouter>
            <div id="all-quiz-card-holder">
                {quizes.map((quiz, key) =>
                <div key={key} className="all-quiz-card">
                    <h4>{quiz.title}</h4>
                    <p>By: {quiz.creatorusername}</p>     
                    <NavLink className="links" to={{
                                    pathname: "/thisquiz/"+quiz._id+"/"+currentuserid+"/"+currentusername
                                }}>View</NavLink>
                </div>
                )}
            </div>
        </HashRouter>
        </div>

    );
}

export default AllQuizes;
