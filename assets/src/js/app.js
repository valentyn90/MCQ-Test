function submitAnswers(e) {
	e.preventDefault();
	var total = 3;
	var score = 0;

	// Get user input
	var q1 = document.forms["quizForm"]["q1"].value;
	var q2 = document.forms["quizForm"]["q2"].value;
	var q3 = document.forms["quizForm"]["q3"].value;

	// Validation
	for (var i = 1; i <= total; i++) {
		if (eval('q'+i) == null || eval('q'+i) == '' ) {
			//alert('You missed question '+i);
			var warning = document.getElementById('results');
			warning.style.backgroundColor = "#fff000";
			warning.innerHTML = '<h3>You missed '+i+'</h3>';
			return false;
		}
	}

	// Set correct answer
	var answers = ["a","b","c"];

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
