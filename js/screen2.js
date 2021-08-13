getQuizzQuestions()

function getQuizzQuestions() {
	const promisse = axios.get(URL_QUIZZES);
	promisse.then(makeBanner);
	promisse.then(putQuestionsOnPage);
}

function makeBanner(response) {
	const test = response.data[response.data.length - 1];
	document.querySelector(".banner").innerHTML = `\
		<img src="${test.image}" alt="A banner about the quizz">\
		<h2>${test.title}</h2>`;
}

function putQuestionsOnPage(response) {
	const questions = document.querySelector(".questions");
	const test = response.data[response.data.length - 1];
	let answers = "";

	questions.innerHTML = "";

	for (let question of test.questions) {

		for (let answer of question.answers) {
			answers += `<li class="answer">\
				<img src="${answer.image}" alt="Resposta">\
				${answer.text}\
			</li>`;
		}

		questions.innerHTML += `<li class="question">\
			<div style="background-color: ${question.color};" class="question-command">\
				<span>${question.title}</span>\
			</div>\
			<ul class="answers">${answers}</ul>\
		</li>`;

		answers = "";
	}
}

