const countElement = document.querySelector('#count');
const statusElement = document.querySelector('#status');

const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || 'jukxz';
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channel],
});
const resetCounter = () =>{
  setTimeout(function(){
    statusElement.textContent = '';
  },3000);
}

client.connect().then(() => {
  statusElement.textContent = `Espera, ${channel}...`;
  resetCounter();
});

let messages = {};
let total = 0;
let mods = 0;

let listeningForCount = false;
let users = {};

client.on('message', (wat, tags, message, self) => {
  if (self) return;
  const { username,mod } = tags;
  m = message.toLowerCase();
  if (username.toLowerCase() === channel.toLowerCase()) {
     if (m === '!clear-mods') {
      countElement.textContent = '';
      users = {};
    }
  }
  if (m === 'hola' && mod) {
    users[tags.username] = true;
    // display current count page.
    countElement.textContent = Object.keys(users).length;
    Object.keys(users).join(', ');
  }else if(m === 'chau' && mod){
    delete users[tags.username];
    countElement.textContent = Object.keys(users).length;
  }
});