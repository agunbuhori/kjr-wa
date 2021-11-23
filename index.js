const wa = require('@open-wa/wa-automate');
const { default: axios } = require('axios');

wa.create({
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

 
function start(client) {
  client.onMessage(message => {
    if (message.body === 'Te3zt') {
      client.sendText(message.from, "It's work! :)");
    }
    
    if (message.body.match(/[a-z0-9]{24}/g)) {
      const codes = message.body.match(/[a-z0-9]{24}/g)
      client.sendText(message.from, codes[0])
    }
  });
}