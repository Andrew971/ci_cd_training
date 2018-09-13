// import axios from 'axios'
//testing my function with babel
exports.handler = (event, context, callback) => {
    var currentTime = new time.Date(); 
    // console.log(axios)
    currentTime.setTimezone("America/Los_Angeles");
    callback(null, {
        statusCode: '200',
        body: 'The time in Los Angeles is: ' + currentTime.toString(),
    });
};