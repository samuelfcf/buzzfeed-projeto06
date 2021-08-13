let quizz = {};
let numQuestionsRender;
let numLevelsRender;

// first screen
function validateURL(url) {
    const rule = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    return rule.test(url)
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

// ultima função feita é a de rnederizar niveis.