const questions = [
  {
    question: "Who was the first president of the United States?",
    answers: {
      A: "George Washington", // correct answer
      B: "Donald Trump",
      C: "John Adams",
    },
    correctAnswer: "A",
  },
  {
    question:
      "In which year did Christopher Columbus first arrive in the Americas?",
    answers: {
      A: "1492", // correct answer
      B: "1620",
      C: "1776",
    },
    correctAnswer: "A",
  },
  {
    question:
      "What ancient wonder was located in Alexandria, Egypt, and was one of the Seven Wonders of the Ancient World?",
    answers: {
      A: "The Colossus of Rhodes",
      B: "The Great Wall of China",
      C: "The Lighthouse of Alexandria", // correct answer
    },
    correctAnswer: "C",
  },
  {
    question:
      "Which battle, fought in 1066, resulted in William the Conqueror becoming the King of England?",
    answers: {
      A: "The Battle of Hastings", // correct answer
      B: "The Battle of Agincourt",
      C: "The Battle of Bannockburn",
    },
    correctAnswer: "A",
  },
  {
    question:
      "Who was the Egyptian queen known for her relationship with Roman leaders Julius Caesar and Mark Antony?",
    answers: {
      A: "Cleopatra", // correct answer
      B: "Nefertiti",
      C: "Hatshepsut",
    },
    correctAnswer: "A",
  },
  {
    question:
      "What infamous ship sank on its maiden voyage in 1912, leading to one of the deadliest commercial peacetime maritime disasters in modern history?",
    answers: {
      A: "The Millennium Falcon",
      B: "The Titanic", // correct answer
      C: "SS Andrea Doria",
    },
    correctAnswer: "B",
  },
  {
    question:
      "The signing of the Magna Carta in 1215 is considered a significant event in the history of which country?",
    answers: {
      A: "France",
      B: "England", // correct answer
      C: "Spain",
    },
    correctAnswer: "B",
  },
  {
    question: "Who was the first woman to fly solo across the Atlantic Ocean?",
    answers: {
      A: "Amelia Earhart", // correct answer
      B: "Bessie Coleman",
      C: "Harriet Quimby",
    },
    correctAnswer: "A",
  },
  {
    question: "During which war was the Battle of Gettysburg fought?",
    answers: {
      A: "World War II",
      B: "American Civil War", // correct answer
      C: "Korean War",
    },
    correctAnswer: "B",
  },
  {
    question:
      "What was the code name for the Allied invasion of Normandy during World War II?",
    answers: {
      A: "Operation Market Garden", // correct answer
      B: "Operation Barbarossa",
      C: "Operation Overlord",
    },
    correctAnswer: "A",
  },
];

// global variables
let currentQuestionIndex = 0;
const answerButtons = document.querySelectorAll(
  ".question-container ul li button"
);
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

let score = 0;
let gameStarted = false;

// Function to reset the game
function resetGame() {
  score = 0;
  currentQuestionIndex = 0;
  gameStarted = false;
  updateScoreDisplay();
  startButton.style.display = "block";
  feedback.style.display = "block";
  resetButton.style.display = "none"; // Hide the reset button
  displayQuestion(currentQuestionIndex); // Display the first question
}

resetButton.addEventListener("click", resetGame);

// Function to display a question
function displayQuestion(index) {
  const questionContainers = document.querySelectorAll(".question-container");
  questionContainers.forEach((container, i) => {
    if (i === index) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });

  if (gameStarted) {
    updateAnswerButtons(); // Enable answer buttons
  }
}

// Function to update the score display
function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

// Function to enable or disable answer buttons
function updateAnswerButtons() {
  answerButtons.forEach((button) => {
    button.disabled = !gameStarted;
  });
}

// Function to handle the answer submission and move to the next question
function handleAnswerSubmission(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    feedback.textContent = "Correct!";
    score++;
  } else {
    feedback.textContent = "Incorrect!";
  }

  feedback.style.display = "block";
  updateAnswerButtons(); // Disable answer buttons
  updateScoreDisplay(); // Update the score display

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex);
      feedback.style.display = "none";
    } else {
      feedback.textContent = `Game over! Your final score is ${score} out of ${questions.length}`;
      feedback.style.display = "block";
      resetButton.style.display = "block"; // Show the reset button
    }
  }, 2000); // Adjust the delay as needed
}

// Event listener for the start button
startButton.addEventListener("click", function () {
  startButton.style.display = "none"; // Hide the start button
  gameStarted = true;
  displayQuestion(currentQuestionIndex); // Start the game by displaying the first question
  updateAnswerButtons(); // Initialize the answer buttons
});

// Event listener for answer buttons
answerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedAnswer = this.className;
    handleAnswerSubmission(selectedAnswer);
  });
});
