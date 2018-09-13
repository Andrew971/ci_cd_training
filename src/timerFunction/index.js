var babel = require("@babel/core");
import axios from 'axios' ;
import time from 'time';
//testing my function with babel
exports.handler = (event, context, callback) => {
    var currentTime = new time.Date(); 
    console.log(axios)
   currentTime.setTimezone("America/Los_Angeles");
   console.log(currentTime.toString())
    callback(null, {
        statusCode: '200',
        body: 'The time in Los Angeles is: ' + currentTime.toString(),
    });
};