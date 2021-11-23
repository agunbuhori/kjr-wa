const wa = require('@open-wa/wa-automate');
const { default: axios } = require('axios');
const app = require('express')()

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
      axios.get(`https://api-kjr.kampustsl.id/user/${codes[0]}`, {params: {wa: message.from.replace('@c.us', '')}}).then(result => {
        client.sendText(`
KODE PENDAFTARAN KJR{kode} [/Bold Mohon langsung kirim ke nomor ini, untuk mendaptkan QR Code, jangan lakukan perubahan pada pesan ini] 
Semoga Allah mudah urusan kita semua. 

Panitia Pendaftaran Kajian  Rutin
Yayasan Tarbiyah Sunnah.
Helpdesk wa.me/62895377710900


بسم الله
Ahlan, [nama}
Berikut QR Code dan bukti pendaftaran untuk [nama kajian]
Tempat :
Tanggal :

Silahkan simpan dan tunjukan QR Code ini pada panitia kajian.
بارك الله فيكم

Catatan :
1. QR Code ini hanya untuk satu orang pendaftar.
2. Mari jaga dan lakukan protokol kesehatan.
        `)
      })
    }
  });
}

app.listen(7000)