const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
const socket = new WebSocket(`ws://${window.location.host}`);

// function for make message JSON into string
function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

// make eventListener with socket
socket.addEventListener('open', () => {
    console.log('Connected to Server');
});

socket.addEventListener('message', (message) => {
    const li = document.createElement('li');
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener('close', () => {
    console.log('Disconnected from server');
});

// function for send new message to server
function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(makeMessage('new_message', input.value));
    const li = document.createElement('li');
    li.innerText = `You: ${input.value}`;
    messageList.append(li);
    input.value = '';
}

// function for send nickname to server
function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket.send(makeMessage('nickname', input.value));
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
