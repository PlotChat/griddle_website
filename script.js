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
function displayGridItem(){
    const gridEl = document.getElementById("grid");

    gridEl.style.gridTemplateColumns = `repeat(${grid.gridSize}, max(0.4%, 0.2rem)`;
    gridEl.style.gridTemplateRows = `repeat(${grid.gridSize}, auto-fill)`;

    const gridItem = gridEl.querySelector(".grid-item");

    for(i = 0; i < grid.gridSize*grid.gridSize - 1; i++){
        const clone = gridItem.cloneNode(true);
        gridEl.appendChild(clone);
    }
}

displayGridItem();

