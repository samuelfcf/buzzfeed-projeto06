const initialScreen1 = `\
<section class="create-initial-quizz">\
	<div class="container">\
		<p>Você não criou nenhum quizz ainda :(</p>\
		<button class="create-quizz">Criar Quizz</button>\
	</div>\
</section>\
<section class="personal-quizzes hidden">\
	<div class="container">\
		<div class="title">\
			<h3>Seus Quizzes</h3>\
			<img class="btn" src="img/Group 22.svg" alt="Create a new quizz">\
		</div>\

		<ul class="quizz-list"></ul>\
	</div>\
</section>\
<section class="all-quizzes">\
	<div class="container">\
		<h3>Todos os Quizzes</h3>\
		<ul class="quizz-list"></ul>\
	</div>\
</section>`;

const initialScreen2 = `\
<div class="banner"></div>\
<div class="container">\
	<ul class="questions"></ul>\
</div>`;

function getQuizzQuestions(quizzID) {
	const promisse = axios.get(URL_QUIZZES);
	promisse.then(response => {
		document.querySelector(".screen-1").classList.add("hidden");
		document.querySelector(".screen-2").classList.remove("hidden");
		makeBanner(response, quizzID);
		putQuestionsOnPage(response, quizzID);
	});
	scrollTo(0, 0);
}

function makeBanner(response, quizzID) {
	for (let quizz of response.data) {
		if (quizz.id === quizzID) {
			document.querySelector(".banner").innerHTML = `\
			<img src="${quizz.image}" alt="A banner about the quizz">\
			<h2>${quizz.title}</h2>`;
			break;
		}
	}
}

function putQuestionsOnPage(response, quizzID) {
	for (let quizz of response.data) {
		if (quizz.id === quizzID) {
			const questions = document.querySelector(".screen-2 .questions");
			let answers = "";
			quizzObject = quizz;
			questions.innerHTML = "";
			for (let question of quizz.questions) {
				question.answers.sort(() => Math.random() - 0.5);
				for (let answer of question.answers) {
					answers += `<li class="answer ${answer.isCorrectAnswer}" onclick="selectAnswer(this);">\
						<img src="${answer.image}" alt="Resposta">\
						${answer.text}\
					</li>`;
				}
				questions.innerHTML += `<li id="question-${quizz.questions.indexOf(question)}" class="question">\
					<div style="background-color: ${quizz.color};" class="question-command">\
						<span>${question.title}</span>\
					</div>\
					<ul class="answers">${answers}</ul>\
				</li>`;
				answers = "";
			}
			break;
		}
	}
}

function selectAnswer(item) {
	if (!item.classList.contains("active") && !item.classList.contains("other")) {
		const answers = item.parentNode;
		const question = answers.parentNode;
		item.classList.add("active");
		for (let child of answers.children) {
			if (!child.classList.contains("active")) {
				child.classList.add("other");
			}

			if (child.classList.contains("true")) {
				child.classList.add("correct");
			} else {
				child.classList.add("wrong");
			}
		}
		addAnsweredToQuestion(question);
		scrollToNextQuestion(question);
	}
}

function addAnsweredToQuestion (question) {
	question.classList.add("answered");
}

function scrollToNextQuestion(question) {
	const questionID = Number(question.id.substr(9));
	const heigth = document.querySelector(`#question-${questionID}`).getBoundingClientRect().height;
	setTimeout(() => {
		putFinalScore();
		scrollTo(0, 200 + (questionID + 1) * heigth);
	}, 2000);
}

function putFinalScore () {
	
	const questions = document.querySelectorAll(".question");
	if (document.querySelector(".final-score") !== null) return;
	for (let question of questions) {
		if (!question.classList.contains("answered")) {
			return;
		}
	}
	const rigthQuestions = document.querySelectorAll(".active.true").length;
	const score = Math.ceil(rigthQuestions / questions.length * 100);
	let title;
	let image;
	let text;
	for (let level of quizzObject.levels.reverse()) {
		if (score >= level.minValue) {
			title = level.title;
			image = level.image;
			text = level.text;
			break;
		}
	}
	document.querySelector(".screen-2 .questions").innerHTML += `<li class="final-score question">\
		<span class="final-title">${score}% de acerto! ${title}</span>
		<div class="final-info">
			<img src="${image}">
			<p>${text}</p>
		</div>
		<button onclick="restartGame();" class="restart">Reiniciar quizz</button>
		<button onclick="goInitialPage();"class="go-home">Voltar para home</button>
	</li>`;
}

function restartGame () {
	document.querySelector(".screen-2").innerHTML = initialScreen2;
	getQuizzQuestions(quizzObject.id);
}

function goInitialPage () {
	const screen1 = document.querySelector(".screen-1");
	const screen2 = document.querySelector(".screen-2");
	screen1.innerHTML = initialScreen1;
	getQuizzes();
	screen1.classList.remove("hidden");
	screen2.innerHTML = initialScreen2;
	screen2.classList.add("hidden");
	scrollTo(0, 0);
}