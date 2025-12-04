// Change theme according to system's preferred theme mode
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

let theme = systemTheme.matches ? "dark" : "light";

// Optional fallback—though unnecessary because light/dark always resolves
if (!theme) theme = "dark";

document.documentElement.setAttribute("data-theme", theme);


// Grid Settings
grid = {
    gridSize: 100,
}

// Display grid items by multiplying one
const gridEl = document.getElementById("grid");

function displayGridItem(){
    gridEl.style.gridTemplateColumns = `repeat(${grid.gridSize}, max(0.4%, 0.2rem)`;

    const gridItem = gridEl.querySelector(".grid-item");

    for(i = 0; i < grid.gridSize*grid.gridSize - 1; i++){
        const clone = gridItem.cloneNode(true);
        gridEl.appendChild(clone);
    }
}

// Drawing feature
let drawing = false;

gridEl.addEventListener("pointerdown", () => drawing = true);
gridEl.addEventListener("pointerup", () => drawing = false);
gridEl.addEventListener("pointerleave", () => drawing = false);

gridEl.addEventListener("pointermove", e => {
    if (!drawing) return;
    
    const cell = document.elementFromPoint(e.clientX, e.clientY);
    if (cell?.classList.contains("grid-item")) {
        cell.style.background = "red";
    }
});

displayGridItem();

