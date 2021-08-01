import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const Quiz = (props) => {
	const [quizid,setquizid] = useState(props.match.params.quizid);
	const [quizData, setQuizData] = useState( 
		{
			"quiz": {
				"title": "",
    			"creatoruserid": "",
    			"questions": [{}]
			},
		 	"user": {}
   		});
	const [score,setscore] =useState(0);
	const [question,setquestion] = useState([]);
	const isMounted = useRef(true);

	useEffect(() => {
		async function getQuiz() {
			try{
				const res = await axios.get('http://localhost:5000/quiz/getquiz/'+quizid, { withCredentials: true });
				if(isMounted.current){
					await setQuizData(res.data);
					await setquestion(res.data.quiz.questions);
				}
			}
			catch(err){
				console.log(err);
			}
			return(() => {
                isMounted.current = false;
            })
		};
		getQuiz();
	},[]);

	//score is calculated here
	const check = () => {
    let quizData = quizData;
    let scoreTemp = 0;
	console.log(quizData);
	question.map((quizdata,key) =>{ 
		//here the score is increased if individual answers is correct	
		if(quizdata.correctAnswer==document.querySelector('input[name=group'+quizdata._id+']:checked').className){
			scoreTemp += 1;
		}
		else{
			//show correct answer in case the answer is not correct
			document.getElementById("answer"+quizdata._id).style.display = "block";
		}
		});
	//showing the score
	setscore(scoreTemp); 	
	document.getElementById("score-cont").style.display = "block";	
	return score;
	};


	return (
		<div id="quiz-card-holder">
			<h1>{quizData.quiz.title}</h1>
			<div id = "a">
				{question.map((quizdata,key) => 
				//each quiz section
					<div key={key} className="quiz-section" id={quizdata.id}>
						{/* question */}
						<p>{quizdata.question}</p>
						{/* answer */}
						<ul className="custom-radio">
							{quizdata.answers.map(answer =>
								<li key={answer+quizdata._id} className="radio-list"><input type="radio" name={"group"+quizdata._id} className={answer} id={answer+quizdata._id}/><label htmlFor={answer+quizdata._id}>{answer}</label></li>
							)}
						</ul>
						{/* here answer is displayed */}
						<div className="display-answer" style={{display: "none"}} id={"answer"+quizdata._id}>{quizdata.correctAnswer}</div>
					</div>
				)}

				<div id="score-cont" className="score-container">
					<p className="score-text" id="score">The score is {score}</p>
				</div>
				
				<button id="check" onClick={check}>Check</button>
			</div>
		</div>
	);
}

export default Quiz;
