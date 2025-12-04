// Change theme according to system's preferred theme mode
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

let theme = systemTheme.matches ? "dark" : "light";

// Optional fallback—though unnecessary because light/dark always resolves
if (!theme) theme = "dark";

document.documentElement.setAttribute("data-theme", theme);

