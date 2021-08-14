getQuizzQuestions();

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

		question.answers.sort(() => Math.random() - 0.5);

		for (let answer of question.answers) {
			answers += `<li class="answer" onclick="selectAnswer(this);">\
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

function selectAnswer (item) {
	if (!item.classList.contains("active") && !item.classList.contains("other")) {
		item.classList.add("active");
		console.log("oi")
		const answers = item.parentNode;
		
		for (let child of answers.children) {
			if (!child.classList.contains("active")) {
				child.classList.add("other");
			}
		}
	}
}