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

    removeFilesTaskbarButton();

});


// Minimize Files
minimizeFiles.addEventListener("click", function () {

    filesWindow.style.display = "none";

    createFilesTaskbarButton();

});


// Maximize Files
maximizeFiles.addEventListener("click", function () {

    if (filesWindow.classList.contains("maximized")) {

        filesWindow.classList.remove("maximized");

    } else {

        filesWindow.classList.add("maximized");

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

const windowHeader = filesWindow.querySelector(".windowHeader");


// =========================
// OPEN WINDOW
// =========================

filesApp.addEventListener("click", function () {

    startMenu.style.display = "none";

    filesWindow.style.display = "block";

    bringToFront();

    createFilesTaskbarButton();

});

// =========================
// CLOSE WINDOW
// =========================

closeFiles.addEventListener("click", function () {

    filesWindow.style.display = "none";

});


// =========================
// MINIMIZE WINDOW
// =========================

minimizeFiles.addEventListener("click", function () {

    filesWindow.style.display = "none";

});


// =========================
// MAXIMIZE / RESTORE
// =========================

maximizeFiles.addEventListener("click", function () {

    filesWindow.classList.toggle("maximized");

});


// =========================
// BRING WINDOW TO FRONT
// =========================

function bringToFront() {

    filesWindow.style.zIndex = 1000;

}

filesWindow.addEventListener("mousedown", bringToFront);


// =========================
// DRAG WINDOW
// =========================

let isDragging = false;

let offsetX = 0;
let offsetY = 0;


windowHeader.addEventListener("mousedown", function (event) {

    if (filesWindow.classList.contains("maximized")) {
        return;
    }

    isDragging = true;

    const rect = filesWindow.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    bringToFront();

});


document.addEventListener("mousemove", function (event) {

    if (!isDragging) {
        return;
    }

    filesWindow.style.left =
        (event.clientX - offsetX) + "px";

    filesWindow.style.top =
        (event.clientY - offsetY) + "px";

});


document.addEventListener("mouseup", function () {

    isDragging = false;

});
// =========================
// TASKBAR WINDOW MANAGEMENT
// =========================

const taskbarApps = document.getElementById("taskbarApps");

let filesTaskbarButton = null;


// Create the Files taskbar button
function createFilesTaskbarButton() {

    if (filesTaskbarButton) {
        return;
    }

    filesTaskbarButton = document.createElement("button");

    filesTaskbarButton.className = "taskbarApp";
    filesTaskbarButton.textContent = "📁 Files";

    filesTaskbarButton.addEventListener("click", function () {

        if (filesWindow.style.display === "none") {

            filesWindow.style.display = "block";
            bringToFront();

        } else {

            filesWindow.style.display = "none";

        }

    });

    taskbarApps.appendChild(filesTaskbarButton);
}


// Remove the Files taskbar button
function removeFilesTaskbarButton() {

    if (filesTaskbarButton) {

        filesTaskbarButton.remove();

        filesTaskbarButton = null;

    }
}
// =========================
// NOTES APP
// =========================

const notesApp = document.getElementById("notesApp");
const notesWindow = document.getElementById("notesWindow");

const closeNotes = document.getElementById("closeNotes");
const minimizeNotes = document.getElementById("minimizeNotes");
const maximizeNotes = document.getElementById("maximizeNotes");

const notesEditor = document.getElementById("notesEditor");
const saveNote = document.getElementById("saveNote");
const clearNote = document.getElementById("clearNote");
const saveStatus = document.getElementById("saveStatus");

let notesTaskbarButton = null;


// =========================
// LOAD SAVED NOTE
// =========================

const savedNote = localStorage.getItem("webos-note");

if (savedNote !== null) {
    notesEditor.value = savedNote;
}


// =========================
// SAVE NOTE
// =========================

function saveNotes() {

    localStorage.setItem(
        "webos-note",
        notesEditor.value
    );

    saveStatus.textContent = "Saved ✓";
}


// =========================
// OPEN NOTES
// =========================

notesApp.addEventListener("click", function () {

    startMenu.style.display = "none";

    notesWindow.style.display = "block";

    notesWindow.style.zIndex = 1001;

    createNotesTaskbarButton();

});


// =========================
// CLOSE NOTES
// =========================

closeNotes.addEventListener("click", function () {

    saveNotes();

    notesWindow.style.display = "none";

    removeNotesTaskbarButton();

});


// =========================
// MINIMIZE NOTES
// =========================

minimizeNotes.addEventListener("click", function () {

    notesWindow.style.display = "none";

    createNotesTaskbarButton();

});


// =========================
// MAXIMIZE NOTES
// =========================

maximizeNotes.addEventListener("click", function () {

    notesWindow.classList.toggle("maximized");

});


// =========================
// SAVE BUTTON
// =========================

saveNote.addEventListener("click", function () {

    saveNotes();

});


// =========================
// CLEAR BUTTON
// =========================

clearNote.addEventListener("click", function () {

    const confirmation = confirm(
        "Clear this note?"
    );

    if (confirmation) {

        notesEditor.value = "";

        localStorage.removeItem("webos-note");

        saveStatus.textContent = "Note cleared";

    }

});


// =========================
// AUTO SAVE
// =========================

notesEditor.addEventListener("input", function () {

    localStorage.setItem(
        "webos-note",
        notesEditor.value
    );

    saveStatus.textContent = "Saving...";

});


// =========================
// NOTES TASKBAR BUTTON
// =========================

function createNotesTaskbarButton() {

    if (notesTaskbarButton) {
        return;
    }

    notesTaskbarButton = document.createElement("button");

    notesTaskbarButton.className = "taskbarApp";

    notesTaskbarButton.textContent = "📝 Notes";

    notesTaskbarButton.addEventListener(
        "click",
        function () {

            if (
                notesWindow.style.display === "none"
            ) {

                notesWindow.style.display = "block";

                notesWindow.style.zIndex = 1001;

            } else {

                notesWindow.style.display = "none";

            }

        }
    );

    taskbarApps.appendChild(
        notesTaskbarButton
    );

}


// =========================
// REMOVE NOTES TASKBAR BUTTON
// =========================

function removeNotesTaskbarButton() {

    if (notesTaskbarButton) {

        notesTaskbarButton.remove();

        notesTaskbarButton = null;

    }

}
