const questions = [
    "ប្រសិនបើមេឃភ្លៀង នោះផ្លូវនឹងសើម តើផ្នែក (មេឃភ្លៀង) ហៅថាអ្វី?",
    "បើ A --> B ជាការពិត ហើយយើងដឹងថា A កើតឡើង តើយើងអាចសន្និដ្ឋានបានបែបណាចំពោះ B?",
    "Soundness Reasoning តើវាត្រូវការលក្ខខណ្ឌអ្វីខ្លះ?",
    "អំណះអំណាងមួយហៅថា (Valid) លុះត្រាតែអ្វី?",
    "តើការគិតបែប Deductive ខុសពី Non-deductive ត្រង់ចំណុចសំខាន់អ្វី?",
    "កាលពីខែមុន Wi-Fi សាលាដើរយឺត ខែនេះក៏នៅតែដើរយឺត ដូច្នេះខែក្រោយប្រហែលជាយឺតទៀត។ តើនេះជាការគិតបែបណា?",
    "តើការប្រើប្រាស់ទិន្នន័យលេខ ឬភាគរយមកធ្វើការសម្រេចចិត្ត ហៅថាអ្វី?"
];

let remainingQuestions = [...questions];
let currentQuestion = null;

let scores = { A: 0, B: 0, C: 0, D: 0 };
let turnOrder = ["A", "B", "C", "D"];
let turnIndex = 0;

function startGame() {
    highlightActiveGroup();
    loadNewQuestion();
}

function loadNewQuestion() {
    if (remainingQuestions.length === 0) {
        endGame();
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions[randomIndex];

    showQuestion(currentQuestion);
}

function showQuestion(text) {
    const q = document.getElementById("question");

    q.style.opacity = 0;
    setTimeout(() => {
        q.innerText = text;
        q.style.opacity = 1;
    }, 200);
}

// ✅ Correct → remove question + next question
function markCorrect(group) {
    scores[group] += 10;
    document.getElementById("score" + group).innerText = scores[group];

    flashEffect(group, "green");

    // remove current question
    remainingQuestions = remainingQuestions.filter(q => q !== currentQuestion);

    nextTurn();
    loadNewQuestion(); // new question
}

// ❌ Wrong → SAME question goes to next team
function markWrong() {
    flashEffect(turnOrder[turnIndex], "red");

    nextTurn();

    // show SAME question again
    showQuestion(currentQuestion);
}

function nextTurn() {
    turnIndex = (turnIndex + 1) % 4;
    document.getElementById("turn").innerText = turnOrder[turnIndex];
    highlightActiveGroup();
}

function highlightActiveGroup() {
    document.querySelectorAll(".group").forEach(g => g.classList.remove("active"));
    document.getElementById(turnOrder[turnIndex]).classList.add("active");
}

function flashEffect(group, color) {
    const el = document.getElementById(group);
    el.style.boxShadow = `0 0 25px ${color}`;

    setTimeout(() => {
        el.style.boxShadow = "";
    }, 400);
}

function endGame() {
    let winner = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    document.getElementById("winner").innerText =
        ` Group ${winner} Wins!`;
}

function resetGame() {
    scores = { A: 0, B: 0, C: 0, D: 0 };
    remainingQuestions = [...questions];
    currentQuestion = null;
    turnIndex = 0;

    ["A","B","C","D"].forEach(g => {
        document.getElementById("score" + g).innerText = 0;
    });

    document.getElementById("turn").innerText = "A";
    document.getElementById("question").innerText = "Click Start to Begin";
    document.getElementById("winner").innerText = "";

    highlightActiveGroup();
}

// init
highlightActiveGroup();