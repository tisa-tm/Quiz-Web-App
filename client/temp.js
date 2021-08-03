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