document.addEventListener('contextmenu', event => event.preventDefault());


let fullscreened = false;
let fullscreenbtn = document.querySelector("#fullscreen")
fullscreenbtn.addEventListener("click", fullscreen)


function fullscreen() {
    fullscreened = !fullscreened;
    fullscreenbtn.classList.toggle("fullscreened")
    if (fullscreened) root.requestFullscreen()
    else document.exitFullscreen();
}

let team1point = document.querySelector("#team-1").children[0];
let team2point = document.querySelector("#team-2").children[0];

let team1subpoint = document.querySelector("#team-1").children[1];
let team2subpoint = document.querySelector("#team-2").children[1];

let team1name = document.querySelector("#team-1").children[2];
let team2name = document.querySelector("#team-2").children[2];

let team1nametextbox = document.querySelector("#team-1-name-textbox");
let team2nametextbox = document.querySelector("#team-2-name-textbox");


team1nametextbox.addEventListener("input", () => {refresh_teams();})
team2nametextbox.addEventListener("input", () => {refresh_teams();})

let root = document.documentElement;

team1point.addEventListener("mousedown", teamclick);
team2point.addEventListener("mousedown", teamclick);

team1subpoint.addEventListener("mousedown", teamclick);
team2subpoint.addEventListener("mousedown", teamclick);

let settings = document.querySelector("#settings");
let settings_menu = document.querySelector("#settings-menu");

let team1colorpicker = settings_menu.children[0].children[1];
let team2colorpicker = settings_menu.children[0].children[3];

team1colorpicker.addEventListener("input", () => {refresh_teams();})
team2colorpicker.addEventListener("input", () => {refresh_teams();})

let pauseplaybtn = document.querySelector("#pauseplay");
pauseplaybtn.addEventListener("click", pauseplay_timer)
let restarttimebtn = document.querySelector("#restart");
restarttimebtn.addEventListener("click", reset);

let teamnamecheckbox = document.querySelector("#team-names-checkbox");
teamnamecheckbox.addEventListener("change", () => { team1name.classList.toggle("hidden"); team2name.classList.toggle("hidden"); })

let starttimetextbox = document.querySelector("#starttime");

settings.addEventListener("click", settingsclick);

let time_in_seconds = 50 * 60;
let timer = document.querySelector("#timer");
let running = false;

let editing = false;

load()
refresh_teams()

function edit() {
    editing = !editing;
    editbtn.classList.toggle("edit");
    timer.classList.toggle("hidden");
    starttimetextbox.classList.toggle("hidden");
    pauseplaybtn.classList.toggle("hidden");
    if (!editing) {
        let t = starttimetextbox.value.split(":");
        let secs = parseInt(t[t.length-1]);
        if (secs % 1 != 0) secs = 0;
        let mins = parseInt(t[t.length-2]);
        if (mins % 1 != 0) mins = 0;
        let hours = parseInt(t[t.length-3]);
        if (hours % 1 != 0) hours = 0;
        console.log(hours + " " + mins + " " + secs)
        time_in_seconds = hours * 3600 + mins * 60 + secs;
        timer.innerHTML = seconds2HHMMSS(time_in_seconds);
        save();
    }
}

function seconds2HHMMSS(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function tick() {
    timer.innerHTML = seconds2HHMMSS(time_in_seconds);
    if (!running || time_in_seconds <= 0) return;
    await sleep(1000);
    time_in_seconds -= 1;
    tick();
}

function pauseplay_timer() {
    pauseplaybtn.classList.toggle("pause");
    running = !running;
    tick();
}

async function reset() {
    pauseplaybtn.classList.remove("pause");
    running = !running;
    team1point.innerHTML = 0;
    team2point.innerHTML = 0;
    team1subpoint.innerHTML = 0;
    team2subpoint.innerHTML = 0;
    await sleep(1000);
    timer.innerHTML = seconds2HHMMSS(localStorage.getItem("starttime"));
    save()
}

function teamclick(e) {
    let a = 1;
    if (e.button == 2) a = -1;
    let target = e.target;
    target.innerHTML = parseInt(target.innerHTML) + a;
    save();
}

function refresh_teams() {
    team1name.innerHTML = team1nametextbox.value;
    team2name.innerHTML = team2nametextbox.value;

    root.style.setProperty("--team-1-color", team1colorpicker.value)
    root.style.setProperty("--team-2-color", team2colorpicker.value)
    save();
}

function load() {
    if ("team1name" in localStorage) {

        team1nametextbox.value = localStorage.getItem("team1name");
        team2nametextbox.value = localStorage.getItem("team2name");
        
        
        team1colorpicker.value = localStorage.getItem("team1color");
        team2colorpicker.value = localStorage.getItem("team2color");

        team1point.innerHTML = localStorage.getItem("team1point");
        team2point.innerHTML = localStorage.getItem("team2point");

        team1subpoint.innerHTML = localStorage.getItem("team1subpoint");
        team2subpoint.innerHTML = localStorage.getItem("team2subpoint");
        
        time_in_seconds = localStorage.getItem("starttime");
        
        starttimetextbox.value = seconds2HHMMSS(time_in_seconds);
    }
    timer.innerHTML = seconds2HHMMSS(time_in_seconds);

}

function save() {
    localStorage.setItem("team1point", team1point.innerHTML)
    localStorage.setItem("team2point", team2point.innerHTML)
    localStorage.setItem("team1color", team1colorpicker.value)
    localStorage.setItem("team2color", team2colorpicker.value)
    localStorage.setItem("team1name", team1nametextbox.value)
    localStorage.setItem("team2name", team2nametextbox.value)
    localStorage.setItem("team1color", team1colorpicker.value)
    localStorage.setItem("team2color", team2colorpicker.value)
    localStorage.setItem("starttime", time_in_seconds)
    localStorage.setItem("team1subpoint", team1subpoint.innerHTML)
    localStorage.setItem("team2subpoint", team2subpoint.innerHTML)

}

function settingsclick() {
    settings_menu.classList.toggle("hidden");
}


