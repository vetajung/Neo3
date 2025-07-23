let playerName = '';
let storyStepIndex = 0;

// 스토리 단계 정의
const storySteps = [
  { text: "평소 궁금했던걸 물어볼 기회다.", type: "text" },
  { text: "이런 기회 흔치않다!", type: "text" },
  {
    type: "choice",
    question: "무엇을 물어보는게 좋을까?",
    options: [
      {
        label: "회사생활 조언",
        text: "현명하군요!",
        nextStep: 3
      },
      {
        label: "퇴근 후 일상",
        text: "바보군요",
        nextStep: 4
      },
      {
        label: "회사 분위기/문화",
        text: "천재군요",
        nextStep: 5
      }
    ]
  },
  { text: "내일 궁금했던걸 물어볼 기회다.", type: "text" },
  { text: "이런 기회 흔치않다!!", type: "text" },
  {
    type: "choice",
    question: "뭐 먹을까?",
    options: [
      {
        label: "김치찌개",
        text: "김치!",
        nextStep: 6
      },
      {
        label: "된장",
        text: "된!",
        nextStep: 6
      },
      {
        label: "고추장",
        text: "도추장!",
        nextStep: 6
      }
    ]
  },
  { text: "점심시간 끝! 다시 업무 시작!", type: "text" },
];

function startGame() {
  const nameInput = document.getElementById('username').value.trim();
  if (!nameInput) return alert('이름을 입력하세요.');
  playerName = nameInput;

  document.getElementById('intro').style.display = 'none';
  document.getElementById('story').style.display = 'block';

  storyStepIndex = 0;
  nextStory(); // 첫 스토리 실행
}

function nextStory() {
  const currentStep = storySteps[storyStepIndex];

  if (!currentStep) return;

  // 텍스트 단계
  if (currentStep.type === "text") {
    document.getElementById("choice-container").style.display = "none";
    document.getElementById("story").style.display = "block";
    document.getElementById("story-text").textContent = currentStep.text;
    storyStepIndex++;
  }

  // 선택지 단계
  else if (currentStep.type === "choice") {
    document.getElementById("story").style.display = "none";
    showChoiceStep(currentStep);
  }
}

function showChoiceStep(step) {
  const q = document.getElementById("choice-question");
  const btns = document.getElementById("choice-buttons");

  document.getElementById("choice-container").style.display = "block";
  q.textContent = step.question;
  btns.innerHTML = "";

  step.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.onclick = () => {
      alert(opt.text);
      storyStepIndex = opt.nextStep;
      nextStory();
    };
    btns.appendChild(btn);
  });
}
