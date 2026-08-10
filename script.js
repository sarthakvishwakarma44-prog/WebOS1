```javascript
/* =====================================================
   WEBOS v1.0
   COMPLETE JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. MAIN ELEMENTS
   ===================================================== */

const desktop =
    document.getElementById("desktop");

const startButton =
    document.getElementById("startButton");

const startMenu =
    document.getElementById("startMenu");

const taskbarApps =
    document.getElementById("taskbarApps");

const clock =
    document.getElementById("clock");

const battery =
    document.getElementById("battery");


/* =====================================================
   2. WEBOS WINDOWS
   ===================================================== */

const windows = {

    files:
        document.getElementById("filesWindow"),

    notes:
        document.getElementById("notesWindow"),

    calculator:
        document.getElementById("calculatorWindow"),

    settings:
        document.getElementById("settingsWindow"),

    taskManager:
        document.getElementById("taskManagerWindow")

};


/* =====================================================
   3. INITIAL WINDOW STATE
   ===================================================== */

Object.values(windows).forEach(
    function(windowElement) {

        if (windowElement) {

            windowElement.style.display =
                "none";

        }

    }
);


let highestZIndex = 100;


/* =====================================================
   4. START MENU
   ===================================================== */

startMenu.style.display = "none";


startButton.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        if (
            startMenu.style.display === "block"
        ) {

            startMenu.style.display =
                "none";

        } else {

            startMenu.style.display =
                "block";

        }

    }
);


startMenu.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

    }
);


document.addEventListener(
    "click",
    function() {

        startMenu.style.display =
            "none";

    }
);


/* =====================================================
   5. CLOCK
   ===================================================== */

function updateClock() {

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    clock.textContent =
        hours + ":" + minutes;

}


updateClock();


setInterval(
    updateClock,
    1000
);


/* =====================================================
   6. BATTERY
   ===================================================== */

async function initializeBattery() {

    if (
        !navigator.getBattery
    ) {

        battery.textContent =
            "🔋 N/A";

        return;

    }


    try {

        const batteryManager =
            await navigator.getBattery();


        function updateBattery() {

            const percentage =
                Math.round(
                    batteryManager.level * 100
                );


            if (
                batteryManager.charging
            ) {

                battery.textContent =
                    "⚡ " +
                    percentage +
                    "%";

            } else {

                battery.textContent =
                    "🔋 " +
                    percentage +
                    "%";

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


    } catch {

        battery.textContent =
            "🔋 N/A";

    }

}


initializeBattery();


/* =====================================================
   7. OPEN WINDOW
   ===================================================== */

function openWindow(
    windowName
) {

    const windowElement =
        windows[windowName];


    if (!windowElement) {
        return;
    }


    windowElement.style.display =
        "block";


    highestZIndex++;


    windowElement.style.zIndex =
        highestZIndex;


    startMenu.style.display =
        "none";

}


/* =====================================================
   8. CLOSE WINDOW
   ===================================================== */

function closeWindow(
    windowName
) {

    const windowElement =
        windows[windowName];


    if (!windowElement) {
        return;
    }


    windowElement.style.display =
        "none";


    removeTaskbarButton(
        windowName
    );

}


/* =====================================================
   9. MINIMIZE WINDOW
   ===================================================== */

function minimizeWindow(
    windowName
) {

    const windowElement =
        windows[windowName];


    if (!windowElement) {
        return;
    }


    windowElement.style.display =
        "none";

}


/* =====================================================
   10. MAXIMIZE WINDOW
   ===================================================== */

function maximizeWindow(
    windowName
) {

    const windowElement =
        windows[windowName];


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
   11. WINDOW FOCUS
   ===================================================== */

Object.values(windows).forEach(
    function(windowElement) {

        if (!windowElement) {
            return;
        }


        windowElement.addEventListener(
            "mousedown",
            function() {

                highestZIndex++;


                windowElement.style.zIndex =
                    highestZIndex;

            }
        );

    }
);


/* =====================================================
   12. TASKBAR APP BUTTONS
   ===================================================== */

const taskbarButtons = {};


function addTaskbarButton(
    name,
    title,
    icon
) {

    if (
        taskbarButtons[name]
    ) {

        return;

    }


    const button =
        document.createElement(
            "button"
        );


    button.className =
        "taskbarApp";


    button.textContent =
        icon + " " + title;


    button.addEventListener(
        "click",
        function() {

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


    taskbarApps.appendChild(
        button
    );


    taskbarButtons[name] =
        button;

}


function removeTaskbarButton(
    name
) {

    if (
        taskbarButtons[name]
    ) {

        taskbarButtons[name].remove();


        delete taskbarButtons[name];

    }

}


/* =====================================================
   13. OPEN APP
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

}


/* =====================================================
   14. FILES APP
   ===================================================== */

const filesApp =
    document.getElementById(
        "filesApp"
    );


const filesDesktopIcon =
    document.getElementById(
        "filesDesktopIcon"
    );


filesApp.addEventListener(
    "click",
    function() {

        openApp(
            "files",
            "Files",
            "📁"
        );

    }
);


filesDesktopIcon.addEventListener(
    "dblclick",
    function() {

        openApp(
            "files",
            "Files",
            "📁"
        );

    }
);


/* Files controls */

document.getElementById(
    "minimizeFiles"
).addEventListener(
    "click",
    function() {

        minimizeWindow("files");

    }
);


document.getElementById(
    "maximizeFiles"
).addEventListener(
    "click",
    function() {

        maximizeWindow("files");

    }
);


document.getElementById(
    "closeFiles"
).addEventListener(
    "click",
    function() {

        closeWindow("files");

    }
);


/* =====================================================
   15. NOTES APP
   ===================================================== */

const notesApp =
    document.getElementById(
        "notesApp"
    );


const notesDesktopIcon =
    document.getElementById(
        "notesDesktopIcon"
    );


const notesEditor =
    document.getElementById(
        "notesEditor"
    );


const saveStatus =
    document.getElementById(
        "saveStatus"
    );


function loadNote() {

    const savedNote =
        localStorage.getItem(
            "webosNote"
        );


    if (
        savedNote !== null
    ) {

        notesEditor.value =
            savedNote;

    }

}


notesApp.addEventListener(
    "click",
    function() {

        openApp(
            "notes",
            "Notes",
            "📝"
        );


        loadNote();

    }
);


notesDesktopIcon.addEventListener(
    "dblclick",
    function() {

        openApp(
            "notes",
            "Notes",
            "📝"
        );


        loadNote();

    }
);


/* Save */

document.getElementById(
    "saveNote"
).addEventListener(
    "click",
    function() {

        localStorage.setItem(
            "webosNote",
            notesEditor.value
        );


        saveStatus.textContent =
            "Saved ✓";

    }
);


/* Clear */

document.getElementById(
    "clearNote"
).addEventListener(
    "click",
    function() {

        notesEditor.value =
            "";


        localStorage.removeItem(
            "webosNote"
        );


        saveStatus.textContent =
            "Cleared";

    }
);


/* Notes controls */

document.getElementById(
    "minimizeNotes"
).addEventListener(
    "click",
    function() {

        minimizeWindow("notes");

    }
);


document.getElementById(
    "maximizeNotes"
).addEventListener(
    "click",
    function() {

        maximizeWindow("notes");

    }
);


document.getElementById(
    "closeNotes"
).addEventListener(
    "click",
    function() {

        closeWindow("notes");

    }
);


/* =====================================================
   16. CALCULATOR
   ===================================================== */

const calculatorApp =
    document.getElementById(
        "calculatorApp"
    );


const calculatorDesktopIcon =
    document.getElementById(
        "calculatorDesktopIcon"
    );


const calculatorDisplay =
    document.getElementById(
        "calculatorDisplay"
    );


calculatorApp.addEventListener(
    "click",
    function() {

        openApp(
            "calculator",
            "Calculator",
            "🧮"
        );

    }
);


calculatorDesktopIcon.addEventListener(
    "dblclick",
    function() {

        openApp(
            "calculator",
            "Calculator",
            "🧮"
        );

    }
);


/* Calculator buttons */

const calculatorButtons =
    document.querySelectorAll(
        ".calculatorButtons button"
    );


calculatorButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const value =
                    button.dataset.value;


                if (
                    value === "C"
                ) {

                    calculatorDisplay.value =
                        "0";

                    return;

                }


                if (
                    value === "="
                ) {

                    calculateResult();

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

    }
);


/* Calculator calculation */

function calculateResult() {

    const expression =
        calculatorDisplay.value;


    /*
       Only allow numbers,
       operators, decimal points
       and parentheses.
    */

    if (
        !/^[0-9+\-*/().\s]+$/
        .test(expression)
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

    } catch {

        calculatorDisplay.value =
            "Error";

    }

}


/* Calculator controls */

document.getElementById(
    "minimizeCalculator"
).addEventListener(
    "click",
    function() {

        minimizeWindow(
            "calculator"
        );

    }
);


document.getElementById(
    "maximizeCalculator"
).addEventListener(
    "click",
    function() {

        maximizeWindow(
            "calculator"
        );

    }
);


document.getElementById(
    "closeCalculator"
).addEventListener(
    "click",
    function() {

        closeWindow(
            "calculator"
        );

    }
);


/* =====================================================
   17. SETTINGS
   ===================================================== */

const settingsApp =
    document.getElementById(
        "settingsApp"
    );


settingsApp.addEventListener(
    "click",
    function() {

        openApp(
            "settings",
            "Settings",
            "⚙️"
        );


        updateSettings();

    }
);


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


    if (
        navigator.getBattery
    ) {

        try {

            const batteryManager =
                await navigator.getBattery();


            const percentage =
                Math.round(
                    batteryManager.level * 100
                );


            document.getElementById(
                "settingsBattery"
            ).textContent =
                percentage +
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


/* Settings controls */

document.getElementById(
    "minimizeSettings"
).addEventListener(
    "click",
    function() {

        minimizeWindow(
            "settings"
        );

    }
);


document.getElementById(
    "maximizeSettings"
).addEventListener(
    "click",
    function() {

        maximizeWindow(
            "settings"
        );

    }
);


document.getElementById(
    "closeSettings"
).addEventListener(
    "click",
    function() {

        closeWindow(
            "settings"
        );

    }
);


/* =====================================================
   18. TASK MANAGER
   ===================================================== */

const taskManagerApp =
    document.getElementById(
        "taskManagerApp"
    );


const webosStartTime =
    Date.now();


taskManagerApp.addEventListener(
    "click",
    function() {

        openApp(
            "taskManager",
            "Task Manager",
            "📊"
        );


        updateTaskManager();

    }
);


function updateTaskManager() {

    /* Uptime */

    const uptimeSeconds =
        Math.floor(
            (
                Date.now() -
                webosStartTime
            ) / 1000
        );


    document.getElementById(
        "webosUptime"
    ).textContent =
        uptimeSeconds +
        " seconds";


    /* Network */

    document.getElementById(
        "taskNetwork"
    ).textContent =
        navigator.onLine
            ? "Online"
            : "Offline";


    /* Storage */

    if (
        navigator.storage &&
        navigator.storage.estimate
    ) {

        navigator.storage
            .estimate()
            .then(
                function(info) {

                    const usedMB =
                        (
                            info.usage || 0
                        ) /
                        1024 /
                        1024;


                    document.getElementById(
                        "taskStorage"
                    ).textContent =
                        usedMB.toFixed(2) +
                        " MB used";

                }
            );

    } else {

        document.getElementById(
            "taskStorage"
        ).textContent =
            "Unavailable";

    }


    /* Running applications */

    const runningApps =
        document.getElementById(
            "runningApps"
        );


    runningApps.innerHTML =
        "";


    const appList = [

        ["files", "📁 Files"],

        ["notes", "📝 Notes"],

        ["calculator", "🧮 Calculator"],

        ["settings", "⚙️ Settings"],

        ["taskManager", "📊 Task Manager"]

    ];


    appList.forEach(
        function(app) {

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


/* Refresh */

document.getElementById(
    "refreshTaskManager"
).addEventListener(
    "click",
    updateTaskManager
);


/* Live update */

setInterval(
    updateTaskManager,
    1000
);


/* Task Manager controls */

document.getElementById(
    "minimizeTaskManager"
).addEventListener(
    "click",
    function() {

        minimizeWindow(
            "taskManager"
        );

    }
);


document.getElementById(
    "maximizeTaskManager"
).addEventListener(
    "click",
    function() {

        maximizeWindow(
            "taskManager"
        );

    }
);


document.getElementById(
    "closeTaskManager"
).addEventListener(
    "click",
    function() {

        closeWindow(
            "taskManager"
        );

    }
);


/* =====================================================
   19. GAMES
   ===================================================== */

document.getElementById(
    "gamesApp"
).addEventListener(
    "click",
    function() {

        startMenu.style.display =
            "none";


        alert(
            "🎮 Games Hub is coming soon!"
        );

    }
);


/* =====================================================
   20. POWER BUTTON
   ===================================================== */

document.getElementById(
    "powerButton"
).addEventListener(
    "click",
    function() {

        startMenu.style.display =
            "none";


        alert(
            "WebOS cannot shut down the real computer from a normal webpage."
        );

    }
);


/* =====================================================
   21. NETWORK EVENTS
   ===================================================== */

window.addEventListener(
    "online",
    function() {

        updateSettings();

    }
);


window.addEventListener(
    "offline",
    function() {

        updateSettings();

    }
);


/* =====================================================
   22. DOUBLE-CLICK DESKTOP ICON BEHAVIOR
   ===================================================== */

document.querySelectorAll(
    ".desktop-icon"
).forEach(
    function(icon) {

        icon.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(
                        ".desktop-icon"
                    )
                    .forEach(
                        function(other) {

                            other.style.background =
                                "";

                        }
                    );


                icon.style.background =
                    "rgba(255,255,255,0.15)";

            }
        );

    }
);


/* =====================================================
   23. WEBOS STARTUP
   ===================================================== */

function initializeWebOS() {

    startMenu.style.display =
        "none";


    Object.values(windows).forEach(
        function(windowElement) {

            if (windowElement) {

                windowElement.style.display =
                    "none";

            }

        }
    );


    updateClock();


    updateTaskManager();


    console.log(
        "================================="
    );


    console.log(
        "WebOS v1.0"
    );


    console.log(
        "System initialized successfully."
    );


    console.log(
        "================================="
    );

}
```javascript
/* =====================================================
   WEBOS WELCOME SCREEN
   ===================================================== */

const welcomeScreen =
    document.getElementById(
        "welcomeScreen"
    );


const startWebOS =
    document.getElementById(
        "startWebOS"
    );


const welcomeLoading =
    document.getElementById(
        "welcomeLoading"
    );


function enterWebOS() {

    welcomeLoading.textContent =
        "Starting WebOS...";


    setTimeout(
        function() {

            welcomeScreen.classList.add(
                "hidden"
            );

        },
        500
    );

}


/* Start button */

startWebOS.addEventListener(
    "click",
    function() {

        enterWebOS();

    }
);


/* Automatic startup */

setTimeout(
    function() {

        enterWebOS();

    },
    3000
);
```


initializeWebOS();
```
