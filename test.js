const { default: axios } = require('axios');
var format = require('date-format');
const dates = '2021-12-21T02:00:00.000Z'


axios.get('https://api-kjr.kampustsl.id/user/61c058456b86f258b0531ebb').then(response => {
    console.log(format('hh:mm',  new Date(response.data.message.schedule.datetime)))
})