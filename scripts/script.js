let activeGame = 0;
let currentQuestion = 0;
let rightAnswers = 0;
const SUM_OF_ANSWERS = 4;
const AUDIO_SUCCESS = new Audio('sounds/success.mp3');
const AUDIO_FAIL = new Audio('sounds/wrong.wav');
const AUDIO_END_GOOD = new Audio('sounds/cheer.wav');
const AUDIO_END_NOTGOOD = new Audio('sounds/not-good.wav');


// Initialsierungsfunktion der QuizApp
function init(game, question, value, startedGame) {
    activeGame = game;
    currentQuestion = question;
    isGamerEnded(value);
    isGameStarted(startedGame);
}


function isGamerEnded(value) {
    if (!value) {
        document.getElementById('endscreen-content').classList.add('d-none');
        rightAnswers = 0;
    }
}


// Überprüfung ob Ein Spiel gestartet wurde, wenn nicht wird der Startbildschirm angezeigt
function isGameStarted(startedGame) {
    if (startedGame) {
        document.getElementById('startscreen-content').classList.add('d-none');
        callFunctions();
    } else {
        showStartScreen();
    }
}


function callFunctions() {
    growProgressBar(0);
    switchButton(); 
    showQuestionScreen();
    renderQuestions();
    disableAnswerButtons(false);
    removeAnswerStyles();
}


// Änderungen des Zustands vom Nächte-Frage-Button ("Nächste Frage" oder "Quiz beenden")
function switchButton() {
    if (currentQuestion == 3) {
        document.getElementById('next-question').innerText = 'Quiz beenden';
        document.getElementById('next-question').classList.remove('btn-next');
        document.getElementById('next-question').classList.add('btn-end');
    } else {
        document.getElementById('next-question').innerText = 'Nächste Frage';
        document.getElementById('next-question').classList.add('btn-next');
        document.getElementById('next-question').classList.remove('btn-end')
    }
}


// Anzeige des Startscreens
function showStartScreen() {
    document.getElementById('startscreen-content').classList.remove('d-none');
    document.getElementById('quiz-content').classList.add('d-none');
    document.getElementById('category-start').innerText = games[activeGame]['category'];
}


// Renderfunktion für die jeweiligen Fragen
function renderQuestions() {
    let question = games[activeGame]['questions'][currentQuestion];
    let questionText = question ['question'];
    document.getElementById('question').innerHTML = questionText;
    for (let i = 1; i <= SUM_OF_ANSWERS; i++) {
         document.getElementById(`answer-${i}`).innerHTML = question [`answer-${i}`];  
    }
    document.getElementById('next-question').disabled = true; // Deaktiviert Nächte Frage Button
    renderQuestionNumbers();
}


// Anzeige der aktuellen Frage sowie die Gesamtanzahl aller Fragen pro Quiz
function renderQuestionNumbers() {
    document.getElementById('current-question').innerText = currentQuestion + 1;
    document.getElementById('all-questions').innerText = games[activeGame]['questions'].length;
}


// Überprüfung auf letze Frage im Quiz, ansonsten nächste Frage
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion == 4) {
        currentQuestion = 0;
        showEndScreen();
    } else {
        init(activeGame, currentQuestion, true, true);
    }
}


function checkAnswer(answer) {
    growProgressBar(1);
    let rightAnswer = games[activeGame]['questions'][currentQuestion]['right-answer'];
    disableAnswerButtons(true);
    isAnswerRight(answer, rightAnswer);
    document.getElementById('next-question').disabled = false; // Aktiviert Nächste Frage Button nach Antwort
}


// Überprüfung der Antwort und Abspielen des Endsounds
function isAnswerRight(answer, rightAnswer) {
    if (answer == rightAnswer) {
        rightAnswers++;
        addAnswerStyles(true, answer, rightAnswer);
        AUDIO_SUCCESS.play();
    }
    else {
        addAnswerStyles(false, answer, rightAnswer);
        AUDIO_FAIL.play();
    }
}


// De- bzw. Aktivierung der Antwort-Buttons
function disableAnswerButtons(value) {
    for (let i = 1; i <= SUM_OF_ANSWERS; i++) {
        document.getElementById(`answer-btn-${i}`).disabled = value;
    }
}


// Styling der Antwort-Buttons (richtig oder falsch)
function addAnswerStyles(value, answer, rightAnswer) {
    if (value) {
        document.getElementById(`answer-btn-${rightAnswer}`).classList.add('right-answer');
    } else {
        document.getElementById(`answer-btn-${answer}`).classList.add('false-answer');
        document.getElementById(`answer-btn-${rightAnswer}`).classList.add('right-answer');
    }
    
}


// Reset der Styles aller Antwort-Buttons
function removeAnswerStyles() {
    for (let i = 1; i <= SUM_OF_ANSWERS; i++) {
        document.getElementById(`answer-btn-${i}`).classList.remove('false-answer');
        document.getElementById(`answer-btn-${i}`).classList.remove('right-answer'); 
    }
}


// Anzeige des Question Screens
function showQuestionScreen() {
    document.getElementById('quiz-content').classList.remove('d-none');
    document.getElementById('endscreen-content').classList.add('d-none');
}


// Anzeige des Endsceens
function showEndScreen() {
    startedGame = false;
    document.getElementById('quiz-content').classList.add('d-none');
    document.getElementById('endscreen-content').classList.remove('d-none');
    document.getElementById('category-end').innerHTML = games[activeGame]['category'];
    document.getElementById('right-answers').innerHTML = rightAnswers;
    playEndSound();
}


// Funktion zum Wachsen der Progessbar
function growProgressBar(value) {
    let percent = (currentQuestion + value) / 4;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}


// Spielt einen Endsound je nach Ergebnis (Positiv: Mindestens 2 richtige Antworten)
// Trophäe wir bei mind. 2 richtigen Antworten Angezeigt
function playEndSound() {
    if (rightAnswers >= 2) { 
        AUDIO_END_GOOD.play();
        document.getElementById('tropy').classList.remove('d-none');
    } else {
        AUDIO_END_NOTGOOD.play();
        document.getElementById('tropy').classList.add('d-none');
    }
}


// Öffnet bzw. schließt Impressum und Datenschutz Overlays
function showOverlay(choice, value) {
    if (!value) {
        document.getElementById(`${choice}`).classList.remove('d-none');
    } else {
        document.getElementById(`${choice}`).classList.add('d-none');
    }
    
}


// Hinweisfunktion auf noch nicht vorhandene Features
function notAvailable() {
    alert('Diese Funktion steht noch nicht zur Verfügung!');
}