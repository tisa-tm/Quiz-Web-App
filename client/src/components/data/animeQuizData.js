let quizQuestions = [
	{
		id: 1,
		question: "Who uses Rasengan?",
		answers: ["Sakura","Hinata","Shikamaru","Naruto"],
		correctAnswer: "Naruto",
	},
	{
		id: 2,
		question: "Who is humanity's strongest?",
		answers: ["Sasuke","Ichigo","Levi","Eric"],
		correctAnswer: "Levi",
	},
	{
		id: 3,
		question: "What quirk did Midoriya have at the beinning of the series?",
		answers: ["Fireball","None","Invisibility", "Flying"],
		correctAnswer: "None",
	},
	{
		id: 4,
		question: "Which anime does Kuro Sensei belong to?",
		answers: ["Naruto","Attack on Titans","Assasination Classroom","Psycho Pass"],
		correctAnswer: "Assasination Classroom",
	},
	{
		id: 5,
		question: "Which of these is an anime about ninjas?",
		answers: ["Naruto","Attack on Titans","Assasination Classroom","Psycho Pass"],
		correctAnswer: "Naruto",
	},
	{
		id: 6,
		question: "Which of these is an anime about super heros?",
		answers: ["My Hero Acaademia","Attack on Titans","Assasination Classroom","Psycho Pass"],
		correctAnswer: "My Hero Acaademia",
	}
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
