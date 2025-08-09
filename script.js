// Theme toggle
const themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('change', function () {
  if (themeSwitch.checked) {
    document.body.style.backgroundColor = '#1c1c1e';
    document.body.style.color = '#ffffff';
  } else {
    document.body.style.backgroundColor = '#f0f2f5';
    document.body.style.color = '#000000';
  }
});

// Quiz data (expanded)
const questions = [
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
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "style", "font"],
    answer: "style"
  },
  {
    question: "Which is the correct CSS syntax to change the background color?",
    options: ["background-color: blue;", "bgcolor: blue;", "color-background: blue;"],
    answer: "background-color: blue;"
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    options: ["msg('Hello World');", "alert('Hello World');", "alertBox('Hello World');"],
    answer: "alert('Hello World');"
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ul>", "<ol>", "<li>"],
    answer: "<ul>"
  },
  {
    question: "Which property is used to change the font of an element in CSS?",
    options: ["font-family", "font-weight", "font-style"],
    answer: "font-family"
  },
  {
    question: "How do you add a comment in a CSS file?",
    options: ["// this is a comment", "/* this is a comment */", "<!-- this is a comment -->"],
    answer: "/* this is a comment */"
  }
];

let currentIndex = 0;
let score = 0;
let selectedOption = null;
let correctCount = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

// Feedback element
let feedbackEl = document.createElement('div');
feedbackEl.id = 'feedback';
feedbackEl.style.marginTop = '10px';
feedbackEl.style.fontWeight = 'bold';
optionsEl.parentNode.insertBefore(feedbackEl, nextBtn);

function showQuestion() {
  const currentQuestion = questions[currentIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  selectedOption = null;
  nextBtn.disabled = true;

  currentQuestion.options.forEach(function(option, idx) {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.setAttribute('type', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-label', option);
    btn.onclick = function () {
      // Remove active state from all buttons
      Array.from(optionsEl.children).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOption = option;
      nextBtn.disabled = false;
      feedbackEl.textContent = '';
    };
    optionsEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", function () {
  if (!selectedOption) {
    feedbackEl.textContent = "Please select an answer before proceeding.";
    return;
  }
  const currentQuestion = questions[currentIndex];
  let isCorrect = selectedOption === currentQuestion.answer;
  if (isCorrect) {
    feedbackEl.textContent = "Correct! ";
    feedbackEl.style.color = 'green';
    score++;
    correctCount++;
  } else {
    feedbackEl.textContent = `Wrong answer. Correct: ${currentQuestion.answer}`;
    feedbackEl.style.color = 'red';
    score--; // Subtract 1 for wrong answer
  }
  // Always show the correct answer after answering
  if (!isCorrect) {
    feedbackEl.textContent += ` The correct answer is: ${currentQuestion.answer}`;
  }
  // Wait a moment before moving to next question
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      // Show new slide with marks out of 7 and correct answers
      let marksOutOf7 = Math.max(0, score); // Minimum 0
      const container = document.querySelector('.container');
      container.innerHTML = `
        <div style="text-align:center; padding: 40px 0;">
          <h1>Quiz Completed!</h1>
          <p style="font-size:1.5rem; font-weight:bold;">Your Marks: <span style='color:#2d2f39;'>${marksOutOf7} / 7</span></p>
          <p style="font-size:1.2rem;">Total Correct Answers: <span style='color:green;'>${correctCount}</span></p>
          <p style="color:#888;">(Each correct answer: +1, each wrong answer: -1, minimum 0)</p>
        </div>
      `;
    }
  }, 900);
});

showQuestion();
