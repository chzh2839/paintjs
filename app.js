const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// context mdn search!

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 이미지 저장 시, 기본 bg 색을 white로 지정
ctx.fillStyle = "white";
ctx.fillRect = (0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR; // Color or style to use for the lines around shapes
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 라인의 두께 설정

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    console.log("create path in", x, y);
    ctx.beginPath(); // Starts a new path, when you want to create a new path.
    ctx.moveTo(x, y); // Moves the starting point of a new sub-path to the (x, y) coordinates.
  } else {
    console.log("create line in", x, y);
    ctx.lineTo(x, y); //Connects the last point in the current sub-path to the specified (x, y) coordinates with a straight line.
    ctx.stroke(); // 설정된 strokeStyle로 그리기 (실제로 그리는 아이)
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const stroke = event.target.value;
  ctx.lineWidth = stroke;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // fillRect : Draws a filled rectangle at (x, y) position whose size is determined by width and height.
    // fillRect(x좌표값, y좌표값, width값, height값)
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL(); // canvas를 image date로 저장
  // 아무것도 없으면 png로 저장 & "image/jpeg"면 jpg로 저장
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu); // 마우스 우클릭 방지
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
