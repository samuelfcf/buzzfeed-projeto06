const URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

let userQuizzes = [];

const personalQuizzes = document.querySelector(".personal-quizzes");
const createQuizzButton = document.querySelector(".create-quizz");

createQuizzButton.addEventListener("click", () => {
	document.querySelector(".screen-1").classList.add("hidden");
	document.querySelector(".screen-3").classList.remove("hidden");
});

getQuizzes();

function userQuizzesSection () {
	const createQuizzSection = document.querySelector(".create-initial-quizz")
	
	if (userQuizzes > 0) {
		createQuizzSection.classList.add("hidden");
		personalQuizzes.classList.remove("hidden");
	}
}

function getQuizzes() {
	const promisse = axios.get(URL_QUIZZES);
	promisse.then(putQuizzesOnPage);
	promisse.then(checkUserQuizzes);
}

function putQuizzesOnPage (response) {
	const allQuizzesList = document.querySelector(".all-quizzes .quizz-list");
	
	allQuizzesList.innerHTML = "";

	for (let quizz of response.data) {
		allQuizzesList.innerHTML += `<li class="quizz-item">\
			<img src="${quizz.image}" alt="A image about the quizz">\
			<span class="quizz-description">${quizz.title}</span>\
		</li>`;
	}
	console.log(response.data);
}

function checkUserQuizzes (response) {
	const personalQuizzList = document.querySelector(".personal-quizzes .quizz-list")

	personalQuizzList.innerHTML = "";

	for (let quizz of response.data) {
		if (quizz.id in userQuizzes) {
			personalQuizzList.innerHTML += `<li class="quizz-item">\
				<img src="${quizz.image}" alt="">\
				<span class="quizz-description">${quizz.title}</span>\
			</li>`
		}
	}
}

getQuizzQuestions()

function getQuizzQuestions () {
	const promisse = axios.get(URL_QUIZZES);
	promisse.then(makeBanner);
	promisse.then(putQuestionsOnPage);
}

function makeBanner (response) {
	const test = response.data[0];
	document.querySelector(".banner").innerHTML = `\
		<img src="${test.image}" alt="A banner about the quizz">\
		<h2>${test.title}</h2>`;
}

function putQuestionsOnPage (response) {
	const questions = document.querySelector(".questions ul");
	const test = response.data[0];

	questions.innerHTML = "";

	for (let question of test.questions) {
		questions.innerHTML += `\
		<div class="question-command">\
			<span>${question.title}</span>\
		</div>`;

		for (let answer of question.answers) {
			questions.innerHTML += `<ul class="answers">\
				<li class="answer">\
					<img src="${answer.image}" alt="Resposta">\
					${answer.text}\
				</li>`;
		}
	}
}