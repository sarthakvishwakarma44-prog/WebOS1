function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("clock").textContent =
        `${hours}:${minutes}`;
}

updateClock();

setInterval(updateClock, 1000);


// Battery information
async function updateBattery() {

    if (!("getBattery" in navigator)) {
        document.getElementById("battery").textContent =
            "🔋 Battery unavailable";
        return;
    }

    const battery = await navigator.getBattery();

    function update() {
        const percentage = Math.round(battery.level * 100);

        document.getElementById("battery").textContent =
            `🔋 ${percentage}%`;
    }

    update();

    battery.addEventListener("levelchange", update);
    battery.addEventListener("chargingchange", update);
}

updateBattery();
const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");

startButton.addEventListener("click", function () {

    if (startMenu.style.display === "block") {
        startMenu.style.display = "none";
    } else {
        startMenu.style.display = "block";
    }

});
// =========================
// FILE MANAGER WINDOW
// =========================

const filesApp = document.getElementById("filesApp");
const filesWindow = document.getElementById("filesWindow");

const closeFiles = document.getElementById("closeFiles");
const minimizeFiles = document.getElementById("minimizeFiles");
const maximizeFiles = document.getElementById("maximizeFiles");


// Open Files
filesApp.addEventListener("click", function () {

    startMenu.style.display = "none";

    filesWindow.style.display = "block";

});


// Close Files
closeFiles.addEventListener("click", function () {

    filesWindow.style.display = "none";

});


// Minimize Files
minimizeFiles.addEventListener("click", function () {

    filesWindow.style.display = "none";

});


// Maximize Files
maximizeFiles.addEventListener("click", function () {

    if (filesWindow.classList.contains("maximized")) {

        filesWindow.classList.remove("maximized");

    } else {

        filesWindow.classList.add("maximized");

    }

});
