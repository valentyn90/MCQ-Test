function submitAnswers(e) {
	e.preventDefault();
	var total = 6;
	var score = 0;

	// Get user input
	var q1 = document.forms["quizForm"]["q1"].value;
	var q2 = document.forms["quizForm"]["q2"].value;
	var q3 = document.forms["quizForm"]["q3"].value;
	var q4 = document.forms["quizForm"]["q4"].value;
	var q5 = document.forms["quizForm"]["q5"].value;
	var q6 = document.forms["quizForm"]["q6"].value;

	// Validation
	for (var i = 1; i <= total; i++) {
		if (eval('q'+i) == null || eval('q'+i) == '' ) {
			var warning = document.getElementById('results');
			warning.style.backgroundColor = "#fff000";
			warning.innerHTML = '<h3>You missed '+i+'</h3>';
			return false;
		}
	}

	// Set correct answer
	var answers = ["a","b","c","a","b","c"];

	// Check Answer 
	for (var i = 1; i <= total; i++) {
		if (eval('q'+i) == answers[i-1]) {
			score++;
		}
	}

	// Display result
	var results = document.getElementById('results');
	results.style.backgroundColor = "#1EFF1E";
	results.innerHTML = '<h3>You scored '+score+' out of '+total+'</h3>';
}
document.getElementById('quizForm').addEventListener('submit', submitAnswers);

function next(event) {
	var elm = event.currentTarget;
	elm.parentElement.style.display = 'none';
	elm.parentElement.nextElementSibling.style.display = 'block';
}

function previous(event) {
	var pre = event.currentTarget;
	pre.parentElement.style.display = 'none';
	pre.parentElement.previousElementSibling.style.display = 'block';
}


