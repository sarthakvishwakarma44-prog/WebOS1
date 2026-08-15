/* =====================================================
   WebOS v1.0 — COMPLETE JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. ELEMENTS
   ===================================================== */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const startWebOS =
    document.getElementById("startWebOS");

const welcomeLoading =
    document.getElementById("welcomeLoading");

const desktop =
    document.getElementById("desktop");

const startButton =
    document.getElementById("startButton");

const startMenu =
    document.getElementById("startMenu");

const taskbarApps =
    document.getElementById("taskbarApps");

const battery =
    document.getElementById("battery");

const clock =
    document.getElementById("clock");


/* =====================================================
   2. WINDOWS
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

    let hours =
        String(now.getHours()).padStart(2, "0");

    let minutes =
        String(now.getMinutes()).padStart(2, "0");

    clock.textContent =
        hours + ":" + minutes;

}


updateClock();

setInterval(
    updateClock,
    1000
);


/* =====================================================
   5. BATTERY
   ===================================================== */

async function setupBattery() {

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
   6. START MENU
   ===================================================== */

startMenu.style.display = "none";


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


startMenu.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

    }
);


document.addEventListener(
    "click",
    function () {

        startMenu.style.display =
            "none";

    }
);


/* =====================================================
   7. WINDOW FUNCTIONS
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
   8. BRING WINDOW TO FRONT
   ===================================================== */

document.addEventListener(
    "mousedown",
    function (event) {

        const windowElement =
            event.target.closest(".window");


        if (!windowElement) {

            return;

        }


        highestZIndex++;


        windowElement.style.zIndex =
            highestZIndex;

    }
);


/* =====================================================
   9. TASKBAR APP BUTTONS
   ===================================================== */

const taskbarButtons = {};


function addTaskbarButton(
    name,
    title,
    icon
) {

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
   10. OPEN APP
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


    startMenu.style.display =
        "none";

}


/* =====================================================
   11. FILES APP
   ===================================================== */

const filesApp =
    document.getElementById(
        "filesApp"
    );


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


const minimizeFiles =
    document.getElementById(
        "minimizeFiles"
    );


if (minimizeFiles) {

    minimizeFiles.addEventListener(
        "click",
        function () {

            minimizeWindow(
                "files"
            );

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

            maximizeWindow(
                "files"
            );

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

            closeWindow(
                "files"
            );

        }
    );

}


/* =====================================================
   12. NOTES APP
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


const saveNote =
    document.getElementById(
        "saveNote"
    );


if (saveNote) {

    saveNote.addEventListener(
        "click",
        function () {

            localStorage.setItem(
                "webosNote",
                notesEditor.value
            );


            saveStatus.textContent =
                "Saved ✓";

        }
    );

}


const clearNote =
    document.getElementById(
        "clearNote"
    );


if (clearNote) {

    clearNote.addEventListener(
        "click",
        function () {

            notesEditor.value =
                "";


            localStorage.removeItem(
                "webosNote"
            );


            saveStatus.textContent =
                "Cleared";

        }
    );

}


const minimizeNotes =
    document.getElementById(
        "minimizeNotes"
    );


if (minimizeNotes) {

    minimizeNotes.addEventListener(
        "click",
        function () {

            minimizeWindow(
                "notes"
            );

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

            maximizeWindow(
                "notes"
            );

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

            closeWindow(
                "notes"
            );

        }
    );

}


/* =====================================================
   13. CALCULATOR
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


const calculatorButtons =
    document.querySelectorAll(
        ".calculatorButtons button"
    );


calculatorButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

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
                    "0" ||
                    calculatorDisplay.value ===
                    "Error"
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

    } catch {

        calculatorDisplay.value =
            "Error";

    }

}


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
   14. SETTINGS
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


    const settingsBattery =
        document.getElementById(
            "settingsBattery"
        );


    if (
        navigator.getBattery &&
        settingsBattery
    ) {

        try {

            const batteryManager =
                await navigator.getBattery();


            const percent =
                Math.round(
                    batteryManager.level *
                    100
                );


            settingsBattery.textContent =
                percent +
                "% — " +
                (
                    batteryManager.charging
                        ? "Charging"
                        : "Not charging"
                );

        } catch {

            settingsBattery.textContent =
                "Unavailable";

        }

    }

}


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
   15. TASK MANAGER
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

    const seconds =
        Math.floor(
            (
                Date.now() -
                webosStartTime
            ) / 1000
        );


    const webosUptime =
        document.getElementById(
            "webosUptime"
        );


    if (webosUptime) {

        webosUptime.textContent =
            seconds +
            " seconds";

    }


    const taskNetwork =
        document.getElementById(
            "taskNetwork"
        );


    if (taskNetwork) {

        taskNetwork.textContent =
            navigator.onLine
                ? "Online"
                : "Offline";

    }


    const taskStorage =
        document.getElementById(
            "taskStorage"
        );


    if (
        navigator.storage &&
        navigator.storage.estimate &&
        taskStorage
    ) {

        navigator.storage
            .estimate()
            .then(
                function (data) {

                    const usedMB =
                        (data.usage || 0) /
                        1024 /
                        1024;


                    taskStorage.textContent =
                        usedMB.toFixed(2) +
                        " MB used";

                }
            );

    }


    const runningApps =
        document.getElementById(
            "runningApps"
        );


    if (!runningApps) {

        return;

    }


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
   16. GAMES
   ===================================================== */

const gamesApp =
    document.getElementById(
        "gamesApp"
    );


if (gamesApp) {

    gamesApp.addEventListener(
        "click",
        function () {

            startMenu.style.display =
                "none";


            alert(
                "🎮 Games Hub is coming soon!"
            );

        }
    );

}


/* =====================================================
   17. POWER BUTTON
   ===================================================== */

const powerButton =
    document.getElementById(
        "powerButton"
    );


if (powerButton) {

    powerButton.addEventListener(
        "click",
        function () {

            startMenu.style.display =
                "none";


            alert(
                "WebOS cannot shut down the real computer from a normal webpage."
            );

        }
    );

}


/* =====================================================
   18. NETWORK STATUS
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
   19. DESKTOP ICON SELECTION
   ===================================================== */

document
    .querySelectorAll(".desktop-icon")
    .forEach(
        function (icon) {

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

        }
    );


/* =====================================================
   20. WELCOME SCREEN
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


setTimeout(
    function () {

        enterWebOS();

    },
    5000
);


/* =====================================================
   21. FEATURE 1 — APP SEARCH
   ===================================================== */

const searchBox =
    document.getElementById(
        "searchBox"
    );


const startApps =
    document.querySelector(
        ".startApps"
    );


if (
    searchBox &&
    startApps
) {

    searchBox.addEventListener(
        "input",
        function () {

            const search =
                searchBox.value
                    .toLowerCase()
                    .trim();


            const apps =
                startApps.querySelectorAll(
                    ".appButton"
                );


            apps.forEach(
                function (app) {

                    const text =
                        app.textContent
                            .toLowerCase();


                    if (
                        search === "" ||
                        text.includes(search)
                    ) {

                        app.style.display =
                            "flex";

                    } else {

                        app.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


/* =====================================================
   22. FEATURE 2 — DARK / LIGHT MODE
   ===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    } else {

        document.body.classList.remove(
            "light-mode"
        );

    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            const newTheme =
                isLight
                    ? "dark"
                    : "light";


            applyTheme(
                newTheme
            );


            localStorage.setItem(
                "webosTheme",
                newTheme
            );

        }
    );

}


const savedTheme =
    localStorage.getItem(
        "webosTheme"
    );


if (savedTheme) {

    applyTheme(
        savedTheme
    );

}


/* =====================================================
   23. FEATURE 3 — WALLPAPER SELECTOR
   ===================================================== */

const wallpaperButtons =
    document.querySelectorAll(
        ".wallpaperButton"
    );


function setWallpaper(name) {

    document.body.classList.remove(
        "wallpaper-space",
        "wallpaper-ocean",
        "wallpaper-forest",
        "wallpaper-night"
    );


    document.body.classList.add(
        "wallpaper-" + name
    );


    localStorage.setItem(
        "webosWallpaper",
        name
    );

}


wallpaperButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const wallpaper =
                    button.dataset.wallpaper;


                setWallpaper(
                    wallpaper
                );

            }
        );

    }
);


const savedWallpaper =
    localStorage.getItem(
        "webosWallpaper"
    );


if (savedWallpaper) {

    setWallpaper(
        savedWallpaper
    );

}


/* =====================================================
   24. DRAGGABLE WINDOWS
   ===================================================== */

let draggedWindow = null;

let offsetX = 0;

let offsetY = 0;


document
    .querySelectorAll(
        ".windowHeader"
    )
    .forEach(
        function (header) {

            header.addEventListener(
                "mousedown",
                function (event) {

                    /*
                     Don't drag when clicking
                     window control buttons.
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
                     Don't start normal
                     dragging from a maximized window.
                    */

                    if (
                        win.classList.contains(
                            "maximized"
                        )
                    ) {

                        return;

                    }


                    draggedWindow =
                        win;


                    const rect =
                        win.getBoundingClientRect();


                    offsetX =
                        event.clientX -
                        rect.left;


                    offsetY =
                        event.clientY -
                        rect.top;


                    win.style.position =
                        "absolute";


                    highestZIndex++;


                    win.style.zIndex =
                        highestZIndex;


                    /*
                     Prevent text selection
                     while dragging.
                    */

                    event.preventDefault();

                }
            );

        }
    );


document.addEventListener(
    "mousemove",
    function (event) {

        if (!draggedWindow) {

            return;

        }


        const newLeft =
            event.clientX -
            offsetX;


        const newTop =
            event.clientY -
            offsetY;


        draggedWindow.style.left =
            newLeft + "px";


        draggedWindow.style.top =
            newTop + "px";

    }
);


document.addEventListener(
    "mouseup",
    function () {

        draggedWindow = null;

    }
);


/* =====================================================
   25. INITIALIZE WEBOS
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
