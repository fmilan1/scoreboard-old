
const showMessage = (msg) => {
    if (msg.sender != pubnub.getUUID()) {
        if (msg.type == 'add') {

            let target = eval(msg.message.target)
            let e = msg.message.event
            e.target = target
            let value = msg.message.value
            if (value == '-') e.button = 2
            teamclick(e)
        }
        else if (msg.type == 'sync') {
            eval(msg.message.target).innerHTML = msg.message.value
        }
    }
};


const pubnub = new PubNub({
    publishKey : PUBNUB_PUB_KEY,
    subscribeKey : PUBNUB_SUB_KEY,
    uuid: PubNub.generateUUID(),
    ssl: true
});

// Feliratkozás a csatornára jelenléti információval
pubnub.subscribe({
channels: [id],
withPresence: true
});

// Eseménykezelő az "presence" események figyelésére
pubnub.addListener({
    presence: function (event) {
        if (event.action === 'join') {
        console.log(event.uuid + ' csatlakozott a csatornához.');
        if (event.occupancy >= 2) {
            try {
                sendMessage({
                    target: 'remoteteam1point',
                    value: team1point.innerHTML
                }, 'sync');
                sendMessage({
                    target: 'remoteteam1subpoint',
                    value: team1subpoint.innerHTML
                }, 'sync');
                sendMessage({
                    target: 'remoteteam2point',
                    value: team2point.innerHTML
                }, 'sync');
                sendMessage({
                    target: 'remoteteam2subpoint',
                    value: team2subpoint.innerHTML
                }, 'sync');
            } catch(e) {}
            try {    
                connectionstate.innerHTML = "Connected"
            } catch(e) {}
        }
    } else if (event.action === 'leave') {
        try {
            connectionstate.innerHTML = "Disconnected"
        } catch(e) {}
            console.log(event.uuid + ' kilépett a csatornából.');
        }
    },
    message: function (event) {
        if (event.message.sender != pubnub.getUUID()) {
            showMessage(event.message)
        }
    }
});

// Üzenet küldése a csatornán keresztül
function sendMessage(msg, state) {

pubnub.publish({
    channel: id,
    message: {
        type: state,
        message: msg,
        sender: pubnub.getUUID()
    }
});
}