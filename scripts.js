const images = document.getElementsByClassName("exampleImage")
const summaries = document.getElementById("exampleSummary")
const button = document.getElementById("modeButton")

if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("dark")
    } else {
        console.log("light")
    }
}

// NEED TO ADD QUERY OF DATATHEME THEN SWITCH
// will need to swap pictures somehow as well
button.addEventListener("click", () => document.documentElement.setAttribute("data-theme", "light"))