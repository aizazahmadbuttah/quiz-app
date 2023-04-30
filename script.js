const quizData = [
    {
      question: "What is the capital of France?",
      answers: [
        "Paris",
        "London",
        "Berlin",
        "Madrid"
      ],
      correctAnswer: "Paris"
    },
    {
      question: "What is the currency of Japan?",
      answers: [
        "Yen",
        "Dollar",
        "Euro",
        "Pound"
      ],
      correctAnswer: "Yen"
    },
    {
      question: "What is the tallest mountain in the world?",
      answers: [
        "Kilimanjaro",
        "Mount Everest",
        "K2",
        "Denali"
      ],
      correctAnswer: "Mount Everest"
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        "Venus",
        "Mars",
        "Jupiter",
        "Saturn"
      ],
      correctAnswer: "Jupiter"
    }
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const quizContainer = document.querySelector(".quiz");
  const scoreContainer = document.createElement("div");
  const restartButton = document.createElement("button");
  
  scoreContainer.classList.add("score-container");
  quizContainer.appendChild(scoreContainer);
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.classList.add("hide");
  
    // Show first question
    showQuestion();
  
    // Show next question on click
    nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    });
  }
  
  function showQuestion() {
    // Reset answer buttons
    resetAnswerButtons();
  
    // Show question and answers
    questionElement.innerText = quizData[currentQuestionIndex].question;
    quizData[currentQuestionIndex].answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer;
      button.classList.add("btn");
      answerButtonsElement.appendChild(button);
      button.addEventListener("click", () => {
        checkAnswer(answer);
      });
    });
  
    // Hide next button on last question
    if (currentQuestionIndex === quizData.length - 1) {
      nextButton.classList.add("hide");
      restartButton.innerText = "Restart";
      restartButton.classList.remove("hide");
      restartButton.addEventListener("click", () => {
        startQuiz();
      });
    }
  
    // Update score
    scoreContainer.innerText = `Score: ${score}`;
  }
  
  function resetAnswerButtons() {
    answerButtonsElement.innerHTML = "";
  }
  
  function checkAnswer(answer) {
    if (answer === quizData[currentQuestionIndex].correctAnswer) {
      score++;
      scoreContainer.classList.remove("incorrect");
      scoreContainer.classList.add("correct");
      scoreContainer.innerText = "Correct!";
    } else {
      scoreContainer.classList.remove("correct");
      scoreContainer.classList.add("incorrect");
      scoreContainer.innerText = "Incorrect!";
    }
  }
  
  function endQuiz() {
    questionElement.innerText = `Your final score is ${score}/${quizData.length}`;
    resetAnswerButtons();
    nextButton.classList.add("hide");
    restartButton.innerText = "Restart";
    restartButton.classList.remove("hide");
    restartButton.addEventListener("click", () => {
      startQuiz();
    });
    answerButtonsElement.appendChild(restartButton);
  }
  
  startQuiz();
  