// ===== Contadores animados =====
const counters = document.querySelectorAll('[data-counter]');
const animateCounter = (el) => {
  const target = +el.dataset.counter;
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(p * target);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      if (e.target.hasAttribute('data-counter')) animateCounter(e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('[data-reveal], [data-counter]').forEach(el => io.observe(el));

// ===== Quiz =====
const questions = [
  {
    q: 'O que é agricultura sustentável?',
    options: [
      'Produzir o máximo possível sem se preocupar com o solo',
      'Equilibrar produção, meio ambiente e qualidade de vida',
      'Usar apenas máquinas modernas',
      'Plantar somente em estufas'
    ],
    correct: 1
  },
  {
    q: 'Qual prática ajuda a preservar nascentes no campo?',
    options: [
      'Desmatar áreas próximas para plantar mais',
      'Manter a mata ciliar ao redor dos rios',
      'Drenar o solo úmido',
      'Queimar restos de vegetação'
    ],
    correct: 1
  },
  {
    q: 'Como a tecnologia ajuda o agro a ser mais verde?',
    options: [
      'Usando drones e dados para aplicar só o necessário',
      'Aumentando o uso de combustível',
      'Removendo árvores com mais rapidez',
      'Plantando sem planejamento'
    ],
    correct: 0
  },
  {
    q: 'Por que o campo e a cidade dependem um do outro?',
    options: [
      'Porque a cidade produz o alimento',
      'Porque o campo produz alimento e a cidade consome e oferece serviços',
      'Porque não dependem',
      'Porque o campo só serve para turismo'
    ],
    correct: 1
  }
];

const qBox = document.getElementById('quizBox');
const qResult = document.getElementById('quizResult');
const qTitle = document.getElementById('quizQuestion');
const qOpts = document.getElementById('quizOptions');
const qBar = document.getElementById('quizBar');
const qCount = document.getElementById('quizCount');
const qScore = document.getElementById('quizScore');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');

let current = 0;
let score = 0;

function renderQuestion() {
  const item = questions[current];
  qTitle.textContent = item.q;
  qOpts.innerHTML = '';
  qBar.style.width = ((current) / questions.length) * 100 + '%';
  qCount.textContent = `Pergunta ${current + 1} de ${questions.length}`;
  qScore.textContent = `Pontos: ${score}`;

  item.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz__option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(btn, idx, item.correct));
    qOpts.appendChild(btn);
  });
}

function handleAnswer(btn, idx, correct) {
  const buttons = qOpts.querySelectorAll('.quiz__option');
  buttons.forEach(b => b.disabled = true);
  if (idx === correct) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    buttons[correct].classList.add('correct');
  }
  qScore.textContent = `Pontos: ${score}`;
  setTimeout(() => {
    current++;
    if (current >= questions.length) showResult();
    else renderQuestion();
  }, 1100);
}

function showResult() {
  qBox.hidden = true;
  qResult.hidden = false;
  const pct = score / questions.length;
  if (pct === 1) {
    resultTitle.textContent = '🌳 Guardião(ã) do Agro Sustentável!';
    resultText.textContent = `Você acertou tudo (${score}/${questions.length})! Continue espalhando essa consciência por aí.`;
  } else if (pct >= 0.5) {
    resultTitle.textContent = '🌱 No caminho certo!';
    resultText.textContent = `Você fez ${score} de ${questions.length}. Já planta boas ideias, agora é só regar com mais conhecimento.`;
  } else {
    resultTitle.textContent = '🌾 Hora de aprender mais!';
    resultText.textContent = `Você fez ${score} de ${questions.length}. Releia os pilares do projeto e tente de novo — o futuro precisa de você!`;
  }
}

document.getElementById('quizRestart').addEventListener('click', () => {
  current = 0; score = 0;
  qBox.hidden = false; qResult.hidden = true;
  renderQuestion();
});

renderQuestion();

// ===== Formulário =====
const form = document.getElementById('ctaForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.querySelector('input').value;
  formMsg.textContent = `🌱 Obrigado! Em breve novidades chegarão em ${email}.`;
  form.reset();
});

// ===== Ano dinâmico no título (extra) =====
console.log('🌱 Projeto Agrinho — Agro forte, futuro sustentável.');