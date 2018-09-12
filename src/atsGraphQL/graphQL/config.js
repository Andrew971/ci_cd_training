const AWS = require('aws-sdk');


if(process.env.NODE_ENV !== 'developement'){

  var creds = new AWS.Credentials(process.env.ACCESS_KEY, process.env.SECRET_KEY);
AWS.config.update({credentials:creds});
}else{


  const credentials = new AWS.SharedIniFileCredentials({
  profile:process.env.PROFILE
});
AWS.config.update({credentials:credentials});

}



const dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10',region: 'us-west-2'});
const Convert = AWS.DynamoDB.Converter;

module.exports = {dynamoDB,Convert} ;