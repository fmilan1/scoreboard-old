document.addEventListener('contextmenu', event => event.preventDefault());

const id = Math.floor(Math.random() * 10000)
console.log(id)

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


team1nametextbox.addEventListener("input", () => {refresh_teams(); save();})
team2nametextbox.addEventListener("input", () => {refresh_teams(); save();})

let root = document.documentElement;

team1point.addEventListener("mousedown", (e) => {
    teamclick(e);
});

team2point.addEventListener("mousedown", (e) => {
    teamclick(e);
});

team1point.addEventListener("long-press", () => {team1point.innerHTML = 0; save()})
team2point.addEventListener("long-press", () => {team2point.innerHTML = 0; save()})
team1subpoint.addEventListener("long-press", () => {team1subpoint.innerHTML = 0; save()})
team2subpoint.addEventListener("long-press", () => {team2subpoint.innerHTML = 0; save()})

team1subpoint.addEventListener("mousedown", (e) => {
    teamclick(e);
});

team2subpoint.addEventListener("mousedown", (e) => {
    teamclick(e);
});

let startx, starty, offset = 20;
team1point.addEventListener('touchstart', startPos)
team1point.addEventListener('touchend', endPos)

team2point.addEventListener('touchstart', startPos)
team2point.addEventListener('touchend', endPos)

team1subpoint.addEventListener('touchend', endPos)
team1subpoint.addEventListener('touchstart', startPos)

team2subpoint.addEventListener('touchend', endPos)
team2subpoint.addEventListener('touchstart', startPos)
function startPos(e) {
	startx = e.touches[0].clientX;
	starty = e.touches[0].clientY;
}

function endPos(e) {
	let deltaX;
	let deltaY;
	deltaX = e.changedTouches[0].clientX - startx;
	deltaY = e.changedTouches[0].clientY - starty;
	if (deltaX < offset && deltaY > offset) {
        if (parseInt(e.target.innerHTML) <= 0) return;
		e.target.innerHTML = parseInt(e.target.innerHTML) - 1;
	}
}

let remoteid = document.querySelector('#remote-id');

remoteid.innerHTML = "https://" + window.location.host + "/remote/?id=" + id
remoteid.setAttribute("href", "/remote/?id=" + id)

new QRCode("qrcode", {
    text: remoteid.innerHTML,
    colorDark : "#000",
    colorLight : "#fff",
    correctLevel : QRCode.CorrectLevel.H
});


let settings = document.querySelector("#settings");
let settings_menu = document.querySelector("#settings-menu");

let swap = document.querySelector('#swap');
swap.addEventListener('click', swap_sides);

let team1colorpicker = settings_menu.children[0].children[1];
let team2colorpicker = settings_menu.children[0].children[3];

team1colorpicker.addEventListener("input", () => {refresh_teams(); save();})
team2colorpicker.addEventListener("input", () => {refresh_teams(); save();})

let pauseplaybtn = document.querySelector("#pauseplay");
pauseplaybtn.addEventListener("click", pauseplay_timer)
let restarttimebtn = document.querySelector("#restart");
restarttimebtn.addEventListener("click", reset);

let teamnamescheckbox = document.querySelector("#team-names-checkbox");
teamnamescheckbox.addEventListener("input", () => {togglenames(); save();})

let starttimeminstextbox = document.querySelector("#starttime-mins");
starttimeminstextbox.addEventListener("input", save)

let secondarypointscheckbox = document.querySelector('#secondary-points-checkbox');
secondarypointscheckbox.addEventListener('input', () => {
	toggleSecondaryPoints();
	save();
})

let keepscreenawakecheckbox = document.querySelector("#keepscreenawake");

let menucontainer = document.querySelector('.menucontainer');

let menu_arrow = document.querySelector('#menu-arrow');
menu_arrow.addEventListener('click', open_menu)

let noSleep = new NoSleep();
keepscreenawakecheckbox.addEventListener('input', toggleKeepScreenAwake, false);


let resetbtn = document.querySelector("#resetbtn");
resetbtn.addEventListener("click", resetpoints);


let messagebox = document.querySelector(".messagebox");
let xmark = document.querySelector("#xmark");
xmark.addEventListener("mousedown", () => {
	messagebox.classList.toggle("hidden");
});


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

function toggleKeepScreenAwake() {
	if (keepscreenawakecheckbox.checked) {
		noSleep.enable();
	}
	else {
		noSleep.disable();
	}
}

function toggleSecondaryPoints() {
	team1subpoint.classList.toggle('hidden');
	team2subpoint.classList.toggle('hidden');
}

function open_menu() {
	menucontainer.classList.toggle('openmenu');
	menu_arrow.classList.toggle('rotate');
}

function swap_sides() {
	let tmp_team1point = team1point.innerHTML;
	let tmp_team1subpoint = team1subpoint.innerHTML;
	let tmp_team1name = team1nametextbox.value;
	let tmp_team1color = team1colorpicker.value;

	team1point.innerHTML = team2point.innerHTML;
	team1subpoint.innerHTML = team2subpoint.innerHTML;
	team1nametextbox.value = team2nametextbox.value;
	team1colorpicker.value = team2colorpicker.value;

	team2point.innerHTML = tmp_team1point;
	team2subpoint.innerHTML = tmp_team1subpoint;
	team2nametextbox.value = tmp_team1name;
	team2colorpicker.value = tmp_team1color;
	refresh_teams();
	save();
}

function toggletimer() {
	timercontainer.classList.toggle("hidden");
	document.querySelector("#team-1").classList.toggle("big");
	document.querySelector("#team-2").classList.toggle("big");
}

function togglenames() {
	team1name.classList.toggle("hidden");
	team2name.classList.toggle("hidden");
}

function seconds2MMSS(seconds) {
	min = Math.floor(seconds / 60)
	sec = (seconds - min * 60)
	if (sec < 10) {
		sec = '0' + sec
	}
	return min + ':' + sec
}

function tick() {
	time_in_seconds -= 1;
	timer.innerHTML = seconds2MMSS(time_in_seconds);
	if (time_in_seconds <= 0) {
		pauseplay_timer()
	}
}

function resetpoints() {
	team1point.innerHTML = 0;
	team2point.innerHTML = 0;
	team1subpoint.innerHTML = 0;
	team2subpoint.innerHTML = 0;
    sendMessage({
        target: "remoteteam1point",
        value: team1point.innerHTML
    }, 'sync');
        sendMessage({
        target: "remoteteam2point",
        value: team1point.innerHTML
    }, 'sync');
    sendMessage({
        target: "remoteteam1subpoint",
        value: team1subpoint.innerHTML
    }, 'sync');
    sendMessage({
        target: "remoteteam2subpoint",
        value: team2subpoint.innerHTML
    }, 'sync');

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

	let mins = parseInt(starttimeminstextbox.value);
	if (mins % 1 != 0) mins = 0;

	time_in_seconds = mins * 60;
	timer.innerHTML = seconds2MMSS(time_in_seconds);
}

function teamclick(e) {
	let target = e.target;
	let a = 1;
	if (e.button == 2) a = -1;
    if (parseInt(target.innerHTML) <= 0 && a == -1) return;
	target.innerHTML = parseInt(target.innerHTML) + a;
    sendMessage({
        target: "remote" + target.id,
        value: target.innerHTML
    }, 'sync');
	save();
}

function show_messagebox(text) {
	messagebox.children[1].innerHTML = text + " won!";
	messagebox.classList.toggle("hidden");
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

		starttimeminstextbox.value = localStorage.getItem("starttimemins");
		reset();

		teamnamescheckbox.checked = localStorage.getItem("teamnames") == "true" ? true : false;
		if (!teamnamescheckbox.checked) togglenames();

		timercheckbox.checked = localStorage.getItem("timer") == "true" ? true : false;
		if (!timercheckbox.checked) toggletimer();
		
		secondarypointscheckbox.checked = localStorage.getItem("secondary") == "true" ? true : false;
		if (!secondarypointscheckbox.checked) toggleSecondaryPoints();

	}
	timer.innerHTML = seconds2MMSS(time_in_seconds);

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
	localStorage.setItem("starttimemins", starttimeminstextbox.value)
	localStorage.setItem("team1subpoint", team1subpoint.innerHTML)
	localStorage.setItem("team2subpoint", team2subpoint.innerHTML)
	localStorage.setItem("teamnames", teamnamescheckbox.checked)
	localStorage.setItem("timer", timercheckbox.checked)
	localStorage.setItem("secondary", secondarypointscheckbox.checked)
}

function settingsclick() {
	settings.classList.toggle("rotate")
	settings_menu.classList.toggle("hidden");
}
