import React, {useState, useEffect} from 'react';
import '../component-styles/quizDescription.css';
import axios from 'axios';
import {
    NavLink,
    HashRouter,
  } from "react-router-dom";

const ShowQuizList = (props) =>{
    let currentuserid = props.currentuserid;
    let currentusername = props.currentusername;
    // let showscore = props.showscore;
    const [quizes,setquizes] = useState([{}]);
    const [uri,seturi] = useState(props.uri);

    useEffect(() => {
		async function getQuizes() {
			try{
				const res = await axios.get(uri+currentuserid,{withCredentials: true});
                await setquizes(res.data);
			}
			catch(err){
				console.log(err);
			}
		};
		getQuizes();
	},[]);

    const showScore = async (quizid) => {
        try{
            const res = await axios.get("http://localhost:5000/quiz/getscore"+currentuserid+"/"+quizid,{withCredentials: true});
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    if(quizes){
        return( 
            <div>
            <HashRouter>
                <div id="all-quiz-card-holder">
                    {quizes.map((quiz, key) =>
                    <div key={key} className="all-quiz-card">
                        <h4>{quiz.title}</h4>
                        <p>By: {quiz.creatorusername}</p>  
                        {/* {showScore(quiz._id)} */}
                        <p>Score: {quiz.score}</p>
                        <NavLink to={{
                                        pathname: "/thisquiz/"+quiz._id+"/"+currentuserid+"/"+currentusername
                                    }}>View</NavLink>
                    </div>
                    )}
                </div>
            </HashRouter>
            </div>
        );
    }
    else{
        return (
            <h1>No Quizes Here</h1>
        );
    }
}

export default ShowQuizList;
