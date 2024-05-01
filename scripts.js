
const summaries = document.getElementById("exampleSummary");
const modeButton = document.getElementById("modeButton");
let darkMode = localStorage.getItem("darkMode");

console.log(darkMode)

// checks which mode setting
if (darkMode == null && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute("data-theme", "light");
        imageSrcChange("dark", "light");
        darkMode = false;
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        imageSrcChange("light", "dark");
        darkMode = true;
    }
} else if (darkMode == "false") {
    document.documentElement.setAttribute("data-theme", "light");
    imageSrcChange("dark", "light");
    darkMode = false;
} else if (darkMode == "true") {
    document.documentElement.setAttribute("data-theme", "dark");
    imageSrcChange("light", "dark");
    darkMode = true;
} else {
    document.documentElement.setAttribute("data-theme", "dark");
    imageSrcChange("light", "dark");
    darkMode = true;
}
localStorage.setItem("darkMode", darkMode);


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
    localStorage.setItem("darkMode", darkMode)
});

// for issue #28, to be implemented later
// window.matchMedia("prefers-color-scheme: dark)").addEventListener("change", event => {
// });