const wa = require('@open-wa/wa-automate');
const { default: axios } = require('axios');

wa.create({
  sessionId: "COVID_HELPER",
  multiDevice: false, //required to enable multiDevice support
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

    if (message.body.match(/[a-z0-9]{24}/g)) {
        axios.post('https://api-kjr.kampustsl.id/mobile/whatsapp', {from: message.from, message: message.body}, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXIiOnsiaWQiOiIwOTJkZWYyMy1jYzdhLTRlOTMtODcyYy05MmY5NzBhZGRkMDMiLCJuaWNrbmFtZSI6InJhbmRpIiwiYWNjb3VudF90eXBlIjoiSU5URVJOQUwiLCJuYW1lIjoicmFuZGkiLCJlbWFpbCI6InJhbmRpQG1pbmR0ZXJhLmNvbSIsInJvbGUiOiJBRE1JTiIsInJlY29yZF9mbGFnIjoiQUNUSVZFIn0sIlJlZnJlc2hUb2tlbklEIjoiMGE2MDRhZDgtNWNlMy00OWM4LTliODAtMjc4ZWM3YTk0NDRkIiwiUHJvdmlkZXIiOiJtaW5kdGVyYSIsIkF1dGhUb2tlbiI6IiIsIlJlZnJlc2hUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUprWVhSaElqcDdJa2xFSWpvaU1HRTJNRFJoWkRndE5XTmxNeTAwT1dNNExUbGlPREF0TWpjNFpXTTNZVGswTkRSa0lpd2lWWE5sY2tsRUlqb2lNRGt5WkdWbU1qTXRZMk0zWVMwMFpUa3pMVGczTW1NdE9USm1PVGN3WVdSa1pEQXpJaXdpVUhKdmRtbGtaWElpT2lKdGFXNWtkR1Z5WVNJc0lrRjFkR2hVYjJ0bGJpSTZJaUlzSWxCMVlteHBZMVJ2YTJWdUlqb2lJaXdpUlhod2FYSmxjMEYwSWpveE9EQXdNREI5TENKbGVIQWlPakUyTkRBNU5UVXpNVEFzSW1saGRDSTZNVFkwTURjM05UTXhNQ3dpYVhOeklqb2laR0Z6YUdKdllYSmtMV0YxZEdnaWZRLkFvUC1wZjFlSTJ0SHZlWVpkRjA1MkN2ZjJHQ19Yb3RmbFZMN2VjaWlBY1UiLCJVc2VyU2Vzc2lvbklEIjoiIiwiVXNlckxvZ0FjdGl2aXR5SUQiOiIiLCJFeHBpcmVzQXQiOjEwODAwMH0sImV4cCI6MTY0MDg4MzMxMCwiaWF0IjoxNjQwNzc1MzEwLCJpc3MiOiJkYXNoYm9hcmQtYXV0aCJ9.P7gjLuilolCTH7p8Ls8W2Q-LPyQInDpIm7KZILcMgEU"
            }
        }).then(response => {
            if (response.status === 200) {
                client.sendText(message.from, response.data);
            }
        })
    }
  });
}