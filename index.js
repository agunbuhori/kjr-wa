const wa = require('@open-wa/wa-automate');

wa.create({
  sessionId: "COVID_HELPER",
  multiDevice: false, //required to enable multiDevice support
  authTimeout: 360, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Hello!');
    }
  });
}