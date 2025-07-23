let playerName = '';
let currentStep = 0;

// 스토리 진행 정의
const storySteps = [
  { text: () => `평소 궁금했던 걸 물어볼 기회다.`, next: 'story' },
  { text: () => `이런 기회 흔치 않다`, next: 'story' },
  {
    type: 'choice',
    question: '무엇을 물어보는 게 좋을까?',
    options: [
      { label: '회사생활 조언', text: '현명하군요!', image: 'https://via.placeholder.com/300', nextStep: 3 },
      { label: '퇴근 후 일상', text: '바보군요', image: 'https://via.placeholder.com/300', nextStep: 4 },
      { label: '회사 분위기/문화', text: '천재군요', image: 'https://via.placeholder.com/300', nextStep: 5 }
    ]
  },
  { text: () => `내일 궁금했던 걸 물어볼 기회다.`, next: 'story' },
  { text: () => `이런 기회 흔치 않다!!`, next: 'story' },
  {
    type: 'choice',
    question: '뭐 먹을까?',
    options: [
      { label: '김치찌개', text: '김치!', image: 'https://via.placeholder.com/300', nextStep: 6 },
      { label: '된장', text: '된!', image: 'https://via.placeholder.com/300', nextStep: 6 },
      { label: '고추장', text: '도추장!', image: 'https://via.placeholder.com/300', nextStep: 6 }
    ]
  },
  { text: () => `오늘도 출근 완료!`, next: 'end' }
];

function startGame() {
  const name = document.getElementById('username').value.trim();
  if (!name) return alert('이름을 입력하세요.');
  playerName = name;
  document.getElementById('intro').style.display = 'none';
  proceedStep();
}

function proceedStep() {
  const step = storySteps[currentStep];

  // 모든 화면 숨기기
  document.getElementById('story').style.display = 'none';
  document.getElementById('choice-container').style.display = 'none';
  document.getElementById('choice-popup').style.display = 'none';
  document.getElementById('ending').style.display = 'none';

  if (step.type === 'choice') {
    showChoice(step);
  } else if (step.next === 'story') {
    document.getElementById('story-text').textContent = step.text();
    document.getElementById('story').style.display = 'block';
  } else if (step.next === 'end') {
    document.getElementById('ending').style.display = 'block';
    document.getElementById('ending-text').textContent = `감사합니다, ${playerName}님!`;
  }
}

function nextStory() {
  currentStep++;
  proceedStep();
}

function showChoice(step) {
  document.getElementById('choice-question').textContent = step.question;
  const btns = document.getElementById('choice-buttons');
  btns.innerHTML = '';

  step.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt.label;
    btn.onclick = () => {
      selectedOption = opt;
      showChoicePopup(opt);
    };
    btns.appendChild(btn);
  });

  document.getElementById('choice-container').style.display = 'block';
}

let selectedOption = null;

function showChoicePopup(option) {
  document.getElementById('choice-popup-image').src = option.image;
  document.getElementById('choice-popup-text').textContent = option.text;
  document.getElementById('choice-popup').style.display = 'block';
  document.getElementById('choice-container').style.display = 'none';
}

function proceedAfterChoice() {
  currentStep = selectedOption.nextStep;
  selectedOption = null;
  proceedStep();
}

function resetGame() {
  location.reload();
}
