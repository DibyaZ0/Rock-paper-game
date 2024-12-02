const btnEle = document.querySelectorAll("#rock, #paper, #scissor");

const userScoreEle = document.getElementById("user-score");
const compScoreEle = document.getElementById("comp-score");
const resutlEle = document.getElementById("result");

const rulesBtn = document.getElementById("btn"); 
const gameRule = document.querySelector(".game-rule"); 
const closeBtn = document.querySelector(".close"); 
const X = document.querySelector(".X");

let userScore = 0;
let compScore = 0;

// Load the scores from localStorage
const loadTheScore = () => {
    const storedYourScore = localStorage.getItem("user-score");
    const storedComputerScore = localStorage.getItem("comp-score");

    if (storedYourScore) {
        userScore = parseInt(storedYourScore);
        userScoreEle.textContent = userScore;
    }

    if (storedComputerScore) {
        compScore = parseInt(storedComputerScore);
        compScoreEle.textContent = compScore;
    }
};
loadTheScore();

// Save scores to localStorage
const saveScores = () => {
    localStorage.setItem("user-score", userScore);
    localStorage.setItem("comp-score", compScore);
};


function compChoice() {
    const choices = ["rock", "paper", "scissor"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}


function playRound(userSelection, compSelection) {
    if (userSelection === compSelection) {
        return "It's a tie!";
    } else if (
        (userSelection === "rock" && compSelection === "scissor") ||
        (userSelection === "paper" && compSelection === "rock") ||
        (userSelection === "scissor" && compSelection === "paper")
    ) {
        userScore++;
        userScoreEle.textContent = userScore;
        saveScores();
        return `You won! ${userSelection} beats ${compSelection}`;
    } else {
        compScore++;
        compScoreEle.textContent = compScore;
        saveScores();
        return `You lose! ${compSelection} beats ${userSelection}`;
    }
}

btnEle.forEach((btn) => {
    btn.addEventListener("click", () => {
        const result = playRound(btn.id, compChoice());
        resutlEle.textContent = result;
    });
});

// Add event listeners for the "Rules" button
rulesBtn.addEventListener("click", () => {
    gameRule.classList.add('visible');
    X.classList.add("close");
    console.log("btn clicked");
});

// Add event listener for the close button
closeBtn.addEventListener("click", () => {
    gameRule.classList.remove("visible");
    X.classList.remove("close");
});


const nextBtn = document.querySelector(".nextbtn");
const winPage = document.querySelector(".win-page");
const losePage = document.createElement("div");


losePage.classList.add("lose-page");
losePage.innerHTML = `
    <h1>Oops!</h1>
    <h2>YOU LOST THE GAME</h2>
    <button onclick="resetGame()">PLAY AGAIN</button>
`;
document.body.appendChild(losePage);
losePage.style.display = "none";

nextBtn.addEventListener("click", () => {
    if (userScore > compScore) {
        winPage.style.display = "block";
        losePage.style.display = "none";
    } else {
        losePage.style.display = "block";
        winPage.style.display = "none";
    }
});

function resetGame() {
    userScore = 0;
    compScore = 0;
    userScoreEle.textContent = userScore;
    compScoreEle.textContent = compScore;
    saveScores();
    localStorage.setItem("user-score", 0);
    localStorage.setItem("comp-score", 0);
    winPage.style.display = "none";
    losePage.style.display = "none";
    resutlEle.textContent = "Result...";
}


