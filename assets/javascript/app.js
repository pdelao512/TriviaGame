var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "You just got slapped!",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

var triviaQuestions = [{
	question: "What is tattooed on Ted's lower back?",
	answerList: ["Dolphin", "Butterfly", "Eagle", "Rainbow"],
	answer: 1
},

{
	question: "Who is Robin's arch-enemy at work?",
	answerList: ["Jess", "Nora", "Clarice", "Patrice"],
	answer: 3
},

{
	question: "When does Ted interaction with the goat take place?",
	answerList: ["His  31st Birthday", "His last day of work", "His 30th Birthday", "His Bachelor Party"],
	answer: 0
},

// {
// 	question: "What does Lily's doppelganger do for a living?",
// 	answerList: ["Stripper", "Doctor", "Cab Driver", "Cop"],
// 	answer: 0
// },

{
	question: "Which instrument did Ted steal for Robin in the first episode and appears in Robin's apartment for the rest of the series?",
	answerList: ["Trumpet", "Clarinet", "French Horn", "Tuba"],
	answer: 2
},

// {
// 	question: "Who is Robin's arch-enemy at work?",
// 	answerList: ["Jess", "Nora", "Clarice", "Patrice"],
// 	answer: 3
// },

{
	question: "What is the name of the character that Ted and Barney hate, but Lily likes?",
	answerList: ["Gary Blauman", "Terry Neuemann", "William Zabka", "Scotty Rumsen"],
	answer: 0
},

// {
// 	question: "What does Lily's doppelganger do for a living?",
// 	answerList: ["Stripper", "Doctor", "Cab Driver", "Cop"],
// 	answer: 0
// },

{
	question: "Which character was NOT one of Ted's serious girlfriends?",
	answerList: ["Zoey", "Quinn", "Victoria", "Stella"],
	answer: 1
},

{
	question: "What is the name of Lily's high school boyfriend?",
	answerList: ["Shooter", "Skippy", "Scooter", "Skeeter"],
	answer: 2
},

// {
// 	question: "What is Marshall and Lily's theory on how to be a happy couple?",
// 	answerList: ["Pickle Theory", "Olive Theory", "Lemon Theory", "Pineapple Theory"],
// 	answer: 1
// },

{
	question: "Which celebrity does Marshall share the 'best burger in the world' with?",
	answerList: ["Matt Lauer", "Bob Barker", "Meredith Vieira", "Regis Philbin"],
	answer: 3
},

{
	question: "Barney, Ted, and Marshall all worked for GNB at some point. What does GNB stand for?",
	answerList: ["Goliath National Bank", "Gigantic National Bank", "Grant National Brands", "Global Nutritional Brands"],
	answer: 0
},

{
	question: "What name did Robin take after ditching her Robin Sparkles persona and embracing an angsty 90s alt-rock vibe?",
	answerList: ["Robin Sorrow", "Robin Daggers", "Robin Sparrow", "Robin Darkness"],
	answer: 1
},

{
	question: "Which of Robin's vocal tics is turned into a drinking game after she says it too many times on live television?",
	answerList: ["Uh, yeahhh...", "What...what?", "Yeah, so....", "But...ummm..."],
	answer: 3
},

{
	question: "What does Lily's doppelganger do for a living?",
	answerList: ["Stripper", "Doctor", "Cab Driver", "Cop"],
	answer: 0
},

{
	question: "What is Marshall and Lily's theory on how to be a happy couple?",
	answerList: ["Pickle Theory", "Olive Theory", "Lemon Theory", "Pineapple Theory"],
	answer: 1
},

{
	question: "What is the name of the fancy aged scotch that keeps coming up?",
	answerList: ["Glen McKenna", "Glen McDonald", "Glen McKinney", "Glen McKinley"],
	answer: 0
},

{
	question: "What did Barney have to wear for a year after losing a bet?",
	answerList: ["Monkey Shoes", "Kitten Underwear", "Ducky Tie", "Bunny Socks"],
	answer: 2
}];

// var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
// var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
// var messages = {
// 	correct: "Yes, that's right!",
// 	incorrect: "You just got slapped!",
// 	endTime: "Out of time!",
// 	finished: "Alright! Let's see how well you did."
// }

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}