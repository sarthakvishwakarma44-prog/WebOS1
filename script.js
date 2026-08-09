```javascript
/* =====================================================
   WEBOS v1.0
   Complete JavaScript
   v0.1 → v1.0
   ===================================================== */


/* =====================================================
   GLOBAL ELEMENTS
   ===================================================== */

const desktop =
    document.getElementById("desktop");

const startButton =
    document.getElementById("startButton");

const startMenu =
    document.getElementById("startMenu");

const taskbarApps =
    document.getElementById("taskbarApps");

const batteryDisplay =
    document.getElementById("battery");

const clockDisplay =
    document.getElementById("clock");


/* =====================================================
   START MENU
   ===================================================== */

startMenu.style.display = "none";


startButton.addEventListener(
    "click",
    function () {

        if (
            startMenu.style.display ===
            "none"
        ) {

            startMenu.style.display =
                "block";

        } else {

            startMenu.style.display =
                "none";

        }

    }
);


/* Close Start Menu when clicking desktop */

desktop.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                "#startMenu"
            ) &&
            !event.target.closest(
                "#startButton"
            )
        ) {

            startMenu.style.display =
                "none";

        }

    }
);


/* =====================================================
   CLOCK
   ===================================================== */

function updateClock() {

    const now =
        new Date();

    let hours =
        now.getHours();

    let minutes =
        now.getMinutes();

    hours =
        String(hours)
            .padStart(2, "0");

    minutes =
        String(minutes)
            .padStart(2, "0");

    clockDisplay.textContent =
        hours + ":" + minutes;

}


updateClock();

setInterval(
    updateClock,
    1000
);


/* =====================================================
   BATTERY
   ===================================================== */

async function initializeBattery() {

    if (
        !navigator.getBattery
    ) {

        batteryDisplay.textContent =
            "🔋 N/A";

        return;

    }


    try {

        const battery =
            await navigator.getBattery();


        function updateBattery() {

            const level =
                Math.round(
                    battery.level * 100
                );


            const icon =
                battery.charging
                    ? "⚡"
                    : "🔋";


            batteryDisplay.textContent =
                icon +
                " " +
                level +
                "%";

        }


        updateBattery();


        battery.addEventListener(
            "levelchange",
            updateBattery
        );


        battery.addEventListener(
            "chargingchange",
            updateBattery
        );


    } catch {

        batteryDisplay.textContent =
            "🔋 N/A";

    }

}


initializeBattery();


/* =====================================================
   WINDOW MANAGER
   ===================================================== */

const WebOSWindowManager = {

    windows: new Map(),

    highestZIndex: 100,


    register(
        id,
        windowElement
    ) {

        if (
            !windowElement
        ) {
            return;
        }


        this.windows.set(
            id,
            {
                element:
                    windowElement,

                minimized:
                    false,

                maximized:
                    false,

                previousPosition:
                    null
            }
        );


        windowElement.style.display =
            "none";


        this.makeDraggable(
            windowElement
        );


        windowElement.addEventListener(
            "mousedown",
            () => {

                this.focus(id);

            }
        );

    },


    open(id) {

        const app =
            this.windows.get(id);

        if (!app) {
            return;
        }


        app.element.style.display =
            "block";


        app.minimized =
            false;


        this.focus(id);

    },


    close(id) {

        const app =
            this.windows.get(id);

        if (!app) {
            return;
        }


        app.element.style.display =
            "none";


        app.minimized =
            false;

    },


    minimize(id) {

        const app =
            this.windows.get(id);

        if (!app) {
            return;
        }


        app.element.style.display =
            "none";


        app.minimized =
            true;

    },


    restore(id) {

        const app =
            this.windows.get(id);

        if (!app) {
            return;
        }


        app.element.style.display =
            "block";


        app.minimized =
            false;


        this.focus(id);

    },


    focus(id) {

        const app =
            this.windows.get(id);

        if (!app) {
            return;
        }


        this.highestZIndex++;


        app.element.style.zIndex =
            this.highestZIndex;

    },


    maximize(id) {

        const app =
            this.windows.get(id);

        if (!app) {
            return;
        }


        if (
            !app.maximized
        ) {

            app.previousPosition = {

                left:
                    app.element.style.left,

                top:
                    app.element.style.top,

                width:
                    app.element.style.width,

                height:
                    app.element.style.height

            };


            app.element.classList.add(
                "maximized"
            );


            app.maximized =
                true;


        } else {

            app.element.classList.remove(
                "maximized"
            );


            app.maximized =
                false;


            if (
                app.previousPosition
            ) {

                app.element.style.left =
                    app.previousPosition.left;

                app.element.style.top =
                    app.previousPosition.top;

                app.element.style.width =
                    app.previousPosition.width;

                app.element.style.height =
                    app.previousPosition.height;

            }

        }


        this.focus(id);

    },


    makeDraggable(
        windowElement
    ) {

        const header =
            windowElement.querySelector(
                ".windowHeader"
            );


        if (!header) {
            return;
        }


        let dragging =
            false;

        let offsetX =
            0;

        let offsetY =
            0;


        header.addEventListener(
            "mousedown",
            function (event) {

                if (
                    event.target.closest(
                        ".windowControls"
                    )
                ) {

                    return;

                }


                if (
                    windowElement.classList.contains(
                        "maximized"
                    )
                ) {

                    return;

                }


                dragging =
                    true;


                const rect =
                    windowElement.getBoundingClientRect();


                offsetX =
                    event.clientX -
                    rect.left;


                offsetY =
                    event.clientY -
                    rect.top;


                event.preventDefault();

            }
        );


        document.addEventListener(
            "mousemove",
            function (event) {

                if (!dragging) {
                    return;
                }


                windowElement.style.left =
                    (
                        event.clientX -
                        offsetX
                    ) + "px";


                windowElement.style.top =
                    (
                        event.clientY -
                        offsetY
                    ) + "px";

            }
        );


        document.addEventListener(
            "mouseup",
            function () {

                dragging =
                    false;

            }
        );

    }

};


/* =====================================================
   GET WINDOWS
   ===================================================== */

const filesWindow =
    document.getElementById(
        "filesWindow"
    );

const notesWindow =
    document.getElementById(
        "notesWindow"
    );

const calculatorWindow =
    document.getElementById(
        "calculatorWindow"
    );

const settingsWindow =
    document.getElementById(
        "settingsWindow"
    );

const taskManagerWindow =
    document.getElementById(
        "taskManagerWindow"
    );


/* =====================================================
   REGISTER WINDOWS
   ===================================================== */

WebOSWindowManager.register(
    "files",
    filesWindow
);

WebOSWindowManager.register(
    "notes",
    notesWindow
);

WebOSWindowManager.register(
    "calculator",
    calculatorWindow
);

WebOSWindowManager.register(
    "settings",
    settingsWindow
);

WebOSWindowManager.register(
    "taskManager",
    taskManagerWindow
);


/* =====================================================
   TASKBAR APP SYSTEM
   ===================================================== */

const taskbarButtons =
    new Map();


function createTaskbarButton(
    id,
    name,
    icon
) {

    if (
        taskbarButtons.has(id)
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
        icon + " " + name;


    button.addEventListener(
        "click",
        function () {

            const app =
                WebOSWindowManager
                    .windows
                    .get(id);


            if (!app) {
                return;
            }


            if (
                app.element.style.display ===
                "none"
            ) {

                WebOSWindowManager
                    .restore(id);

            } else {

                WebOSWindowManager
                    .minimize(id);

            }

        }
    );


    taskbarApps.appendChild(
        button
    );


    taskbarButtons.set(
        id,
        button
    );

}


function removeTaskbarButton(
    id
) {

    const button =
        taskbarButtons.get(id);


    if (!button) {
        return;
    }


    button.remove();


    taskbarButtons.delete(
        id
    );

}


/* =====================================================
   GENERIC APP OPENING
   ===================================================== */

function openApp(
    id,
    name,
    icon
) {

    WebOSWindowManager.open(
        id
    );


    createTaskbarButton(
        id,
        name,
        icon
    );


    startMenu.style.display =
        "none";

}


/* =====================================================
   FILES APP
   ===================================================== */

const filesApp =
    document.getElementById(
        "filesApp"
    );


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


/* =====================================================
   FILES WINDOW CONTROLS
   ===================================================== */

document.getElementById(
    "minimizeFiles"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.minimize(
            "files"
        );

        createTaskbarButton(
            "files",
            "Files",
            "📁"
        );

    }
);


document.getElementById(
    "maximizeFiles"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.maximize(
            "files"
        );

    }
);


document.getElementById(
    "closeFiles"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.close(
            "files"
        );

        removeTaskbarButton(
            "files"
        );

    }
);


/* =====================================================
   NOTES APP
   ===================================================== */

const notesApp =
    document.getElementById(
        "notesApp"
    );


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


/* =====================================================
   NOTES EDITOR
   ===================================================== */

const notesEditor =
    document.getElementById(
        "notesEditor"
    );

const saveNote =
    document.getElementById(
        "saveNote"
    );

const clearNote =
    document.getElementById(
        "clearNote"
    );

const saveStatus =
    document.getElementById(
        "saveStatus"
    );


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


/* =====================================================
   NOTES WINDOW CONTROLS
   ===================================================== */

document.getElementById(
    "minimizeNotes"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.minimize(
            "notes"
        );

        createTaskbarButton(
            "notes",
            "Notes",
            "📝"
        );

    }
);


document.getElementById(
    "maximizeNotes"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.maximize(
            "notes"
        );

    }
);


document.getElementById(
    "closeNotes"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.close(
            "notes"
        );

        removeTaskbarButton(
            "notes"
        );

    }
);


/* =====================================================
   CALCULATOR APP
   ===================================================== */

const calculatorApp =
    document.getElementById(
        "calculatorApp"
    );


const calculatorDisplay =
    document.getElementById(
        "calculatorDisplay"
    );


const calculatorButtons =
    document.querySelectorAll(
        ".calculatorButtons button"
    );


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


/* =====================================================
   CALCULATOR BUTTONS
   ===================================================== */

calculatorButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

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


/* =====================================================
   CALCULATOR CALCULATION
   ===================================================== */

function calculateResult() {

    const expression =
        calculatorDisplay.value;


    /*
       Only mathematical characters
       are accepted.
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
            !Number.isFinite(
                result
            )
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


/* =====================================================
   CALCULATOR WINDOW CONTROLS
   ===================================================== */

document.getElementById(
    "minimizeCalculator"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.minimize(
            "calculator"
        );

        createTaskbarButton(
            "calculator",
            "Calculator",
            "🧮"
        );

    }
);


document.getElementById(
    "maximizeCalculator"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.maximize(
            "calculator"
        );

    }
);


document.getElementById(
    "closeCalculator"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.close(
            "calculator"
        );

        removeTaskbarButton(
            "calculator"
        );

    }
);


/* =====================================================
   SETTINGS APP
   ===================================================== */

const settingsApp =
    document.getElementById(
        "settingsApp"
    );


settingsApp.addEventListener(
    "click",
    function () {

        openApp(
            "settings",
            "Settings",
            "⚙️"
        );


        updateSystemInformation();

    }
);


/* =====================================================
   SETTINGS INFORMATION
   ===================================================== */

const settingsBattery =
    document.getElementById(
        "settingsBattery"
    );

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


async function updateSystemInformation() {

    systemPlatform.textContent =
        "Platform: " +
        navigator.platform;


    systemBrowser.textContent =
        "Browser: " +
        navigator.userAgent;


    systemLanguage.textContent =
        "Language: " +
        navigator.language;


    screenResolution.textContent =
        "Screen: " +
        screen.width +
        " × " +
        screen.height;


    screenPixelRatio.textContent =
        "Pixel ratio: " +
        window.devicePixelRatio;


    updateNetworkStatus();


    await updateSettingsBattery();

}


/* =====================================================
   SETTINGS BATTERY
   ===================================================== */

async function updateSettingsBattery() {

    if (
        !navigator.getBattery
    ) {

        settingsBattery.textContent =
            "Battery information unavailable.";

        return;

    }


    try {

        const battery =
            await navigator.getBattery();


        function update() {

            const percentage =
                Math.round(
                    battery.level * 100
                );


            const status =
                battery.charging
                    ? "Charging"
                    : "Not charging";


            settingsBattery.textContent =
                percentage +
                "% — " +
                status;

        }


        update();


        battery.addEventListener(
            "levelchange",
            update
        );


        battery.addEventListener(
            "chargingchange",
            update
        );


    } catch {

        settingsBattery.textContent =
            "Battery information unavailable.";

    }

}


/* =====================================================
   NETWORK
   ===================================================== */

function updateNetworkStatus() {

    networkStatus.textContent =
        navigator.onLine
            ? "Status: Online"
            : "Status: Offline";

}


window.addEventListener(
    "online",
    updateNetworkStatus
);


window.addEventListener(
    "offline",
    updateNetworkStatus
);


/* =====================================================
   SETTINGS WINDOW CONTROLS
   ===================================================== */

document.getElementById(
    "minimizeSettings"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.minimize(
            "settings"
        );

        createTaskbarButton(
            "settings",
            "Settings",
            "⚙️"
        );

    }
);


document.getElementById(
    "maximizeSettings"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.maximize(
            "settings"
        );

    }
);


document.getElementById(
    "closeSettings"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.close(
            "settings"
        );

        removeTaskbarButton(
            "settings"
        );

    }
);


/* =====================================================
   TASK MANAGER
   ===================================================== */

const taskManagerApp =
    document.getElementById(
        "taskManagerApp"
    );


const webosUptime =
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


const refreshTaskManager =
    document.getElementById(
        "refreshTaskManager"
    );


const webosStartTime =
    Date.now();


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


/* =====================================================
   TASK MANAGER UPDATE
   ===================================================== */

async function updateTaskManager() {

    updateUptime();

    updateTaskNetwork();

    await updateStorage();

    updateRunningApps();

}


/* =====================================================
   UPTIME
   ===================================================== */

function updateUptime() {

    const totalSeconds =
        Math.floor(
            (
                Date.now() -
                webosStartTime
            ) / 1000
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (
                totalSeconds % 3600
            ) / 60
        );


    const seconds =
        totalSeconds % 60;


    if (
        hours > 0
    ) {

        webosUptime.textContent =
            hours +
            "h " +
            minutes +
            "m " +
            seconds +
            "s";

    } else if (
        minutes > 0
    ) {

        webosUptime.textContent =
            minutes +
            "m " +
            seconds +
            "s";

    } else {

        webosUptime.textContent =
            seconds +
            " seconds";

    }

}


/* =====================================================
   TASK MANAGER NETWORK
   ===================================================== */

function updateTaskNetwork() {

    taskNetwork.textContent =
        navigator.onLine
            ? "Online"
            : "Offline";

}


/* =====================================================
   BROWSER STORAGE
   ===================================================== */

async function updateStorage() {

    if (
        !navigator.storage ||
        !navigator.storage.estimate
    ) {

        taskStorage.textContent =
            "Unavailable";

        return;

    }


    try {

        const estimate =
            await navigator
                .storage
                .estimate();


        const usage =
            estimate.usage || 0;


        const quota =
            estimate.quota || 0;


        const usedMB =
            (
                usage /
                1024 /
                1024
            ).toFixed(2);


        const quotaMB =
            (
                quota /
                1024 /
                1024
            ).toFixed(0);


        taskStorage.textContent =
            usedMB +
            " MB / " +
            quotaMB +
            " MB";

    } catch {

        taskStorage.textContent =
            "Unavailable";

    }

}


/* =====================================================
   RUNNING WEBOS APPS
   ===================================================== */

function updateRunningApps() {

    runningApps.innerHTML =
        "";


    const apps = [

        {
            id: "files",
            name: "Files",
            icon: "📁"
        },

        {
            id: "notes",
            name: "Notes",
            icon: "📝"
        },

        {
            id: "calculator",
            name: "Calculator",
            icon: "🧮"
        },

        {
            id: "settings",
            name: "Settings",
            icon: "⚙️"
        },

        {
            id: "taskManager",
            name: "Task Manager",
            icon: "📊"
        }

    ];


    apps.forEach(
        function (app) {

            const windowData =
                WebOSWindowManager
                    .windows
                    .get(app.id);


            if (
                !windowData
            ) {
                return;
            }


            if (
                windowData
                    .element
                    .style
                    .display ===
                "none"
            ) {

                return;

            }


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "runningApp";


            row.innerHTML =

                "<span>" +

                app.icon +
                " " +
                app.name +

                "</span>" +

                "<span class=\"appStatus\">" +

                "● Running" +

                "</span>";


            runningApps.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   TASK MANAGER REFRESH
   ===================================================== */

refreshTaskManager.addEventListener(
    "click",
    function () {

        updateTaskManager();

    }
);


/* =====================================================
   TASK MANAGER WINDOW CONTROLS
   ===================================================== */

document.getElementById(
    "minimizeTaskManager"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.minimize(
            "taskManager"
        );

        createTaskbarButton(
            "taskManager",
            "Task Manager",
            "📊"
        );

    }
);


document.getElementById(
    "maximizeTaskManager"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.maximize(
            "taskManager"
        );

    }
);


document.getElementById(
    "closeTaskManager"
).addEventListener(
    "click",
    function () {

        WebOSWindowManager.close(
            "taskManager"
        );

        removeTaskbarButton(
            "taskManager"
        );

    }
);


/* =====================================================
   TASK MANAGER LIVE UPDATE
   ===================================================== */

setInterval(
    function () {

        if (
            taskManagerWindow.style.display !==
            "none"
        ) {

            updateTaskManager();

        }

    },
    1000
);


/* =====================================================
   GAMES BUTTON
   ===================================================== */

const gamesApp =
    document.getElementById(
        "gamesApp"
    );


gamesApp.addEventListener(
    "click",
    function () {

        startMenu.style.display =
            "none";


        alert(
            "🎮 Games Hub is coming in WebOS 1.1!"
        );

    }
);


/* =====================================================
   POWER BUTTON
   ===================================================== */

const powerButton =
    document.getElementById(
        "powerButton"
    );


powerButton.addEventListener(
    "click",
    function () {

        startMenu.style.display =
            "none";


        alert(
            "WebOS cannot shut down your real computer from a normal webpage."
        );

    }
);


/* =====================================================
   INITIAL SYSTEM STATE
   ===================================================== */

function initializeWebOS() {

    startMenu.style.display =
        "none";


    WebOSWindowManager
        .windows
        .forEach(
            function (app) {

                app.element.style.display =
                    "none";

            }
        );


    loadNote();

    updateClock();

    updateNetworkStatus();

}


initializeWebOS();


/* =====================================================
   WEBOS v1.0 READY
   ===================================================== */

console.log(
    "WebOS v1.0 initialized successfully."
);
```
