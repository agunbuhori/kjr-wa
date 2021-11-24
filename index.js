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

      axios.get(`https://api-kjr.kampustsl.id/user/${codes[0]}&wa=${message.from}`).then(response => {
        if (response.status === 'success') {
          const user = response.message

          client.sendText(message.from, `Ahlan ${user.name}`)
        } else {
          client.sendText(message.from, 'Invalid', message)
        }
      }).catch(err => {
        client.sendText(message.from, JSON.stringify(err))
      })
    }
  });
}