// VARIABLES
const exampleImages = document.getElementsByClassName("exampleImage");
const modeButton = document.getElementById("modeButton");

// FUNCTIONS
// for initializing theme color on load
function modeInit() {
    const dark = "dark";
    const light = "light";
    let modeSet = localStorage.getItem("modeSet");

    if (modeSet == null) {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            changeTheme(light, dark);
        } else {
            changeTheme(dark, light);
        }
    } else if (modeSet == dark) {
        changeTheme(dark, light);
    } else {
        changeTheme(light, dark);
    };
};

// for changing theme on button press: inverted action to init
function modeSwitch() {
    const dark = "dark";
    const light = "light";
    let modeSet = localStorage.getItem("modeSet");

    if (modeSet == light) {
        changeTheme(dark, light);
    } else {
        changeTheme(light, dark);
    };
};

function timeSwitch(sysPref) {
    const dark = "dark";
    const light = "light";

    if (sysPref.matches) {
        changeTheme(light, dark);
    } else {
        changeTheme(dark, light);
    };
};

// sets elements and localStorage
function changeTheme(newMode, oldMode) {
    document.documentElement.setAttribute("data-theme", newMode);
    localStorage.setItem("modeSet", newMode);
    changeImgSrc(newMode, oldMode);
};

// sets image dir's to new theme
function changeImgSrc(newMode, oldMode) {
    const images = document.getElementsByClassName("exampleImage");
    Array.from(images).forEach(image => {
        image.src = image.src.replace(oldMode, newMode);
    });

    const icons = document.getElementsByClassName("navImg")
    Array.from(icons).forEach(icon => {
        icon.src = icon.src.replace(oldMode, newMode);
    });
};

function fadeOut() {
    this.classList.remove("fadeOut")
    this.removeEventListener("animationend", fadeOut)
    this.textContent = "";
}

function fadeIn() {
    this.classList.remove("fadeIn")
    this.removeEventListener("animationend", fadeIn)
}


// MAIN FUNCTIONS
modeInit();

// EVENT LISTENS
// tracking live changes to theme
window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", theme => {
    timeSwitch(theme);
});

// theme switch button
modeButton.addEventListener("click", () => {
    modeSwitch();
});

// open image collapsible
Array.from(exampleImages).forEach(image => {
    const summaryRow = document.getElementById("summaryRow")
    const summary = summaryRow.firstElementChild
    let imageSummaries = {
        calc: "This site is a calculator that can do basic calculations and decimal functions, mimicking desktop calculators. I designed it to be minimal and easy to understand. It also responds to system/browser dark mode preferences.",
        etch: "This site is an etch-a-sketch like, with a resizeable grid drawn in by Javascript, using Flexbox. I also added colored etching, as well as responsiveness to the system/browser dark mode preferences.",
        qdd: "This program allows the user to degrade audio samples to mimic settings on classic samplers, particularly for lo-fi musicians. I built it with python using the Tkinter GUI library, and it relies on ffmpeg for conversions. It's compatible with Windows, Mac and Linux, with compiled packages for all 3.",
        wmv: "This is a script that got out of hand! I started with a script that simply batch converts old .WMV files to .MP4's with h264 encoding, to save space on a media server. It ended up with a pretty feature rich python CLI program that provides several user options, has guards for overwriting and provides logging. It's tested with Windows, Mac and Linux.",
        esf2: "Soundfonts are a pretty dated sample container format, but the samples themselves are still worth having. This program extracts the samples from a .SF2 file, and places them all in seperate .WAV files. This required alot of file manipulation at the bit level, creating new headers and carefully copying data across. It's tested with Mac, Linux and even PowerPC Macs!",
        scripts: "cha la head cha la!"
    }

    image.addEventListener("click", () => {
        if (summaryRow.style.height == "15dvh" && summary.textContent == imageSummaries[image.id]) {
            summary.classList.add("fadeOut");
            summary.addEventListener("animationend", fadeOut);
            summaryRow.style.height = "0";
        } else if (summaryRow.style.height == "15dvh" && summary.textContent != imageSummaries[image.id]) {
            summary.classList.add("fadeIn");
            summary.addEventListener("animationend", fadeIn);
            summary.textContent = imageSummaries[image.id]
        } else {
            summary.style.display = "block";
            summary.textContent = imageSummaries[image.id];
            summaryRow.style.height = "15dvh";
            summary.classList.add("fadeIn");
            summary.addEventListener("animationend", fadeIn);
        };
    });
})

//