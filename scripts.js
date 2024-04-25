
const summaries = document.getElementById("exampleSummary")
const modeButton = document.getElementById("modeButton")
let darkMode = true

// checks if light mode, otherwise default to dark
if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute("data-theme", "light")
        darkMode = false
    } else {
        document.documentElement.setAttribute("data-theme", "dark")
        darkMode = true
    }
}


function imageSrcChange() {
    const images = document.getElementsByClassName("exampleImage")
    Array.from(images).forEach(image => {
        let oldSrc = image.src
        console.log(oldSrc)
    });
}

// NEED TO ADD QUERY OF DATATHEME THEN SWITCH
// will need to swap pictures somehow as well
modeButton.addEventListener("click", () => {
    if (darkMode) {
        document.documentElement.setAttribute("data-theme", "light")
        darkMode = false
    } else {
        document.documentElement.setAttribute("data-theme", "dark")
        darkMode = true
    }
})

imageSrcChange()