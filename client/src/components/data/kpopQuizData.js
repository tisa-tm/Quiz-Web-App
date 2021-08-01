let quizQuestions = [
	{
		id: 1,
		question: "How many members does the boyband BTS have?",
		answers: ['5','7','3','2'],
		correctAnswer: "7",
	},
	{
		id: 2,
		question: "Who performed the song 'Nobody'",
		answers: ['AOA','2ne1','Girls Generation','Wonder Girls'],
		correctAnswer: "Wonder Girls",
	},
	{
		id: 3,
		question: "Who performed 'Rainism'?",
		answers: ['Bigbang', 'Exo', 'Rain', 'TVXQ'],
		correctAnswer: "Rain",
	},
	{
		id: 4,
		question: "How many members does the girlgroup Twice have?",
		answers: ['2','4','9','8'],
		correctAnswer: "9",
	},
	{
		id: 5,
		question: "Who performed Levanter?",
		answers: ['Stray Kids','BTS','CLC','Twice'],
		correctAnswer: "Stray Kids",
	},
	{
		id: 6,
		question: "Which of the following is a Stray Kids song",
		answers: ['Hello','Waiting','Double Knot','Sneakers'],
		correctAnswer: "Double Knot",
	},
];

function rand(min, max) {
	let randomNum = Math.random() * (max - min) + min;
	return Math.floor(randomNum);
}

function generateRandomNumberArray(numberOfQuestion,numberOfRandomNumber){
	var randomNumbers = [];
	var i = 0;
	var random = 0;
	while(i<numberOfQuestion){
		random = rand(0,numberOfRandomNumber);
		if(!randomNumbers.includes(random)){
			i++;
			randomNumbers.push(random);
		}  
	}
	return randomNumbers;
}

function generateRandomQuizQuestions(randomNumbers,numberOfQuestion,quizData){
	var randomQuizQuestions = [];
	var i = 0;
	for(i=0;i<numberOfQuestion;i++){
		var index = randomNumbers[i];
		randomQuizQuestions.push(quizData[index]);
	}
	return randomQuizQuestions;
}

var randomNumbers = generateRandomNumberArray(4,6);
var quizData = generateRandomQuizQuestions(randomNumbers,4,quizQuestions);

export default quizData;