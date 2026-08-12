/* =====================================================
   WebOS v1.0 — COMPLETE JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. ELEMENTS
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
   2. WINDOWS
   ===================================================== */

const filesWindow = document.getElementById("filesWindow");
const notesWindow = document.getElementById("notesWindow");
const calculatorWindow = document.getElementById("calculatorWindow");
const settingsWindow = document.getElementById("settingsWindow");
const taskManagerWindow = document.getElementById("taskManagerWindow");


const windows = {
    files: filesWindow,
    notes: notesWindow,
    calculator: calculatorWindow,
    settings: settingsWindow,
    taskManager: taskManagerWindow
};


let highestZIndex = 100;


/* =====================================================
   3. HIDE WINDOWS AT START
   ===================================================== */

Object.values(windows).forEach(function (windowElement) {

    if (windowElement) {
        windowElement.style.display = "none";
    }

});


/* =====================================================
   4. CLOCK
   ===================================================== */

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");

    clock.textContent = hours + ":" + minutes;

}


updateClock();

setInterval(updateClock, 1000);


/* =====================================================
   5. BATTERY
   ===================================================== */

async function setupBattery() {

    if (!navigator.getBattery) {

        battery.textContent = "🔋 N/A";

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

        battery.textContent = "🔋 N/A";

    }

}


setupBattery();


/* =====================================================
   6. START MENU
   ===================================================== */

startMenu.style.display = "none";


startButton.addEventListener("click", function (event) {

    event.stopPropagation();


    if (startMenu.style.display === "block") {

        startMenu.style.display = "none";

    } else {

        startMenu.style.display = "block";

    }

});


startMenu.addEventListener("click", function (event) {

    event.stopPropagation();

});


document.addEventListener("click", function () {

    startMenu.style.display = "none";

});


/* =====================================================
   7. WINDOW FUNCTIONS
   ===================================================== */

function openWindow(name) {

    const windowElement = windows[name];

    if (!windowElement) {
        return;
    }


    windowElement.style.display = "block";


    highestZIndex++;

    windowElement.style.zIndex = highestZIndex;

}


function closeWindow(name) {

    const windowElement = windows[name];

    if (!windowElement) {
        return;
    }


    windowElement.style.display = "none";


    removeTaskbarButton(name);

}


function minimizeWindow(name) {

    const windowElement = windows[name];

    if (!windowElement) {
        return;
    }


    windowElement.style.display = "none";

}


function maximizeWindow(name) {

    const windowElement = windows[name];

    if (!windowElement) {
        return;
    }


    windowElement.classList.toggle("maximized");


    highestZIndex++;

    windowElement.style.zIndex = highestZIndex;

}


/* =====================================================
   8. TASKBAR APP BUTTONS
   ===================================================== */

const taskbarButtons = {};


function addTaskbarButton(name, title, icon) {

    if (taskbarButtons[name]) {
        return;
    }


    const button = document.createElement("button");


    button.className = "taskbarApp";


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


    taskbarButtons[name] = button;

}


function removeTaskbarButton(name) {

    if (taskbarButtons[name]) {

        taskbarButtons[name].remove();

        delete taskbarButtons[name];

    }

}


/* =====================================================
   9. OPEN APP
   ===================================================== */

function openApp(name, title, icon) {

    openWindow(name);

    addTaskbarButton(
        name,
        title,
        icon
    );

    startMenu.style.display = "none";

}


/* =====================================================
   10. FILES APP
   ===================================================== */

document
    .getElementById("filesApp")
    .addEventListener("click", function () {

        openApp(
            "files",
            "Files",
            "📁"
        );

    });


document
    .getElementById("filesDesktopIcon")
    .addEventListener("dblclick", function () {

        openApp(
            "files",
            "Files",
            "📁"
        );

    });


document
    .getElementById("minimizeFiles")
    .addEventListener("click", function () {

        minimizeWindow("files");

    });


document
    .getElementById("maximizeFiles")
    .addEventListener("click", function () {

        maximizeWindow("files");

    });


document
    .getElementById("closeFiles")
    .addEventListener("click", function () {

        closeWindow("files");

    });


/* =====================================================
   11. NOTES APP
   ===================================================== */

const notesEditor =
    document.getElementById("notesEditor");

const saveStatus =
    document.getElementById("saveStatus");


document
    .getElementById("notesApp")
    .addEventListener("click", function () {

        openApp(
            "notes",
            "Notes",
            "📝"
        );

        loadNote();

    });


document
    .getElementById("notesDesktopIcon")
    .addEventListener("dblclick", function () {

        openApp(
            "notes",
            "Notes",
            "📝"
        );

        loadNote();

    });


function loadNote() {

    const saved =
        localStorage.getItem("webosNote");


    if (saved !== null) {

        notesEditor.value = saved;

    }

}


/* SAVE */

document
    .getElementById("saveNote")
    .addEventListener("click", function () {

        localStorage.setItem(
            "webosNote",
            notesEditor.value
        );


        saveStatus.textContent =
            "Saved ✓";

    });


/* CLEAR */

document
    .getElementById("clearNote")
    .addEventListener("click", function () {

        notesEditor.value = "";

        localStorage.removeItem(
            "webosNote"
        );


        saveStatus.textContent =
            "Cleared";

    });


/* NOTES CONTROLS */

document
    .getElementById("minimizeNotes")
    .addEventListener("click", function () {

        minimizeWindow("notes");

    });


document
    .getElementById("maximizeNotes")
    .addEventListener("click", function () {

        maximizeWindow("notes");

    });


document
    .getElementById("closeNotes")
    .addEventListener("click", function () {

        closeWindow("notes");

    });


/* =====================================================
   12. CALCULATOR
   ===================================================== */

const calculatorDisplay =
    document.getElementById(
        "calculatorDisplay"
    );


document
    .getElementById("calculatorApp")
    .addEventListener("click", function () {

        openApp(
            "calculator",
            "Calculator",
            "🧮"
        );

    });


document
    .getElementById("calculatorDesktopIcon")
    .addEventListener("dblclick", function () {

        openApp(
            "calculator",
            "Calculator",
            "🧮"
        );

    });


const calculatorButtons =
    document.querySelectorAll(
        ".calculatorButtons button"
    );


calculatorButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const value =
                button.dataset.value;


            if (value === "C") {

                calculatorDisplay.value = "0";

                return;

            }


            if (value === "=") {

                calculate();

                return;

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

});


function calculate() {

    const expression =
        calculatorDisplay.value;


    /* Only allow calculator characters */

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
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            calculatorDisplay.value =
                "Error";

            return;

        }


        calculatorDisplay.value =
            result;

    } catch {

        calculatorDisplay.value =
            "Error";

    }

}


/* CALCULATOR CONTROLS */

document
    .getElementById("minimizeCalculator")
    .addEventListener("click", function () {

        minimizeWindow("calculator");

    });


document
    .getElementById("maximizeCalculator")
    .addEventListener("click", function () {

        maximizeWindow("calculator");

    });


document
    .getElementById("closeCalculator")
    .addEventListener("click", function () {

        closeWindow("calculator");

    });


/* =====================================================
   13. SETTINGS
   ===================================================== */

document
    .getElementById("settingsApp")
    .addEventListener("click", function () {

        openApp(
            "settings",
            "Settings",
            "⚙️"
        );

        updateSettings();

    });


async function updateSettings() {

    document.getElementById(
        "systemPlatform"
    ).textContent =
        "Platform: " +
        navigator.platform;


    document.getElementById(
        "systemBrowser"
    ).textContent =
        "Browser: " +
        navigator.userAgent;


    document.getElementById(
        "systemLanguage"
    ).textContent =
        "Language: " +
        navigator.language;


    document.getElementById(
        "screenResolution"
    ).textContent =
        "Screen: " +
        screen.width +
        " × " +
        screen.height;


    document.getElementById(
        "screenPixelRatio"
    ).textContent =
        "Pixel ratio: " +
        window.devicePixelRatio;


    document.getElementById(
        "networkStatus"
    ).textContent =
        navigator.onLine
            ? "Status: Online"
            : "Status: Offline";


    if (navigator.getBattery) {

        try {

            const batteryManager =
                await navigator.getBattery();


            const percent =
                Math.round(
                    batteryManager.level * 100
                );


            document.getElementById(
                "settingsBattery"
            ).textContent =
                percent +
                "% — " +
                (
                    batteryManager.charging
                        ? "Charging"
                        : "Not charging"
                );

        } catch {

            document.getElementById(
                "settingsBattery"
            ).textContent =
                "Unavailable";

        }

    } else {

        document.getElementById(
            "settingsBattery"
        ).textContent =
            "Unavailable";

    }

}


/* SETTINGS CONTROLS */

document
    .getElementById("minimizeSettings")
    .addEventListener("click", function () {

        minimizeWindow("settings");

    });


document
    .getElementById("maximizeSettings")
    .addEventListener("click", function () {

        maximizeWindow("settings");

    });


document
    .getElementById("closeSettings")
    .addEventListener("click", function () {

        closeWindow("settings");

    });


/* =====================================================
   14. TASK MANAGER
   ===================================================== */

const webosStartTime = Date.now();


document
    .getElementById("taskManagerApp")
    .addEventListener("click", function () {

        openApp(
            "taskManager",
            "Task Manager",
            "📊"
        );

        updateTaskManager();

    });


function updateTaskManager() {

    /* UPTIME */

    const seconds =
        Math.floor(
            (Date.now() - webosStartTime)
            / 1000
        );


    document.getElementById(
        "webosUptime"
    ).textContent =
        seconds + " seconds";


    /* NETWORK */

    document.getElementById(
        "taskNetwork"
    ).textContent =
        navigator.onLine
            ? "Online"
            : "Offline";


    /* STORAGE */

    if (
        navigator.storage &&
        navigator.storage.estimate
    ) {

        navigator.storage
            .estimate()
            .then(function (data) {

                const usedMB =
                    (data.usage || 0)
                    / 1024
                    / 1024;


                document.getElementById(
                    "taskStorage"
                ).textContent =
                    usedMB.toFixed(2) +
                    " MB used";

            });

    } else {

        document.getElementById(
            "taskStorage"
        ).textContent =
            "Unavailable";

    }


    /* RUNNING APPS */

    const runningApps =
        document.getElementById(
            "runningApps"
        );


    runningApps.innerHTML = "";


    const appList = [

        ["files", "📁 Files"],

        ["notes", "📝 Notes"],

        ["calculator", "🧮 Calculator"],

        ["settings", "⚙️ Settings"],

        ["taskManager", "📊 Task Manager"]

    ];


    appList.forEach(function (app) {

        const windowElement =
            windows[app[0]];


        if (
            windowElement &&
            windowElement.style.display !==
            "none"
        ) {

            const row =
                document.createElement("div");


            row.className =
                "runningApp";


            row.textContent =
                app[1] +
                " — Running";


            runningApps.appendChild(row);

        }

    });

}


document
    .getElementById("refreshTaskManager")
    .addEventListener("click", function () {

        updateTaskManager();

    });


document
    .getElementById("minimizeTaskManager")
    .addEventListener("click", function () {

        minimizeWindow("taskManager");

    });


document
    .getElementById("maximizeTaskManager")
    .addEventListener("click", function () {

        maximizeWindow("taskManager");

    });


document
    .getElementById("closeTaskManager")
    .addEventListener("click", function () {

        closeWindow("taskManager");

    });


setInterval(
    updateTaskManager,
    1000
);


/* =====================================================
   15. GAMES
   ===================================================== */

document
    .getElementById("gamesApp")
    .addEventListener("click", function () {

        startMenu.style.display = "none";


        alert(
            "🎮 Games Hub is coming soon!"
        );

    });


/* =====================================================
   16. POWER BUTTON
   ===================================================== */

document
    .getElementById("powerButton")
    .addEventListener("click", function () {

        startMenu.style.display = "none";


        alert(
            "WebOS cannot shut down the real computer from a normal webpage."
        );

    });


/* =====================================================
   17. NETWORK STATUS
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
   18. DESKTOP ICON SELECTION
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
                    .forEach(function (other) {

                        other.style.background =
                            "";

                    });


                icon.style.background =
                    "rgba(255,255,255,0.15)";

            }
        );

    });


/* =====================================================
   19. WELCOME SCREEN
   ===================================================== */

function enterWebOS() {

    if (!welcomeScreen) {
        return;
    }


    welcomeLoading.textContent =
        "Starting WebOS...";


    setTimeout(function () {

        welcomeScreen.classList.add(
            "hidden"
        );

    }, 400);

}


startWebOS.addEventListener(
    "click",
    function () {

        enterWebOS();

    }
);


/* Automatically enter after 5 seconds */

setTimeout(function () {

    enterWebOS();

}, 5000);


/* =====================================================
   20. INITIALIZE WEBOS
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


    startMenu.style.display =
        "none";


    updateClock();


    updateTaskManager();


    console.log(
        "WebOS v1.0 started successfully."
    );

}


initializeWebOS();
let draggedWindow = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll(".windowHeader").forEach(header => {

    header.addEventListener("mousedown", function(e) {

        if (e.target.closest("button")) return;

        const win = header.closest(".window");

        draggedWindow = win;

        const rect = win.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        win.style.position = "absolute";
        win.style.zIndex = ++window.highestZIndex;
    });
});


document.addEventListener("mousemove", function(e) {

    if (!draggedWindow) return;

    draggedWindow.style.left =
        (e.clientX - offsetX) + "px";

    draggedWindow.style.top =
        (e.clientY - offsetY) + "px";
});


document.addEventListener("mouseup", function() {

    draggedWindow = null;

});
