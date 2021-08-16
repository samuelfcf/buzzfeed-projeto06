const URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

let userQuizzes = [];
let quizzObject;

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
			<img id="all-${quizz.id}" src="${quizz.image}" alt="A image about the quizz">\
			<span class="quizz-description">${quizz.title}</span>\
		</li>`;
	}

	for (let quizz of allQuizzesList.children) {		
		quizz.addEventListener("click", event => {
			quizzID = Number(event.target.id.substr(4));
			const finalScore = document.querySelector(".final-score");
			if (finalScore !== null) {
				finalScore.remove()
			}
			getQuizzQuestions(quizzID);
		});
	}
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