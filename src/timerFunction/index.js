
//testing my function with babel
var babel = require("@babel/core");
// import { transform } from "@babel/core";
// import * as babel from "@babel/core";
// import axios from 'axios' ;
// import time from 'time';

const test = (event, context, callback) => {
        var currentTime = new time.Date(); 
        // console.log(axios)
       currentTime.setTimezone("America/Los_Angeles");
       const test = [1,2,3]
       const test2 = [...test,4,5,6]
       console.log(currentTime.toString())
        callback(null, {
            statusCode: '200',
            body: 'The time in Los Angeles is: ' + currentTime.toString(),
        });
    };
babel.transformAsync(test, {plugin:['module:@babel/preset-env']}).then(result => {
 console.log(result.code)
  });

// exports.handler = (event, context, callback) => {
//     var currentTime = new time.Date(); 
//     console.log(axios)
//    currentTime.setTimezone("America/Los_Angeles");
//    console.log(currentTime.toString())
//     callback(null, {
//         statusCode: '200',
//         body: 'The time in Los Angeles is: ' + currentTime.toString(),
//     });
// };