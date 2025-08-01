// Theme toggle
var themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('change', function () {
  if (themeSwitch.checked) {
    document.body.style.backgroundColor = '#1c1c1e';
    document.body.style.color = '#ffffff';
  } else {
    document.body.style.backgroundColor = '#f0f2f5';
    document.body.style.color = '#000000';
  }
});

// Basic quiz data
var questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size"],
    answer: "font-size"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<script>", "<javascript>"],
    answer: "<script>"
  }
];

var currentIndex = 0;

var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");
var nextBtn = document.getElementById("nextBtn");

// Load a question
function showQuestion() {
  var currentQuestion = questions[currentIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(function(option) {
    var btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = function () {
      if (option === currentQuestion.answer) {
        alert("Correct!");
      } else {
        alert("Wrong answer.");
      }
    };
    optionsEl.appendChild(btn);
  });
}

// Next question
nextBtn.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Quiz completed!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

showQuestion();
