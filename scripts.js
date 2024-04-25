
const summaries = document.getElementById("exampleSummary")
const modeButton = document.getElementById("modeButton")
let darkMode

// checks if light mode, otherwise default to dark
if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute("data-theme", "light");
        imageSrcChange("dark", "light");
        darkMode = false;
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        imageSrcChange("light", "dark");
        darkMode = true;
    }
}


function imageSrcChange(newMode, oldMode) {
    const images = document.getElementsByClassName("exampleImage");
    Array.from(images).forEach(image => {
        image.src = image.src.replace(oldMode, newMode);
    });
}

// NEED TO ADD QUERY OF DATATHEME THEN SWITCH
// will need to swap pictures somehow as well
modeButton.addEventListener("click", () => {
    if (darkMode) {
        document.documentElement.setAttribute("data-theme", "light");
        imageSrcChange("dark", "light");
        darkMode = false;
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        imageSrcChange("light", "dark");
        darkMode = true;
    }
});

console.log(darkMode)