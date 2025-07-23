const storySteps = [
  {
    id: 1,
    type: "story",
    text: "${playerName}의 첫 출근날이다.\n회사까지는 자율출퇴근제를 시행하고 있어 자유롭게 출근이 가능하다.",
    image: "버스배경.jpg",
    next: 2
  },
  {
    id: 2,
    type: "choice",
    question: "언제까지 가는게 좋을까?",
    options: [
      { label: "8시 정각 즈음 출근한다", next: 3 },
      { label: "9시 30분에 출근한다", next: 9 }
    ]
  },
  // 📌 여기에 계속 엑셀 기반으로 index별로 이어 붙이면 됩니다.
  {
    id: 15,
    type: "end",
    text: "첫 출근 미션 종료! 잘했어요!",
    image: "",
    next: null
  }
];

let currentStepId = 1;
let playerName = "";

$(document).ready(function () {
  $("#start-btn").click(function () {
    playerName = $("#name-input").val() || "신입사원";
    $("#intro").hide();
    $("#story").show();
    showStory(currentStepId);
  });
});

function showStory(id) {
  const step = storySteps.find(s => s.id === id);
  if (!step) return;

  const text = (step.text || step.question || "").replace(/\$\{playerName\}/g, playerName);
  $("#story-text").text(text);

  if (step.image) {
    $("#story-image").attr("src", step.image).show();
  } else {
    $("#story-image").hide();
  }

  $("#story-buttons").empty();

  if (step.type === "story") {
    $("#story-buttons").append(`<button onclick="showStory(${step.next})">다음</button>`);
  } else if (step.type === "choice") {
    step.options.forEach(opt => {
      $("#story-buttons").append(`<button onclick="showStory(${opt.next})">${opt.label}</button>`);
    });
  } else if (step.type === "end") {
    $("#story-buttons").append(`<button onclick="location.reload()">처음부터</button>`);
  }

  currentStepId = id;
}
