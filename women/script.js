// Tab switching logic
function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Period Tracker
function calculateNextPeriod() {
  const lastDate = document.getElementById('lastPeriod').value;
  const result = document.getElementById('nextPeriodResult');
  if (!lastDate) {
    result.textContent = "Please select your last period date.";
    return;
  }
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + 28); // basic average cycle
  result.textContent = `Your next expected period is: ${nextDate.toDateString()}`;
}

// Daily Wellness Tips
const tips = [
  "Drink 8+ glasses of water daily.",
  "Do 30 mins of physical activity every day.",
  "Take short screen breaks every hour.",
  "Practice deep breathing for 5 minutes.",
  "Eat at least 2 servings of fruits a day.",
  "Avoid skipping meals.",
  "Track your sleep. Aim for 7–9 hrs."
];

function loadTips() {
  const carousel = document.getElementById('tipCarousel');
  carousel.innerHTML = '';
  tips.forEach((tip, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${tip}</p>
      <button onclick="saveTip(${index})">❤️ Save</button>
    `;
    carousel.appendChild(div);
  });
}

function saveTip(index) {
  const saved = JSON.parse(localStorage.getItem('savedTips')) || [];
  if (!saved.includes(tips[index])) {
    saved.push(tips[index]);
    localStorage.setItem('savedTips', JSON.stringify(saved));
    showSavedTips();
  }
}

function removeTip(tip) {
  let saved = JSON.parse(localStorage.getItem('savedTips')) || [];
  saved = saved.filter(t => t !== tip);
  localStorage.setItem('savedTips', JSON.stringify(saved));
  showSavedTips();
}

function showSavedTips() {
  const saved = JSON.parse(localStorage.getItem('savedTips')) || [];
  const list = document.getElementById('savedTips');
  list.innerHTML = saved.map(tip => `
    <li>
      ${tip}
      <button onclick="removeTip('${tip.replace(/'/g, "\\'")}')">Remove</button>
    </li>
  `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTips();
  showSavedTips();
});


// Helpline Filtering
const helplines = [
  { city: "Delhi", contact: "1091 – Women Helpline" },
  { city: "Mumbai", contact: "103 – Women's Safety" },
  { city: "Chennai", contact: "1091 – Police Help" },
  { city: "Bangalore", contact: "181 – Women's Crisis" },
  { city: "Punjab", contact: "1098 – Child & Women" },
  { city: "Kolkata", contact: "1090 – Women Powerline" },
  { city: "Hyderabad", contact: "100 – Police Control Room" },
];

function loadHelplines() {
  const list = document.getElementById('helplineList');
  list.innerHTML = helplines
    .map(h => `<li><strong>${h.city}:</strong> ${h.contact}</li>`)
    .join('');
}

function filterHelplines() {
  const keyword = document.getElementById('searchHelpline').value.toLowerCase();
  const list = document.getElementById('helplineList');
  const filtered = helplines.filter(h => h.city.toLowerCase().includes(keyword));

  if (filtered.length === 0) {
    list.innerHTML = `<li>No helplines found for that location.</li>`;
  } else {
    list.innerHTML = filtered
      .map(h => `<li><strong>${h.city}:</strong> ${h.contact}</li>`)
      .join('');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadHelplines);


// Quiz Section
const quizData = [
  {
    question: "What does the Maternity Benefit Act provide?",
    options: ["12 weeks leave", "18 weeks leave", "26 weeks paid leave", "No leave"],
    answer: "26 weeks paid leave"
  },
  {
    question: "Which act protects women at workplace?",
    options: ["POCSO", "POSH Act", "RTI Act", "None"],
    answer: "POSH Act"
  },
  {
    question: "Is free legal aid available to women?",
    options: ["Yes, under Legal Services Authority Act", "Only to working women", "No", "Only to minors"],
    answer: "Yes, under Legal Services Authority Act"
  }
];

function loadQuiz() {
  const container = document.getElementById('quizContainer');
  container.innerHTML = '';
  document.getElementById('quizResult').textContent = '';

  quizData.forEach((q, i) => {
    const qDiv = document.createElement('div');
    qDiv.classList.add('quiz-question');
    qDiv.innerHTML = `
      <p>Q${i + 1}: ${q.question}</p>
      ${q.options.map(opt => `
        <label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label>
      `).join('')}
    `;
    container.appendChild(qDiv);
  });

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit Quiz';
  submitBtn.onclick = submitQuiz;
  container.appendChild(submitBtn);
}

function submitQuiz() {
  let score = 0;
  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  const resultBox = document.getElementById('quizResult');
  resultBox.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;

  if (score === quizData.length) {
    resultBox.style.color = "#4caf50";
  } else if (score >= quizData.length / 2) {
    resultBox.style.color = "#ff9800";
  } else {
    resultBox.style.color = "#f44336";
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadQuiz);


// Chatbot (basic responses)
// Toggle chatbot visibility
document.getElementById('chatToggleBtn').addEventListener('click', function () {
  const chatBox = document.getElementById('floatingChat');
  chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
});

// Basic Rule-based Bot Logic
function floatingChatBot() {
  const input = document.getElementById('floatingInput');
  const messages = document.getElementById('floatingMessages');
  const userMsg = input.value.trim();

  if (!userMsg) return;

  // Display user message
  messages.innerHTML += `<div><strong>You:</strong> ${userMsg}</div>`;

  // Response logic
  let botReply = "Sorry, Sakhi doesn’t know that yet. Try asking about wellness, rights, periods, or safety.";

  const msg = userMsg.toLowerCase();

  if (msg.includes("period")) {
    botReply = "You can track your period using the 'Period Tracker' tab!";
  } else if (msg.includes("safety")) {
    botReply = "Check out the 'Safety' section for apps and self-defense tips.";
  } else if (msg.includes("rights")) {
    botReply = "Visit the 'Rights' tab to explore legal protections for women.";
  } else if (msg.includes("mental health")) {
    botReply = "Sakhi recommends daily self-care, journaling, and talking to someone you trust.";
  } else if (msg.includes("nutrition") || msg.includes("diet")) {
    botReply = "Include iron-rich greens, calcium, and plenty of water. Visit the Health tab!";
  }
  else if (msg.includes("hello")) {
    botReply = "Hi. How can I assist you?";
  }
    else if (msg.includes("thanks")) {
    botReply = "Is it helpful?";
  }
  else if (msg.includes("yes")) {
    botReply = "Thanks for visiting.";
  }
  else if (msg.includes("no")) {
    botReply = "Sorry, I will help you later.";
  }
   else if (msg.includes("ok")) {
    botReply = "yes";
  }
  // Show bot response
  messages.innerHTML += `<div><strong>Sakhi:</strong> ${botReply}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}



// Load all features on window load
window.onload = function () {
  openTab('health');
  loadTips();
  showSavedTips();
  filterHelplines();
  loadQuiz();
};
