const URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

getQuizzes();

function getQuizzes() {
	const promisse = axios.get(URL_QUIZZES);
	promisse.then(putQuizzesOnPage);
}

function putQuizzesOnPage (response) {
	const quizzList = document.querySelector(".all-quizzes .quizz-list");
	
	quizzList.innerHTML = "";

	for (quizz of response.data) {
		quizzList.innerHTML += `<li class="quizz-item">
			<img src="${quizz.image}" alt="A image about the quizz">
			<span class="quizz-description">${quizz.title}</span>
		</li>`;
	}
}

