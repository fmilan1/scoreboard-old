document.addEventListener('contextmenu', event => event.preventDefault());


let fullscreened = false;
let fullscreenbtn = document.querySelector("#fullscreen")
fullscreenbtn.addEventListener("click", fullscreen)
let countdown;


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


team1nametextbox.addEventListener("input", () => {refresh_teams();save();})
team2nametextbox.addEventListener("input", () => {refresh_teams();save();})

let root = document.documentElement;

team1point.addEventListener("mousedown", teamclick);
team2point.addEventListener("mousedown", teamclick);

team1point.addEventListener("long-press", () => {team1point.innerHTML = 0; save()})
team2point.addEventListener("long-press", () => {team2point.innerHTML = 0; save()})
team1subpoint.addEventListener("long-press", () => {team1subpoint.innerHTML = 0; save()})
team2subpoint.addEventListener("long-press", () => {team2subpoint.innerHTML = 0; save()})

team1subpoint.addEventListener("mousedown", teamclick);
team2subpoint.addEventListener("mousedown", teamclick);

let settings = document.querySelector("#settings");
let settings_menu = document.querySelector("#settings-menu");

let team1colorpicker = settings_menu.children[0].children[1];
let team2colorpicker = settings_menu.children[0].children[3];

team1colorpicker.addEventListener("input", () => {refresh_teams();save();})
team2colorpicker.addEventListener("input", () => {refresh_teams();save();})

let pauseplaybtn = document.querySelector("#pauseplay");
pauseplaybtn.addEventListener("click", pauseplay_timer)
let restarttimebtn = document.querySelector("#restart");
restarttimebtn.addEventListener("click", reset);

let teamnamescheckbox = document.querySelector("#team-names-checkbox");
teamnamescheckbox.addEventListener("input", () => { togglenames(); save(); })

let starttimehourstextbox = document.querySelector("#starttime-hours");
starttimehourstextbox.addEventListener("input", save)

let starttimeminstextbox = document.querySelector("#starttime-mins");
starttimeminstextbox.addEventListener("input", save)

let starttimesecstextbox = document.querySelector("#starttime-secs");
starttimesecstextbox.addEventListener("input", save)

let resetbtn = document.querySelector("#resetbtn");
resetbtn.addEventListener("click", resetpoints);



let timercheckbox = document.querySelector("#timer-checkbox");
timercheckbox.addEventListener("input", () => {
    toggletimer();
    save();
})

let timercontainer = document.querySelector(".timer-container");


settings.addEventListener("click", settingsclick);

let time_in_seconds = 50 * 60;
let timer = document.querySelector("#timer");
let running = false;

let editing = false;

load()
refresh_teams()

function toggletimer() {
    timercontainer.classList.toggle("hidden");
    document.querySelector("#team-1").classList.toggle("big");
    document.querySelector("#team-2").classList.toggle("big");
}

function togglenames() {
    team1name.classList.toggle("hidden");
    team2name.classList.toggle("hidden");
}

function seconds2HHMMSS(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function tick() {
    time_in_seconds -= 1;
    timer.innerHTML = seconds2HHMMSS(time_in_seconds);
    if (time_in_seconds <= 0) {
        pauseplay_timer()
    }
}

function resetpoints() {
    team1point.innerHTML = 0;
    team2point.innerHTML = 0;
    team1subpoint.innerHTML = 0;
    team2subpoint.innerHTML = 0;
    save();
}

function pauseplay_timer() {
    running = !running;
    if (running && time_in_seconds > 0) {
        countdown = setInterval(tick, 1000);
        pauseplaybtn.classList.add("pause");
    }
    else {
        clearInterval(countdown)
        pauseplaybtn.classList.remove("pause");
    }
}

function reset() {
    clearInterval(countdown)
    pauseplaybtn.classList.remove("pause");
    running = false;

    let secs = parseInt(starttimesecstextbox.value);
    if (secs % 1 != 0) secs = 0;

    let mins = parseInt(starttimeminstextbox.value);
    if (mins % 1 != 0) mins = 0;

    let hours = parseInt(starttimehourstextbox.value);
    if (hours % 1 != 0) hours = 0;

    time_in_seconds = hours * 3600 + mins * 60 + secs;
    timer.innerHTML = seconds2HHMMSS(time_in_seconds);
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
        
        starttimehourstextbox.value = localStorage.getItem("starttimehours");
        starttimeminstextbox.value = localStorage.getItem("starttimemins");
        starttimesecstextbox.value = localStorage.getItem("starttimesecs");
        reset();
        
        teamnamescheckbox.checked = localStorage.getItem("teamnames") == "true" ? true : false;
        if (!teamnamescheckbox.checked) togglenames();

        timercheckbox.checked = localStorage.getItem("timer") == "true" ? true : false;
        if (!timercheckbox.checked) toggletimer();
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
    localStorage.setItem("starttimehours", starttimehourstextbox.value)
    localStorage.setItem("starttimemins", starttimeminstextbox.value)
    localStorage.setItem("starttimesecs", starttimesecstextbox.value)
    localStorage.setItem("team1subpoint", team1subpoint.innerHTML)
    localStorage.setItem("team2subpoint", team2subpoint.innerHTML)
    localStorage.setItem("teamnames", teamnamescheckbox.checked)
    localStorage.setItem("timer", timercheckbox.checked)
}

function settingsclick() {
    settings.classList.toggle("rotate")
    settings_menu.classList.toggle("hidden");
}