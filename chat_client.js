const status_client = document.getElementById('status');
const message = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');


const ws = new WebSocket('ws://localhost:8080');
const uname = prompt("Enter your name: ");

function setStatus(value) {
    status_client.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement('li');

    li.innerHTML = value;
    message.appendChild(li);
}

form.addEventListener('submit', event => {
    event.preventDefault();

    ws.send(uname+": "+ input.value);
    input.value = '';
});

ws.onopen = ()=> setStatus(uname+' ONLINE');
ws.onclose = ()=> setStatus(uname+' DISCONNECTED');

ws.onmessage = response => printMessage(response.data.toString());
/*
ws.onmessage = (message) => {
    printMessage((message));
  } */
