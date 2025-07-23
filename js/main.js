let playerName = "";
let storyStepIndex = 0;

// 스토리 단계 정의
const storySteps = [
  { text: "나는 파트장님에게 첫 업무를 배정받았다.", type: "text" },
  { text: "내용은 거래처에 지난 회의자료를 전달하고, 일정 관련 확인 요청을 하는 간단한 업무.", type: "text" },
  { text: "파트장님은 편한 방식으로 해봐요 라고만 했다", type: "text" },
  {
    type: "choice",
    question: "어떤 방식이 좋을까?",
    options: [
      {
        label: "전화로 바로 연락한다",
        text: "짧고 명확하게 스크립트를 간단히 사전에 메모하고,
상대방이 통화 가능한지 먼저 확인해보자!",
        nextStep: 4
      },
      {
        label: "메일을 작성한다",
        text: "동명이인에게 발송되는 실수가 일어나지 않도록 수신처를 확인하자
수신자들이 이해할 수 있는지 맞춤법 및 내용을 재확인하자 ",
        nextStep: 5
      },
      {
        label: "선배에게 먼저 물어본다",
        text: "섣불리 확인 받기보단 초안을 먼저 써보고 선배에게 피드백을 구해보자
피드백을 요청할떄는 공손하고 당당하게 요청하자",
        nextStep: 6
      }
    ]
  },
  { text: "내일 궁금했던걸 물어볼 기회다.", type: "text" },
  { text: "이런 기회 흔치않다!!", type: "text" },
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
