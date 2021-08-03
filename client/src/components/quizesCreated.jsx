import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ShowQuizList from './showQuizList';

const QuizesCreated = (props) =>{
    let userid = props.match.params.currentuserid;
    let currentusername = props.match.params.currentusername;

    return(
        <ShowQuizList currentuserid={userid} currentusername={currentusername} uri="http://localhost:5000/quiz/getquizescreated/"/>
    )
}

export default QuizesCreated;