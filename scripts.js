
// const summaries = document.getElementById("exampleSummary");
const modeButton = document.getElementById("modeButton");

// for initializing theme color on load
function modeInit() {
    const dark = "dark"
    const light = "light"
    let modeSet = localStorage.getItem("modeSet");

    if (modeSet == null) {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            changeTheme(light, dark)
        } else {
            changeTheme(dark, light)
        }
    } else if (modeSet == dark) {
        changeTheme(dark, light)
    } else {
        changeTheme(light, dark)
    }
}

// for changing theme on button press: inverted action to init
function modeSwitch() {
    const dark = "dark"
    const light = "light"
    let modeSet = localStorage.getItem("modeSet");

    if (modeSet == light) {
        changeTheme(dark, light)
    } else {
        changeTheme(light, dark)
    }
}

// sets elements and localStorage
function changeTheme(newMode, oldMode) {
    document.documentElement.setAttribute("data-theme", newMode);
    localStorage.setItem("modeSet", newMode);
    changeImgSrc(newMode, oldMode);
}

// sets image dir's to new theme
function changeImgSrc(newMode, oldMode) {
    const images = document.getElementsByClassName("exampleImage");
    Array.from(images).forEach(image => {
        image.src = image.src.replace(oldMode, newMode);
    });

    const icons = document.getElementsByClassName("navImg")
    Array.from(icons).forEach(icon=> {
        icon.src = icon.src.replace(oldMode, newMode);
    });
}

// MAIN FUNCTIONS
modeInit()

// EVENT LISTENS
// theme switch button
modeButton.addEventListener("click", () => {
    modeSwitch()
});

// for issue #28, to be implemented later
// window.matchMedia("prefers-color-scheme: dark)").addEventListener("change", event => {
// });\