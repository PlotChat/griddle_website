// Change theme according to system's preferred theme mode
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

let theme = systemTheme.matches ? "dark" : "light";

if(!theme) theme = "dark";

document.documentElement.setAttribute("data-theme", theme);


// Grid Settings
grid = {
    gridSize: 100,
}

// Display grid items by multiplying one
const gridEl = document.getElementById("grid");

function displayGridItem(){
    gridEl.style.gridTemplateColumns = `repeat(${grid.gridSize}, max(0.4%, 0.2rem))`;

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
    const cell = document.elementFromPoint(e.clientX, e.clientY);
    if (cell?.classList.contains("grid-item")) {
        cell.style.background = "var(--bg-primary)";
    }

    if (!drawing) drawing = true;
    disableScroll();
});
gridEl.addEventListener("pointerup", () => {
    drawing = false; 
    enableScroll()
});
gridEl.addEventListener("pointerleave", () => {
    drawing = false;
    enableScroll();
});

gridEl.addEventListener("pointermove", e => {
    if (!drawing) return;
    
    const cell = document.elementFromPoint(e.clientX, e.clientY);
    if (cell?.classList.contains("grid-item")) {
        cell.style.background = "var(--bg-primary)";
    }
});


