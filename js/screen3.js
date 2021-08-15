let quizz = {}
let idQuizz;
let numQuestionsRender;
let numLevelsRender;

// first screen
const validateURL = (url) => {
    const rule = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    return rule.test(url)
}

const isHexCodeColor = (color) => {
    const rule = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
    return rule.test(color);
}

const nextPage = (currentPage, nextPage) => {
    document.querySelector(`.screen3-${currentPage}`).classList.add("hidden");
    document.querySelector(`.screen3-${nextPage}`).classList.remove("hidden");
}

const saveQuizzInfoBasics = () => {
    const title = document.querySelector(".quizz-title").value;
    const urlImage = document.querySelector(".quizz-image-url").value;
    const qtyQuestions = Number(document.querySelector(".quizz-qty-questions").value);
    const levels = Number(document.querySelector(".quizz-level").value);

    numQuestionsRender = qtyQuestions;
    numLevelsRender = levels;

    if( (title.length < 20 || title.length > 65) || validateURL(urlImage) === false || (qtyQuestions < 3) || (levels < 2) ) {
        alert("Falhou!")
    } else {
        renderCreateQuestionsSection();        
        quizz = {
            title: title,
            image: urlImage,
            questions: [],
            levels: []
        }
        console.log(quizz);
    }
}

const renderCreateQuestionsSection = () => {
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
        <div class="question${i+1}-form hidden">
            <form action="" id="question${i+1}" class="hidden">
                <div class="question">
                    <span>Pergunta ${i+1}</span>
                    <input id="q${i+1}-text" type="text" placeholder="Texto da pergunta" required>
                    <input id="q${i+1}-color" type="text" placeholder="Cor de fundo da pergunta" required>
                </div>
                <div class="correct-answer">
                    <span>Resposta correta</span>
                    <input id="q${i+1}-correct-answer" type="text" placeholder="Resposta correta" required>
                    <input id="q${i+1}-urlimage-correct-answer" type="text" placeholder="URL da imagem" required>
                </div>
                <div class="incorrect-answers">
                    <span>Respostas incorretas</span>
                    <div>
                        <input id="q${i+1}-incorrect-answer1" type="text" placeholder="Resposta incorreta 1" required>
                        <input id="q${i+1}-urlimage-incorrect-answer1" type="text" placeholder="URL da imagem" required>
                    </div>
                    <div>
                        <input id="q${i+1}-incorrect-answer2" type="text" placeholder="Resposta incorreta 2">
                        <input id="q${i+1}-urlimage-incorrect-answer2" type="text" placeholder="URL da imagem">
                    </div>
                    <div>
                        <input id="q${i+1}-incorrect-answer3" type="text" placeholder="Resposta incorreta 3">
                        <input id="q${i+1}-urlimage-incorrect-answer3" type="text" placeholder="URL da imagem">
                    </div>
                </div>
            </form>
        </div>
        `
        
    }
    questionsQuizz.innerHTML += `<button class="next create-level" onclick="getAllQuestionsInfo()">Prosseguir para criar níveis</button>`
    
    nextPage(1,2);
}

// second screen
const openQuestionForm = (element) => {
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
const questionInfo = (question) => {
    let answers = [];
    let haveAnswer3 = true;
    let haveAnswer4 = true;

    const qTitle = document.querySelector(`#q${question}-text`).value;
    const qColor = document.querySelector(`#q${question}-color`).value;

    const qCorrectAnswer = document.querySelector(`#q${question}-correct-answer`).value;
    const qCorrectAnswerURLImage = document.querySelector(`#q${question}-urlimage-correct-answer`).value;

    const qIncorrectAnswer1 = document.querySelector(`#q${question}-incorrect-answer1`).value;
    const qIncorrectAnswer1_URLImage = document.querySelector(`#q${question}-urlimage-incorrect-answer1`).value;

    const qIncorrectAnswer2 = document.querySelector(`#q${question}-incorrect-answer2`).value;
    const qIncorrectAnswer2_URLImage = document.querySelector(`#q${question}-urlimage-incorrect-answer2`).value;
    if (qIncorrectAnswer2 === '' && qIncorrectAnswer2_URLImage === '') {
        haveAnswer3 = false;
    }

    const qIncorrectAnswer3 = document.querySelector(`#q${question}-incorrect-answer3`).value;
    const qIncorrectAnswer3_URLImage = document.querySelector(`#q${question}-urlimage-incorrect-answer3`).value;
    if (qIncorrectAnswer3 === '' && qIncorrectAnswer3_URLImage === '') {
        haveAnswer4 = false;
    }
    
    if ( (qTitle.length < 20) || 
        (isHexCodeColor(qColor) === false) || 
        (qCorrectAnswer === '' || qIncorrectAnswer1 === '' || (haveAnswer3 === true && qIncorrectAnswer2 === '') || (haveAnswer4 === true && qIncorrectAnswer3 === '')) ||
        (validateURL(qCorrectAnswerURLImage) === false || (validateURL(qIncorrectAnswer1_URLImage) === false) || (haveAnswer3 === true && validateURL(qIncorrectAnswer2_URLImage) === false) || (haveAnswer4 === true && validateURL(qIncorrectAnswer3_URLImage) === false)) 
    ) {
        alert("falhou!!!");
    }
     
    else {
        renderLevelConfigSection();

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

        if (haveAnswer3 === true && haveAnswer4 === true) {
            answers.push(answer1, answer2, answer3, answer4);
        } 
        if (haveAnswer3 === true && haveAnswer4 === false) {
            answers.push(answer1, answer2, answer3);
        }
        if (haveAnswer3 === false && haveAnswer4 === true) {
            answers.push(answer1, answer2, answer4);
        }
        if (haveAnswer3 === false && haveAnswer4 === false) {
            answers.push(answer1, answer2);
        }
        
    
        const objQuestion = {
            title: qTitle,
            color: qColor,
            answers: answers,
        }
    
        quizz.questions.push(objQuestion);
    }    
    
}

const getAllQuestionsInfo = () => {
    for(let i=0; i<numQuestionsRender; i++) {
        questionInfo(i+1);
        console.log(quizz)
    }
    nextPage(2,3)
}

const renderLevelConfigSection = () => {
    const levelsQuizz = document.querySelector(".level-quizz");
    levelsQuizz.innerHTML = `
        <h1>Agora, decida os níveis</h1>
    `;

    for (let i=0; i < numLevelsRender; i++) {
        levelsQuizz.innerHTML += `
        <div onclick="openLevelForm(this)">
            <section class="level-toggle">
                <span>Nível ${i+1}</span>
                <img src="./img/icon-create.svg" alt="create-icon" class="create-icon">
            </section>
        </div>
        <div class="level${i+1}-form hidden">
            <form action="" class="level${i+1} hidden">
                <div class="level">
                    <span>Nível ${i+1}</span>
                    <input id="l${i+1}-title" type="text" placeholder="Título do nível">
                    <input id="l${i+1}-percent" type="text" placeholder="% de acerto mínima">
                    <input id="l${i+1}-url-image" type="text" placeholder="URL da imagem do nível">
                    <input id="l${i+1}-description" type="text" placeholder="Descrição do nível">
                </div>
            </form>
        </div> 
        `
    }

    levelsQuizz.innerHTML += `<button class="next submit-quizz" onclick="getAllLevelsInfo()">Finalizar Quizz</button>`
}

const openLevelForm = (element) => {
    element.classList.toggle("hidden");
    const level = element.querySelector("span").innerHTML;

    switch (level) {
        case "Nível 1":
            document.querySelector(".level1-form").classList.remove("hidden");
            break;
        case "Nível 2":
            document.querySelector(".level2-form").classList.remove("hidden");
            break;    
        case "Nível 3":
            document.querySelector(".level3-form").classList.remove("hidden");
            break;
    }
}

const levelInfo = (level) => {
    const lTitle = document.querySelector(`#l${level}-title`).value;
    const lPercent = Number(document.querySelector(`#l${level}-percent`).value);
    const lURlImage = document.querySelector(`#l${level}-url-image`).value;
    const lText = document.querySelector(`#l${level}-description`).value;

    if( (lTitle.length < 10) || 
        (lPercent <= 0 && lPercent >=100 ) || 
        (validateURL(lURlImage) === false) ||
        (lText.length < 30) )
        {
            alert("falhou!!!");
        }

    else {
        const objLevel = {
            title: lTitle,
            image: lURlImage,
            text: lText,
            minValue: lPercent
        }
    
        quizz.levels.push(objLevel);
    }
}

const getAllLevelsInfo = () => {
    for(let i=0; i<numLevelsRender; i++) {
        levelInfo(i+1);
        console.log(quizz);
    }

    sendQuizzToServer();
}

// fourth screen
const renderQuizzImage = () => {
    console.log(document.querySelector(".quiz-is-ready img"))
    document.querySelector(".quiz-is-ready img").src = quizz.image
}

const sendQuizzToServer = () => {
    
    const objRequest = quizz;


    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes", objRequest)
        .then((response) => {
            idQuizz = response.data.id;
            renderQuizzImage();
            nextPage(3,4);
        })
        .catch(err => {
            console.log(err);
        });
}

const backToHome = () => {
   window.location.reload();
}

const accessQuizz = () => {
    document.querySelector(".screen-3").classList.add("hidden");
    getQuizzQuestions(idQuizz);
}