import React, {useEffect, useState} from 'react';
import ShowQuizList from './showQuizList';

const QuizesTaken = (props) =>{
    let userid = props.match.params.currentuserid;
    let currentusername = props.match.params.currentusername;

    return(
        <ShowQuizList showscore="true" currentuserid={userid} currentusername={currentusername} uri="http://localhost:5000/quiz/getquizestaken/"/>
    )
}

export default QuizesTaken;