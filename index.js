const wa = require('@open-wa/wa-automate');
const { default: axios } = require('axios');
 
wa.create().then(client => start(client));

function toTitleCase(str) {
  if (! str) return ""
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
 
function start(client) {
  client.onMessage(message => {
    if (message.body === 'Te3zt') {
      client.sendText(message.from, "It's work! :)");
    }
    
    if (message.body.match(/[a-z0-9]/)) {
      axios.get(`http://localhost:5000/qr?s=${message.body.replace('MINTA ', '')}`).then(response => {
        if (response.data.status === 'success') {
          client.sendText(message.from, `*Ahlan, ${toTitleCase(response.data.message.name)}!*`);
          client.sendImage(message.from, response.data.image, 'qrcode.png', 'Tunjukkan QR Code ini kepada panitia saat memasuki acara.');
        }
      })
    }
  });
}