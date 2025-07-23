const puzzles = [
  {
    move: '오늘 점심 뭐 먹을까요?',
    moveImage: 'https://example.com/lunch.jpg',
    choices: [
      {
        text: '라면',
        image: 'https://example.com/ramen.jpg',
        result: '너무 짜서 탈락!',
        nextIndex: 1
      },
      {
        text: '비빔밥',
        image: 'https://example.com/bibimbap.jpg',
        result: '완벽한 선택이에요!',
        nextIndex: 2
      },
      {
        text: '피자',
        image: 'https://example.com/pizza.jpg',
        result: '배달이 너무 느림..',
        nextIndex: 2
      }
    ]
  },
  {
    move: '커피를 마시고 싶다면 어떤 걸?',
    moveImage: 'https://example.com/coffee.jpg',
    choices: [
      {
        text: '아메리카노',
        image: 'https://example.com/americano.jpg',
        result: '쓴 맛이 최고죠!',
        nextIndex: 2
      },
      {
        text: '라떼',
        image: 'https://example.com/latte.jpg',
        result: '부드럽고 따뜻해요.',
        nextIndex: 2
      },
      {
        text: '모카',
        image: 'https://example.com/mocha.jpg',
        result: '달달한 기분~',
        nextIndex: 2
      }
    ]
  },
  {
    move: '오늘 하루도 수고했어요! 게임 끝!',
    moveImage: 'https://example.com/end.jpg',
    choices: []
  }
];

function loadPuzzle(index) {
  const puzzle = puzzles[index];
  document.getElementById('move-text').textContent = puzzle.move;
  document.getElementById('move-image').src = puzzle.moveImage;
  const choices = document.getElementById('choice-buttons');
  choices.innerHTML = '';

  if (puzzle.choices.length === 0) {
    choices.innerHTML = '<p>게임이 종료되었습니다.</p>';
    return;
  }

  puzzle.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.onclick = () => showResult(choice);
    choices.appendChild(btn);
  });
}

function showResult(choice) {
  document.getElementById('popup-image').src = choice.image;
  document.getElementById('popup-text').textContent = choice.result;
  document.getElementById('choice-popup').style.display = 'block';

  document.getElementById('popup-next-button').onclick = () => {
    document.getElementById('choice-popup').style.display = 'none';
    loadPuzzle(choice.nextIndex);
  };
}

window.onload = () => loadPuzzle(0);
