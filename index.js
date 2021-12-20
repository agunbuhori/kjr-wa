const wa = require('@open-wa/wa-automate');
const { default: axios } = require('axios');
var format = require('date-format');

wa.create({
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function renderMessage(to, user, client) {
let message = `
بسم الله
Ahlan, *${user.name}*
Berikut QR Code dan bukti pendaftaran untuk *${user.schedule.name}*
Tempat : *${user.schedule.location}*
Tanggal : *${format('dd MM yyyy', new Date(user.schedule.dateteime)) +', jam '+ format('hh:mm', new Date(user.schedule.dateteime))}*
Silahkan simpan dan tunjukan QR Code ini pada panitia kajian.
بارك الله فيكم
{OTHER}

Tiket : https://kjr.kampustsl.id/detail/${user._id}

*Catatan :*
1. QR Code ini hanya untuk satu orang pendaftar.
2. Mari jaga dan lakukan protokol kesehatan.`

if (user.other) {
  message = message.replace(/\{OTHER\}/, `QR Code ini terdaftar juga atas nama *${user.other.name}*`)
} else {
  message = message.replace(/\{OTHER\}/, '')
}

  client.sendText(to, message)
  client.sendImage(to, 
    user.qrcode,
    user.name + '.png',
  `${user.code} a.n ${user.name}`
  )
  if (user.other) {
    client.sendImage(to, 
      user.other.qrcode,
      user.other.name + '.png',
    `${user.other.code} a.n ${user.other.name}`
    )
  }
}

 
function start(client) {
  client.onMessage(message => {
    if (message.body === 'Te3zt') {
      client.sendText(message.from, "It's work! :)");
    }
    
    if (message.body.match(/[a-z0-9]{24}/g)) {
      const codes = message.body.match(/[a-z0-9]{24}/g)
      axios.get(`https://api-kjr.kampustsl.id/user/${codes[0]}?wa=${message.from}`).then(response => {
        if (response.data.status === 'success') {
          const user = response.data.message
          renderMessage(message.from, user, client)
        } else {
          client.sendText(message.from, 'Invalid')
        }
      }).catch(err => {
        client.sendText(message.from, JSON.stringify(err))
      })
    }
  });
}