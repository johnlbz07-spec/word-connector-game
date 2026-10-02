const gameLevels = [
  {
    title: 'Bab 1: Hutan Rahsia',
    story:
      'Kamu memasuki Hutan Rahsia untuk mencari Buku Petunjuk Bahasa. Di tengah jalan, kamu terdengar suara hutan: “Buka pintu rahsia dengan kata yang menyambungkan dua idea.”',
    question: 'Aina suka membaca buku _____ menulis nota di tepi katil.',
    options: ['dan', 'tetapi', 'kerana', 'walaupun'],
    answer: 'dan',
    hint: 'Kata ini menyambungkan dua perkara yang berlaku bersama.'
  },
  {
    title: 'Bab 2: Sungai Keputusan',
    story:
      'Sungai Keputusan menghalang perjalanan. Di seberang sungai ada jambatan kecil. Untuk menyeberang, kamu mesti tahu kata hubung yang menjelaskan sebab.',
    question: 'Adik menangis _____ dia tertinggal buku sekolah di rumah.',
    options: ['lalu', 'kerana', 'atau', 'apabila'],
    answer: 'kerana',
    hint: 'Kata ini menunjukkan sebab sesuatu terjadi.'
  },
  {
    title: 'Bab 3: Gunung Harapan',
    story:
      'Di puncak Gunung Harapan, kamu perlu menyiapkan misi dalam masa yang singkat. Hanya jawapan yang tepat boleh membuka laluan ke atas.',
    question: 'Kami berlatih setiap hari _____ kami mahu cemerlang dalam pertandingan.',
    options: ['supaya', 'tetapi', 'kerana', 'sementara'],
    answer: 'supaya',
    hint: 'Kata ini menunjukkan tujuan atau niat.'
  },
  {
    title: 'Bab 4: Kota Hujan',
    story:
      'Hujan turun dengan lebat, tetapi hati kamu tetap berani. Di kota itu, kamu harus memilih kata yang menunjukkan pertentangan.',
    question: 'Zain tetap pergi ke sekolah _____ cuaca sangat buruk.',
    options: ['walaupun', 'dan', 'kerana', 'lalu'],
    answer: 'walaupun',
    hint: 'Kata ini digunakan untuk menentang keadaan yang tidak menyebelahi.'
  },
  {
    title: 'Bab 5: Padang Bayang',
    story:
      'Padang Bayang adalah medan teka-teki. Di sini setiap jawapan menunjuk kepada masa atau keadaan tertentu.',
    question: '_____ kamu selesai menyiapkan kerja, kita boleh pergi ke taman.',
    options: ['Apabila', 'Tetapi', 'Supaya', 'Atau'],
    answer: 'Apabila',
    hint: 'Kata ini menunjukkan masa sesuatu perkara berlaku.'
  },
  {
    title: 'Bab 6: Pertempuran Raja Kata Hubung',
    story:
      'Akhirnya tiba saat paling sukar. Raja Kata Hubung berdiri di depan pintu akhir. Untuk menakluknya, kamu perlu tenang dan memilih kata yang paling tepat dalam ayat misteri ini.',
    question: 'Saya akan menunggu di halaman rumah _____ kamu tiba, _____ saya ingin memberi kejutan kepada keluarga.',
    options: [
      'untuk, dan',
      'apabila, supaya',
      'walaupun, kerana',
      'dan, tetapi'
    ],
    answer: 'apabila, supaya',
    hint: 'Satu perkataan untuk masa, satu lagi untuk tujuan.'
  }
];

const state = {
  levelIndex: 0,
  score: 0,
  lives: 3,
  isGameStarted: false,
  finished: false
};

const elements = {
  homeScreen: document.getElementById('home-screen'),
  gameScreen: document.getElementById('game-screen'),
  endScreen: document.getElementById('end-screen'),
  startBtn: document.getElementById('start-btn'),
  hintBtn: document.getElementById('hint-btn'),
  restartBtn: document.getElementById('restart-btn'),
  playAgainBtn: document.getElementById('play-again-btn'),
  levelLabel: document.getElementById('level-label'),
  storyBox: document.getElementById('story-box'),
  questionBox: document.getElementById('question-box'),
  options: document.getElementById('options'),
  feedback: document.getElementById('feedback'),
  score: document.getElementById('score'),
  lives: document.getElementById('lives'),
  progressText: document.getElementById('progress-text'),
  progressFill: document.getElementById('progress-fill'),
  starDisplay: document.getElementById('star-display'),
  endingTitle: document.getElementById('ending-title'),
  endingMessage: document.getElementById('ending-message'),
  finalScore: document.getElementById('final-score')
};

function showScreen(screen) {
  elements.homeScreen.classList.add('hidden');
  elements.gameScreen.classList.add('hidden');
  elements.endScreen.classList.add('hidden');

  screen.classList.remove('hidden');
}

function getCurrentLevel() {
  return gameLevels[state.levelIndex];
}

function updateHud() {
  elements.score.textContent = state.score;
  elements.lives.textContent = state.lives;
  elements.starDisplay.textContent = `⭐ ${state.score}`;

  const progressPercent = ((state.levelIndex) / gameLevels.length) * 100;
  elements.progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
  elements.progressText.textContent = `${Math.min(state.levelIndex, gameLevels.length)}/${gameLevels.length}`;
}

function renderLevel() {
  if (state.levelIndex >= gameLevels.length) {
    finishGame();
    return;
  }

  const level = getCurrentLevel();
  const levelNumber = state.levelIndex + 1;

  elements.levelLabel.textContent = `Bab ${levelNumber}`;
  elements.storyBox.textContent = level.story;
  elements.questionBox.textContent = level.question;
  elements.options.innerHTML = '';
  elements.feedback.textContent = '';
  elements.feedback.className = 'feedback';

  level.options.forEach((option) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => handleAnswer(option, btn));
    elements.options.appendChild(btn);
  });

  updateHud();
}

function handleAnswer(selectedOption, button) {
  const level = getCurrentLevel();
  const optionButtons = [...document.querySelectorAll('.option-btn')];

  optionButtons.forEach((optionButton) => {
    optionButton.disabled = true;
    const isCorrect = optionButton.textContent === level.answer;

    if (isCorrect) {
      optionButton.classList.add('correct');
    }

    if (optionButton === button && selectedOption !== level.answer) {
      optionButton.classList.add('wrong');
    }
  });

  if (selectedOption === level.answer) {
    state.score += 15;
    elements.feedback.textContent = 'Betul! Jalan terbuka!';
    elements.feedback.className = 'feedback success';
    updateHud();

    setTimeout(() => {
      state.levelIndex += 1;
      if (state.levelIndex < gameLevels.length) {
        renderLevel();
      } else {
        finishGame();
      }
    }, 1100);
  } else {
    state.lives -= 1;
    elements.feedback.textContent = `Salah! Jawapan yang betul ialah "${level.answer}".`;
    elements.feedback.className = 'feedback error';
    updateHud();

    if (state.lives <= 0) {
      setTimeout(() => {
        finishGame(false);
      }, 1200);
      return;
    }

    setTimeout(() => {
      renderLevel();
    }, 1300);
  }
}

function showHint() {
  const level = getCurrentLevel();
  elements.feedback.textContent = `Hint: ${level.hint}`;
  elements.feedback.className = 'feedback info';
}

function finishGame(success = true) {
  state.finished = true;
  showScreen(elements.endScreen);

  const totalStars = Math.max(0, Math.floor(state.score / 30));

  if (success) {
    elements.endingTitle.textContent = 'Tahniah, Pahlawan Bahasa!';
    elements.endingMessage.textContent =
      'Kamu berjaya menamatkan semua bab dan membuka pintu menuju kota ilmu. Kata hubung telah menjadi alatmu untuk menyusun cerita dengan tepat.';
  } else {
    elements.endingTitle.textContent = 'Misi Gagal!';
    elements.endingMessage.textContent =
      'Nyawa kamu habis, tetapi jangan putus asa. Coba lagi dan kuasai kata hubung dengan lebih baik.';
  }

  elements.finalScore.textContent = `${state.score} pts`;
  elements.starDisplay.textContent = `⭐ ${state.score}`;
}

function restartGame() {
  state.levelIndex = 0;
  state.score = 0;
  state.lives = 3;
  state.finished = false;
  showScreen(elements.gameScreen);
  renderLevel();
}

function init() {
  elements.startBtn.addEventListener('click', () => {
    state.isGameStarted = true;
    showScreen(elements.gameScreen);
    renderLevel();
  });

  elements.hintBtn.addEventListener('click', showHint);
  elements.restartBtn.addEventListener('click', restartGame);
  elements.playAgainBtn.addEventListener('click', restartGame);

  updateHud();
  showScreen(elements.homeScreen);
}

init();
