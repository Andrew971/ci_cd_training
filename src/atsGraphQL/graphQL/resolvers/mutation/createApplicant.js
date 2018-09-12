const uuidv4= require('uuid/v4');
const {dynamoDB} = require('../../config');

const createApplicant = (obj, args, context, info) => {
  const id = uuidv4(); // new ID
  let putParams = {
      TableName: 'ApplicantTable',
      Item: {
        Id :  id,
      },
      info:args.input,
      ReturnValues:'ALL_OLD'    
    }
  let getParams = {
      TableName: 'JobsTable',
      Key: {'Id': id}
    }

    return  dynamoDB
              .put(putParams)
              .promise()
              .then(()=>dynamoDB
                .get(getParams)
                .promise()
                .then(data=>data.Item)
              )
              .catch(err=>console.log(err));;
}

module.exports = createApplicant;