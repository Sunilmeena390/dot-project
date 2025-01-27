const resetbtn = document.querySelector("#resetbutton");
const undobtn = document.querySelector("#undobutton");
const redobtn = document.querySelector("#redobutton");
const showResult = document.querySelector("#result");

const undodot = [];
const redodot = [];

let colors = ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF"];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateButtonStates() {
    undobtn.disabled = undodot.length === 0;
    redobtn.disabled = redodot.length === 0;
    resetbtn.disabled = undodot.length === 0 && redodot.length === 0;
}

showResult.addEventListener("click",(e) => {
    if (e.target !== showResult) return;

    const x = e.pageX;
    const y = e.pageY;

    const dot = document.createElement("div");
    dot.classList.add("dot");

    dot.style.width = "10px";
    dot.style.height = "10px";
    dot.style.left = `${x - 10}px`;
    dot.style.top = `${y - 10}px`;

    const color = getRandomColor();
    dot.style.backgroundColor = color;

    showResult.appendChild(dot);
    undodot.push(dot);
    redodot.length = 0;

    updateButtonStates();
});

undobtn.addEventListener("click", () => {
    if (undodot.length > 0) {
        const dot = undodot.pop();
        redodot.push(dot);
        dot.remove();
        updateButtonStates();
    }
});

redobtn.addEventListener("click", () => {
    if (redodot.length > 0) {
        const dot = redodot.pop();
        showResult.appendChild(dot);
        undodot.push(dot);
        updateButtonStates();
    }
});

resetbtn.addEventListener("click", () => {
    undodot.forEach(circle => circle.remove());
    redodot.length = 0;
    undodot.length = 0;
    updateButtonStates();
});
