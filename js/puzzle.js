const puzzles = [
    {
      move: `내 자리 어디에 떨어져있는건 아니겠지?? ` ,
      moveImage: `https://m.tsfurniture.co.kr/web/product/big/202407/5d4bf51673821a13732320b936a0c98a.jpg`,
      question: '자리문제 1234?',
      answer: '1234',
      hints: ['네 자리 숫자입니다.', '1로 시작합니다.']
    },
    {
      move: `설마 어제 그룹장님 자리에서 뭐 말씀드리다가 두고왔나?` ,
      moveImage: `https://cdn.koit.co.kr/news/photo/202411/126963_79771_1827.jpg`,
      question: '그룹장님문제 동쪽?',
      answer: '동쪽',
      hints: ['해가 뜨는 쪽입니다.', '왼쪽이 아닙니다.']
    },
    {
      move: '어제 새로 생긴 시작실에 시료도 옮겨뒀는데.. 설마 거기에?' ,
      moveImage: `https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000054162/de88a9de0c014d6f902cd9b776201618.jpg`,
      question: '시작실 열쇠?',
      answer: '열쇠',
      hints: ['잠긴 것을 여는 도구입니다.', '쇠로 만들어졌습니다.']
    },
    {
      move: '아참, 어제 휴게실에서 책도 한권 빌려갔었어' ,
      moveImage: `https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/d206/c6ba369cada786ff11d185ad4324288dfaa46bc7eef880718cb46a73e6c3.jpg`,
      question: '휴게실 홍길동?',
      answer: '홍길동',
      hints: ['고전 소설 속 인물입니다.', '이름에 "동"이 들어갑니다.']
    },
    {
      move: '프린터기에서 복사도 한번 했었는데...' ,
      moveImage: `https://cdn.kbanker.co.kr/news/photo/202002/89167_37060_36.jpg`,
      question: '프린터기 방탈출?',
      answer: '방탈출',
      hints: ['방에서 빠져나가는 게임입니다.', '네 글자입니다.']
    }
  ];
  
  let hintShown = 0;

  function loadMove(index) {
    const puzzle = puzzles[index];
    hintShown = 0;
    document.getElementById('move-text').textContent = puzzle.move;
    document.getElementById('move-image').src = puzzle.moveImage;
  }
  
  function loadPuzzle(index) {
    const puzzle = puzzles[index];
    hintShown = 0;
    document.getElementById('question').textContent = puzzle.question;
    document.getElementById('user-answer').value = '';
    document.getElementById('hint-box').textContent = '';
    document.getElementById('hint-button').disabled = false;
  }
  
  function checkAnswer() {
    const userInput = document.getElementById('user-answer').value.trim();
    const puzzle = puzzles[shuffled[currentPuzzleIndex]];
    if (userInput === puzzle.answer) {
        showMessage("🎉 정답입니다! 🎉", true, () => {
            nextMove(); // 2초 후 실행
          });

      } else {
        showMessage(`❌ 틀렸습니다 ❌\n다시 시도해보세요.`, false);
      }
  }
  
  function showHint() {
    const puzzle = puzzles[shuffled[currentPuzzleIndex]];
    const hintBox = document.getElementById('hint-box');
    if (hintShown < puzzle.hints.length) {
      const newHint = document.createElement('p');
      newHint.textContent = `힌트 ${hintShown + 1}: ${puzzle.hints[hintShown]}`;
      hintBox.appendChild(newHint);
      
      hintShown++;
      totalHintCount++;
      saveGameState(); // ✅ 힌트 사용 후 저장
      if (hintShown >= puzzle.hints.length) {
        document.getElementById('hint-button').disabled = true;
      }
    }
  }

  