
let btn = document.querySelector('.button');

btn.addEventListener('mousedown', (e) => {
    publishMessage({
        target: 'team1point',
        event: e,
        value: 1
    });
});

const queryString = window.location.search;
const id = queryString.split('?id=')[1]

