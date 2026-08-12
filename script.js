/* =====================================================
   WebOS v1.0 — COMPLETE JAVASCRIPT
   v0.1 → v1.0
   ===================================================== */


/* =====================================================
   0.1 — ELEMENTS
   ===================================================== */

const welcomeScreen = document.getElementById("welcomeScreen");
const startWebOS = document.getElementById("startWebOS");
const welcomeLoading = document.getElementById("welcomeLoading");

const desktop = document.getElementById("desktop");

const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");

const taskbarApps = document.getElementById("taskbarApps");

const battery = document.getElementById("battery");
const clock = document.getElementById("clock");


/* =====================================================
   0.2 — WINDOWS
   ===================================================== */

const filesWindow =
    document.getElementById("filesWindow");

const notesWindow =
    document.getElementById("notesWindow");

const calculatorWindow =
    document.getElementById("calculatorWindow");

const settingsWindow =
    document.getElementById("settingsWindow");

const taskManagerWindow =
    document.getElementById("taskManagerWindow");


const windows = {

    files: filesWindow,

    notes: notesWindow,

    calculator: calculatorWindow,

    settings: settingsWindow,

    taskManager: taskManagerWindow

};


let highestZIndex = 100;


/* =====================================================
   0.3 — HIDE WINDOWS AT START
   ===================================================== */

Object.values(windows).forEach(function (windowElement) {

    if (windowElement) {

        windowElement.style.display = "none";

    }

});


/* =====================================================
   0.4 — CLOCK
   ===================================================== */

function updateClock() {

    if (!clock) {
        return;
    }

    const now = new Date();

    let hours = now.getHours();

    let minutes = now.getMinutes();

    hours =
        String(hours).padStart(2, "0");

    minutes =
        String(minutes).padStart(2, "0");

    clock.textContent =
        hours + ":" + minutes;

}


updateClock();

setInterval(updateClock, 1000);


/* =====================================================
   0.5 — BATTERY
   ===================================================== */

async function setupBattery() {

    if (!battery) {
        return;
    }


    if (!navigator.getBattery) {

        battery.textContent =
            "🔋 N/A";

        return;

    }


    try {

        const batteryManager =
            await navigator.getBattery();


        function updateBattery() {

            const percent =
                Math.round(
                    batteryManager.level * 100
                );


            if (batteryManager.charging) {

                battery.textContent =
                    "⚡ " + percent + "%";

            } else {

                battery.textContent =
                    "🔋 " + percent + "%";

            }

        }


        updateBattery();


        batteryManager.addEventListener(
            "levelchange",
            updateBattery
        );


        batteryManager.addEventListener(
            "chargingchange",
            updateBattery
        );


    } catch (error) {

        battery.textContent =
            "🔋 N/A";

    }

}


setupBattery();


/* =====================================================
   0.6 — START MENU
   ===================================================== */

if (startMenu) {

    startMenu.style.display = "none";

}


if (startButton) {

    startButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            if (
                startMenu.style.display ===
                "block"
            ) {

                startMenu.style.display =
                    "none";

            } else {

                startMenu.style.display =
                    "block";

            }

        }
    );

}


if (startMenu) {

    startMenu.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

}


document.addEventListener(
    "click",
    function () {

        if (startMenu) {

            startMenu.style.display =
                "none";

        }

    }
);


/* =====================================================
   0.7 — WINDOW FUNCTIONS
   ===================================================== */

function openWindow(name) {

    const windowElement =
        windows[name];


    if (!windowElement) {
        return;
    }


    windowElement.style.display =
        "block";


    highestZIndex++;


    windowElement.style.zIndex =
        highestZIndex;

}


function closeWindow(name) {

    const windowElement =
        windows[name];


    if (!windowElement) {
        return;
    }


    windowElement.style.display =
        "none";


    removeTaskbarButton(name);

}


function minimizeWindow(name) {

    const windowElement =
        windows[name];


    if (!windowElement) {
        return;
    }


    windowElement.style.display =
        "none";

}


function maximizeWindow(name) {

    const windowElement =
        windows[name];


    if (!windowElement) {
        return;
    }


    windowElement.classList.toggle(
        "maximized"
    );


    highestZIndex++;


    windowElement.style.zIndex =
        highestZIndex;

}


/* =====================================================
   0.8 — BRING WINDOW TO FRONT
   ===================================================== */

Object.values(windows).forEach(
    function (windowElement) {

        if (!windowElement) {
            return;
        }


        windowElement.addEventListener(
            "mousedown",
            function () {

                highestZIndex++;


                windowElement.style.zIndex =
                    highestZIndex;

            }
        );

    }
);


/* =====================================================
   0.9 — TASKBAR APP BUTTONS
   ===================================================== */

const taskbarButtons = {};


function addTaskbarButton(
    name,
    title,
    icon
) {

    if (!taskbarApps) {
        return;
    }


    if (taskbarButtons[name]) {
        return;
    }


    const button =
        document.createElement("button");


    button.className =
        "taskbarApp";


    button.textContent =
        icon + " " + title;


    button.addEventListener(
        "click",
        function () {

            const windowElement =
                windows[name];


            if (!windowElement) {
                return;
            }


            if (
                windowElement.style.display ===
                "none"
            ) {

                openWindow(name);

            } else {

                minimizeWindow(name);

            }

        }
    );


    taskbarApps.appendChild(button);


    taskbarButtons[name] =
        button;

}


function removeTaskbarButton(name) {

    if (taskbarButtons[name]) {

        taskbarButtons[name].remove();

        delete taskbarButtons[name];

    }

}


/* =====================================================
   1.0 — OPEN APP
   ===================================================== */

function openApp(
    name,
    title,
    icon
) {

    openWindow(name);


    addTaskbarButton(
        name,
        title,
        icon
    );


    if (startMenu) {

        startMenu.style.display =
            "none";

    }

}


/* =====================================================
   FILES — OPEN
   ===================================================== */

const filesApp =
    document.getElementById("filesApp");


if (filesApp) {

    filesApp.addEventListener(
        "click",
        function () {

            openApp(
                "files",
                "Files",
                "📁"
            );

        }
    );

}


const filesDesktopIcon =
    document.getElementById(
        "filesDesktopIcon"
    );


if (filesDesktopIcon) {

    filesDesktopIcon.addEventListener(
        "dblclick",
        function () {

            openApp(
                "files",
                "Files",
                "📁"
            );

        }
    );

}


/* FILES CONTROLS */

const minimizeFiles =
    document.getElementById(
        "minimizeFiles"
    );


if (minimizeFiles) {

    minimizeFiles.addEventListener(
        "click",
        function () {

            minimizeWindow("files");

        }
    );

}


const maximizeFiles =
    document.getElementById(
        "maximizeFiles"
    );


if (maximizeFiles) {

    maximizeFiles.addEventListener(
        "click",
        function () {

            maximizeWindow("files");

        }
    );

}


const closeFiles =
    document.getElementById(
        "closeFiles"
    );


if (closeFiles) {

    closeFiles.addEventListener(
        "click",
        function () {

            closeWindow("files");

        }
    );

}


/* =====================================================
   NOTES
   ===================================================== */

const notesEditor =
    document.getElementById(
        "notesEditor"
    );


const saveStatus =
    document.getElementById(
        "saveStatus"
    );


const notesApp =
    document.getElementById(
        "notesApp"
    );


function loadNote() {

    if (!notesEditor) {
        return;
    }


    const saved =
        localStorage.getItem(
            "webosNote"
        );


    if (saved !== null) {

        notesEditor.value =
            saved;

    }

}


if (notesApp) {

    notesApp.addEventListener(
        "click",
        function () {

            openApp(
                "notes",
                "Notes",
                "📝"
            );


            loadNote();

        }
    );

}


const notesDesktopIcon =
    document.getElementById(
        "notesDesktopIcon"
    );


if (notesDesktopIcon) {

    notesDesktopIcon.addEventListener(
        "dblclick",
        function () {

            openApp(
                "notes",
                "Notes",
                "📝"
            );


            loadNote();

        }
    );

}


/* SAVE NOTE */

const saveNote =
    document.getElementById(
        "saveNote"
    );


if (saveNote) {

    saveNote.addEventListener(
        "click",
        function () {

            if (!notesEditor) {
                return;
            }


            localStorage.setItem(
                "webosNote",
                notesEditor.value
            );


            if (saveStatus) {

                saveStatus.textContent =
                    "Saved ✓";

            }

        }
    );

}


/* CLEAR NOTE */

const clearNote =
    document.getElementById(
        "clearNote"
    );


if (clearNote) {

    clearNote.addEventListener(
        "click",
        function () {

            if (notesEditor) {

                notesEditor.value =
                    "";

            }


            localStorage.removeItem(
                "webosNote"
            );


            if (saveStatus) {

                saveStatus.textContent =
                    "Cleared";

            }

        }
    );

}


/* NOTES CONTROLS */

const minimizeNotes =
    document.getElementById(
        "minimizeNotes"
    );


if (minimizeNotes) {

    minimizeNotes.addEventListener(
        "click",
        function () {

            minimizeWindow("notes");

        }
    );

}


const maximizeNotes =
    document.getElementById(
        "maximizeNotes"
    );


if (maximizeNotes) {

    maximizeNotes.addEventListener(
        "click",
        function () {

            maximizeWindow("notes");

        }
    );

}


const closeNotes =
    document.getElementById(
        "closeNotes"
    );


if (closeNotes) {

    closeNotes.addEventListener(
        "click",
        function () {

            closeWindow("notes");

        }
    );

}


/* =====================================================
   CALCULATOR
   ===================================================== */

const calculatorDisplay =
    document.getElementById(
        "calculatorDisplay"
    );


const calculatorApp =
    document.getElementById(
        "calculatorApp"
    );


if (calculatorApp) {

    calculatorApp.addEventListener(
        "click",
        function () {

            openApp(
                "calculator",
                "Calculator",
                "🧮"
            );

        }
    );

}


const calculatorDesktopIcon =
    document.getElementById(
        "calculatorDesktopIcon"
    );


if (calculatorDesktopIcon) {

    calculatorDesktopIcon.addEventListener(
        "dblclick",
        function () {

            openApp(
                "calculator",
                "Calculator",
                "🧮"
            );

        }
    );

}


/* CALCULATOR BUTTONS */

const calculatorButtons =
    document.querySelectorAll(
        ".calculatorButtons button"
    );


calculatorButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                if (!calculatorDisplay) {
                    return;
                }


                const value =
                    button.dataset.value;


                if (value === "C") {

                    calculatorDisplay.value =
                        "0";

                    return;

                }


                if (value === "=") {

                    calculate();

                    return;

                }


                if (
                    calculatorDisplay.value ===
                    "Error"
                ) {

                    calculatorDisplay.value =
                        "0";

                }


                if (
                    calculatorDisplay.value ===
                    "0"
                ) {

                    calculatorDisplay.value =
                        value;

                } else {

                    calculatorDisplay.value +=
                        value;

                }

            }
        );

    }
);


function calculate() {

    if (!calculatorDisplay) {
        return;
    }


    const expression =
        calculatorDisplay.value;


    if (
        !/^[0-9+\-*/().\s]+$/.test(
            expression
        )
    ) {

        calculatorDisplay.value =
            "Error";

        return;

    }


    try {

        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();


        if (
            typeof result !==
                "number" ||
            !Number.isFinite(result)
        ) {

            calculatorDisplay.value =
                "Error";

            return;

        }


        calculatorDisplay.value =
            result;

    } catch (error) {

        calculatorDisplay.value =
            "Error";

    }

}


/* CALCULATOR CONTROLS */

const minimizeCalculator =
    document.getElementById(
        "minimizeCalculator"
    );


if (minimizeCalculator) {

    minimizeCalculator.addEventListener(
        "click",
        function () {

            minimizeWindow(
                "calculator"
            );

        }
    );

}


const maximizeCalculator =
    document.getElementById(
        "maximizeCalculator"
    );


if (maximizeCalculator) {

    maximizeCalculator.addEventListener(
        "click",
        function () {

            maximizeWindow(
                "calculator"
            );

        }
    );

}


const closeCalculator =
    document.getElementById(
        "closeCalculator"
    );


if (closeCalculator) {

    closeCalculator.addEventListener(
        "click",
        function () {

            closeWindow(
                "calculator"
            );

        }
    );

}


/* =====================================================
   SETTINGS
   ===================================================== */

const settingsApp =
    document.getElementById(
        "settingsApp"
    );


if (settingsApp) {

    settingsApp.addEventListener(
        "click",
        function () {

            openApp(
                "settings",
                "Settings",
                "⚙️"
            );


            updateSettings();

        }
    );

}


async function updateSettings() {

    const systemPlatform =
        document.getElementById(
            "systemPlatform"
        );


    const systemBrowser =
        document.getElementById(
            "systemBrowser"
        );


    const systemLanguage =
        document.getElementById(
            "systemLanguage"
        );


    const screenResolution =
        document.getElementById(
            "screenResolution"
        );


    const screenPixelRatio =
        document.getElementById(
            "screenPixelRatio"
        );


    const networkStatus =
        document.getElementById(
            "networkStatus"
        );


    const settingsBattery =
        document.getElementById(
            "settingsBattery"
        );


    if (systemPlatform) {

        systemPlatform.textContent =
            "Platform: " +
            navigator.platform;

    }


    if (systemBrowser) {

        systemBrowser.textContent =
            "Browser: " +
            navigator.userAgent;

    }


    if (systemLanguage) {

        systemLanguage.textContent =
            "Language: " +
            navigator.language;

    }


    if (screenResolution) {

        screenResolution.textContent =
            "Screen: " +
            screen.width +
            " × " +
            screen.height;

    }


    if (screenPixelRatio) {

        screenPixelRatio.textContent =
            "Pixel ratio: " +
            window.devicePixelRatio;

    }


    if (networkStatus) {

        networkStatus.textContent =
            navigator.onLine
                ? "Status: Online"
                : "Status: Offline";

    }


    if (
        navigator.getBattery &&
        settingsBattery
    ) {

        try {

            const batteryManager =
                await navigator.getBattery();


            const percent =
                Math.round(
                    batteryManager.level * 100
                );


            settingsBattery.textContent =
                percent +
                "% — " +
                (
                    batteryManager.charging
                        ? "Charging"
                        : "Not charging"
                );

        } catch (error) {

            settingsBattery.textContent =
                "Unavailable";

        }

    } else if (settingsBattery) {

        settingsBattery.textContent =
            "Unavailable";

    }

}


/* SETTINGS CONTROLS */

const minimizeSettings =
    document.getElementById(
        "minimizeSettings"
    );


if (minimizeSettings) {

    minimizeSettings.addEventListener(
        "click",
        function () {

            minimizeWindow(
                "settings"
            );

        }
    );

}


const maximizeSettings =
    document.getElementById(
        "maximizeSettings"
    );


if (maximizeSettings) {

    maximizeSettings.addEventListener(
        "click",
        function () {

            maximizeWindow(
                "settings"
            );

        }
    );

}


const closeSettings =
    document.getElementById(
        "closeSettings"
    );


if (closeSettings) {

    closeSettings.addEventListener(
        "click",
        function () {

            closeWindow(
                "settings"
            );

        }
    );

}


/* =====================================================
   TASK MANAGER
   ===================================================== */

const webosStartTime =
    Date.now();


const taskManagerApp =
    document.getElementById(
        "taskManagerApp"
    );


if (taskManagerApp) {

    taskManagerApp.addEventListener(
        "click",
        function () {

            openApp(
                "taskManager",
                "Task Manager",
                "📊"
            );


            updateTaskManager();

        }
    );

}


function updateTaskManager() {

    const uptime =
        document.getElementById(
            "webosUptime"
        );


    const taskNetwork =
        document.getElementById(
            "taskNetwork"
        );


    const taskStorage =
        document.getElementById(
            "taskStorage"
        );


    const runningApps =
        document.getElementById(
            "runningApps"
        );


    /* UPTIME */

    if (uptime) {

        const seconds =
            Math.floor(
                (Date.now() -
                    webosStartTime) /
                1000
            );


        uptime.textContent =
            seconds +
            " seconds";

    }


    /* NETWORK */

    if (taskNetwork) {

        taskNetwork.textContent =
            navigator.onLine
                ? "Online"
                : "Offline";

    }


    /* STORAGE */

    if (
        taskStorage &&
        navigator.storage &&
        navigator.storage.estimate
    ) {

        navigator.storage
            .estimate()
            .then(function (data) {

                const usedMB =
                    (data.usage || 0) /
                    1024 /
                    1024;


                taskStorage.textContent =
                    usedMB.toFixed(2) +
                    " MB used";

            });

    } else if (taskStorage) {

        taskStorage.textContent =
            "Unavailable";

    }


    /* RUNNING APPS */

    if (!runningApps) {
        return;
    }


    runningApps.innerHTML = "";


    const appList = [

        ["files", "📁 Files"],

        ["notes", "📝 Notes"],

        ["calculator", "🧮 Calculator"],

        ["settings", "⚙️ Settings"],

        [
            "taskManager",
            "📊 Task Manager"
        ]

    ];


    appList.forEach(
        function (app) {

            const windowElement =
                windows[app[0]];


            if (
                windowElement &&
                windowElement.style.display !==
                "none"
            ) {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "runningApp";


                row.textContent =
                    app[1] +
                    " — Running";


                runningApps.appendChild(
                    row
                );

            }

        }
    );

}


const refreshTaskManager =
    document.getElementById(
        "refreshTaskManager"
    );


if (refreshTaskManager) {

    refreshTaskManager.addEventListener(
        "click",
        function () {

            updateTaskManager();

        }
    );

}


/* TASK MANAGER CONTROLS */

const minimizeTaskManager =
    document.getElementById(
        "minimizeTaskManager"
    );


if (minimizeTaskManager) {

    minimizeTaskManager.addEventListener(
        "click",
        function () {

            minimizeWindow(
                "taskManager"
            );

        }
    );

}


const maximizeTaskManager =
    document.getElementById(
        "maximizeTaskManager"
    );


if (maximizeTaskManager) {

    maximizeTaskManager.addEventListener(
        "click",
        function () {

            maximizeWindow(
                "taskManager"
            );

        }
    );

}


const closeTaskManager =
    document.getElementById(
        "closeTaskManager"
    );


if (closeTaskManager) {

    closeTaskManager.addEventListener(
        "click",
        function () {

            closeWindow(
                "taskManager"
            );

        }
    );

}


setInterval(
    updateTaskManager,
    1000
);


/* =====================================================
   GAMES
   ===================================================== */

const gamesApp =
    document.getElementById(
        "gamesApp"
    );


if (gamesApp) {

    gamesApp.addEventListener(
        "click",
        function () {

            if (startMenu) {

                startMenu.style.display =
                    "none";

            }


            alert(
                "🎮 Games Hub is coming soon!"
            );

        }
    );

}


/* =====================================================
   POWER BUTTON
   ===================================================== */

const powerButton =
    document.getElementById(
        "powerButton"
    );


if (powerButton) {

    powerButton.addEventListener(
        "click",
        function () {

            if (startMenu) {

                startMenu.style.display =
                    "none";

            }


            alert(
                "WebOS cannot shut down the real computer from a normal webpage."
            );

        }
    );

}


/* =====================================================
   NETWORK STATUS
   ===================================================== */

window.addEventListener(
    "online",
    function () {

        updateSettings();

    }
);


window.addEventListener(
    "offline",
    function () {

        updateSettings();

    }
);


/* =====================================================
   DESKTOP ICON SELECTION
   ===================================================== */

document
    .querySelectorAll(".desktop-icon")
    .forEach(function (icon) {

        icon.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".desktop-icon"
                    )
                    .forEach(
                        function (other) {

                            other.style.background =
                                "";

                        }
                    );


                icon.style.background =
                    "rgba(255,255,255,0.15)";

            }
        );

    });


/* =====================================================
   WELCOME SCREEN
   ===================================================== */

function enterWebOS() {

    if (!welcomeScreen) {
        return;
    }


    if (welcomeLoading) {

        welcomeLoading.textContent =
            "Starting WebOS...";

    }


    setTimeout(
        function () {

            welcomeScreen.classList.add(
                "hidden"
            );

        },
        400
    );

}


if (startWebOS) {

    startWebOS.addEventListener(
        "click",
        function () {

            enterWebOS();

        }
    );

}


/* Automatically enter after 5 seconds */

setTimeout(
    function () {

        enterWebOS();

    },
    5000
);


/* =====================================================
   DRAGGABLE WINDOWS — v1.0
   ===================================================== */

let draggedWindow = null;

let offsetX = 0;

let offsetY = 0;


/*
   Every .windowHeader becomes a
   draggable area.
*/

document
    .querySelectorAll(".windowHeader")
    .forEach(function (header) {

        header.addEventListener(
            "mousedown",
            function (event) {

                /*
                   Don't drag when clicking
                   minimize, maximize or close.
                */

                if (
                    event.target.closest(
                        "button"
                    )
                ) {

                    return;

                }


                const win =
                    header.closest(
                        ".window"
                    );


                if (!win) {
                    return;
                }


                /*
                   Bring the window
                   to the front.
                */

                highestZIndex++;


                win.style.zIndex =
                    highestZIndex;


                /*
                   Get current position.
                */

                const rect =
                    win.getBoundingClientRect();


                offsetX =
                    event.clientX -
                    rect.left;


                offsetY =
                    event.clientY -
                    rect.top;


                /*
                   Make the window
                   absolutely positioned.
                */

                win.style.position =
                    "absolute";


                win.style.left =
                    rect.left + "px";


                win.style.top =
                    rect.top + "px";


                draggedWindow =
                    win;


                event.preventDefault();

            }
        );

    });


/* =====================================================
   DRAG WINDOW
   ===================================================== */

document.addEventListener(
    "mousemove",
    function (event) {

        if (!draggedWindow) {
            return;
        }


        let newX =
            event.clientX -
            offsetX;


        let newY =
            event.clientY -
            offsetY;


        /*
           Keep the window
           inside the screen.
        */

        const maxX =
            Math.max(
                0,
                window.innerWidth -
                draggedWindow.offsetWidth
            );


        const maxY =
            Math.max(
                0,
                window.innerHeight -
                draggedWindow.offsetHeight
            );


        newX =
            Math.max(
                0,
                Math.min(
                    newX,
                    maxX
                )
            );


        newY =
            Math.max(
                0,
                Math.min(
                    newY,
                    maxY
                )
            );


        draggedWindow.style.left =
            newX + "px";


        draggedWindow.style.top =
            newY + "px";

    }
);


/* =====================================================
   STOP DRAGGING
   ===================================================== */

document.addEventListener(
    "mouseup",
    function () {

        draggedWindow = null;

    }
);


/* =====================================================
   INITIALIZE WEBOS
   ===================================================== */

function initializeWebOS() {

    Object.values(windows).forEach(
        function (windowElement) {

            if (windowElement) {

                windowElement.style.display =
                    "none";

            }

        }
    );


    if (startMenu) {

        startMenu.style.display =
            "none";

    }


    updateClock();


    updateTaskManager();


    console.log(
        "WebOS v1.0 started successfully."
    );

}


initializeWebOS();


/* =====================================================
   WEBOS READY
   ===================================================== */

console.log(
    "🖥️ WebOS v1.0 — READY"
);

console.log(
    "🪟 Draggable windows — ENABLED"
);

console.log(
    "📁 Files — READY"
);

console.log(
    "📝 Notes — READY"
);

console.log(
    "🧮 Calculator — READY"
);

console.log(
    "⚙️ Settings — READY"
);

console.log(
    "📊 Task Manager — READY"
);
