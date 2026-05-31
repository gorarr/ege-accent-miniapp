const words = [
  {
    a: "звОнит",
    b: "звонИт",
    correct: "звонИт"
  },
  {
    a: "тОрты",
    b: "тортЫ",
    correct: "тОрты"
  },
  {
    a: "красИвее",
    b: "красивЕе",
    correct: "красИвее"
  },
  {
    a: "обеспЕчение",
    b: "обеспечЕние",
    correct: "обеспЕчение"
  },
  {
    a: "кАталог",
    b: "каталОг",
    correct: "каталОг"
  },
  {
    a: "квАртал",
    b: "квартАл",
    correct: "квартАл"
  },
  {
    a: "диспАнсер",
    b: "диспансЕр",
    correct: "диспансЕр"
  },
  {
    a: "слИвовый",
    b: "сливОвый",
    correct: "слИвовый"
  },
  {
    a: "аэропОрты",
    b: "аэропортЫ",
    correct: "аэропОрты"
  },
  {
    a: "балОванный",
    b: "баловАнный",
    correct: "балОванный"
  }
];

let currentQuestion = 0;
let score = 0;

const progress = document.getElementById("progress");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const feedback = document.getElementById("feedback");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const resultText = document.getElementById("resultText");

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

function showQuestion() {
  const item = words[currentQuestion];

  progress.textContent = `Вопрос ${currentQuestion + 1} из ${words.length}`;
  feedback.textContent = "";
  feedback.className = "";

  optionA.textContent = item.a;
  optionB.textContent = item.b;

  optionA.onclick = () => checkAnswer(item.a);
  optionB.onclick = () => checkAnswer(item.b);
}

function checkAnswer(answer) {
  const item = words[currentQuestion];

  if (answer === item.correct) {
    score++;
    feedback.textContent = "Правильно ✅";
    feedback.className = "correct";
  } else {
    feedback.textContent = `Неправильно. Верно: ${item.correct}`;
    feedback.className = "wrong";
  }

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < words.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 900);
}

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  scoreText.textContent = `Твой результат: ${score} из ${words.length}`;

  if (score >= 8) {
    resultText.textContent = "Сильно! Задание 4 почти закрыто.";
  } else if (score >= 5) {
    resultText.textContent = "Неплохо, но ошибки ещё есть. Надо повторять.";
  } else {
    resultText.textContent = "Пока слабовато. Но это легко натренировать.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  result.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
}

showQuestion();