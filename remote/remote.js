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

team1pointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        sendMessage({
            target: 'team1point',
            event: e,
            value: e.target.innerHTML
        }, 'add');
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
        remoteteam2subpoint.innerHTML = eval(remoteteam2subpoint.innerHTML + btn.innerHTML + 1)
    });
});