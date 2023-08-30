const queryString = window.location.search;
const id = queryString.split('?id=')[1];

const team1pointButtons = document.querySelectorAll('.btn.team1point');
const team2pointButtons = document.querySelectorAll('.btn.team2point');
const team1subpointButtons = document.querySelectorAll('.btn.team1subpoint');
const team2subpointButtons = document.querySelectorAll('.btn.team2subpoint');

const remoteteam1point = document.querySelector('.point1')
const remoteteam1subpoint = document.querySelector('.subpoint1')
const remoteteam2point = document.querySelector('.point2')
const remoteteam2subpoint = document.querySelector('.subpoint2')

const connectionstate = document.querySelector('.connectionstate');

let isConnected = false

team1pointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        sendMessage({
            target: 'team1point',
            event: e,
            value: e.target.innerHTML
        }, 'add');
        if (!isConnected) return;
        remoteteam1point.innerHTML = eval(remoteteam1point.innerHTML + btn.innerHTML + 1)
    });
});

team2pointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        sendMessage({
            target: 'team2point',
            event: e,
            value: e.target.innerHTML
        }, 'add');
        if (!isConnected) return;
        remoteteam2point.innerHTML = eval(remoteteam2point.innerHTML + btn.innerHTML + 1)
    });

});

team1subpointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        sendMessage({
            target: 'team1subpoint',
            event: e,
            value: e.target.innerHTML
        }, 'add');
        if (!isConnected) return;
        remoteteam1subpoint.innerHTML = eval(remoteteam1subpoint.innerHTML + btn.innerHTML + 1)
    });
});

team2subpointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        sendMessage({
            target: 'team2subpoint',
            event: e,
            value: e.target.innerHTML
        }, 'add');
        if (!isConnected) return;
        remoteteam2subpoint.innerHTML = eval(remoteteam2subpoint.innerHTML + btn.innerHTML + 1)
    });
});









const remoteteam1nametext = document.querySelector('.team1name.name.text');
const remoteteam1applybtn= document.querySelector('.team1.apply');

const remoteteam2nametext = document.querySelector('.team2name.name.text');
const remoteteam2applybtn= document.querySelector('.team2.apply');

remoteteam1nametext.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        remoteteam1applybtn.dispatchEvent(new Event('click'));
        remoteteam1nametext.blur()
    }
});

remoteteam1nametext.addEventListener('mousedown', () => {
    if (!isConnected) return;
    remoteteam1nametext.setAttribute('contenteditable', true);
    remoteteam1nametext.classList.add('textbox');
    remoteteam1applybtn.classList.remove('hidden');
});

remoteteam1applybtn.addEventListener('click', () => {
    remoteteam1nametext.setAttribute('contenteditable', false);
    remoteteam1nametext.classList.remove('textbox');
    remoteteam1applybtn.classList.add('hidden');
    sendMessage({
        target: 'team1nametextbox',
        value: remoteteam1nametext.innerHTML
    }, 'sync');
});



remoteteam2nametext.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        remoteteam2applybtn.dispatchEvent(new Event('click'));
        remoteteam2nametext.blur()
    }
});

remoteteam2nametext.addEventListener('mousedown', () => {
    if (!isConnected) return;
    remoteteam2nametext.setAttribute('contenteditable', true);
    remoteteam2nametext.classList.add('textbox');
    remoteteam2applybtn.classList.remove('hidden');
});

remoteteam2applybtn.addEventListener('click', () => {
    remoteteam2nametext.setAttribute('contenteditable', false);
    remoteteam2nametext.classList.remove('textbox');
    remoteteam2applybtn.classList.add('hidden');
    sendMessage({
        target: 'team2nametextbox',
        value: remoteteam2nametext.innerHTML
    }, 'sync');
});
