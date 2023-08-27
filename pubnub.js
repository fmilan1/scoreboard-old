
const showMessage = (msg) => {
    let target = eval(msg.target)
    let e = msg.event
    e.target = target
    teamclick(e)
};

let pubnub;


const setupPubNub = () => {
    // Update this block with your publish/subscribe keys
    pubnub = new PubNub({
        publishKey : PUBNUB_PUB_KEY,
        subscribeKey : PUBNUB_SUB_KEY,
        userId: "myUniqueUserId"
    });

    // add listener
    const listener = {
        status: (statusEvent) => {
            if (statusEvent.category === "PNConnectedCategory") {
                console.log("Connected");
            }
        },
        message: (messageEvent) => {
            showMessage(messageEvent.message.description);
        },
        presence: (presenceEvent) => {
            // handle presence
        }
    };
    pubnub.addListener(listener);

    // subscribe to a channel
    pubnub.subscribe({
        channels: [id]
    });
};

// run after page is loaded
window.onload = setupPubNub;


// publish message
const publishMessage = async (message) => {
    // With the right payload, you can publish a message, add a reaction to a message,
    // send a push notification, or send a small payload called a signal.
    const publishPayload = {
        channel : id,
        message: {
            title: "greeting",
            description: message
        }
    };
    await pubnub.publish(publishPayload);
}

