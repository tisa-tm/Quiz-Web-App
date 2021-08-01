import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import '../component-styles/quizDescription.css';
import {
    NavLink,
    HashRouter,
  } from "react-router-dom";

const AllQuizes = () =>{
    // const [quizid,setquizid] = useState('');
    const [quizes,setquizes] = useState([{}]);
    const isMounted = useRef(true);

    useEffect(() => {
		async function getQuizes() {
			try{
				const res = await axios.get('http://localhost:5000/quiz',{withCredentials: true});
                if(isMounted.current){
                    await setquizes(res.data);
                }
			}
			catch(err){
				console.log(err);
			}
            return(() => {
                isMounted.current = false;
            })
		};
		getQuizes();
	},[]);

    // const click = (id) =>{
    //     setquizid(id);
    // }

    return( 
        <div>
        <HashRouter>
            <div id="all-quiz-card-holder">
                {quizes.map((quiz, key) =>
                <div key={key} className="all-quiz-card">
                    <h4>{quiz.title}</h4>
                    <p>{quiz.creatoruserid}</p>     
                    <NavLink to={{
                                    pathname: "/thisquiz/"+quiz._id
                                }}>View</NavLink>
                </div>
                )}
            </div>
        </HashRouter>
        </div>

    );
}

export default AllQuizes;
