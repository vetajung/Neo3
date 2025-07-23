let playerName = '';
let shuffled = [];
let currentPuzzleIndex = 0;
let startTime;
let endTime;
let totalHintCount = 0;
let storyIndex = 0;
  

function startGame() {
  const nameInput = document.getElementById('username').value.trim();
  const code = document.getElementById("code-input").value.trim();
  
  VALID_CODE = "GCS2508"
  if (!nameInput) return alert('이름을 입력하세요.');
  if (code !== VALID_CODE) {
    alert("올바른 입장 코드를 입력해주세요.");
    return;
  }

  playerName = nameInput;
  startTime = Date.now();
  shuffled = shuffleArray([0, 1, 2, 3, 4]);
  currentPuzzleIndex = 0;

  // 이름 입력창 숨기고 스토리 시작
  document.getElementById('intro').style.display = 'none';
  showStory()
}

function showStory() {
    // 스토리 시나리오
    const storyTexts = [
        `안녕하세요! 전 상품화품질그룹 김승태프로라고 합니다. 
        신입사원 ${playerName}프로님이세요? 만나서 반가워요!`,
        `첫 출근이라 많이 떨리시나봐요 ㅎㅎ
        괜찮습니다, 제가 잘 챙겨드릴게요!`,
        `어쩜 첫 출근날이 GWP에요? 
        아 GWP가 뭔지 잘 모르겠구나!`,
        `GWP는 Great Work Place라는 뜻인데요 
        결국 사람들끼리 친해져서 으쌰으쌰 해보는 날이에요.`,
        `마침 오늘 나눠드릴 선물이 많은데, 
        ${playerName}프로님이랑 같이 나눠주면 되겠네요!`,
        `이김에 안면도 트면서~ 
        자연스럽게 사람들 얼굴을 익히면 완전 딱이다!`,
        `흠흠~ 여기가 제 자리에요! 오늘 선물 엄청 빵빵하죠?
        1등 선물이 무려...`,
        `...`,
        `엥? 어디갔지 잠시만요 ...`,
        `......망했다`,
        `1등 선물이 없어졌어요..... 
        하아 진짜 비싼건데.....`,
        `${playerName}프로님.... 
        절 도와서 선물 좀 같이 찾아주실래요?`,
        `일단 제가 어제 지나간 곳 위주로 찾아봐요.`
    ];
    // 스토리 부분 보여주기
    document.getElementById('story').style.display = 'block';
    // 스토리 길이만큼만
    if (storyIndex < storyTexts.length) {
        document.getElementById('story-text').textContent = storyTexts[storyIndex];
    } else {
        document.getElementById('story').style.display = 'none';
        showMove(currentPuzzleIndex);
    }
    storyIndex++;
}


function resetGame() {
    localStorage.removeItem('escapeGameState');
    location.reload();
  }


function showMove(index) {
    document.getElementById('move-container').style.display = 'block';
    document.getElementById('puzzle-container').style.display = 'none';
    loadMove(shuffled[index]);
  }

function showPuzzle(index) {
  document.querySelectorAll('.puzzle').forEach(p => p.style.display = 'none');
  document.getElementById('move-container').style.display = 'none';
  document.getElementById('puzzle-container').style.display = 'block';
  loadPuzzle(shuffled[index]);
}

function nextMove() {
    currentPuzzleIndex++;
    saveGameState(); // ✅ 진행 상태 저장
    if (currentPuzzleIndex >= shuffled.length) {
      showEnding();
    } else {
      showMove(currentPuzzleIndex);
    }
  }

function nextPuzzle() {
    saveGameState(); // ✅ 진행 상태 저장
    if (currentPuzzleIndex >= shuffled.length) {
      showEnding();
    } else {
      showPuzzle(currentPuzzleIndex);
    }
  }
  

function showEnding() {
  endTime = Date.now();
  // ✅ 모든 다른 화면 숨기기
  document.getElementById('intro').style.display = 'none';
  document.getElementById('story').style.display = 'none';
  document.getElementById('puzzle-container').style.display = 'none';

  document.getElementById('ending').style.display = 'block';
  document.getElementById('ending-text').innerHTML = `
    <p>오 맞아요!!!!!!!</p>
    <p>감사합니다 ${playerName}프로님.. 덕분에 1등 선물인 폴드7을 무사히 찾을 수 있었어요.</p>
    <p>프로님이 아니었다면 정말 저는.. 생각만 해도 아찔하네요.</p>
    <p>그래도 덕분에 저희 사무실 구조를 금방 파악하실 수 있었죠?ㅎㅎ</p>
    <p>그럼 오늘도 아자아자 화이팅입니다!</p>
  `;
}

//결과 복사하기 버튼
document.addEventListener("DOMContentLoaded", () => {
    const copyBtn = document.getElementById('copy-button');
    const copyStatus = document.getElementById('copy-status');
  
    copyBtn.addEventListener('click', () => {
      
      const duration = Math.floor((endTime - startTime) / 1000);
      const params = new URLSearchParams({
        name: playerName,
        time: btoa(duration.toString()),          // ← Base64 인코딩
        hint: btoa(totalHintCount.toString()),    // ← Base64 인코딩
      });
      console.log(params.toString());
      const result = `result.html?${params.toString()}`;
  
      navigator.clipboard.writeText(result).then(() => {
        copyStatus.style.display = 'block';
  
        setTimeout(() => {
          copyStatus.style.display = 'none';
        }, 2000);
      }).catch(err => {
        alert("복사에 실패했습니다. 다시 시도해주세요.");
        console.error(err);
      });
    });
  });
  

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function saveGameState() {
    const state = {
      name: playerName,
      startTime,
      endTime,
      shuffled,
      currentPuzzleIndex,
      totalHintCount,
      isCompleted: (currentPuzzleIndex >= shuffled.length),
    };
    localStorage.setItem('escapeGameState', JSON.stringify(state));
  }
  
  function loadGameState() {
    const saved = localStorage.getItem('escapeGameState');
    if (saved) {
      const state = JSON.parse(saved);
      playerName = state.name;
      startTime = state.startTime;
      shuffled = state.shuffled;
      currentPuzzleIndex = state.currentPuzzleIndex;
      totalHintCount = state.totalHintCount;
      return state.isCompleted ? 'completed' : true;
    }
    return false;
  }
  
  function showMessage(message, isCorrect, callback) {
    const popup = document.getElementById('message-popup');
    const text = document.getElementById('message-text');
  
    popup.className = isCorrect ? 'correct' : 'wrong';
    text.textContent = message;
    popup.style.display = 'block';
  
    setTimeout(() => {
      popup.style.display = 'none';
      if (typeof callback === 'function') {
        callback(); // ✅ 팝업이 사라진 후 실행
      }
    }, 1000);
  }
  
  
  
  window.onload = function () {
    const result = loadGameState();
  
    if (result === 'completed') {
      showEnding(); // ✅ 이제 playerName 등도 정상 할당돼서 문제 없음
    } else if (result === true) {
      document.getElementById('intro').style.display = 'none';
      showPuzzle(currentPuzzleIndex);
    } else {
      // 아무것도 없는 상태일 때는 intro 화면 그대로 둠
      console.log('새로운 사용자입니다.');
    }
  };
      
