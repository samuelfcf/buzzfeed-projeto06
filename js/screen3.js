let quizz = {
    title: "title",
    image: "urlImage",
    questions: new Array(3),
    levels: new Array(2)
}
let numQuestionsRender=2;
let numLevelsRender;

// first screen
function validateURL(url) {
    const rule = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    return rule.test(url)
}

function isHexCodeColor(color) {
    const rule = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
    return rule.test(color);
}  

function saveQuizzInfoBasics() {
    let title = document.querySelector(".quizz-title").value;
    let urlImage = document.querySelector(".quizz-image-url").value;
    let qtyQuestions = Number(document.querySelector(".quizz-qty-questions").value);
    let levels = Number(document.querySelector(".quizz-level").value);
    console.log(validateURL(urlImage));

    numQuestionsRender = qtyQuestions;
    numLevelsRender = levels;

    if( (title.length < 20 || title.length > 65) || validateURL(urlImage) === false ||(qtyQuestions < 3) || (levels < 2) ) {
        alert("Falhou!")
    } else {
        renderCreateQuestionsSection();        
        quizz = {
            title: title,
            image: urlImage,
            questions: new Array(qtyQuestions),
            levels: new Array(levels)
        }
        console.log(quizz);
    }
}

function renderCreateQuestionsSection() {
    document.querySelector(".screen3-1").classList.add("hidden")

    const questionsQuizz = document.querySelector(".questions-quizz");
    questionsQuizz.innerHTML = `
        <h1>Crie suas perguntas</h1>
    `
    for (let i=0; i < numQuestionsRender; i++) {
        questionsQuizz.innerHTML += `
        <div onclick="openQuestionForm(this)">
        <section class="question-toggle">
            <span>Pergunta ${i+1}</span>
            <img src="./img/icon-create.svg" alt="create-icon" class="create-icon">
        </section>
    </div>
        `
    }
    document.querySelector(".screen3-2").classList.remove("hidden");
}

// second screen
function openQuestionForm(element) {
    element.classList.toggle("hidden");
    const question = element.querySelector("span").innerHTML;

    switch (question) {
        case "Pergunta 1":
            document.querySelector(".question1-form").classList.remove("hidden");
            break;
        case "Pergunta 2":
            document.querySelector(".question2-form").classList.remove("hidden");
            break;    
        case "Pergunta 3":
            document.querySelector(".question3-form").classList.remove("hidden");
            break;
        case "Pergunta 4":
            document.querySelector(".question4-form").classList.remove("hidden");
            break;
    }
}

// trird screen
function next() {
    document.querySelector(".screen3-2").classList.add("hidden");
    document.querySelector(".screen3-3").classList.remove("hidden");
}

function questionInfo(question) {
    const qTitle = document.querySelector(`#q${question}-text`).value;
    const qColor = document.querySelector(`#q${question}-color`).value;

    const qCorrectAnswer = document.querySelector(`#q${question}-correct-answer`).value;
    const qCorrectAnswerURLImage = document.querySelector(`#q${question}-urlimage-correct-answer`).value;

    const qIncorrectAnswer1 = document.querySelector(`#q${question}-incorrect-answer1`).value;
    const qIncorrectAnswer1_URLImage = document.querySelector(`#q${question}-urlimage-incorrect-answer1`).value;

    const qIncorrectAnswer2 = document.querySelector(`#q${question}-incorrect-answer2`).value;
    const qIncorrectAnswer2_URLImage = document.querySelector(`#q${question}-urlimage-incorrect-answer2`).value;

    const qIncorrectAnswer3 = document.querySelector(`#q${question}-incorrect-answer3`).value;
    const qIncorrectAnswer3_URLImage = document.querySelector(`#q${question}-urlimage-incorrect-answer3`).value;

    let answers = [];

    if( (qTitle.length < 20) || 
        (isHexCodeColor(qColor) === false) || 
        (qCorrectAnswer === '' || qIncorrectAnswer1 === '' || qIncorrectAnswer2 === '' || qIncorrectAnswer3 === '') ||
        (validateURL(qCorrectAnswerURLImage) === false || validateURL(qIncorrectAnswer1_URLImage) === false || validateURL(qIncorrectAnswer2_URLImage) === false || validateURL(qIncorrectAnswer3_URLImage) === false) )
        {
            alert("falhou!!!");
        }
     
    else {
        const answer1 = {
            text: qCorrectAnswer,
            image: qCorrectAnswerURLImage,
            isCorrectAnswer: true
        }
    
        const answer2 = {
            text: qIncorrectAnswer1,
            image: qIncorrectAnswer1_URLImage,
            isCorrectAnswer: false
        }
    
        const answer3 = {
            text: qIncorrectAnswer2,
            image: qIncorrectAnswer2_URLImage,
            isCorrectAnswer: false
        }
    
        const answer4 = {
            text: qIncorrectAnswer3,
            image: qIncorrectAnswer3_URLImage,
            isCorrectAnswer: false
        }
    
        answers.push(answer1, answer2, answer3, answer4);
    
        const objQuestion = {
            title: qTitle,
            color: qColor,
            answers: answers,
        }
    
        quizz.questions.push(objQuestion);
    }    
    
    
}

function getAllQuestionsInfo() {
    for(let i=0; i<numQuestionsRender; i++) {
        questionInfo(i+1);
        console.log(quizz)
    }
}

