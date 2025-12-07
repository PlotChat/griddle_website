// Change theme according to system's preferred theme mode
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

let theme = systemTheme.matches ? "dark" : "light";

if(!theme) theme = "dark";

document.documentElement.setAttribute("data-theme", theme);


// Grid Settings
grid = {
    gridSize: 64,
    curColor: "#000000",
}

// Display grid items by multiplying one
const gridEl = document.getElementById("grid");

function displayGridItem(){
    gridEl.style.gridTemplateColumns = `repeat(${grid.gridSize}, 1fr)`; 

    const gridItem = gridEl.querySelector(".grid-item");

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < grid.gridSize * grid.gridSize - 1; i++) {
        fragment.appendChild(gridItem.cloneNode(true));
    }

    gridEl.appendChild(fragment);

}

displayGridItem();

// Disable/Enable scroll functions for drawing feature

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "";
}

// Drawing feature
let drawing = false;

gridEl.addEventListener("pointerdown", e => {
    if(!drawing){
        const cell = document.elementFromPoint(e.clientX, e.clientY);
        if (cell?.classList.contains("grid-item")) {
            cell.style.background = grid.curColor;
        }
    }
    
    drawing = true;
    disableScroll();
});

window.addEventListener("pointerup", () => {
    drawing = false; 
    enableScroll()
});

// Prevent the default drag behavior which causes the "stop sign" cursor
gridEl.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

gridEl.addEventListener("pointermove", e => {
    if (!drawing) return;
    
    const cell = document.elementFromPoint(e.clientX, e.clientY);
    if (cell?.classList.contains("grid-item")) {
        cell.style.background = grid.curColor;
    }
});

// Prevent zooming in IOS

let lastTouchEnd = 0;

document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    
    // If the time between taps is less than 300ms, it's a double tap
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    
    lastTouchEnd = now;
}, false);

function resetGrid() {
    const gridItemList = document.querySelectorAll("grid-item");
    gridItemList.forEach(item => {
        item.style.backgroundColor = "var(--grid-primary)";
    });
}

// Expand tools when clicked
const openBtn = document.getElementById("open-btn");
const toolsDrawer = document.getElementById("tools-drawer");

openBtn.addEventListener("click", () => {
    toolsDrawer.classList.toggle("tools-drawer-opened");
})

// Color picker
const colorPicker = document.getElementById("color-picker");
const circleFill = document.getElementById("tool-color-fill");

colorPicker.addEventListener("change", () => {
    pickedColor = colorPicker.value;
    grid.curColor = pickedColor;
    circleFill.style.backgroundColor = pickedColor;
})

// Eraser
const rootStyles = getComputedStyle(document.documentElement);
let defaultColor = rootStyles.getPropertyValue("--grid-primary").trim();
console.log(defaultColor);
const eraser = document.getElementById("tool-eraser");

eraser.addEventListener("click", () => {
    grid.curColor = defaultColor;
    circleFill.style.backgroundColor = defaultColor;
})


