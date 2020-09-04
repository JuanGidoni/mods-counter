const countMElement = document.querySelector('#count-mods');
const countVElement = document.querySelector('#count-vips');
const countCElement = document.querySelector('#count-chat');
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
  statusElement.textContent = `Cargando, ${channel}...`;
  resetCounter();
});

let messages = {};
let total = 0;
let mods = 0;

let listeningForCount = false;
let objMods = {};
let vips = {};
let followers = {};

client.on('message', (wat, tags, message, self) => {
  if (self) return;
  console.log(tags);
  const { username,mod } = tags;
  m = message.toLowerCase();
  s = channel.toLowerCase();
  u = username.toLowerCase();
  if(m){
    total++;
    countCElement.textContent = total;
  }
  if (u === s && m === '!clear') {
      countMElement.textContent = '';
      objMods = {};
  }
  if (m && mod) {
    objMods[tags.username] = true;
    // display current count page.
    countMElement.textContent = Object.keys(objMods).length;
    Object.keys(objMods).join(', ');  
  if(Object.keys(objMods).length===1){
    document.getElementById('moderadores').textContent = 'Mod';
  }else{
    document.getElementById('moderadores').textContent = 'Mods';
  }
  }
  if(m === `chau ${s}` && mod){
    delete objMods[tags.username];
    countMElement.textContent = Object.keys(objMods).length;
  }

  if (m && tags.badges.vip==='1') {
    vips[tags.username] = true;
    // display current count page.
    countVElement.textContent = Object.keys(vips).length;
    Object.keys(vips).join(', ');
  if(Object.keys(vips).length===1){
    document.getElementById('vips').textContent = 'Vip';
  }else{
    document.getElementById('vips').textContent = 'Vips';
  }
  }
  if(m === `chau ${s}` && tags.badges.vip==='1'){
    delete vips[tags.username];
    countVElement.textContent = Object.keys(vips).length;
  }
});