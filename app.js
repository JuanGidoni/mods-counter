const countMElement = document.querySelector('#count-mods');
const countVElement = document.querySelector('#count-vips');
const countCElement = document.querySelector('#count-chat');
const countCCElement = document.querySelector('#count-chatt');
const countSElement = document.querySelector('#count-subs');
const statusElement = document.querySelector('#status');

const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || 'jukxz';
const color = params.get('color') || 'default';
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channel],
  color: color,
});
const resetCounter = () =>{
  setTimeout(function(){
    statusElement.textContent = '';
    countMElement.textContent = '0';
    countVElement.textContent = '0';
    countCElement.textContent = '0';
    countCCElement.textContent = '0';
    countSElement.textContent = '0';
    document.getElementById('loaded').style.visibility = "visible";
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
let subs = {};
let chatters = {};

if(color==='default'){
  document.getElementById('btn1').style.backgroundColor = "#d3a423";
  document.getElementById('btn2').style.backgroundColor = "#d3a423";
  document.getElementById('btn3').style.backgroundColor = "#d3a423";
  document.getElementById('btn4').style.backgroundColor = "#d3a423";
  document.getElementById('btn5').style.backgroundColor = "#d3a423";
  document.getElementById('btn1').style.color = "#3a3a3a";
  document.getElementById('btn2').style.color = "#3a3a3a";
  document.getElementById('btn3').style.color = "#3a3a3a";
  document.getElementById('btn4').style.color = "#3a3a3a";
  document.getElementById('btn5').style.color = "#3a3a3a";
}
if(channel==='barbacolorada'){
  document.getElementById('btn1').style.backgroundColor = "#d42472";
  document.getElementById('btn2').style.backgroundColor = "#d42472";
  document.getElementById('btn3').style.backgroundColor = "#d42472";
  document.getElementById('btn4').style.backgroundColor = "#d42472";
  document.getElementById('btn5').style.backgroundColor = "#d42472";
  document.getElementById('btn1').style.color = "#ffcfe4";
  document.getElementById('btn2').style.color = "#ffcfe4";
  document.getElementById('btn3').style.color = "#ffcfe4";
  document.getElementById('btn4').style.color = "#ffcfe4";
  document.getElementById('btn5').style.color = "#ffcfe4";
}
if(channel==='sopuuu'){
  document.getElementById('btn1').style.backgroundColor = "#d8bfc1";
  document.getElementById('btn2').style.backgroundColor = "#d8bfc1";
  document.getElementById('btn3').style.backgroundColor = "#d8bfc1";
  document.getElementById('btn4').style.backgroundColor = "#d8bfc1";
  document.getElementById('btn5').style.backgroundColor = "#d8bfc1";
  document.getElementById('btn1').style.color = "#d8a0a0";
  document.getElementById('btn2').style.color = "#d8a0a0";
  document.getElementById('btn3').style.color = "#d8a0a0";
  document.getElementById('btn4').style.color = "#d8a0a0";
  document.getElementById('btn5').style.color = "#d8a0a0";
}
if(color==='violeta'){
  document.getElementById('btn1').style.backgroundColor = "#a416f5";
  document.getElementById('btn2').style.backgroundColor = "#a416f5";
  document.getElementById('btn3').style.backgroundColor = "#a416f5";
  document.getElementById('btn4').style.backgroundColor = "#a416f5";
  document.getElementById('btn5').style.backgroundColor = "#a416f5";
  document.getElementById('btn1').style.color = "#e9e9e9";
  document.getElementById('btn2').style.color = "#e9e9e9";
  document.getElementById('btn3').style.color = "#e9e9e9";
  document.getElementById('btn4').style.color = "#e9e9e9";
  document.getElementById('btn5').style.color = "#e9e9e9";
}
if(channel==='zeki'){
  document.getElementById('btn1').style.backgroundColor = "#211f21";
  document.getElementById('btn1').style.borderColor = "#eabc2b";
  document.getElementById('btn1').style.borderWidth = "1 px";
  document.getElementById('btn1').style.borderStyle = "solid";
  document.getElementById('btn2').style.display = "none";
  document.getElementById('btn3').style.display = "none";
  document.getElementById('btn4').style.display = "none";
  document.getElementById('btn5').style.display = "none";
  document.getElementById('btn1').style.color = "#eabc2b";
  document.getElementById('btn2').style.display = "none";
  document.getElementById('btn3').style.display = "none";
  document.getElementById('btn4').style.display = "none";
  document.getElementById('btn5').style.display = "none";
}

client.on('message', (wat, tags, message, self) => {
  if (self) return;
  const { username,mod,badges,subscriber } = tags;
  m = message.toLowerCase();
  s = channel.toLowerCase();
  u = username.toLowerCase();
  if(badges){
    v = badges;
  }else{
    v = null;
  }

  if(m){
    total++;
    countCElement.textContent = total;
    if(total==1){
      document.getElementById('mensajes').textContent = 'Mensaje';
    }else{
      document.getElementById('mensajes').textContent = 'Mensajes';
    }
    chatters[tags.username] = true;
    Object.keys(chatters).join(', ');
    countCCElement.textContent = Object.keys(chatters).length;
  }
  if (u === s && m === '!clear') {
      countMElement.textContent = '';
      countVElement.textContent = '';
      countsElement.textContent = '';
      countCCElement.textContent = '';
      countCElement.textContent = '';
      total = 0;
      objMods = {};
      vips = {};
      subs = {};
      chatters = {};
  }
  if (mod) {
        objMods[tags.username] = true;
        countMElement.textContent = Object.keys(objMods).length;
        Object.keys(objMods).join(', ');  
    if(Object.keys(objMods).length===1){
        document.getElementById('moderadores').textContent = 'Mod';
    }else{
        document.getElementById('moderadores').textContent = 'Mods';
    }
    if(subscriber){
        subs[tags.username] = true;
        countSElement.textContent = Object.keys(subs).length;
        Object.keys(subs).join(', ');
          if(Object.keys(subs).length===1){
              document.getElementById('subs').textContent = 'Sub';
          }else{
              document.getElementById('subs').textContent = 'Subs';
          }
    }
    if(m === `chau ${s}` && mod){
        delete objMods[tags.username];
        delete subs[tags.username];
        countMElement.textContent = Object.keys(objMods).length;
        countSElement.textContent = Object.keys(subs).length;
    }
  }else if(subscriber){
        subs[tags.username] = true;
        // display current count page.
        countSElement.textContent = Object.keys(subs).length;
        Object.keys(subs).join(', ');
  if(Object.keys(subs).length===1){
        document.getElementById('subs').textContent = 'Sub';
  }else{
        document.getElementById('subs').textContent = 'Subs';
  }
  if(v.vip==='1'){
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
  if(m === `chau ${s}` && subscriber){
        delete subs[tags.username];
        delete vips[tags.username];
        countSElement.textContent = Object.keys(subs).length;
        countVElement.textContent = Object.keys(vips).length;
  }
  }else if(v.vip==='1'){ 
        vips[tags.username] = true;
        // display current count page.
        countVElement.textContent = Object.keys(vips).length;
        Object.keys(vips).join(', ');
    if(Object.keys(vips).length===1){
        document.getElementById('vips').textContent = 'Vip';
    }else{
        document.getElementById('vips').textContent = 'Vips';
    }
  }else if(!v){
        chatters[tags.username] = true;
        Object.keys(chatters).join(', ');
        countCCElement.textContent = Object.keys(chatters).length; 
  };
});

