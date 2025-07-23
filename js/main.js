let storyData = [];
let currentIndex = 1;
let playerName = '';
let playerStarted = false;

// ✅ 엑셀에서 뽑은 JSON 형태의 데이터 예시 삽입
// 실제로는 JSON 파일로 따로 관리해도 좋습니다.
storyData = [
  {
    index: 1,
    image: '버스배경.jpg',
    text: '오늘은 첫 출근날이다.\n회사까지는 자율출퇴근제를 시행하고 있어 자유롭게 출근이 가능하다.',
    buttons: [{ text: '다음', nextIndex: 2 }]
  },
  {
    index: 2,
    text: '언제까지 가는게 좋을까?',
    buttons: [
      { text: '8시 정각 즈음 출근한다', nextIndex: 3 },
      { text: '9시 30분에 출근한다', nextIndex: 9 }
    ]
  },
  {
    index: 3,
    image: '사무실배경.jpg',
    text: '회사에 도착하니 아직 사무실엔 몇몇 프로님들만 자리에 앉아 조용히 업무를 시작한다.',
    buttons: [{ text: '다음', nextIndex: 4 }]
  },
  // ... (다른 인덱스도 동일하게 추가)
];

function startGame() {
  const nameInput = document.getElementById('name-input');
  playerName = nameInput.value.trim();
  if (!playerName) {
    alert('이름을 입력해주세요!');
    return;
  }

  playerStarted = true;
  document.getElementById('intro').style.display = 'none';
  document.getElementById('story').style.display = 'block';

  showStory(currentIndex);
}

function showStory(index) {
  const story = storyData.find(s => s.index === index);
  if (!story) return;

  currentIndex = index;
  const storyText = story.text.replace(/@@@/g, playerName);
  document.getElementById('story-text').innerText = storyText;

  if (story.image) {
    document.getElementById('story-image').src = `./assets/${story.image}`;
    document.getElementById('story-image').style.display = 'block';
  } else {
    document.getElementById('story-image').style.display = 'none';
  }

  const buttonsContainer = document.getElementById('story-buttons');
  buttonsContainer.innerHTML = '';

  story.buttons.forEach(btn => {
    const button = document.createElement('button');
    button.innerText = btn.text;
    button.onclick = () => showStory(btn.nextIndex);
    buttonsContainer.appendChild(button);
  });
}
