const allWords = [
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
  },
  {
    a: "дОсуг",
    b: "досУг",
    correct: "досУг"
  },
  {
    a: "жалЮзи",
    b: "жалюзИ",
    correct: "жалюзИ"
  },
  {
    a: "цемЕнт",
    b: "цЕмент",
    correct: "цемЕнт"
  },
  {
    a: "свЁкла",
    b: "свеклА",
    correct: "свЁкла"
  },
  {
    a: "щАвель",
    b: "щавЕль",
    correct: "щавЕль"
  },
  {
    a: "оптОвый",
    b: "Оптовый",
    correct: "оптОвый"
  },
  {
    a: "включИт",
    b: "вклЮчит",
    correct: "включИт"
  },
  {
    a: "облегчИть",
    b: "облЕгчить",
    correct: "облегчИть"
  },
  {
    a: "углубИть",
    b: "углУбить",
    correct: "углубИть"
  },
  {
    a: "начАв",
    b: "нАчав",
    correct: "начАв"
  },
  {
    a: "понЯв",
    b: "пОняв",
    correct: "понЯв"
  },
  {
    a: "принЯв",
    b: "прИняв",
    correct: "принЯв"
  },
  {
    a: "созЫв",
    b: "сОзыв",
    correct: "созЫв"
  },
  {
    a: "принУдить",
    b: "прИнудить",
    correct: "принУдить"
  },
  {
    a: "шАрфы",
    b: "шарфЫ",
    correct: "шАрфы"
  },
  {
    a: "бАнты",
    b: "бантЫ",
    correct: "бАнты"
  },
  {
    a: "крАны",
    b: "кранЫ",
    correct: "крАны"
  },
  {
    a: "чЕрпать",
    b: "черпАть",
    correct: "чЕрпать"
  },
  {
    a: "плодоносИть",
    b: "плодонОсить",
    correct: "плодоносИть"
  },
  {
    a: "вероисповЕдание",
    b: "вероисповедАние",
    correct: "вероисповЕдание"
  }
];

let words = [];
let currentQuestion = 0;
let score = 0;
let mistakes = [];

const progress = document.getElementById("progress");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const feedback = document.getElementById("feedback");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const resultText = document.getElementById("resultText");
const mistakesList = document.getElementById("mistakesList");

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  words = shuffleArray([...allWords]).slice(0, 10);
  currentQuestion = 0;
  score = 0;
  mistakes = [];

  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  const item = words[currentQuestion];

  progress.textContent = `Вопрос ${currentQuestion + 1} из ${words.length}`;
  feedback.textContent = "";
  feedback.className = "";

  optionA.textContent = item.a;
  optionB.textContent = item.b;

  optionA.disabled = false;
  optionB.disabled = false;

  optionA.onclick = () => checkAnswer(item.a);
  optionB.onclick = () => checkAnswer(item.b);
}

function checkAnswer(answer) {
  const item = words[currentQuestion];

  optionA.disabled = true;
  optionB.disabled = true;

  if (answer === item.correct) {
    score++;
    feedback.textContent = "Правильно ✅";
    feedback.className = "correct";
  } else {
    feedback.textContent = `Неправильно. Верно: ${item.correct}`;
    feedback.className = "wrong";

    mistakes.push({
      selected: answer,
      correct: item.correct
    });
  }

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < words.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
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

  showMistakes();
}

function showMistakes() {
  if (!mistakesList) return;

  if (mistakes.length === 0) {
    mistakesList.innerHTML = `
      <div class="mistake good">
        Ошибок нет. Красавчик ✅
      </div>
    `;
    return;
  }

  mistakesList.innerHTML = mistakes.map((mistake) => {
    return `
      <div class="mistake">
        <div>Ты выбрал: <span class="bad-answer">${mistake.selected}</span></div>
        <div>Правильно: <span class="good-answer">${mistake.correct}</span></div>
      </div>
    `;
  }).join("");
}

function restartQuiz() {
  startQuiz();
}

startQuiz();