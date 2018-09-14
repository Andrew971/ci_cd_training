const axios = require('axios');
const time = require('time');

exports.handler = (event, context, callback) => {
    const currentTime = new time.Date();
    console.log(axios)
    currentTime.setTimezone("America/Los_Angeles");
    console.log(currentTime.toString())
    callback(null, {
        statusCode: '200',
        body: 'The time in Los Angeles is: ' + currentTime.toString()
    });
};