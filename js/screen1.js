const URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

const userQuizzes = [];
let quizzObject;

const personalQuizzes = document.querySelector(".personal-quizzes");
const createQuizzButtons = document.querySelectorAll(".create-quizz");

createQuizzButtons.forEach(btn => {
	btn.addEventListener("click", () => {
		document.querySelector(".screen-1").classList.add("hidden");
		document.querySelector(".screen-3").classList.remove("hidden");
	})
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
	promisse.then(putPersonalQuizzes);
}

function putQuizzesOnPage (response) {
	const allQuizzesList = document.querySelector(".all-quizzes .quizz-list");
	putQuizzesOnHTML(allQuizzesList, response.data);
	putPersonalQuizzes();
}

function putPersonalQuizzes() {
	const quizzesOnStorage = localStorage.getItem("userQuizzes")
	const quizzesObject = JSON.parse(quizzesOnStorage);
	if (quizzesObject.length > 0) {
		const personalQuizzesList = document.querySelector(".personal-quizzes .quizz-list");
		document.querySelector(".create-initial-quizz").classList.add("hidden");
		document.querySelector(".personal-quizzes").classList.remove("hidden");
		putQuizzesOnHTML(personalQuizzesList, quizzesObject);
	}
}

function putQuizzesOnHTML(htmlObj, quizzList) {
	htmlObj.innerHTML = "";
	for (let quizz of quizzList) {
		htmlObj.innerHTML += `<li class="quizz-item">\
			<img id="all-${quizz.id}" src="${quizz.image}" alt="A image about the quizz">\
			<span class="quizz-description">${quizz.title}</span>\
		</li>`;
	}

	for (let quizz of htmlObj.children) {		
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