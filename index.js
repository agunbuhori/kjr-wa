const wa = require('@open-wa/wa-automate');
const { default: axios } = require('axios');
const { express } = require('cookies');
const fs = require('fs');
const path = require('path/posix');
const app = require('express')()

wa.ev.on('qr.**', async qrcode => {
  //qrcode is base64 encoded qr code image
  //now you can do whatever you want with it
  const imageBuffer = Buffer.from(
    qrcode.replace('data:image/png;base64,', ''),
    'base64'
  );
  fs.writeFileSync('qr_code.png', imageBuffer);

  
});


app.get('/CSUbw0OhfdJ2Xtt5BImfwAXIX0pCrPoSWUqK6owDTS9GjeMAR272dU1XpyiJqKVp', (req, res) => {
  res.sendFile(path.join(__dirname, './qr_code.png'));
})
wa.create({
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

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
    
    if (message.body.match(/[a-z0-9]{24}/g)) {
      const codes = message.body.match(/[a-z0-9]{24}/g)

      axios.get(`https://api-kjr.kampustsl.id/user/qr?s=${codes[0]}&n=${message.from}`).then(response => {
        if (response.data.status === 'success') {
          client.sendText(message.from, ` بسم الله\n*Ahlan, ${toTitleCase(response.data.message.name)}!*
Berikut QR Code dan bukti pendaftaran untuk kajian :
*${response.data.schedule.name}*
Tempat : *${response.data.schedule.location}*
Tanggal : *${response.data.schedule.datetime}*`)
          ;
          client.sendImage(message.from, response.data.image, 'qrcode.png', `Silahkan simpan dan tunjukan QR Code ini pada panitia kajian.\nبارك الله فيكم

*Catatan :*
1. QR Code ini hanya untuk satu orang pendaftar.
2. Mari jaga dan lakukan protokol kesehatan.

Tiket : https://kjr.kampustsl.id/detail/${response.data.message._id}
          `);
        }
      })
    }
  });
}

app.listen(7000)