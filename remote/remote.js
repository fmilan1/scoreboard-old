
// let btn = document.querySelector('.button');

// btn.addEventListener('mousedown', (e) => {
//     publishMessage({
//         target: 'team1point',
//         event: e,
//         value: 1
//     });
// });

const queryString = window.location.search;
const id = queryString.split('?id=')[1];

const team1pointButtons = document.querySelectorAll('.btn.team1point');
const team2pointButtons = document.querySelectorAll('.btn.team2point');
const team1subpointButtons = document.querySelectorAll('.btn.team1subpoint');
const team2subpointButtons = document.querySelectorAll('.btn.team2subpoint');

team1pointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        publishMessage({
            target: 'team1point',
            event: e,
            value: e.target.innerHTML
        });
    });
});

team2pointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        publishMessage({
            target: 'team2point',
            event: e,
            value: e.target.innerHTML
        });
    });
});

team1subpointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        publishMessage({
            target: 'team1subpoint',
            event: e,
            value: e.target.innerHTML
        });
    });
});

team2subpointButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        publishMessage({
            target: 'team2subpoint',
            event: e,
            value: e.target.innerHTML
        });
    });
});