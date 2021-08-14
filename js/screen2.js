function getQuizzQuestions(quizzID) {
	const promisse = axios.get(URL_QUIZZES);
	promisse.then(response => {
		document.querySelector(".screen-1").classList.add("hidden");
		document.querySelector(".screen-2").classList.remove("hidden");
		makeBanner(response, quizzID);
		putQuestionsOnPage(response, quizzID);
	});
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
			const questions = document.querySelector(".questions");

			let answers = "";
		
			questions.innerHTML = "";
		
			for (let question of quizz.questions) {
		
				question.answers.sort(() => Math.random() - 0.5);
		
				for (let answer of question.answers) {
					answers += `<li class="answer" onclick="selectAnswer(this);">\
						<img src="${answer.image}" alt="Resposta">\
						${answer.text}\
					</li>`;
				}
		
				questions.innerHTML += `<li class="question">\
					<div style="background-color: ${quizz.color};" class="question-command">\
						<span>${quizz.title}</span>\
					</div>\
					<ul class="answers">${answers}</ul>\
				</li>`;
		
				answers = "";
			}
			break;
		}
	}
}

function selectAnswer (item) {
	if (!item.classList.contains("active") && !item.classList.contains("other")) {
		item.classList.add("active");

		const answers = item.parentNode;
		
		for (let child of answers.children) {
			if (!child.classList.contains("active")) {
				child.classList.add("other");
			}
		}
	}
}