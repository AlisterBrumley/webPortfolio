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
    const summaryRow = document.getElementById("summaryRow");
    const summary = summaryRow.firstElementChild;
    let summaryContent = {
        title: {
            calc: "Calculator",
            etch: "Etch-a-Sketch",
            qdd: "Audio Degrader",
            wmv: "WMV to MP4 converter",
            esf2: "Sound Font Extractor",
            cursehang: "Hangman"
        },
        blurb: {
            calc: "A simple web calculator that can do basic calculations and decimal functions, mimicking desktop calculators. It also responds to system/browser dark mode preferences.",
            etch: "This site is an etch-a-sketch like, with a resizeable grid and colored etching. It also responds to system/browser dark mode preferences.",
            qdd: "Degrades audio samples to mimic classic samplers, useful for lo-fi musicians. Uses the Tkinter GUI library, and FFMPEG for conversions. Compatible with Windows, Mac and Linux.",
            wmv: "Script to convert .WMV files to .MP4 with h264 encoding using FFMPEG. Has several user settings and logging options. Compatbile with Windows, Mac and Linux.",
            esf2: "This program extracts the samples from a .SF2 file, and places them all in .WAV files. This required alot of file manipulation at the bit level. Compatible with Mac, Linux and even PowerPC Macs!",
            cursehang: "A simple Hangman game, using an 850 word dictionary. Built using the ncurses TUI library.  Compatible with Windows, Mac and Linux."
        },
        link: {
            calc: "https://alisterbrumley.github.io/js-calculator/",
            etch: "https://alisterbrumley.github.io/js-etch/",
            qdd: "https://github.com/AlisterBrumley/degradepy",
            wmv: "https://github.com/AlisterBrumley/wmvToH265",
            esf2: "https://github.com/AlisterBrumley/esf2",
            cursehang: "https://github.com/AlisterBrumley/cursehang"
        }
    }

    image.addEventListener("click", (event) => {
        const sumBlurb = summaryContent.blurb[image.id];
        const sumLink = summaryContent.link[image.id];
        const sumTitle = summaryContent.title[image.id];
        const sumChecker = sumTitle + sumBlurb;
        const boxBuffer = window.getComputedStyle(summary).getPropertyValue("padding-bottom").replace("px", "");
        // console.log(boxBuffer)

        if (summaryRow.style.height > "0" && summary.textContent == sumChecker) {
            summary.classList.add("fadeOut");
            summary.addEventListener("animationend", fadeOut);
            summaryRow.style.height = "0";
        } else {
            const link = document.createElement("a");
            link.textContent = sumTitle;
            link.setAttribute("href", sumLink);
            summary.style.display = "flex";
            summary.textContent = sumBlurb;
            summary.insertBefore(link, summary.firstChild);
            summaryRow.style.height = (summary.scrollHeight + +boxBuffer) + "px";
            summary.classList.add("fadeIn");
            summary.addEventListener("animationend", fadeIn);
        };

        // to stop interference with body closing
        event.stopPropagation()
    });
});

// close summary when clicking outside the image/summary box
document.body.addEventListener("click", () => {
    const summaryRow = document.getElementById("summaryRow")
    const summary = summaryRow.firstElementChild
    summary.classList.add("fadeOut");
    summary.addEventListener("animationend", fadeOut);
    summaryRow.style.height = "0";
});

// stops event bubbling to body, so you can click on summary box
summaryRow.addEventListener("click", (event) => event.stopPropagation());